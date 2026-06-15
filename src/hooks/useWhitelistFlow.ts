import { useState, useCallback } from 'react';
import { getAddress } from 'ethers';
import type { WhitelistStatus } from '../types';

const WALLET_RE = /^0x[a-fA-F0-9]{40}$/;

export interface WhitelistFlowState {
  status: WhitelistStatus;
  code: string;
  walletAddress: string;
  successWallet: string;
  errorMessage: string;
  walletError: string;
  isWalletValid: boolean;
}

export interface WhitelistFlowActions {
  setCode: (v: string) => void;
  setWalletAddress: (v: string) => void;
  submitCode: () => Promise<void>;
  submitWallet: () => Promise<void>;
  reset: () => void;
}

const INITIAL: WhitelistFlowState = {
  status: 'IDLE',
  code: '',
  walletAddress: '',
  successWallet: '',
  errorMessage: '',
  walletError: '',
  isWalletValid: false,
};

function validateWallet(raw: string): { valid: boolean; checksummed: string; error: string } {
  const trimmed = raw.trim();
  if (!WALLET_RE.test(trimmed)) {
    return { valid: false, checksummed: trimmed, error: 'Address must be 0x followed by 40 hex characters.' };
  }
  try {
    const checksummed = getAddress(trimmed);
    return { valid: true, checksummed, error: '' };
  } catch {
    return { valid: false, checksummed: trimmed, error: 'Invalid ERC-20 address checksum.' };
  }
}

export function useWhitelistFlow(): [WhitelistFlowState, WhitelistFlowActions] {
  const [state, setState] = useState<WhitelistFlowState>(INITIAL);

  const setCode = useCallback((v: string) => {
    setState((s) => ({ ...s, code: v, errorMessage: '' }));
  }, []);

  const setWalletAddress = useCallback((raw: string) => {
    const { valid, error } = validateWallet(raw);
    setState((s) => ({
      ...s,
      walletAddress: raw,
      walletError: raw.trim().length > 0 ? error : '',
      isWalletValid: valid,
    }));
  }, []);

  const submitCode = useCallback(async () => {
    const normalized = state.code.trim().toUpperCase();
    if (!normalized) return;

    setState((s) => ({ ...s, status: 'VERIFYING', errorMessage: '' }));

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: normalized }),
      });

      if (res.status === 429) {
        setState((s) => ({
          ...s,
          status: 'INVALID',
          errorMessage: 'Too many attempts. Please wait before trying again.',
        }));
        return;
      }

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = (await res.json()) as { status: 'valid' | 'invalid' | 'already_used' };

      if (data.status === 'valid') {
        setState((s) => ({ ...s, status: 'WALLET_ENTRY', code: normalized }));
      } else if (data.status === 'already_used') {
        setState((s) => ({ ...s, status: 'ALREADY_USED' }));
      } else {
        setState((s) => ({ ...s, status: 'INVALID' }));
      }
    } catch {
      setState((s) => ({
        ...s,
        status: 'NETWORK_ERROR',
        errorMessage: 'Connection to the archive failed. Please try again.',
      }));
    }
  }, [state.code]);

  const submitWallet = useCallback(async () => {
    const { valid, checksummed, error } = validateWallet(state.walletAddress);
    if (!valid) {
      setState((s) => ({ ...s, walletError: error }));
      return;
    }

    setState((s) => ({ ...s, status: 'SUBMITTING' }));

    try {
      const res = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: state.code, walletAddress: checksummed }),
      });

      if (!res.ok && res.status !== 400) throw new Error(`Server error ${res.status}`);

      const data = (await res.json()) as
        | { status: 'success'; wallet: string }
        | { status: 'error'; reason: string };

      if (data.status === 'success') {
        setState((s) => ({ ...s, status: 'SUCCESS', successWallet: data.wallet }));
      } else {
        const reason = (data as { status: 'error'; reason: string }).reason;
        let msg = 'Redemption failed. Please try again.';
        if (reason === 'already_used')    msg = 'This passphrase was claimed while you were entering your address.';
        if (reason === 'duplicate_wallet') msg = 'This wallet address has already been inscribed in the ledger.';
        if (reason === 'bad_address')     msg = 'The server rejected the wallet address. Please check it and try again.';
        setState((s) => ({
          ...s,
          status: 'WALLET_ENTRY',
          walletError: msg,
        }));
      }
    } catch {
      setState((s) => ({
        ...s,
        status: 'WALLET_ENTRY',
        walletError: 'Connection to the archive failed. Please try again.',
      }));
    }
  }, [state.code, state.walletAddress]);

  const reset = useCallback(() => {
    setState(INITIAL);
  }, []);

  const actions: WhitelistFlowActions = { setCode, setWalletAddress, submitCode, submitWallet, reset };
  return [state, actions];
}

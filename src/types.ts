export type WhitelistStatus =
  | 'IDLE'
  | 'VERIFYING'
  | 'INVALID'
  | 'ALREADY_USED'
  | 'VALID'
  | 'WALLET_ENTRY'
  | 'SUBMITTING'
  | 'SUCCESS'
  | 'NETWORK_ERROR';

export interface VerifyRequest {
  code: string;
}

export interface VerifyResponse {
  status: 'valid' | 'invalid' | 'already_used';
}

export interface RedeemRequest {
  code: string;
  walletAddress: string;
}

export interface RedeemResponse {
  status: 'success' | 'error';
  wallet?: string;
  reason?: 'invalid_code' | 'already_used' | 'bad_address' | 'duplicate_wallet';
}

export interface WhitelistEntry {
  code: string;
  walletAddress: string;
  createdAt: string;
}

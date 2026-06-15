import { useState, useEffect } from 'react';
import { useWhitelistFlow } from '../../hooks/useWhitelistFlow';
import HankoSeal from '../decorative/HankoSeal';
import RedactionBar from '../decorative/RedactionBar';

function truncateWallet(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

/** Section 2 — 名簿の門 / THE LEDGER GATE */
export default function WhitelistGate() {
  const [state, actions] = useWhitelistFlow();
  const [sealVisible, setSealVisible] = useState(false);

  const { status, code, walletAddress, successWallet, errorMessage, walletError, isWalletValid } = state;
  const { setCode, setWalletAddress, submitCode, submitWallet, reset } = actions;

  // Trigger seal animation on success
  useEffect(() => {
    if (status === 'SUCCESS') {
      const t = setTimeout(() => setSealVisible(true), 200);
      return () => clearTimeout(t);
    } else {
      setSealVisible(false);
    }
  }, [status]);

  const isIdle        = status === 'IDLE';
  const isVerifying   = status === 'VERIFYING';
  const isInvalid     = status === 'INVALID';
  const isAlreadyUsed = status === 'ALREADY_USED';
  const isWalletEntry = status === 'WALLET_ENTRY';
  const isSubmitting  = status === 'SUBMITTING';
  const isSuccess     = status === 'SUCCESS';
  const isNetworkErr  = status === 'NETWORK_ERROR';

  return (
    <section aria-labelledby="whitelist-heading">
      {/* Section heading */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-px bg-gold/30" />
          <span className="text-gold text-xs">❀</span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>
        <div className="text-center">
          <p className="font-mincho text-2xl text-ink mb-1" lang="ja" id="whitelist-heading">
            名簿の門
          </p>
          <h2 className="font-cinzel text-xs tracking-[0.4em] uppercase text-ink-faded">
            THE LEDGER GATE
          </h2>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex-1 h-px bg-gold/30" />
          <span className="text-gold text-xs">❀</span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>
      </div>

      {/* Intro copy */}
      <p className="font-garamond text-base italic text-ink-faded text-center mb-1">
        Winners of the cipher game receive a private access code. Enter it below to inscribe your wallet in the ledger.
      </p>
      <p className="font-mincho text-sm text-ink-ghost text-center mb-8" lang="ja">
        暗号ゲームの勝者には、非公開のアクセスコードが送付される。以下に入力し、名簿への登録を完了せよ。
      </p>

      {/* ── SUCCESS STATE ─────────────────────────────────────────── */}
      {isSuccess && (
        <div className="text-center animate-fade-in space-y-6">
          {/* Stamp animation */}
          <div className="flex justify-center">
            <div className={sealVisible ? 'seal-stamped' : 'opacity-0'}>
              <HankoSeal variant="authority" className="w-28 h-28 opacity-85" />
            </div>
          </div>

          <div>
            <p className="font-mincho text-xl text-ink mb-1" lang="ja">登録完了</p>
            <p className="font-cinzel text-sm tracking-[0.3em] uppercase text-ink-faded">
              WHITELIST CONFIRMED
            </p>
          </div>

          <div className="border border-gold/40 bg-parchment-light/40 px-6 py-4 inline-block text-left">
            <p className="font-garamond italic text-ink-faded text-sm mb-1">
              月の名簿に刻まれた — Inscribed in the Ledger.
            </p>
            <p className="font-cinzel text-xs tracking-widest text-ink-ghost">
              WALLET &nbsp;/&nbsp; ウォレット
            </p>
            <p className="font-garamond text-base text-ink mt-1">
              {truncateWallet(successWallet)}
            </p>
          </div>

          <button
            onClick={reset}
            className="text-ink-ghost font-cinzel text-[10px] tracking-widest uppercase underline underline-offset-4 hover:text-ink transition-colors"
          >
            Return to Archive
          </button>
        </div>
      )}

      {/* ── VERIFYING ────────────────────────────────────────────── */}
      {isVerifying && (
        <div className="text-center py-8 animate-fade-in">
          <p className="font-mincho text-lg text-ink-faded mb-1" lang="ja">記録を照合中…</p>
          <p className="font-cinzel text-[11px] tracking-[0.3em] uppercase text-ink-ghost">
            CONSULTING THE ARCHIVE…
          </p>
          <div className="mt-4 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-ink-faded rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── SUBMITTING ───────────────────────────────────────────── */}
      {isSubmitting && (
        <div className="text-center py-8 animate-fade-in">
          <p className="font-mincho text-lg text-ink-faded mb-1" lang="ja">記録を刻印中…</p>
          <p className="font-cinzel text-[11px] tracking-[0.3em] uppercase text-ink-ghost">
            INSCRIBING THE LEDGER…
          </p>
          <div className="mt-4 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-vermilion rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── INVALID ──────────────────────────────────────────────── */}
      {(isInvalid || isNetworkErr) && !isVerifying && !isSubmitting && (
        <div className="mb-6 animate-fade-in">
          <div className="text-center mb-3">
            <p className="font-mincho text-lg text-vermilion" lang="ja">記録なし</p>
            <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-vermilion-deep">
              NO SUCH RECORD
            </p>
          </div>
          <RedactionBar label="[REDACTED] 検閲済み" />
          {errorMessage && (
            <p className="font-garamond text-sm italic text-ink-ghost text-center mt-2">
              {errorMessage}
            </p>
          )}
        </div>
      )}

      {/* ── ALREADY USED ─────────────────────────────────────────── */}
      {isAlreadyUsed && (
        <div className="mb-6 text-center animate-fade-in">
          <p className="font-mincho text-lg text-vermilion mb-1" lang="ja">使用済み</p>
          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-vermilion-deep mb-3">
            ALREADY CLAIMED
          </p>
          <p className="font-garamond text-sm italic text-ink-faded">
            この合言葉は既に使用済み — This passphrase has been claimed.
          </p>
          <RedactionBar label="[CLAIMED] 使用済み" />
        </div>
      )}

      {/* ── CODE ENTRY (IDLE / INVALID / NETWORK_ERROR) ──────────── */}
      {(isIdle || isInvalid || isAlreadyUsed || isNetworkErr) && !isVerifying && (
        <form
          onSubmit={(e) => { e.preventDefault(); submitCode(); }}
          className="space-y-4 max-w-md mx-auto"
          noValidate
        >
          <div>
            <label className="block mb-1">
              <span className="font-mincho text-sm text-ink-faded" lang="ja">
                合言葉を入力せよ
              </span>
              <span className="block font-cinzel text-[10px] tracking-[0.3em] uppercase text-ink-ghost mt-0.5">
                ENTER THE PASSPHRASE
              </span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="◈ · · ·"
              className="archive-input text-center text-xl tracking-[0.3em]"
              autoComplete="off"
              spellCheck={false}
              aria-label="Passphrase"
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={!code.trim()}
              className="archive-btn"
              aria-label="Submit passphrase"
            >
              <span>SUBMIT&nbsp;/&nbsp;</span>
              <span className="font-mincho" lang="ja">提出</span>
            </button>
          </div>
        </form>
      )}

      {/* ── WALLET ENTRY ─────────────────────────────────────────── */}
      {isWalletEntry && (
        <div className="animate-fade-in">
          {/* Unlock indicator */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 bg-parchment-light/40">
              <span className="text-gold text-sm">◈</span>
              <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-ink-faded">
                ACCESS GRANTED — PASSPHRASE VERIFIED
              </span>
              <span className="text-gold text-sm">◈</span>
            </div>
            <p className="font-mincho text-xs text-ink-ghost mt-2" lang="ja">
              合言葉確認済 — ウォレットアドレスを登録せよ
            </p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); submitWallet(); }}
            className="space-y-4 max-w-md mx-auto"
            noValidate
          >
            <div>
              <label className="block mb-1">
                <span className="font-mincho text-sm text-ink-faded" lang="ja">
                  ERC-20 ウォレットアドレス
                </span>
                <span className="block font-cinzel text-[10px] tracking-[0.3em] uppercase text-ink-ghost mt-0.5">
                  ERC-20 WALLET ADDRESS
                </span>
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x…"
                className={`archive-input font-garamond text-base tracking-wide ${
                  walletError ? 'border-vermilion/60' : isWalletValid && walletAddress ? 'border-gold/60' : ''
                }`}
                autoComplete="off"
                spellCheck={false}
                aria-label="ERC-20 wallet address"
                aria-describedby={walletError ? 'wallet-error' : undefined}
              />
              {walletError && (
                <p
                  id="wallet-error"
                  className="font-garamond text-sm italic text-vermilion mt-1"
                  role="alert"
                >
                  {walletError}
                </p>
              )}
              {isWalletValid && !walletError && walletAddress && (
                <p className="font-cinzel text-[10px] tracking-widest uppercase text-gold/80 mt-1">
                  ◈ Address verified
                </p>
              )}
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={!isWalletValid}
                className="archive-btn"
                aria-label="Inscribe wallet address in the ledger"
              >
                <span>INSCRIBE&nbsp;/&nbsp;</span>
                <span className="font-mincho" lang="ja">刻印</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

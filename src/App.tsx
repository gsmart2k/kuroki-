import ArchiveHeader from './components/layout/ArchiveHeader';
import ClassificationBar from './components/layout/ClassificationBar';
import VerticalBanner from './components/layout/VerticalBanner';
import StatusFooter from './components/layout/StatusFooter';
import HankoSeal from './components/decorative/HankoSeal';
import InkSplatter from './components/decorative/InkSplatter';
import OrnamentalDivider from './components/decorative/OrnamentalDivider';
import CipherDictionary from './components/cipher/CipherDictionary';
import WhitelistGate from './components/whitelist/WhitelistGate';
import AdminPage from './pages/AdminPage';

const isAdmin = window.location.pathname === '/admin';

export default function App() {
  if (isAdmin) return <AdminPage />;
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1c130b 0%, #0f0a06 100%)' }}
    >
      {/* Subtle wood-grain vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 50%, rgba(5,3,1,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Left vertical banner */}
      <VerticalBanner />

      {/* Document card */}
      <main className="relative z-10 mx-auto max-w-document px-4 py-10 lg:py-16">
        <article className="document-card px-6 py-8 md:px-10 md:py-12">
          {/* Burned edges */}
          <div className="burned-edges" aria-hidden="true" />
          {/* Paper texture */}
          <div className="paper-texture" aria-hidden="true" />

          {/* All content sits above the texture overlays */}
          <div className="card-content">
            {/* Authority seal — top-right corner, slightly rotated */}
            <div
              className="absolute top-4 right-4 md:top-6 md:right-6 opacity-80"
              style={{ transform: 'rotate(-4deg)' }}
              aria-hidden="true"
            >
              <HankoSeal variant="authority" className="w-20 h-20 md:w-24 md:h-24" />
            </div>

            {/* Ink splatters */}
            <InkSplatter />

            {/* ── Header ── */}
            <ArchiveHeader />

            {/* ── Classification bar ── */}
            <ClassificationBar />

            {/* ── Section 1: Cipher Dictionary ── */}
            <div className="mt-8">
              <CipherDictionary />
            </div>

            {/* ── Section divider ── */}
            <OrnamentalDivider label="Ledger Gate" />

            {/* ── Section 2: Whitelist Gate ── */}
            <WhitelistGate />

            {/* ── Status footer ── */}
            <StatusFooter />
          </div>
        </article>
      </main>
    </div>
  );
}

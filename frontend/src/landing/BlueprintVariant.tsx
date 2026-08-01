import {
  ArrowDownToLine,
  ArrowRight,
  FileJson,
  Github,
  HardDrive,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'
import { CommandDemo } from './CommandDemo'
import { DOWNLOAD_URL, GITHUB_URL } from './content'

export function BlueprintVariant() {
  return (
    <main className="landing blueprint">
      <nav className="blueprint__nav shell" aria-label="Main navigation">
        <a className="blueprint__brand" href="#top" aria-label="PassM home">
          <span>&gt;_</span> PASSM
        </a>
        <div className="blueprint__nav-links">
          <a href="#blueprint-how">How it works</a>
          <a href="#blueprint-security">Security</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        <a className="blueprint__nav-cta" href={DOWNLOAD_URL}>Get PassM</a>
      </nav>

      <header className="blueprint__hero shell" id="top">
        <div className="blueprint__hero-copy">
          <p className="blueprint__eyebrow">Local credential system</p>
          <h1>Your vault.<br /><em>On your machine.</em></h1>
          <p className="blueprint__lede">
            PassM is a small, open-source password manager for people who live in the terminal.
            No account. No cloud sync. One encrypted file you control.
          </p>
          <div className="blueprint__actions">
            <a className="blueprint__button blueprint__button--solid" href={DOWNLOAD_URL}>
              <ArrowDownToLine /> Download for Windows
            </a>
            <a className="blueprint__button blueprint__button--line" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Github /> View source
            </a>
          </div>
          <div className="blueprint__spec-row">
            <span><i /> MIT licensed</span>
            <span><i /> Built in Rust</span>
            <span><i /> 6 commands</span>
          </div>
        </div>

        <div className="blueprint__vault" aria-label="Diagram of PassM local encryption">
          <div className="blueprint__measure blueprint__measure--top">256 BIT KEY</div>
          <div className="blueprint__measure blueprint__measure--side">LOCAL BOUNDARY</div>
          <div className="blueprint__orbit blueprint__orbit--outer">
            <span><b>PBKDF2</b></span>
            <span><b>100K</b></span>
            <span><b>SHA-256</b></span>
          </div>
          <div className="blueprint__orbit blueprint__orbit--inner">
            <i /><i /><i /><i />
          </div>
          <div className="blueprint__vault-core">
            <LockKeyhole />
            <strong>passwords.json</strong>
            <small>~/.config/passm/</small>
          </div>
          <div className="blueprint__callout blueprint__callout--a"><span>01</span> master key</div>
          <div className="blueprint__callout blueprint__callout--b"><span>02</span> random nonce</div>
        </div>
      </header>

      <section className="blueprint__rail" aria-label="Product attributes">
        <div className="shell blueprint__rail-inner">
          <p><HardDrive /> Stored locally</p>
          <p><ShieldCheck /> ChaCha20-Poly1305</p>
          <p><KeyRound /> PBKDF2 verification</p>
          <p><FileJson /> Portable JSON path</p>
        </div>
      </section>

      <section className="blueprint__process shell" id="blueprint-how">
        <div className="blueprint__section-heading">
          <p>OPERATION SEQUENCE / 03 STEPS</p>
          <h2>From zero to secured<br />in under a minute.</h2>
        </div>
        <div className="blueprint__steps">
          <article>
            <b>01</b>
            <div><code>passm init</code><h3>Set the master password</h3><p>PassM creates the local vault and stores a derived hash for verification.</p></div>
          </article>
          <article>
            <b>02</b>
            <div><code>passm add github</code><h3>Add a credential</h3><p>Use hidden prompts to keep sensitive values out of your normal shell history.</p></div>
          </article>
          <article>
            <b>03</b>
            <div><code>passm get github</code><h3>Retrieve when needed</h3><p>Verify your master password, decrypt locally, and get straight back to work.</p></div>
          </article>
        </div>
      </section>

      <section className="blueprint__demo shell">
        <div className="blueprint__demo-copy">
          <p>INTERACTIVE SCHEMATIC</p>
          <h2>Six commands.<br />Nothing hidden.</h2>
          <p>Try the core flow. This is the vocabulary of the entire tool—small enough to remember, complete enough for everyday credentials.</p>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">Read the source <ArrowRight /></a>
        </div>
        <CommandDemo title="powershell · passm" />
      </section>

      <section className="blueprint__security" id="blueprint-security">
        <div className="shell blueprint__security-inner">
          <div className="blueprint__security-mark"><ShieldCheck /></div>
          <div>
            <p>SECURITY CONSTRUCTION</p>
            <h2>Designed for local control.</h2>
          </div>
          <div className="blueprint__security-grid">
            <article><strong>ChaCha20-Poly1305</strong><span>Authenticated encryption for stored passwords.</span></article>
            <article><strong>PBKDF2 · 100,000 rounds</strong><span>Master-password verification and key derivation.</span></article>
            <article><strong>Fresh random nonce</strong><span>A new nonce is generated for every encrypted password.</span></article>
            <article><strong>Configurable path</strong><span>Keep the vault at the default path or set <code>JSON_PATH</code>.</span></article>
          </div>
          <p className="blueprint__disclaimer">PassM is a personal open-source project and has not undergone an independent security audit.</p>
        </div>
      </section>

      <section className="blueprint__download shell">
        <div><span>READY FOR WINDOWS</span><h2>Put your passwords<br />back in your hands.</h2></div>
        <a href={DOWNLOAD_URL}><ArrowDownToLine /> Download PassM <small>.EXE · v1.0</small></a>
      </section>

      <footer className="blueprint__footer shell">
        <span>&gt;_ PASSM / 2026</span>
        <span>LOCAL-FIRST PASSWORD MANAGEMENT</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">SOURCE CODE ↗</a>
      </footer>
    </main>
  )
}

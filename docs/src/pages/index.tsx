import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { useState, type ReactNode } from 'react';
import HomepageFeatures from '../components/HomepageFeatures';

function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const command = 'npm install @dreamstack-us/kaal';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="install-command">
      <code className="install-command__text">{command}</code>
      <button
        className="install-command__button"
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const heroImage = useBaseUrl('/img/kaal-hero.webp');
  return (
    <header className={clsx('hero hero--primary clock-bg')}>
      <div className="container" style={{ textAlign: 'center' }}>
        <img
          src={heroImage}
          alt="Kaal"
          style={{
            maxWidth: '600px',
            width: '100%',
            height: 'auto',
            marginBottom: '1rem',
            borderRadius: '12px',
            border: '3px solid #b8860b',
          }}
        />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/examples/basic-datepicker"
          >
            View Examples
          </Link>
        </div>
        <InstallCommand />
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="High-performance DatePicker & TimePicker for React Native + Web with Unistyles v3 theming">
      <Head>
        <title>Kaal - React Native DatePicker & TimePicker</title>
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

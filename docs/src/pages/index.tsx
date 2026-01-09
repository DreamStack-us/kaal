import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import HomepageFeatures from '../components/HomepageFeatures';

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
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/examples/basic-datepicker">
            View Examples
          </Link>
        </div>
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

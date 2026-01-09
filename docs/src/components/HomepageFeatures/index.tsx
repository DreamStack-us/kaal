import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Sub-8KB Bundle',
    icon: '⚡',
    description: (
      <>
        Lightweight and optimized. No bloated dependencies, just the essentials
        for smooth date and time picking.
      </>
    ),
  },
  {
    title: 'Native Date API',
    icon: '📅',
    description: (
      <>
        Uses native JavaScript Date and Intl APIs. No Temporal polyfill
        required, keeping your bundle lean.
      </>
    ),
  },
  {
    title: 'M3 Clock Face',
    icon: '🕐',
    description: (
      <>
        Material Design 3 clock face for time selection. Touch-friendly analog
        dial with smooth animations.
      </>
    ),
  },
  {
    title: 'Cross-Platform',
    icon: '📱',
    description: (
      <>
        Works seamlessly on iOS, Android, and Web. Platform-specific
        optimizations with consistent APIs.
      </>
    ),
  },
  {
    title: 'Unistyles v3',
    icon: '🎨',
    description: (
      <>
        Advanced theming with react-native-unistyles. Dark mode, custom themes,
        and design tokens built-in.
      </>
    ),
  },
  {
    title: 'New Architecture',
    icon: '🚀',
    description: (
      <>
        Built for React Native 0.78+ and the New Architecture. TurboModules and
        Fabric ready.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={styles.featureCol}>
      <div className="feature-card">
        <div className="feature-card__icon">{icon}</div>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__description">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureRow}>
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

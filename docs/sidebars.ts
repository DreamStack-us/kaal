import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/datepicker',
        'api/timepicker',
        'api/calendar-grid',
        'api/wheel-picker',
        'api/hooks',
        'api/utilities',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/basic-datepicker',
        'examples/date-range',
        'examples/timepicker-ios',
        'examples/timepicker-material',
        'examples/theming',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/installation',
        'guides/theming',
        'guides/platform-differences',
        'guides/migration-from-temporal',
      ],
    },
  ],
};

export default sidebars;

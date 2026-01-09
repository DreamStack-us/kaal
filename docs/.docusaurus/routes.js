import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/kaal/docs',
    component: ComponentCreator('/kaal/docs', 'c71'),
    routes: [
      {
        path: '/kaal/docs',
        component: ComponentCreator('/kaal/docs', 'b50'),
        routes: [
          {
            path: '/kaal/docs',
            component: ComponentCreator('/kaal/docs', '90b'),
            routes: [
              {
                path: '/kaal/docs/api/calendar-grid',
                component: ComponentCreator('/kaal/docs/api/calendar-grid', '48c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/api/datepicker',
                component: ComponentCreator('/kaal/docs/api/datepicker', 'e8e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/api/hooks',
                component: ComponentCreator('/kaal/docs/api/hooks', 'fe5'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/api/timepicker',
                component: ComponentCreator('/kaal/docs/api/timepicker', '4bf'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/api/utilities',
                component: ComponentCreator('/kaal/docs/api/utilities', '84f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/api/wheel-picker',
                component: ComponentCreator('/kaal/docs/api/wheel-picker', '180'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/examples/basic-datepicker',
                component: ComponentCreator('/kaal/docs/examples/basic-datepicker', '874'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/examples/date-range',
                component: ComponentCreator('/kaal/docs/examples/date-range', '027'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/examples/theming',
                component: ComponentCreator('/kaal/docs/examples/theming', '497'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/examples/timepicker-ios',
                component: ComponentCreator('/kaal/docs/examples/timepicker-ios', '613'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/examples/timepicker-material',
                component: ComponentCreator('/kaal/docs/examples/timepicker-material', '565'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/getting-started',
                component: ComponentCreator('/kaal/docs/getting-started', '218'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/guides/installation',
                component: ComponentCreator('/kaal/docs/guides/installation', '8b1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/guides/migration-from-temporal',
                component: ComponentCreator('/kaal/docs/guides/migration-from-temporal', '8d8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/guides/platform-differences',
                component: ComponentCreator('/kaal/docs/guides/platform-differences', 'eba'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/guides/theming',
                component: ComponentCreator('/kaal/docs/guides/theming', '984'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/kaal/docs/intro',
                component: ComponentCreator('/kaal/docs/intro', 'f34'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/kaal/',
    component: ComponentCreator('/kaal/', '36e'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

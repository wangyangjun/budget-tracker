export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'theme-light', color: '#ffffff' },
      { name: 'dark', class: 'theme-dark', color: '#000000' }
    ]
  }
};

import '../src/index.css';

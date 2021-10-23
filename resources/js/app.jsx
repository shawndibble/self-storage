import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import Authenticated from '@/Layouts/Authenticated';

require('./bootstrap');

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const page = require(`./Pages/${name}`).default;
    if (!name.startsWith('Auth/')) {
      page.layout = Authenticated;
    }
    return page;
  },
  setup({ el, App, props }) {
    return render(<App {...props} />, el);
  },
});

InertiaProgress.init({ color: '#4B5563' });

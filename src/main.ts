import './css/styles.css';

import { MemoriaStone } from './components/memoria-stone';
import { SubGridCalc } from './views/sub-grid-calc';
import { Layout } from './views/layout';
import Aurelia, { RouterConfiguration } from 'aurelia';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({ config: {
  instrumentationKey: '58a9c925-7fda-4d3b-addc-deb57bf5b892'
}});

appInsights.loadAppInsights();
appInsights.trackPageView();

// TODO: Register app insights with DI for advanced tracking.

Aurelia
  .register(
    RouterConfiguration,
    MemoriaStone,
    SubGridCalc
  )
  .app({
    component: Layout,
    host: document.querySelector('my-app')
  })
  .start();

import './css/styles.css';

import { MemoriaStone } from './components/memoria-stone';
import { SubGridCalc } from './views/sub-grid-calc';
import { Layout } from './views/layout';
import Aurelia, { RouterConfiguration } from 'aurelia';

Aurelia
  .register(
    RouterConfiguration,
    MemoriaStone,
    SubGridCalc
  )
  .app(Layout)
  .start();

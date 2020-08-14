import { IRouteableComponent } from '@aurelia/router';
import { MemoriaStoneModel } from '../models/memoria-stone-model';

// https://stackoverflow.com/a/22780569
function jsonp(url, callback) {
  const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  const script = document.createElement('script');

  window[callbackName] = function (data) {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.body.appendChild(script);
}

export class SubGridCalc implements IRouteableComponent {
  public stones: Array<MemoriaStoneModel>;
  public selectedStone: MemoriaStoneModel;

  public search: string;

  public selectStone(stone: MemoriaStoneModel): void {
    this.selectedStone = stone;
    console.log(stone);
    console.log(typeof stone.stats)
  }

  get HP(): number {
    return Math.round(this.selectedStone.max().hp * 0.10 * 9);
  }

  get ATK(): number {
    return Math.round(this.selectedStone.max().atk * 0.10 * 9);
  }

  get DEF(): number {
    return Math.round(this.selectedStone.max().def * 0.10 * 9);
  }

  get HPA(): number {
    return Math.round(this.selectedStone.adorned().hp * 0.10 * 9);
  }

  get ATKA(): number {
    return Math.round(this.selectedStone.adorned().atk * 0.10 * 9);
  }

  get DEFA(): number {
    return Math.round(this.selectedStone.adorned().def * 0.10 * 9);
  }

  get HPE(): number {
    return Math.round(this.selectedStone.max().hp * 0.15 * 9);
  }

  get ATKE(): number {
    return Math.round(this.selectedStone.max().atk * 0.15 * 9);
  }

  get DEFE(): number {
    return Math.round(this.selectedStone.max().def * 0.15 * 9);
  }

  get HPEA(): number {
    return Math.round(this.selectedStone.adorned().hp * 0.15 * 9);
  }

  get ATKEA(): number {
    return Math.round(this.selectedStone.adorned().atk * 0.15 * 9);
  }

  get DEFEA(): number {
    return Math.round(this.selectedStone.adorned().def * 0.15 * 9);
  }

  private entered = false;

  public enter(): void {
    jsonp('https://talesofcrestoria.fandom.com/api.php?format=json&action=parse&pageid=5065', (data: any) => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data.parse.text['*'], 'text/html');
      const blocks: Array<HTMLElement> = [].slice.call(html.querySelectorAll('code'));
      const dataArray = blocks.map(stoneBlock => {
        let stoneString = stoneBlock.innerText.replace('\n', '')//.replace(/[^((["'])(?:(?=(\\?))\2.)*?\1){},]*/g, '');

        if (stoneString[stoneString.length - 1] === ',')
          stoneString = stoneString.substr(0, stoneString.length - 1);

        return JSON.parse(stoneString);
      });

      this.stones = MemoriaStoneModel.fromDataArray(dataArray);
      this.selectedStone = this.stones[0];
    });
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj).filter(x => x[0] != '$');
  }
}
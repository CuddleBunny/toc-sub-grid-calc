import { MemoriaStoneModel } from './../models/memoria-stone-model';
import { customElement, bindable } from "aurelia";

@customElement('memoria-stone')
export class MemoriaStone {
    @bindable stone: MemoriaStoneModel;
    @bindable name: string;

    image(): string {
        return 'https://talesofcrestoria.fandom.com/wiki/Special:FilePath/' +
            encodeURIComponent(this.stone.name.replace('[', '(').replace(']', ')').replace('é', 'e')) +
            '_(Thumb).png';
    }
}
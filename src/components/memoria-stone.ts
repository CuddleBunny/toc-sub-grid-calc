import { MemoriaStoneModel } from './../models/memoria-stone-model';
import { customElement, bindable } from "aurelia";

@customElement('memoria-stone')
export class MemoriaStone {
    @bindable stone: MemoriaStoneModel;
    @bindable name: string;
}
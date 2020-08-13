import { StatsModel } from './stats-model';

export interface StatMap {
    [Key: number]: StatsModel;
}

export interface IMemoriaStone {
    name: string;
    element: string;
    type: string;
    stats: StatMap;
    adornments: StatsModel;
}

export class MemoriaStoneModel implements IMemoriaStone {
    name: string;
    element: string;
    type: string;
    stats: StatMap;
    adornments: StatsModel;

    get levels(): Array<number> {
        return Object.keys(this.stats).map(key => parseInt(key));
    }

    max(): StatsModel {
        const maxLevel = this.levels[2];

        return {
            hp: this.stats[maxLevel].hp,
            atk: this.stats[maxLevel].atk,
            def: this.stats[maxLevel].def
        }
    }

    adorned(): StatsModel {
        const maxLevel = this.levels[2];

        return {
            hp: this.stats[maxLevel].hp + this.adornments.hp,
            atk: this.stats[maxLevel].atk + this.adornments.atk,
            def: this.stats[maxLevel].def + this.adornments.def
        }
    }

    get rarity(): string {
        switch(this.levels[1]) {
            case 30: return 'R';
            case 40: return 'SR';
            case 50: return 'SSR';
        }
    }

    static fromData(data: IMemoriaStone): MemoriaStoneModel {
        return Object.assign(
            Object.create(MemoriaStoneModel.prototype), 
            data);
    }

    static fromDataArray(data: Array<IMemoriaStone>): Array<MemoriaStoneModel> {
        return data.map(stone => 
            Object.assign(
                Object.create(MemoriaStoneModel.prototype), 
                stone));
    }
}
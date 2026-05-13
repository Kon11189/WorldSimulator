export class StateStore {

    constructor() {

        this.storageKey = 'sovereign-world-save';

        this.state = {
            treasury: 500000,
            fiatSupply: 100000,
            taxRate: 12,
            infrastructure: 1,
            population: 0,
            gdp: 0,
            areaKm2: 0,
            exchangeRate: 1,
            ownedTerritories: [],
            religion: 'Secular',
            language: 'English',
            government: 'Republic'
        };

    }

    load() {

        const save =
            localStorage.getItem(this.storageKey);

        if (!save) {
            return;
        }

        this.state = JSON.parse(save);

    }

    save() {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.state)
        );

    }

    acquireTerritory(territory) {

        this.state.ownedTerritories.push(territory);

        this.state.areaKm2 += territory.areaKm2;

        this.state.treasury -= territory.price;

    }

}

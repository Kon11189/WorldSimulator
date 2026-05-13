import { SovereignMap } from '../gis/SovereignMap.js';
import { StateStore } from './StateStore.js';
import { EconomyEngine } from '../economy/EconomyEngine.js';
import { DashboardController } from '../ui/DashboardController.js';
import { PaymentGateway } from '../payments/PaymentGateway.js';

export class App {

    constructor() {

        this.store = new StateStore();

        this.map = null;

        this.economy = null;

        this.dashboard = null;

        this.payments = null;

    }

    async initialize() {

        this.store.load();

        this.map = new SovereignMap(this.store);

        await this.map.initialize();

        this.economy = new EconomyEngine(this.store);

        this.dashboard = new DashboardController(
            this.store,
            this.economy
        );

        this.payments = new PaymentGateway(this.store);

        this.registerEvents();

        this.dashboard.render();

        this.startSimulation();

    }

    registerEvents() {

        window.addEventListener(
            'state:updated',
            () => {
                this.dashboard.render();
                this.store.save();
            }
        );

        window.addEventListener(
            'territory:purchase',
            async (event) => {

                const payload = event.detail;

                const success =
                    await this.payments.processTerritoryPurchase(payload);

                if (!success) {
                    return;
                }

                this.store.acquireTerritory(payload);

                this.map.renderOwnedTerritories();

                window.dispatchEvent(
                    new CustomEvent('state:updated')
                );

            }
        );

    }

    startSimulation() {

        this.economy.start();

    }

}

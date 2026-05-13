import { App } from './core/App.js';

window.addEventListener('DOMContentLoaded', async () => {

    const app = new App();

    await app.initialize();

    window.SOVEREIGN_WORLD = app;

});

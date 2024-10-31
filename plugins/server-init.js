export default defineNuxtPlugin(async (nuxtApp) => {
    // Check if store exists on nuxtApp

    const store = nuxtApp.$store;
    // Perform your server-side initialization here
    try {
        await store.dispatch('serverInit', {
            config: nuxtApp.$config,
        });

    } catch (error) {
        console.error('Error in serverInit:', error);
    }

});

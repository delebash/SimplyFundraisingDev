Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': "lib/extux",
        'Wakanda': "lib/extux/wakanda"
    }
});
Ext.application({
    name: 'SimplyFundraising',
    autoCreateViewport: true,

    requires: ['Ext.ux.Router', // Require the UX
        'Ext.window.MessageBox',
        'Wakanda.model'],
})
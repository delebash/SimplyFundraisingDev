Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': "lib/extux",
        'Wakanda': "lib/extux/wakanda"
    }
});
Ext.application({
    name: 'SimplyFundraising',


    requires: [
        'Wakanda.model']
})
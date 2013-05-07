Ext.define('SimplyFundraising.controller.Home', {
    extend : 'Ext.app.Controller',
    views : ['home.Index'],
    init : function() {
        this.control({
            '#main-nav-toolbar button' : {
                click : this.onMainNavClick
            }
        });
    },

    index : function() {
    },

    onMainNavClick : function(btn) {
        Ext.Router.redirect(btn.itemId === 'home' ? '' : btn.itemId);
    }
}); 
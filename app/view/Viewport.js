Ext.define('SimplyFundraising.view.Viewport', {
    renderTo : Ext.getBody(),
    extend : 'Ext.container.Viewport',
    requires : ['Ext.layout.container.Border', 'Ext.toolbar.Toolbar', 'Ext.panel.Panel'],

    id : 'viewport',
    layout : 'border',
    cls : 'viewport',
    defaults : {
        frame : false,
    },
    items : [{
        xtype : 'container',
        region : 'north',
        id : 'header',
        html : 'Simply Fundraising',
        cls : 'header',
        margin : '0 0 0 0',
        padding: '0 0 0 0'
    }, {
        xtype : 'toolbar',
        region : 'north',
        itemId : 'main-nav-toolbar',
        margin : '0 0 4 0',
        defaults : {
            toggleGroup : 'main-nav',
            allowDepress : false
        },
        items : [{
            text : 'Home',
            itemId : 'home',
            pressed : true
        }, {
            text : 'PopUsers',
            itemId : 'popusers'
        }, {
            text : 'Contacts',
            itemId : 'contacts'
        }, {
            text : 'Users',
            itemId : 'users'
        }, {
            text : 'Settings',
            itemId : 'settings'
        }]
    }, {
        xtype : 'container',
        region : 'south',
        height : 25,
        id : 'footer',
        html : 'footer',
        margins : {
            top : 5
        }
    }, {
        xtype : 'panel',
        region : 'east',
        split : true,
        width : 100,
        minWidth : 75,
        maxWidth : 150,
        collapsible : true,
        title : 'East Panel',
        id : 'eastPanel',
        html : ' disposable'

    }, {
        xtype : 'panel',
        region : 'west',
        split : true,
        width : 100,
        minWidth : 75,
        maxWidth : 150,
        collapsible : true,
        title : 'West Panel',
        id : 'westPanel',
        html : 'West disposable',
    }, {
        region : 'center',
        id : 'centerRegion',
        cls : 'panelrounded',
        layout : 'fit',
        border : false

    }]
})

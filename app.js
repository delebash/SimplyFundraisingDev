var hosturl = ''
//hosturl = 'http://127.0.0.1:8081/cors/'
hosturl = 'http://ageektech.zapto.org:8081/cors/'

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
],

    controllers: ['Contacts'],

    /*
     * The default is already true, I'm just making it clear here that we
     * have one config called enableRouter that auto-invoke Ext.ux.Router.init();
     * If you need to customize when init() is called, set this to false
     */
    enableRouter: true,

    /*
     * Here is where routes are defined.
     *  key:    URL matcher
     *  value:  controller + '#' + action to be invoked
     */
    routes: {
        '/': {
            controller: 'contacts',
            action: 'list',
            view: 'List'
        }
    },

    launch: function () {
        Ext.Ajax.cors = true;
        Ext.Ajax.useDefaultXhrHeader = false;
        /*
         * Ext.ux.Router provides some events for better controlling
         * dispatch flow
         */
        Ext.ux.Router.on({

            routemissed: function (token) {
                Ext.Msg.show({
                    title: 'Error 404',
                    msg: 'Route not found: ' + token,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            },

            beforedispatch: function (token, match, params) {
                Ext.log('beforedispatch ' + token);
            },

            /**
             * For this example I'm using the dispatch event to render the view
             * based on the token. Each route points to a controller and action.
             * Here I'm using these 2 information to get the view and render.
             */
            dispatch: function (token, match, params, controller) {
                var view, viewClass, action, viewport = Ext.getCmp('viewport'), target = viewport.getComponent('centerRegion')
                //     target = viewport.down('#viewport-target'),
                navToolbar = viewport.down('#main-nav-toolbar');
                //debugger;
                // adjust controller and action names
                action = Ext.String.capitalize(match.action);
                controller = match.controller.charAt(0).toLowerCase() + match.controller.substr(1);
                //debugger;
                var myxtype = ""
                // try to get the view by controller + action names
                if (!match.view) {
                    myxtype = controller + action
                    // viewClass = Ext.ClassManager.get('SimplyFundraising.view.' + controller + '.' + action);
                } else {
                    myxtype = controller + match.view

                    // debugger;
                    //   viewClass = Ext.ClassManager.get('SimplyFundraising.view.' + controller + '.' + match.view);
                    //debugger;
                }
                myxtype = myxtype.toLowerCase()
                if (myxtype) {
                    //
                    // // create view
                    // view = Ext.create(viewClass, {
                    // border : false
                    // });

                    // clear target and add new view
                    Ext.suspendLayouts();
                    target.removeAll();
                    target.add({
                        xtype: myxtype
                    });
                    Ext.resumeLayouts(true);

                    // target.removeAll();
                    // target.add(view);

                    // adjust top toolbar
                    if (navToolbar.child('#' + controller)) {
                        navToolbar.child('#' + controller).toggle(true);
                    }
                }
            }
        });
    }
});

Ext.onReady(function() {
    var myBtnHandler = function(btn) {
        Ext.MessageBox.alert('You Clicked', btn.text);
    }, fileBtn = Ext.create('Ext.button.Button', {
        text : 'File',
        handler : myBtnHandler
    }), editBtn = Ext.create('Ext.button.Button', {
        text : 'Edit',
        handler : myBtnHandler
    }), tbFill = new Ext.toolbar.Fill();

    var myTopToolbar = Ext.create('Ext.toolbar.Toolbar', {
        items : [fileBtn, tbFill, editBtn]
    });

    var myBottomToolbar = [{
        text : 'Save',
        handler : myBtnHandler
    }, '-', {
        text : 'Cancel',
        handler : myBtnHandler
    }, '->', '<b>Items open: 1</b>'];

    var myPanel = Ext.create('Ext.panel.Panel', {
        width : 200,
        height : 150,
        title : 'Ext Panels rock!',
        collapsible : true,
        renderTo : Ext.getBody(),
        tbar : myTopToolbar,
        bbar : myBottomToolbar,
        buttonAlign : 'left',
        buttons : [{
            text : 'Press me!',
            handler : myBtnHandler
        }],
        tools : [{
            type : 'gear',
            handler : function(evt, toolEl, panel) {
                var toolClassNames = toolEl.dom.className.split(' ');
                var toolClass = toolClassNames[1];
                var toolId = toolClass.split('-')[2];
                Ext.MessageBox.alert('You Clicked', 'Tool ' + toolId);
            }
        }, {
            type : 'help',
            handler : function() {
                Ext.MessageBox.alert('You Clicked', 'The help tool');
            }
        }]
    });

    var allButtons = [{
        text : 'Btn 1'
    }, {
        text : 'Btn 2'
    }, {
        text : 'Btn 3'
    }];
    var topDockedToolbar = {
        xtype : 'toolbar',
        dock : 'top',
        items : allButtons
    };
    var bottomDockedToolbar = {
        xtype : 'toolbar',
        dock : 'bottom',
        items : allButtons
    };
    var leftDockedToolbar = {
        xtype : 'toolbar',
        vertical : true,
        dock : 'left',
        weight : 10,
        items : allButtons
    };
    var rightDockedToolbar = {
        xtype : 'toolbar',
        weight : 10,
        vertical : true,
        dock : 'right',
        items : allButtons
    };
    var myPanel = Ext.create('Ext.panel.Panel', {
        width : 350,
        height : 250,
        title : 'Ext Panels rock!',
        renderTo : Ext.getBody(),
        html : 'Content body',
        buttons : {
            items: allButtons,
            weight : -1,
        },
        dockedItems : [topDockedToolbar, bottomDockedToolbar, leftDockedToolbar, rightDockedToolbar]
    });

});

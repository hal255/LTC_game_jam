
var colorMixing = {
    preload: function () {
        // load neutral map
        neutralMapImage = game.load.image(neutralMapLabel, neutralMapAsset);
    },

    create: function () {
        // create user input
        cursors = game.input.keyboard.createCursorKeys();
        dCursors = game.input.keyboard
    },

    update: function(){
        updateNeutralMapPosition();
    }
};
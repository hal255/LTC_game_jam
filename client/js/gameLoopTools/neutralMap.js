const neutralMap = {};

neutralMap.mapSprites = [];

neutralMap.init = (data) => {
    data = typeof data === "undefined" ? {} : data;
    neutralMap.mapData = data.neutralMap || config.default.neutralMap;
    neutralMap.width = data.width || config.init.screenWidth;
    neutralMap.height = data.height || config.init.screenHeight;

    neutralMap.graphicCenter = [0.5, 0.5];
};

neutralMap.createMaps = () => {
    let nextMapSpriteBottom = neutralMap.height;
    let latestMapSprite;
    do {
        let mapSpriteData = [
            neutralMap.width * neutralMap.mapData.xRegion,
            0,  // this will be changed
            neutralMap.mapData.key
        ];
        latestMapSprite = game.add.sprite(...mapSpriteData);
        latestMapSprite.alpha = 0.35;
        //latestMapSprite._mapType = true;
        //game.physics.enable(latestMapSprite);
        latestMapSprite.anchor.setTo(...neutralMap.graphicCenter);
        latestMapSprite.scale.x = latestMapSprite.scale.y =
            transformUtilities.getScaleValueToEnvelopeRect(latestMapSprite.width, latestMapSprite.height, neutralMap.width, neutralMap.height);
        latestMapSprite.y = nextMapSpriteBottom - latestMapSprite.height * (1 - latestMapSprite.anchor.y);

        latestMapSprite.onFullyOnMap = neutralMap.reorderBottomSpriteToTop;
        latestMapSprite.onFullyLeftMap = () => { }; // this acts as an override to the default auto-destroy functionality

        nextMapSpriteBottom = transformUtilities.getTopPosition(latestMapSprite.y, latestMapSprite.height, latestMapSprite.anchor.y);    // next map sprite bottom is latest map sprite top

        neutralMap.mapSprites.push(latestMapSprite);
        mapController.addToMap(latestMapSprite);
    } while (nextMapSpriteBottom >= 0);
};

// This reorder function does visually break if an integer number of sprites do not take up the entire screen height, in which case the do-while loop above just needs to run 1 more time
neutralMap.reorderBottomSpriteToTop = (topPosition) => {
    let bottomSprite = neutralMap.mapSprites.shift();
    bottomSprite.y = topPosition - bottomSprite.height * (1 - bottomSprite.anchor.y);
    neutralMap.mapSprites.push(bottomSprite);
};

// setup neutral map
neutralMap.create = () => {
    neutralMap.createMaps();
};

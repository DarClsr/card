import Phaser from "phaser";

export default {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#33A5E7',
   
    scale: {
      width: 400,
      height: 400,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

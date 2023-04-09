import Phaser from "phaser";
import config from "./config";
import GameScene from "./scene/game";

export class RenderGame {
  config: Phaser.Types.Core.GameConfig;
  game:any
  scene:any
  constructor(config: Phaser.Types.Core.GameConfig) {
    this.config = config;
    this.game=new Phaser.Game(
        Object.assign(config, {
          scene: [GameScene],
        })
      ); 
    console.log("init render ")
  }
}



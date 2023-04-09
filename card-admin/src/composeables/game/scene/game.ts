import Phaser from "phaser";
import { Player } from "./player";

export default class Scene extends Phaser.Scene {
    player;
  constructor() {
    super("GameScene");
  }

  preload() {
    // 加载背景
    this.load.image("sky", "/game/sky.png");
    // 加载地面
    this.load.image("ground", "/game/platform.png");
    // 加载星星
    this.load.image("star", "/game/star.png");
    // 加载人物
    this.load.spritesheet('player', '/game/dude.png', { frameWidth: 32, frameHeight: 48 });

  }

  create() {
    console.log("创建场景");
    // 添加背景
    this.add.image(400, 300, "sky").setScale(2, 1);
    this.add.image(400, 300, "star");
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 400, "ground").setScale(10,1).refreshBody();
    platforms.create(500, 150, "ground");
    platforms.create(1050, 220, "ground");
    platforms.create(50, 250, "ground");


    // 创建人物
    this.player = this.physics.add.sprite(100, 300, "player");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 1 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, platforms);

    // 添加地面
    //    console.log(logo)
    //     this.tweens.add({
    //       targets: logo,
    //       y: 350,
    //       duration: 1500,
    //       ease: 'Sine.inOut',
    //       yoyo: true,
    //       repeat: -1
    //     });
  }
}

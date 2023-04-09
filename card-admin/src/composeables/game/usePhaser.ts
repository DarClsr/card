import * as Phaser  from "phaser";

const baseConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
};

export const UsePhaser = () => {
    const initGame=(params:Phaser.Types.Core.GameConfig | null)=>{
        return  new Phaser.Game({
            ...baseConfig,
            ...params
        });
    }

  return {
    initGame
  };
};

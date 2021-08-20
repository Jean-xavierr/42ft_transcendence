/*
 * dataStructures.ts
 * File contains all structures used by the game canvas.
 *
 * PO -> playerOne
 * PT -> playerTwo
*/

export {Ball, Game, PowerUp, Mouse, Player}

class Mouse {
  x: number;
  y: number;
  playerId: string;

  constructor(id: string, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.playerId = id;
  }
}

// This class contain all data to represente a ball
class Ball {
  pos: Array<number>; // x -> [0] y -> [1]
  size: number; // in px
  speed: number;
  color: string; // in hexa + alpha
  delta: Array<number>; // x -> [0] y -> [1]

  constructor() {
    this.pos = [1920 / 2, 1016 / 2];
    this.size = 32;
    this.speed = 3;
    this.color = "#DCE1E5FF";
    this.delta = [0, 0];
  }
}

class Player {
  name: string;
  color: string;
  barLen: number; // in px

  constructor() {
    this.name = "marvin";
    this.color = "#FFFFFF";
    this.barLen = 160; // in px
  }
}

// This class contain all data to represent a game.
class Game {
  id: string;
  ball: Ball;
  state: string;
  score: Array<number>;
  players: Map<string, Player>; // string -> userId
  mapName: string;
  enabledPowerUps: Array<string>;

  constructor() {
    this.id = "";
    this.ball = new Ball();
    this.state = "waiting";
    this.score = [0, 0] as Array<number>;
    this.mapName = "tennis";
    this.players = new Map();
    this.enabledPowerUps = new Array<string>();
  }
}

// This class contain all data to represente a powerUp
class PowerUp {
  pos: Array<number>;
  name: string;
  modifier: ((game: Game) => void);

  constructor() {
    this.pos = [0, 0];
    this.name = "";
    this.modifier = () => {};
  }
}

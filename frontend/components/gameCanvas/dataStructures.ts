export { Ball, Game, PowerUp, Mouse, Player, IcolorPalette, Button }

/**
 * 🔽 UI STRUCTURES 🔽
 */

interface IcolorPalette {
  [index: string]: string;
}

class Button {
  txt: string;
  ico: string;        // Name of an icon in the button
  class: any;         // List of HTML classes of this object
  action: () => void; // function called when the btn is clicked
  actionHoverEnter: () => void; // function called when the client hover the button
  actionHoverLeave: () => void; // function called when the client hover the button
  isLoading: boolean;
  uiPalette: IcolorPalette;

  private _color: string;

  constructor() {
    this.uiPalette = {} as IcolorPalette;
    this.uiPalette["green"] = "#219653"; this.uiPalette["white"] = "#DCE1E5";
    this.uiPalette["red"] = "#B30438";
    this.txt = "";
    this.ico = "";
    this.class = {'v-btn-content': false};
    this._color = this.uiPalette["white"];
    this.action = function () {};
    this.actionHoverEnter = function () {};
    this.actionHoverLeave = function () {};
    this.isLoading = false;
  }

  public get color(): string {
    return (this._color);
  }

  public set color(color: string) {
    this._color = this.uiPalette[color];
    if (color === "white") {
      this.class['v-btn-content'] = true;
    } else {
      this.class['v-btn-content'] = false;
    }
  }

  public setFull(txt: string, color: string, action?: () => void): void {
    this.txt = txt;
    this.color = color;
    if (action) {
      this.action = action;
    } else {
      this.action = function () {};
    }
  }

  public setHoverSearch() {
    this.actionHoverLeave = () => { 
      this.isLoading = true;
      this.color = "green";
    };
    this.actionHoverEnter = () => { 
      this.isLoading = false;
      this.txt = "Stop the research"
      this.color = "red";
    };
  }

  public setHoverReady() {
    this.actionHoverLeave = () => { 
      this.isLoading = true;
      this.color = "green";
    };
    this.actionHoverEnter = () => { 
      this.isLoading = false;
      this.txt = "Unready"
      this.color = "red";
    };
  }

  public resetHover() {
    this.actionHoverLeave = () => {};
    this.actionHoverEnter = () => {};
  }
}

/**
 * 🔽 GAME DATA STRUCTURES 🔽
 */

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
    this.color = "#DCE1E5";
    this.delta = [0, 0];
  }
}

class Player {
  name: string;
  color: string;
  barLen: number; // in px
  isReady: boolean; // is player ready to start a game ?

  constructor() {
    this.name = "";
    this.color = "#000000";
    this.barLen = 160; // in px
    this.isReady = false;
  }
}

// This class contain all data to represent a game.
class Game {
  id: string;
  ball: Ball;
  type: string;                 // Type of the game. Matchmaking | Private
  state: string;
  score: Array<number>;
  mapName: string;
  players: Map<string, Player>; // string -> userId
  creatorId: string;              // The userId of the game creator
  opponentId: string;             // The userId of the opponenent;
  creationDate: Date;
  opponentIdFound: string;
  enabledPowerUps: Array<string>;

  constructor() {
    this.id = "";
    this.ball = new Ball();
    this.type = "matchmaking";
    this.state = "waiting";
    this.score = [0, 0] as Array<number>;
    this.mapName = "tennis";
    this.players = new Map();
    this.creatorId = "";
    this.opponentId = "";
    this.creationDate = new Date();
    console.log(this.creationDate);
    this.opponentIdFound = "";
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
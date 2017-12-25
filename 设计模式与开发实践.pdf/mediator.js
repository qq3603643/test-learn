/**
 * 中介者模式
 * 实例 游戏玩家
 */
class Player {
  constructor(name, teamName, mediator) {
    this.name = name;
    this.teamName = teamName;
    this.mediator = mediator;
    this.status = 'on';
  }

  win() {
    console.log(`恭喜${this.name}, 你赢得了胜利`);
  }

  dead() {
    this.status = 'off';
    this.mediator.playerDead(this);
    console.log(`${this.name} 阵亡`);
  }

  changeTeam(teamName) {
    this.mediator.changeTeam(this, teamName);
  }
}

class Mediator {
  constructor() {
    this.players = {};
  }

  addPlayer(player) {
    const {
      teamName
    } = player;

    if (this.players[teamName]) {
      this.players[teamName].push(player);
    } else {
      this.players[teamName] = [player];
    }

    return player;
  }

  removePlayer(player) {
    const {
      teamName
    } = player;
    const teamPlayers = this.players[teamName];
    const _ix = teamPlayers.findIndex(tmPlayer => tmPlayer.name == player.name);

    if (_ix >= 0) {
      teamPlayers.splice(_ix, 1);
    }
  }

  changeTeam(player, newTeamName) {
    const oldTeamName = player.teamName;

    this.removePlayer(player);
    player.teamName = newTeamName;
    this.addPlayer(player);

    console.log(`${player.name} 从 ${oldTeamName} 叛逃至 ${newTeamName}`);
    this.gameIsOver();
  }

  playerDead(player) {
    const {
      teamName
    } = player;
    const teamPlayers = this.players[teamName];
    const teamPlayersIsOff = teamPlayers.filter(tmPlayer => tmPlayer.status == 'off');

    if (teamPlayersIsOff == teamPlayers.length) {
      console.log(`${teamName} 全军覆没`);
    }

    this.gameIsOver();
  }

  gameIsOver() {
    const teamSomeOn = Object.values(this.players).filter(players => players.some(player => player.status == 'on'));
    if (teamSomeOn && teamSomeOn.length == 1) {
      teamSomeOn[0].forEach((player) => {
        player.win();
      });

      return true;
    }

    return false;
  }
}

const PlayerFactroy = (() => {
  const mediator = new Mediator();

  return {
    create(name, teamName) {
      console.log(`【${teamName}】 ${name} 到达战场`);
      return mediator.addPlayer(new Player(name, teamName, mediator));
    }
  };
})();

const player_1 = PlayerFactroy.create('player_1', 'red');
const player_2 = PlayerFactroy.create('player_2', 'red');
const player_3 = PlayerFactroy.create('player_3', 'black');
const player_4 = PlayerFactroy.create('player_4', 'black');

player_1.dead();
player_2.changeTeam('black');

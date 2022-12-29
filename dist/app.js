
class DicePlayer {
  constructor(name) {
    this.name = name
    this.current = 0
    this.glob = 0
    this.active = false
  }

  getName() {
    return this.name;
  }

  getCurrentScore() {
    return this.current
  }

  setCurrentScore(score) {
    this.root.querySelector('.current-score').innerText = score
    this.current = score
  }

  getGlobalScore() {
    return this.glob
  }

  setGlobalScore(score) {
    this.root.querySelector('.global-score').innerText = score
    this.glob = score
  }

  getState() {
    return this.active
  }

  setState() {
    this.root.classList.toggle('active')
    this.active = !this.active
  }

  setRootHTML(root) {
    this.root = document.getElementById(root)
  }

  isWinner() {
    this.root.querySelector('.global-score').innerText = "you won"
  }

}

class DiceGame {
  #root;
  #p1;
  #p2;
  constructor(root, p1, p2) {
    this.#root = root
    this.#p1 = p1
    this.#p2 = p2
    this.activePlayer = () => {
      return this.#p1.getState() ? this.#p1 : this.#p2
    }
  }

  init() {
    const root = this.#root
    const p1 = this.#p1
    const p2 = this.#p2
    root.innerHTML = `
      <div id="player1" class="player"></div>
      <div id="game-cmd" class=""></div>
      <div id="player2" class="player"></div>
    `
    const players = [p1,p2]
    let num = 1
    players.map(p => {
      p.setRootHTML('player'+num)
      p.root.innerHTML = `
        <div class="mb-32 ">
          <div class="text-4xl player-name">${p.getName()}</div>
          <div class="text-6xl font-thin text-rose-500 global-score"></div>
        </div>
        <div class="bg-rose-500 w-1/4 p-3 px-9 mx-auto min-w-fit">
          <div class="text-sm font-normal text-gray-700 pb-1">current</div>
          <div class="text-3xl font-light text-white current-score"></div>
        </div>
      `
      p.setCurrentScore(0)
      p.setGlobalScore(0)
      num++
    })
    p1.setState()
    let cmd = document.getElementById('game-cmd')

    let dice = `
      <div class="scene">
        <div class="dice">
          <div class="dice__face dice__face--front">1</div>
          <div class="dice__face dice__face--back">6</div>
          <div class="dice__face dice__face--right">2</div>
          <div class="dice__face dice__face--left">4</div>
          <div class="dice__face dice__face--top">3</div>
          <div class="dice__face dice__face--bottom">5</div>
        </div>
      </div>
    `

    cmd.innerHTML = `
      <div class="new-game mt-16 cursor-pointer">new game</div>
      <div class="dice-window">${dice}</div>
      <div class="group mb-4">
        <div class="roll-dice cursor-pointer mb-8">roll dice</div>
        <div class="hold cursor-pointer">hold</div>
      </div>
    `
    this.attatchEvent()
  }

  swapActivePlayer() {
    this.#p1.setState()
    this.#p2.setState()
  }

  rollDice() {
    let profiler = {
      "1": "transform: rotateY(  0deg)",
      "2": "transform: rotateY(-90deg)",
      "3": "transform: rotateX(-90deg)",
      "4": "transform: rotateY( 90deg)",
      "5": "transform: rotateX( 90deg)",
      "6": "transform: rotateY(180deg)"
    }
    let rand = Math.floor(Math.random() * 6) + 1
    let player = this.activePlayer()
    document.querySelector('.dice').setAttribute('style', profiler[rand.toString()])
    if (rand > 1) {
      player.setCurrentScore(player.getCurrentScore() + rand)
      if (player.getGlobalScore() + player.getCurrentScore() >= 100) {
        setTimeout(() => {
          document.querySelector('.dice').setAttribute('style', profiler["1"])
        })
        this.destroyEvent()
        player.isWinner()
        console.log(`${player.getName()} has won the game`)
      } else {
        console.log(`${player.getName()} launch dice and got ${rand}`)
      }
    } else {
      player.setCurrentScore(0)
      console.log(`${player.getName()} leave the hand`)
      this.swapActivePlayer()
    }
  }

  holdScore() {
    let player = this.activePlayer()
    player.setGlobalScore(player.getCurrentScore() + player.getGlobalScore())
    player.setCurrentScore(0)
    console.log(`${player.getName()} is holding ${player.getCurrentScore()} points`)
    this.swapActivePlayer()
  }

  attatchEvent() {
    this.#root.querySelector('.new-game').addEventListener('click', () => {
      this.init()
    })

    let dice = this.#root.querySelector('.roll-dice')
    dice.addEventListener('click', this.rollDice.bind(this))

    let hold = this.#root.querySelector('.hold')
    hold.addEventListener('click', this.holdScore.bind(this))
  }

  destroyEvent() {
    let dice = this.#root.querySelector('.roll-dice')
    let hold = this.#root.querySelector('.hold')
    dice.remove()
    hold.remove()
  }

}

const player1 = new DicePlayer("player 1")
const player2 = new DicePlayer("player 2")

window.onload = () => {
  const game = new DiceGame(
    document.getElementById("root-dice-game"),
    player1, player2
  )
  game.init()
}
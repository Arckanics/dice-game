
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
    return this.current = score
  }

  setCurrentScore(score) {
    this.root.querySelector('.current-score').innerText = score
    this.current = score
  }

  getGlobalScore() {
    return this.glob = score
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

}

class DiceGame {
  #root;
  #p1;
  #p2;
  constructor(root, p1, p2) {
    this.#root = root
    this.#p1 = p1
    this.#p2 = p2
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
    cmd.innerHTML = `
      <div class="new-game mt-16 cursor-pointer">new game</div>
      <div class="svg-dice"></div>
      <div class="group mb-4">
        <div class="roll-dice cursor-pointer mb-8">roll dice</div>
        <div class="hold cursor-pointer">hold</div>
      </div>
    `
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
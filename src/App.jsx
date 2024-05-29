import { useState } from "react"
import { Square} from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import confetti from "canvas-confetti"
import { saveGameStorage, resetGameStorage, loadBoardGameStore, loadTurnGameStore } from "./logic/storage/index.js"
import { PlayersGame } from "./components/PlayersGame.jsx"

function App() {

const [board, setBoard] = useState(() => {
  const boardFromStorage = loadBoardGameStore
  if (boardFromStorage) return JSON.parse(boardFromStorage)
  return Array(9).fill(null)
})

const [turn, setTurn] = useState(() => {
  const turnFromStorage = loadTurnGameStore
  if (turnFromStorage) return turnFromStorage ?? TURNS.X
})

const [winner, setWinner] = useState(null)

const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
  
  resetGameStorage()
}

const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null)
}

const updateBoard = (index) => {
  if (board[index] || winner) return // Se valida que si tenemos algo no lo actualize

  const newBoard = [...board] // Se crea un nuevo board ya que debe ser inmutable
  newBoard[index] = turn
  setBoard(newBoard)
  const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X // Cambiamos los turnos

  setTurn(newTurn)

  //Aqui se guarda la partida
  saveGameStorage({
    board: newBoard, 
    turn:newTurn
  })

  const newWinner = checkWinnerFrom(newBoard)
  
  if (newWinner) {
    confetti()
    setWinner((prevWinner) => {
      console.log(`El ganador es ${newWinner}! El anterior ha sido ${prevWinner}`)
      return newWinner
    })
  } else if (checkEndGame(newBoard)) {
    setWinner(false) //Quiere decir que han empatado
  }
}

  return (
  <main className="board">
    <h1>Tic Tac Toe</h1>
    <PlayersGame />
    <button onClick={resetGame}>Empezar nuevamente</button>
    <section className="game">
      {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        } )
      }
    </section>

    <section className="turn">
      <Square isSelected={turn == TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn == TURNS.O}>
        {TURNS.O}
      </Square>
    </section>

    <section className="text">
      <spam>Realizado con 🩷 por Abiel Jesrrel (Relly) D. Lee <a href="https://github.com/abieljesrrel" target="_blank">@abieljesrrel</a></spam>
    </section>

    <WinnerModal resetGame={resetGame} winner={winner}  />
 
  </main>
  )
}

export default App

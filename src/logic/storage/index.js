//Guardamos la partida en el localStorage
export const saveGameStorage = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

//Limpiamos la partida del localStorage
export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('playerUno')
    window.localStorage.removeItem('playerDos')
}

// Guardamos los nombres de los jugadores
export const playerUnoStorage = (playerUno) => {
    window.localStorage.setItem('playerUno', playerUno);
}
export const playerDosStorage = (playerDos) => {
    window.localStorage.setItem('playerDos', playerDos);
}

//Cargamos lo almacenado en el LocalStorage
export const loadBoardGameStore = window.localStorage.getItem('board')
export const loadTurnGameStore = window.localStorage.getItem('turn')
export const loadPlayerUnoStorage = () => {
    return window.localStorage.getItem('playerUno')
}
export const loadPlayerDosStorage = () => {
    return window.localStorage.getItem('playerDos')
}


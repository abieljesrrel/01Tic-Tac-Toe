import { useState, useEffect } from "react"
import { playerUnoStorage, playerDosStorage, loadPlayerUnoStorage, loadPlayerDosStorage } from "../logic/storage"

export const PlayersGame = () => {

    //Difinicion de los estados de los nombres de los jugadores
    const [playerUno, setPlayerUno] = useState(() => {
        return loadPlayerUnoStorage() || ''
    })
    const [playerDos, setPlayerDos] = useState(() => {
        return loadPlayerDosStorage() || ''
    })

    // useEffect para actualizar localStorage cuando el estado cambie
    useEffect(() => {
        playerUnoStorage(playerUno)
    }, [playerUno])

    useEffect(() => {
        playerDosStorage(playerDos)
    }, [playerDos])

    //Funciones para manejar e cambio de los inputs
    const handlePlayerUnoChange = (event) => {
        setPlayerUno(event.target.value)
    }

    const handlePlayerDosChange = (event) => {
        setPlayerDos(event.target.value)
    }


    return (
        <>
        <label className="text">Jugador 1</label> 
        <input className="playerInput" type="text" value={playerUno} onChange={handlePlayerUnoChange} /> 
        <br />
        <label className="text">Jugador 2</label> 
        <input className="playerInput" type="text" value={playerDos} onChange={handlePlayerDosChange}/> 
        <br />
        </>
    )
}
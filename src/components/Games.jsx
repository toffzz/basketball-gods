import React, { useState } from 'react';
import Game from './Game.jsx'
import { Container, Row, Col, Alert, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import _ from 'lodash'
import { fetchGames } from '../util/helpers'

function Games(props) {
  const [games, updateGames] = useState([])
  const { gameCount = 0, addGameHandler } = props

  console.log("games", games)
  if(games.length === 0){
    fetchGames().then((fetchedGames) => {
      updateGames(fetchedGames)
    })
  }

//  console.log("games", games)

  const RenderRows = () => {
    let gameArray = [],
      rowArray = []
    _.forEach(games, (game, i) => {
      gameArray.push(<Game key={'game-'+i} game={ game }/>)

      if(i % 3 === 2 && i > 0){
        rowArray.push(<Row>{ gameArray }</Row>)
        gameArray = []
      }

      if(i === games.length - 1){
        rowArray.push(<Row>{ gameArray }</Row>)
      }
    })

    return rowArray
  }

  return (
    <RenderRows />
  )
}

export default Games

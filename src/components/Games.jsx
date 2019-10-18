import React, { useState } from 'react';
import Game from './Game.jsx'
import { Container, Row, Col, Alert, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import _ from 'lodash'

function Games(props) {
  const { gameCount = 0, addGameHandler } = props,
    gameArray = []
    
  const renderGames = () => {
    console.log(gameArray, gameCount)
    while(gameArray.length < gameCount){
      gameArray.push(<Game addGameHandler={addGameHandler} gameCount={ gameCount }/>)
    }

    return gameArray
  }
  return (
    <Row>


          { renderGames() }


    </Row>
  )
}

export default Games

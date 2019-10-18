import React, { useState } from 'react';
import { fetchGame } from '../util/helpers'
import { Table } from 'reactstrap';
import _ from 'lodash'
import { Container, Row, Col, Alert, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

function Game(props) {
  const { addGameHandler, gameCount } = props
  const [data, updateData] = useState(false)
  const [gameId, updateGameId] = useState('')
  /*if(!data){
    fetchGame().then((gameData) => {
      updateData(gameData)
    })
  }*/
  console.log(gameCount)
  const RenderTable = () => {
    const threesArray = data.threes
    console.log("three check", data.threes)
    if(data) {

      /*
      attemped: "31"
      made: "9"
      madeAttempted: "9-31"
      surplus: 1
      teamName: "Charlotte Hornets"
      */

      return(
        <Table bordered dark>
          <thead>
            <tr>
              <th> Team </th>
              <th> 3PM-3PA </th>
              <th> Surplus (fake) </th>
            </tr>
          </thead>
          <tbody>
            { threesArray.map((team) => {
              return(
                <tr key={team.teamName}>
                  <td>
                    { team.teamName }
                  </td>
                  <td>
                    { team.madeAttempted }
                  </td>
                  <td>
                    { team.surplus }
                  </td>
                </tr>
              )
            }) }
          </tbody>
        </Table>
      )
    }

    return(<Table></Table>)
  }

  const submitHandler = () => {
    fetchGame(gameId).then((gameData) => {
      updateData(gameData)
    })
    addGameHandler()
  }

  const updateInput = (e) => {
    updateGameId(e.target.value)
  }

  const RenderGameData = () => {
    return [<RenderTable />, <Alert> Bet on this Game </Alert>]
  }
  return (
    <Col xs="4">
      {data ? <RenderGameData /> :
        <InputGroup>
          <Input key={"game-" + gameCount} onChange={e => updateInput(e)} value={gameId} placeholder="Enter Game ID here: 401163174"/>
          <InputGroupAddon addonType="append"><Button onClick={submitHandler}>Submit</Button></InputGroupAddon>
        </InputGroup>
      }
    </Col>

  )
}

export default Game;

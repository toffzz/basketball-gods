import React, { useState } from 'react';
import { Table } from 'reactstrap';
import _ from 'lodash'
import { Container, Row, Col, Alert, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

function Game(props) {
  const { game } = props
  console.log("game here", game)

  const RenderTable = () => {
      /*
      attemped: "31"
      made: "9"
      madeAttempted: "9-31"
      surplus: 1
      teamName: "Charlotte Hornets"
      */
      const gameArray = [_.get(game, 'away'), _.get(game, 'home')]
      return(
        <Table bordered dark>
          <thead>
            <tr>
              <th> Team </th>
              <th> Score </th>
              <th> 3PM-3PA </th>
              <th> Surplus </th>
            </tr>
          </thead>
          <tbody>
            { gameArray.map((team) => {

              return(
                <tr key={ _.get(team, 'team.uid') }>
                  <td>
                    { _.get(team, 'team.displayName')}
                  </td>
                  <td>
                    { _.get(team, 'stats.score')}
                  </td>
                  <td>
                    { _.get(team, 'stats.made') + '-' + _.get(team, 'stats.attempted') }
                  </td>
                  <td>
                    { _.get(team, 'stats.surplus') }
                  </td>
                </tr>
              )
            }) }
          </tbody>
        </Table>
      )

    return(<Table></Table>)
  }

  const Surplus = () => {
    const surplus = _.get(game, 'surplus')
    return(
      <div>
        Surplus is { _.get(surplus, 'surplusDiff') }
      </div>
    )
  }

  const Status = () => {
    const status = _.get(game, 'status'),
      quarter = {
        1: '1Q',
        2: '2Q',
        3: '3Q',
        4: '4Q'
      }
    return (
      <div>
        {quarter[_.get(status, 'period')]} - {_.get(status, 'displayClock')}
      </div>
    )
  }
  return (
    <Col xs="4">
      <RenderTable />
      <Status />
      <Surplus />
    </Col>

  )
}

export default Game;

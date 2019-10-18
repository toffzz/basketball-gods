import React, { useState } from 'react';
import '../styles/App.css';
import Games from './Games.jsx'
import { Container, Row, Col, Jumbotron } from 'reactstrap';

function App() {
  const [gameCount, updateGameCount] = useState(1)

  const addGameHandler = () => {
    updateGameCount(gameCount + 1)
  }

  return (
    <div className="App">
        <Container>
          <Row>
            <Col xs="12">
              <h1>Basketball Gods Calculator</h1>
              <h3>Inspired by KenPom.</h3>
            </Col>
          </Row>
          <Games gameCount={gameCount} addGameHandler={addGameHandler}/>
        </Container>
    </div>
  );
}

export default App;

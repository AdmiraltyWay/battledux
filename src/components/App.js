import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ducks from './Ducks.jsx';
import UserInfo from './userInfo.jsx';
import * as actionCreators from '../actions/actions';
import Grid from './Grid.jsx';
import MessageBox from './MessageBox.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleMessageBoxClick = this.handleMessageBoxClick.bind(this);
  }

  handleLogin(e) {
    // console.log("hello");
    // console.log("hello ", document.getElementById('username').value);
    this.props.login(document.getElementById('username').value);
  }

  handleCreate(e) {
    this.props.create();
  }


  handleCellClick(e) {
    // console.log(e.target.id); // this is the coordinate col-row
    let coords = e.target.id.split('-')
    let col = coords[0];
    let row = coords[1];
    // console.log(col, row);

    // now check to see if we hit the computer!
    if (this.props.currentPlayer === 'player') {
      this.props.playerFire({ col, row });
      setTimeout(this.props.compFire, 1000);
    }
  }

  handleMessageBoxClick(e){
    console.log("you clicked on the message box");
  }


  render() {
    // console.log("check this === ", this.props);
    return (
      <div>
        <div><center><h1>⚓️🦆🐥🐣⚓️BATTLEDUX⚓️🐣🐥🦆⚓️</h1></center></div> 
        <div className="container">
          <div id="grids-container">
            <div id="login-area">
              <input id="username" type="text" placeholder="name please"></input>
              <button onClick={this.handleLogin}>Start Game</button>
            </div>
            <div id="player-duck-counter"><Ducks cpu={false} duckHealth={this.props.userDuckHealth} /></div>
            <div id="comp-duck-counter"><Ducks cpu={true} duckHealth={this.props.compDuckHealth} /></div>
            <div id="user-info"><UserInfo shots={this.props.playerStats.shots} hits={this.props.playerStats.hits}/></div>
            <div id="player-grid"><Grid shipsArr={this.props.playerBoard.ducksBoard} hitMissArr={this.props.playerBoard.hitsAndMissesBoard} cpu={false} /></div>
            <div id="cpu-grid"><Grid handleCellClick={this.handleCellClick} shipsArr={this.props.compBoard.ducksBoard} hitMissArr={this.props.compBoard.hitsAndMissesBoard} cpu={true} /></div>
            <div id="save-btn">
              <button onClick={this.handleCreate}>SAVE GAME</button>
            </div>
          </div>
        </div>
        <MessageBox userDuckHealth={this.props.userDuckHealth} compDuckHealth={this.props.compDuckHealth} userName={this.props.userName}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playerFire: bindActionCreators(actionCreators.playerFire, dispatch),
    compFire: bindActionCreators(actionCreators.compFire, dispatch),
    login: bindActionCreators(actionCreators.login, dispatch),
    create: bindActionCreators(actionCreators.create, dispatch),
  };
}

function mapStateToProps(store) {
  return {
    playerBoard: store.gameReducer.playerBoard,
    compBoard: store.gameReducer.compBoard,
    userDuckHealth: store.gameReducer.userDuckHealth,
    compDuckHealth: store.gameReducer.compDuckHealth,
    playerStats: store.gameReducer.playerStats,
    userName: store.gameReducer.userName,
    currentPlayer: store.gameReducer.currentPlayer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

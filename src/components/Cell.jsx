import React, { Component } from "react";
// import { render } from "react-dom";

const Cell = props => {
  let cellClass;
  let icon="";
  // set the class so that our CSS can color the square correctly
  switch (props.cellCode){
    case 'W':
      cellClass = 'water';
      break;
    case 'H':
      cellClass = 'hit';
      break;
    case 'M':
      cellClass = 'miss';
      break;
    case 'D':
      cellClass = 'duck';
      icon="🦆";
      break;
    case 'G':
      cellClass = 'goose';
      icon="🦆";
      break;
    case 'B':
      cellClass = 'baby';
      icon="🦆";
      break;
    default:
      cellClass = 'water';
  }
  

  // it is a 'cell' class and one of the above...for cell coloring
  let classnameText = "cell " + cellClass;
  return (
    <button id={props.coord} className={classnameText} onClick={props.handleCellClick}>{icon}</button>
  )
}


export default Cell;
import React, { Component } from "react";

const MessageBox = props => {

  return (
    <div id="message-box" onClick={props.handleMessageBoxClick}><h4>This is the Message Box!!!</h4></div>
  )
}


export default MessageBox;
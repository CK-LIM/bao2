import React, { Component } from 'react'
import baklava from '../baklava.png';
import joe from '../joe.png';
import pangolin from '../pangolin.png';
import baklava_mainBottom from '../baklava_mainBottom.png';
// import bigInt from 'big-integer'
import './App.css';

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-5">
        <br />
        <div className="text-center">
          <img src={baklava} width="200" height="200" className="" alt="" />
        </div>

        <div className="center text" >BAKLAVA SPACE</div>
        <div className="center textMiddleBold" ><b>Baklava stands for "layered, rich, and sweet". </b></div>
        <div className="center textMiddle">Baklava Space is designed as a combination of automated yield farming</div>
        <div className="center textMiddle">for your LP tokens and a synthetic creation mechainsm using LP tokens.</div>
        <div className="center" style={{ marginTop: "30px" }} >
          <img src={joe} width="50" height="50" className="exLink0 mr-5" alt="" onClick={() => {
            window.open(`https://traderjoexyz.com/#/home`, '_blank')
          }} />
          <img src={pangolin} width="50" height="50" className="exLink0" alt="" onClick={() => {
            window.open(`https://app.pangolin.exchange/`, '_blank')
          }} />
        </div>
        <img src={baklava_mainBottom} height="10%" width="100%" className="navbar navbar-dark fixed-bottom flex-md-nowrap p-0" alt="" />
        <br />
      </div>

    );
  }
}

export default Main;

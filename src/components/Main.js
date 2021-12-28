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
            window.open(`https://app.pangolin.exchange/`, '_blank')
          }} />
          <img src={pangolin} width="50" height="50" className="exLink0" alt="" onClick={() => {
            window.open(`https://traderjoexyz.com/#/home`, '_blank')
          }} />
        </div>
        <img src={baklava_mainBottom} height="10%" width="100%" className="navbar navbar-dark fixed-bottom flex-md-nowrap p-0" alt="" />
        {/* <div className="center" style={{ color: 'silver' }}>Synthetic assets presents the greatest frontier of DeFi. This money market is more than $10 trillion dollar, triumphing the spot market. DeFi allows the creation of synthetic assets in an unimaginable ways and anything that can find price and liquidity can become a synthetic asset. </div>
        <br />
        <div className="center" style={{ color: 'silver' }}>The word baklava is Turkish, possibly from a Mongolian root meaning to wrap up or pile up. These delicious pastries are the tradition of taking something good that exists, and layered it up into being a new treasure. Baklava Space aims to do this by being a new protocol that adds features to existing DeFi systems.</div>
        <br />
        <div className="center" style={{ color: 'silver' }}>Baklava space is first focused on providing a fair early distribution, and then on the creation of synthetic assets, where BAVA will be used to pay fees to mint synthetics and burned, continually reducing supply and adding value to all BAVA holders.</div> */}


        <br />
        {/* <div className="card mb-4 cardbody" style={{ width: '1000px' }} >
          <div className="card-body">
            <table className="table table-borderless text-center" style={{ color: 'silver' }}>
              <thead>
                <tr>
                  <th scope="col">Total Pools</th>
                  <th scope="col">New rewards per block</th>
                  <th scope="col">Start Block</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.poolLength} </td>
                  <td>{window.web3Ava.utils.fromWei(this.props.totalrewardperblock, 'ether')} BAVA</td>
                  <td>{this.props.startBlk} </td>
                </tr>
              </tbody>
            </table>
            <table className="table table-borderless text-center" style={{ color: 'silver' }}>
              <thead>
                <tr>
                  <th scope="col">BAVA Token Total Supply</th>
                  <th scope="col">BAVA Token Cap Supply</th>
                  <th scope="col">BAVA Token Lock Supply</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenTotalSupply, 'ether'))} BAVA</td>
                  <td>{window.web3Ava.utils.fromWei(this.props.bavaTokenCapSupply, 'ether')} BAVA</td>
                  <td>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenLock, 'ether'))} BAVA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>

    );
  }
}

export default Main;

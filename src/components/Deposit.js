import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import MediaQuery from 'react-responsive'
import bigInt from 'big-integer'
import 'reactjs-popup/dist/index.css'
import './App.css'

import ImgNextGen from './ImgNextGen'
import baklava from './images/baklava.webp'
import pangolin from './images/pangolin.webp'
import kyber from './images/kyber.webp'
import joe from './images/joe.webp'

class Deposit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      txValidAmount: false,
      txApprovedValidAmount: false
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.changeHandlerLp = this.changeHandlerLp.bind(this)
  }

  changeHandler(event) {
    let result = !isNaN(+event); // true if its a number, false if not
    if (event == "") {
      this.setState({
        message: '',
        txValidAmount: false
      })
    } else if (result == false) {
      this.setState({
        message: 'Not a valid number',
        txValidAmount: false
      })
    } else if (this.countDecimals(event) > 18) {
      this.setState({
        message: 'Input decimal more than 18.',
        txValidAmount: false
      })
    } else if (event <= 0) {
      this.setState({
        message: 'Value need to be greater than 0',
        txValidAmount: false
      })
    } else if (bigInt(window.web3Ava.utils.toWei(event, 'ether')).value > bigInt(this.props.lpBalanceAccount[this.props.n][this.props.i]).value) {
      this.setState({
        message: 'Value more than Wallet.',
        txValidAmount: false
      })
    } else {
      this.setState({
        message: '',
        txValidAmount: true
      })
    }
  }

  changeHandlerLp(event) {
    let result = !isNaN(+event); // true if its a number, false if not
    if (event == "") {
      this.setState({
        txApprovedValidAmount: false
      })
    } else if (result == false) {
      this.setState({
        txApprovedValidAmount: false
      })
    } else if (this.countDecimals(event) > 18) {
      this.setState({
        txApprovedValidAmount: false
      })
    } else {
      this.setState({
        txApprovedValidAmount: true
      })
    }
  }

  countDecimals(x) {
    if (Math.floor(x.valueOf()) === x.valueOf()) return 0;

    var str = x.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
      return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
      return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
  }

  render() {
    return (
      <div id="content">
        <div className="text-center">
        </div>
        <form className="mb-1" onSubmit={(event) => {
          event.preventDefault()
          if (this.state.txValidAmount === false) {
            alert("Invalid input! PLease check your input again")
          } else {
            let amount
            amount = this.input.value.toString()
            amount = window.web3Ava.utils.toWei(amount, 'Ether')

            this.props.deposit(this.props.i, amount, this.props.n, this.props.v)
          }

        }}>
          <div>
            <div className="input-group mb-2">
              {(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ?
                <input
                  type="number"
                  id="inputColor"
                  step="any"
                  ref={(input) => { this.input = input }}
                  style={{ fontSize: '18px', backgroundColor: '#fffcf0' }}
                  className="form-control cell cardbody"
                  placeholder="0"
                  onKeyPress={(event) => {
                    if (!/[0-9.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    this.changeHandler(value)
                    this.changeHandlerLp(value)
                  }}
                  required />
                : <input
                  type="number"
                  id="inputColor"
                  style={{ fontSize: '18px', backgroundColor: '#fffcf0', cursor: 'not-allowed' }}
                  placeholder="0"
                  className="form-control cell cardbody"
                  disabled />}
              <div className="input-group-append" >
                <div className="input-group-text cardbodyLeft" style={{ padding: '0 0.5rem' }}>
                  <Button className="textTransparentButton2" size="sm" onClick={(event1) => {
                    this.state.txValidAmount = true
                    // this.setState({ message: "" })
                    this.input.value = window.web3Ava.utils.fromWei(this.props.lpBalanceAccount[this.props.n][this.props.i], 'Ether')
                    this.changeHandler(this.input.value)
                    this.changeHandlerLp(this.input.value)
                  }}>Max</Button>
                </div>
                <div className="input-group-text cardbody" style={{ padding: '0 0.5rem' }}>
                  {this.props.poolSegmentInfo[this.props.n][this.props.i].platform == 'Pangolin' ?
                    <ImgNextGen srcWebp={pangolin} height='30' className="" alt="" />
                    : <div>{this.props.poolSegmentInfo[this.props.n][this.props.i].platform == 'KyberSwap' ? <ImgNextGen srcWebp={kyber} height='30' className="" alt="" />
                      : <ImgNextGen srcWebp={joe} height='30' className="" alt="" />}</div>}
                </div>
              </div >
            </div >
            <div style={{ color: 'red' }}>{this.state.message} </div>

            <div className="mt-3">
              <MediaQuery minWidth={651} className="rowC">
                <div className="float-left" style={{ color: 'grey' }}>
                  <ImgNextGen
                    srcWebp={baklava}
                    style={{ marginRight: '5px' }} height='20' alt=""
                  />
                  <small>Automatically harvest BAVA rewards when deposit</small></div>
                <div style={{ minWidth: '150px' }}>
                  <div className="float-right" >
                    {this.state.txValidAmount === true ?
                      <div>{bigInt(this.props.lpSegmentAllowanceV2_3).value >= bigInt(window.web3Ava.utils.toWei(this.input.value, 'Ether')).value ?
                        <Button type="submit" className="btn btn-primary btn-sm" style={{ height: '32px', fontSize: '15px' }}>Confirm</Button>
                        : <Button className="textDarkMedium1 btn-sm" variant="outline" style={{ height: '32px', fontSize: '15px' }}>Confirm</Button>}</div>
                      : <Button className="textDarkMedium1 btn-sm" variant="outline" style={{ height: '32px', fontSize: '15px' }}>Confirm</Button>}
                  </div>
                  <div className="float-right mr-1">
                    {this.state.txApprovedValidAmount === true ?
                      <div>{bigInt(this.props.lpSegmentAllowanceV2_3).value < bigInt(window.web3Ava.utils.toWei(this.input.value, 'Ether')).value ? <Button className="btn btn-primary btn-sm" style={{ height: '32px', fontSize: '15px' }} onClick={(event) => {
                        this.props.approve(this.props.i, this.props.n, this.props.v)
                      }}>Approve</Button>
                        : <Button className="textDarkMedium1 btn-sm" style={{ height: '32px', fontSize: '15px' }} variant="outline">Approved</Button>}</div>
                      : <Button className="textDarkMedium1 btn-sm" style={{ height: '32px', fontSize: '15px' }} variant="outline">Approved</Button>}
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={650}>
                <div className="float-left mr-1">{this.state.txApprovedValidAmount === true ?
                  <div>{bigInt(this.props.lpSegmentAllowanceV2_3).value < bigInt(window.web3Ava.utils.toWei(this.input.value, 'Ether')).value ?
                    <Button className="btn btn-primary btn-sm" style={{ height: '32px', fontSize: '15px' }} onClick={(event) => {
                      this.props.approve(this.props.i, this.props.n, this.props.v)
                    }}>Approve</Button>
                    : <Button className="textDarkMedium1 btn-sm" style={{ height: '32px', fontSize: '15px' }} variant="outline">Approved</Button>}</div>
                  : <Button className="textDarkMedium1 btn-sm" style={{ height: '32px', fontSize: '15px' }} variant="outline">Approved</Button>}
                </div>
                <div className="left mr-1" >{this.state.txValidAmount === true ?
                  <div>{bigInt(this.props.lpSegmentAllowanceV2_3).value > bigInt(window.web3Ava.utils.toWei(this.input.value, 'Ether')).value ?
                    <Button type="submit" className="btn btn-primary btn-sm" style={{ height: '32px', fontSize: '15px' }}>Confirm</Button> : <Button className="textDarkMedium1 btn-sm" variant="outline" style={{ height: '32px', fontSize: '15px' }}>Confirm</Button>} </div>
                  : <Button className="textDarkMedium1 btn-sm" variant="outline" style={{ height: '32px', fontSize: '15px' }}>Confirm</Button>}</div>
                <div className="left mt-2" style={{ color: 'grey' }}>
                  <ImgNextGen
                    srcWebp={baklava}
                    style={{ marginRight: '5px' }} height='20' alt=""
                  /><small>Automatically harvest BAVA rewards when deposit</small></div>
              </MediaQuery>
            </div>
          </div>
        </form>
      </div>

    );
  }
}

export default Deposit;

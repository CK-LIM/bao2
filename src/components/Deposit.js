import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import asterisk from '../asterisk.png'
import baklava from '../baklava.png';
import pangolin from '../pangolin.png';
import joe from '../joe.png'
import bigInt from 'big-integer'
import './App.css';


class Deposit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.state = {
      txValidAmount: false
    }
    this.state = {
      txDeposit: false
    }
    this.state = {
      txWithdraw: false
    }
    this.clickHandlerDeposit = this.clickHandlerDeposit.bind(this)
    this.clickHandlerWithdraw = this.clickHandlerWithdraw.bind(this)
  }

  changeHandler(event) {
    let result = !isNaN(+event); // true if its a number, false if not
    if (event == "") {
      this.setState({
        message: ''
      })
      this.setState({
        txValidAmount: false
      })
    } else if (result == false) {
      this.setState({
        message: 'Not a valid number'
      })
      this.setState({
        txValidAmount: false
      })
      // console.log(this.state.txValid)
    } else if (event <= 0) {
      this.setState({
        message: 'Value need to be greater than 0'
      })
      this.setState({
        txValidAmount: false
      })
    } 
    // else if (bigInt(window.web3.utils.toWei(event, 'ether')).value > bigInt(this.props.lpTokenBalanceAccount[this.props.n][this.props.i]).value) {
    //   this.setState({
    //     message: 'Not enough Balance'
    //   })
    //   this.setState({
    //     txValidAmount: false
    //   })
    // } 
    else {
      this.setState({
        message: ''
      })
      this.setState({
        txValidAmount: true
      })
    }
  }

  clickHandlerDeposit() {
    // console.log("clicked")
    this.setState({
      txDeposit: true,
      txWithdraw: false
    })
  }

  clickHandlerWithdraw() {
    // console.log("clicked")
    this.setState({
      txDeposit: false,
      txWithdraw: true
    })
  }

  render() {
    return (
      <div id="content" className="mt-3">
        <div className="text-center">
          <br />
          {/* <ButtonGroup>
            <Button variant="contained" color="default" component={Link} to="/menu/">Pangolin</Button>
            <Button variant="outlined" color="default" component={Link} to="/oneinch/">Trader Joe</Button>
          </ButtonGroup> */}
        </div>
        <br /><br />

        <h2 className="center text"><b>{this.props.lpTokenSegmentAsymbol[this.props.n][this.props.i]}-{this.props.lpTokenSegmentBsymbol[this.props.n][this.props.i]} Farm</b></h2>
        <br />
        <div className="center" style={{ color: 'silver' }}>&nbsp;Deposit <b>&nbsp;{this.props.lpTokenSegmentAsymbol[this.props.n][this.props.i]}-{this.props.lpTokenSegmentBsymbol[this.props.n][this.props.i]} LP Token&nbsp;</b> and earn BAVA!!!</div>
        <div className="center" style={{ color: 'silver' }}>&nbsp;APR :  {this.props.apr[0][this.props.i]} %</div>
        <br />

        <div className="card mb-4 cardbody" >
          <div className="card-body">


            <button
              type="submit"
              className="btn btn-success btn-sm float-right"
              style={{ maxWidth: '70px' }}
              onClick={(event) => {
                event.preventDefault()
                if (this.props.pendingReward <= 0) {
                  alert("No token to harvest! Please deposit LP to earn BAVA")
                } else {
                  this.props.withdraw(this.props.i, 0)
                }
              }}>
              <small>Harvest</small>
            </button>

            <table className="table table-borderless text-muted text-center">
              <thead>
                <tr style={{ color: 'silver' }}>
                  <th scope="col">{this.props.lpTokenSegmentAsymbol[this.props.n][this.props.i]}-{this.props.lpTokenSegmentBsymbol[this.props.n][this.props.i]} LP Staked</th>
                  <th scope="col">BAVA Earned</th>
                </tr>
                <tr>
                  <th scope="col"><img src={pangolin} height='30' alt="" /></th>
                  <th scope="col"><img src={baklava} height='35' alt="" /></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ color: 'silver' }}>
                  <td>{window.web3.utils.fromWei(this.props.userSegmentInfo[this.props.n][this.props.i].amount.toString(), 'Ether')}</td>
                  <td>{this.props.pendingSegmentReward[this.props.n][this.props.i]}</td>
                </tr>
              </tbody>
            </table>

            <div className="card mb-4 cardbody" >
              <div className="card-body ">
                {this.props.wallet ?

                  <form className="mb-3" onSubmit={(event) => {
                    event.preventDefault()
                    if (this.state.txValidAmount === false) {
                      alert("Invalid input! PLease check your input again")
                    } else {
                      let amount
                      amount = this.input.value.toString()
                      amount = window.web3.utils.toWei(amount, 'Ether')
                      console.log(this.state.txDeposit)
                      console.log(this.state.txWithdraw)

                      if (this.state.txDeposit === true && this.state.txWithdraw === false) {
                        if (bigInt(amount).value > bigInt(this.props.lpTokenBalanceAccount[this.props.n][this.props.i]).value) {
                          alert("Not enough funds")                          
                        } else {
                          this.props.deposit(this.props.i, amount, this.props.n)
                        }
                      } else if (this.state.txDeposit === false && this.state.txWithdraw === true) {
                        if (bigInt(amount).value > this.props.userSegmentInfo[this.props.n][this.props.i].amount) {
                          alert("Withdraw tokens more than deposit LP tokens")   
                        } else {
                          this.props.withdraw(this.props.i, amount)
                        }
                      }
                    }



                  }}>
                    <div>
                      <label className="float-left" style={{ color: 'silver' }}><b>Deposit</b></label>
                      <span className="float-right" style={{ color: 'silver' }}>
                        <span>
                          LP Balance &nbsp;&nbsp;&nbsp;&nbsp;: {window.web3.utils.fromWei(this.props.lpTokenBalanceAccount[this.props.n][this.props.i], 'Ether')}</span>
                        <span><br />
                          BAVA Balance&nbsp;: {window.web3.utils.fromWei(this.props.bavaTokenBalance, 'Ether')}
                        </span>
                      </span>
                    </div>
                    <br /><br /><br />

                    {this.props.lpTokenSegmentAllowance[this.props.n][this.props.i] > 100000000000000000000000000000 ?
                      <div>

                        <div className="input-group mb-4">
                          <input
                            type="text"
                            ref={(input) => { this.input = input }}
                            className="form-control form-control-lg cardbody"
                            placeholder="0"
                            onChange={(e) => {
                              const value = e.target.value;
                              // console.log(value)
                              this.changeHandler(value)
                            }}
                            required />
                          <div className="input-group-append">
                            <div className="input-group-text cardbody" style={{ color: 'silver' }}>

                              <img src={pangolin} height='25' alt="" />

                              &nbsp;&nbsp;&nbsp; LP
                            </div>
                          </div>
                        </div >
                        <div style={{ color: 'red' }}>{this.state.message} </div>

                        <div className="rowC center">
                          <button type="submit" className="btn btn-primary btn-lg" onClick={(event) => {
                            console.log("clicked deposit...")
                            this.clickHandlerDeposit()
                          }}> Deposit </button>&nbsp;&nbsp;&nbsp;
                          <button type="submit" className="btn btn-primary btn-lg" onClick={(event) => {
                            console.log("clicked withdraw...")
                            this.clickHandlerWithdraw()
                          }}>Withdraw</button>
                        </div>
                      </div>
                      :
                      <div className="rowC center">
                        <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={(event) => {
                          console.log("clicked withdraw...")
                          this.props.approve(this.props.i, this.props.n)
                        }}>Approve</button>
                      </div>
                    }
                  </form>
                  :
                  <div className="rowC center">
                    <button type="submit" className="btn btn-primary btn-lg" onClick={async () => {
                      console.log("clicked withdraw...")
                      await this.props.connectWallet()
                    }}>Connect Wallet</button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>





        <div className="text-center" style={{ color: 'silver' }}><img src={asterisk} height='15' alt=""/>&nbsp;<small>Every time you stake and unstake LP tokens, the contract will automatically harvest BAVA rewards for you!</small></div>
      </div>

    );
  }
}

export default Deposit;

import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import MediaQuery from 'react-responsive';
import bigInt from 'big-integer'
import Buttons from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './App.css';
import Footer from './Footer'
import ImgNextGen from './ImgNextGen';
import logo from './images/logo.webp';
import coin98 from './images/coin98.webp';
import fox from './images/metamask-fox.svg';
import walletconnectlogo from './images/walletconnect-logo.svg';

class Stake extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            txValidAmount: false,
            stakeOpen: false,
            unstakeOpen: false,
            txApprovedValidAmount: false,
            inputstate: 0
        }
        this.changeHandlerDeposit = this.changeHandlerDeposit.bind(this)
        this.changeHandlerWithdraw = this.changeHandlerWithdraw.bind(this)
        this.changeHandlerApprove = this.changeHandlerApprove.bind(this)
    }

    changeHandlerDeposit(event) {
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
        } else if (bigInt(window.web3Ava.utils.toWei(event, 'ether')).value > bigInt(this.props.bavaTokenBalance).value) {
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

    changeHandlerWithdraw(event) {
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
        } else if (bigInt(window.web3Ava.utils.toWei(event, 'ether')).value > bigInt(this.props.stakeAmount).value) {
            this.setState({
                message: 'Withdraw tokens more than deposit tokens',
                txValidAmount: false
            })
        } else {
            this.setState({
                message: '',
                txValidAmount: true
            })
        }
    }

    changeHandlerApprove(event) {
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

    setStake() {
        if (this.state.stakeOpen == true) {
            this.setState({
                unstakeOpen: false,
                stakeOpen: false,
                inputstate: 0
            })
        } else {
            if (this.state.inputstate != 0) {
                this.input.value = ''
            }
            this.setState({
                unstakeOpen: false,
                stakeOpen: true,
                message: '',
                txValidAmount: false,
                txApprovedValidAmount: false,
                inputstate: 0
            })

        }
    }

    setUnstake() {
        if (this.state.unstakeOpen == true) {
            this.setState({
                unstakeOpen: false,
                stakeOpen: false,
                inputstate: 0
            })
        } else {
            if (this.state.inputstate != 0) {
                this.input.value = ''
            }
            this.setState({
                unstakeOpen: true,
                stakeOpen: false,
                message: '',
                txValidAmount: false,
                txApprovedValidAmount: false,
                inputstate: 0
            })
        }
    }

    render() {
        const contentStyle = { background: '#fffae6', border: "1px solid #596169", width: "30%", borderRadius: "15px", minWidth: "320px" };
        return (
            <div id="content" style={{ margin: "0", color: '#ff9a04' }}>
                <label className="textWhite center mb-3" style={{ fontSize: '40px', color: 'black' }}><big><b>BAVA Staking</b></big></label>
                <div className="center mb-4" style={{ color: 'grey' }}>Deposit and stake your BAVA tokens to maximize your yield. No Impermanent Loss.</div>
                <MediaQuery minWidth={701}>
                    <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '120px', color: 'black' }}>
                        <div className="card-body">
                            <div className="center">
                                <ImgNextGen
                                    srcWebp={logo}
                                    style={{ marginLeft: '70px', marginRight: '50px' }} width="50" height="50" alt=""
                                />
                                <table style={{ width: "900px" }}>
                                    <thead className="textBlackSmall" style={{ color: 'black' }}>
                                        <tr>
                                            <th scope="col" width="120">BAVA Balance</th>
                                            <th scope="col" width="120">Staked BAVA</th>
                                            <th scope="col" width="120">Unclaimed Reward</th>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                        <tr>
                                            <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                            <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                            <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '120px', color: 'black' }}>
                        <div className="card-body ">
                            <div className="center ">
                                <ImgNextGen
                                    srcWebp={logo}
                                    style={{ marginLeft: '70px', marginRight: '50px' }} width="50" height="50" alt=""
                                />
                                <table style={{ width: "900px" }}>
                                    <thead className="textBlackSmall" style={{ color: 'black' }}>
                                        <tr>
                                            <th scope="col" width="120">Total BAVA Staked</th>
                                            <th scope="col" width="120">APR</th>
                                            <th scope="col" width="120">Your Pool</th>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                        <tr>
                                            <td scope="col" width="120"><div className='mt-2'><div>{parseFloat(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div></div></td>
                                            <td scope="col" width="120"><div className='mt-2'><div>{parseFloat(this.props.rewardRate / this.props.totalStake * 31556926 * 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div></div></td>
                                            <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(this.props.stakeAmount / this.props.totalStake * 100).toLocaleString('en-US', { maximumFractionDigits: 5 })}%</div>
                                                : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </MediaQuery>

                <MediaQuery maxWidth={700}>
                    <MediaQuery minWidth={601}>
                        <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '120px', color: 'black' }}>
                            <div className="card-body">
                                <div className="center">
                                    <table style={{ width: "900px" }}>
                                        <thead className="textBlackSmall" style={{ color: 'black' }}>
                                            <tr>
                                                <th scope="col" width="120">BAVA Balance</th>
                                                <th scope="col" width="120">Staked BAVA</th>
                                                <th scope="col" width="120">Unclaimed Reward</th>
                                            </tr>
                                        </thead>
                                        <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                            <tr>
                                                <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                    : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                    : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                    : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '120px', color: 'black' }}>
                            <div className="card-body ">
                                <div className="center ">
                                    <table style={{ width: "900px" }}>
                                        <thead className="textBlackSmall" style={{ color: 'black' }}>
                                            <tr>
                                                <th scope="col" width="120">Total BAVA Staked</th>
                                                <th scope="col" width="120">APR</th>
                                                <th scope="col" width="120">Your Pool</th>
                                            </tr>
                                        </thead>
                                        <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                            <tr>
                                                <td scope="col" width="120"><div className='mt-2'><div>{parseFloat(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div></div></td>
                                                <td scope="col" width="120"><div className='mt-2'><div>{parseFloat(this.props.rewardRate / this.props.totalStake * 31556926 * 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div></div></td>
                                                <td scope="col" width="120"><div className='mt-2'>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(this.props.stakeAmount / this.props.totalStake * 100).toLocaleString('en-US', { maximumFractionDigits: 5 })}%</div>
                                                    : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </MediaQuery>
                    <MediaQuery maxWidth={600}>
                        <MediaQuery minWidth={451}>
                            <div className='rowC'>
                                <span className="ml-auto card cardbody" style={{ marginBottom: '12px', marginRight: '5px', color: 'black' }}>
                                    <div className="card-body">
                                        <div className="center">
                                            <table style={{ width: "900px" }}>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120" >BAVA Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120" height='52px'><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                                <thead className="textBlackSmall" style={{ padding: '10px', color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120" >Staked BAVA</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120" height='52px'><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                                <thead className="textBlackSmall mt-2" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120" >Unclaimed Reward</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120" height='52px'><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </span>
                                <span className="mr-auto card cardbody" style={{ marginBottom: '12px', marginLeft: '5px', color: 'black' }}>
                                    <div className="card-body ">
                                        <div className="center ">
                                            <table style={{ width: "900px" }}>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120" >Total BAVA Staked</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120" height='52px'><div>{parseFloat(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div></td>
                                                    </tr>
                                                </tbody>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120" >APR</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120" height='52px'><div>{parseFloat(this.props.rewardRate / this.props.totalStake * 31556926 * 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div></td>
                                                    </tr>
                                                </tbody>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120" >Your Pool%</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120" height='52px'><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(this.props.stakeAmount / this.props.totalStake * 100).toLocaleString('en-US', { maximumFractionDigits: 5 })}%</div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </MediaQuery>
                        <MediaQuery maxWidth={450}>
                            <div>
                                <span className="ml-auto card cardbody" style={{ marginBottom: '12px', marginRight: '5px', color: 'black' }}>
                                    <div className="card-body" style={{ padding: '10px' }}>
                                        <div className="center">
                                            <table style={{ width: "900px" }}>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120">BAVA Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120"><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120">Staked BAVA</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120"><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                                <thead className="textBlackSmall mt-2" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120">Unclaimed Reward</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120"><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 3 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.earnedAmount, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </span>
                                <span className="mr-auto card cardbody" style={{ marginBottom: '12px', marginLeft: '5px', color: 'black' }}>
                                    <div className="card-body" style={{ padding: '10px' }}>
                                        <div className="center ">
                                            <table style={{ width: "900px" }}>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120">Total BAVA Staked</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120"><div>{parseFloat(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.totalStake, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div></td>
                                                    </tr>
                                                </tbody>

                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120">APR</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120"><div>{parseFloat(this.props.rewardRate / this.props.totalStake * 31556926 * 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div></td>
                                                    </tr>
                                                </tbody>
                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <th scope="col" width="120">Your Pool%</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'black' }}>
                                                    <tr>
                                                        <td scope="col" width="120"><div>{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(this.props.stakeAmount / this.props.totalStake * 100).toLocaleString('en-US', { maximumFractionDigits: 5 })}% </div>
                                                            : <div className=""><div className="lds-facebook mb-2"><div></div><div></div><div></div></div></div>}</div></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </MediaQuery>
                    </MediaQuery>
                </MediaQuery>


                <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', color: 'black' }}>
                    <div className="card-body ">
                        {this.props.wallet || this.props.walletConnect ?
                            <div className="card-body" style={{ padding: '10px' }}>
                                <div className="center">
                                    {this.props.accountLoading ?
                                        <div>
                                            {this.state.stakeOpen ?
                                                <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ cursor: 'pointer', width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} onClick={async () => {
                                                    await this.setStake(true)
                                                }}>Stake</Buttons> : <Buttons className="textDarkMedium cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} onClick={async () => {
                                                    await this.setStake(true)
                                                }}>Stake</Buttons>}
                                            {this.state.unstakeOpen ?
                                                <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ cursor: 'pointer', width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} onClick={async () => {
                                                    await this.setUnstake(true)
                                                }}>Unstake</Buttons> : <Buttons className="textDarkMedium cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} onClick={async () => {
                                                    await this.setUnstake(true)
                                                }}>Unstake</Buttons>}
                                            <Buttons className="textDarkMedium cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} onClick={async () => {
                                                if (this.props.earnedAmount > 0) {
                                                    await this.props.getReward()
                                                } else {
                                                    alert("No unclaimed reward")
                                                }
                                            }}>Claim Reward</Buttons>
                                            <Buttons className="textDarkMedium cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} onClick={async () => {
                                                if (this.props.stakeAmount > 0) {
                                                    await this.props.exit()
                                                } else {
                                                    alert("No staked BAVA token")
                                                }
                                            }}>Claim & Unstake</Buttons>
                                        </div> :
                                        <div>
                                            <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} >Stake</Buttons>
                                            <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} >Unstake</Buttons>
                                            <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} >Claim Reward</Buttons>
                                            <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ width: '160px', margin: '5px', marginLeft: '25px', marginRight: '25px' }} >Claim & Unstake</Buttons>
                                        </div>}
                                </div>
                            </div> :
                            <div className="card-body">
                                <div className="center">
                                    {this.props.farmloading ?
                                        <div>
                                            <Popup trigger={open => (<Buttons className="textDarkMedium" variant="outline" size="lg" >Connect to display</Buttons>)} modal {...{ contentStyle }}>
                                                {close => (
                                                    <div>
                                                        <Buttons className="close cell2" style={{ background: "#fffae6", borderRadius: "12px", padding: "2px 5px", fontSize: "18px" }} onClick={close}>
                                                            &times;
                                                        </Buttons>
                                                        <div className="textWhiteMedium mb-2" style={{ borderBottom: "1px Solid Gray", padding: "10px" }}> Connect a Wallet </div>
                                                        <div className="center mt-4 mb-2">
                                                            <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                                                                await this.props.connectMetamask()
                                                            }}><img src={fox} width="23" height="23" className="float-right" alt="" /><span className="float-left">Metamask</span></Buttons>
                                                        </div>
                                                        <div className="center mt-2 mb-2">
                                                            <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                                                                await this.props.connectCoin98()
                                                            }}>
                                                                <ImgNextGen
                                                                    srcWebp={coin98}
                                                                    width="23" height="23" className="float-right" alt=""
                                                                />
                                                                <span className="float-left">Coin98</span></Buttons>
                                                        </div>
                                                        <div className="center mt-2 mb-4">
                                                            <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                                                                await this.props.mobileWalletConnect()
                                                            }}><img src={walletconnectlogo} width="26" height="23" className="float-right" alt="" /><span className="float-left">WalletConnect</span></Buttons>
                                                        </div>
                                                    </div>
                                                )}
                                            </Popup>
                                        </div>
                                        : <Buttons className="textDarkMedium1" variant="outline" size="lg" >Connect to display</Buttons>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* ******************************************************* PopUp deposit and withdraw menu ******************************************************* */}

                {(this.props.wallet || this.props.walletConnect) && (this.state.stakeOpen || this.state.unstakeOpen) ?
                    <div className="">
                        <span className="ml-auto mr-auto card cardbody">
                            <div className="card-body" style={{ padding: '0.5rem' }}>
                                <div>
                                    {this.state.stakeOpen ?
                                        <div className="float-right mr-2 mt-1 mb-2" style={{ color: 'black', fontSize: '16px' }}>Available to stake: {parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })}</div>
                                        :
                                        <div className="float-right mr-2 mt-1 mb-2" style={{ color: 'black', fontSize: '16px' }}>Available to unstake: {parseFloat(window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })}</div>
                                    }
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        if (this.state.txValidAmount === false) {
                                            alert("Invalid input! PLease check your input again")
                                        } else {
                                            let amount
                                            amount = this.input.value.toString()
                                            amount = window.web3Ava.utils.toWei(amount, 'Ether')

                                            if (this.state.stakeOpen === true && this.state.unstakeOpen === false) {
                                                this.props.stake(amount)
                                            } else if (this.state.stakeOpen === false && this.state.unstakeOpen === true) {
                                                this.props.unstake(amount)
                                            }
                                        }
                                    }}>
                                        <div >
                                            <div className="input-group mb-3">
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
                                                            if (this.state.stakeOpen === true) {
                                                                this.changeHandlerApprove(value)
                                                                this.changeHandlerDeposit(value)
                                                            } else if (this.state.unstakeOpen === true) {
                                                                this.changeHandlerApprove(value)
                                                                this.changeHandlerWithdraw(value)
                                                            }
                                                            this.state.inputstate = value
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
                                                        {this.state.stakeOpen ?
                                                            <Buttons className="textTransparentButton2 cell" size="sm" onClick={(event1) => {
                                                                this.input.value = window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')
                                                                this.changeHandlerApprove(this.input.value)
                                                                this.changeHandlerDeposit(this.input.value)
                                                            }}>Max</Buttons> :
                                                            <Buttons className="textTransparentButton2 cell" size="sm" onClick={(event1) => {
                                                                this.input.value = window.web3Ava.utils.fromWei(this.props.stakeAmount, 'Ether')
                                                                this.changeHandlerWithdraw(this.input.value)
                                                            }}>Max</Buttons>
                                                        }
                                                    </div>
                                                    <div className="input-group-text cardbody" style={{ padding: '0 0.5rem' }}>
                                                        <ImgNextGen
                                                            srcWebp={logo}
                                                            height='32' alt=""
                                                        />
                                                    </div>
                                                </div >
                                            </div>
                                            <div className="ml-2" style={{ color: 'red' }}>{this.state.message} </div>

                                            <div className="center">
                                                {this.state.stakeOpen ?
                                                    <div>
                                                        <span>
                                                            {this.state.txApprovedValidAmount === true ?
                                                                <span>
                                                                    {bigInt(this.props.bavaTokenAllowance).value < bigInt(window.web3Ava.utils.toWei(this.input.value, 'Ether')).value ?
                                                                        <Buttons className="textDarkMedium cell" style={{ width: '120px', margin: '5px' }} onClick={(event) => {
                                                                            this.props.approveStake()
                                                                        }} variant="outline" size="lg">Approve</Buttons>
                                                                        : <Buttons className="textDarkMedium1 cell" style={{ width: '120px', margin: '5px' }} variant="outline" size="lg">Approved</Buttons>
                                                                    }
                                                                </span>
                                                                : <Buttons className="textDarkMedium1 cell" style={{ width: '120px', margin: '5px' }} variant="outline" size="lg">Approved</Buttons>
                                                            }
                                                        </span>
                                                        <span>
                                                            {this.state.txValidAmount ?
                                                                <span>{bigInt(this.props.bavaTokenAllowance).value >= bigInt(window.web3Ava.utils.toWei(this.input.value, 'Ether')).value ?
                                                                    <Buttons type="submit" className="textDarkMedium cell" variant="outline" size="lg" style={{ width: '120px', margin: '5px' }}>Confirm</Buttons>
                                                                    : <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ width: '120px', margin: '5px' }}>Confirm</Buttons>}</span>
                                                                : <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ width: '120px', margin: '5px' }}>Confirm</Buttons>}
                                                        </span>
                                                    </div>
                                                    : <div>
                                                        {this.state.txValidAmount ?
                                                            <Buttons type="submit" className="textDarkMedium cell" variant="outline" size="lg" style={{ width: '120px' }}>Confirm</Buttons>
                                                            : <Buttons className="textDarkMedium1 cell" variant="outline" size="lg" style={{ width: '120px' }}>Confirm</Buttons>}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </span>
                    </div> :
                    <div></div>}
                <br /><br /><br /><br /><br /><Footer />
            </div >
        );
    }
}

export default Stake;

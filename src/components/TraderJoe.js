import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from '@material-ui/core/Button';
import exlink from '../link.png'
import Buttons from 'react-bootstrap/Button'
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Deposit from './Deposit'
import './App.css';


class Menu extends Component {

    render() {
        return (
            <div id="content" className="mt-3" style={{ margin: "0", color: '#ff9a04' }}>
                <div className=" center ">
                    <div className="ml-auto mr-auto card mb-3 cardbody" style={{ width: '1000px', height: '150px', color: 'black' }}>
                        {this.props.wallet || this.props.walletConnect ?
                            <div className="card-body ">
                                <span>
                                    <span className="float-left" style={{ color: 'black' }}>
                                        Your BAVA Balance<br /><b>{window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')}</b>
                                        <div>
                                        </div>
                                    </span>
                                    <span className="float-right" style={{ color: 'black' }}>
                                        Your Locked BAVA<br /><b>{parseFloat(window.web3Ava.utils.fromWei(this.props.lockedBavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })}</b>
                                    </span>
                                    <br /><br /><br />
                                </span>
                                <span>
                                    <small>
                                        <span className="float-left ">Total pending harvest&nbsp;&nbsp;
                                            <Popup
                                                trigger={open => (
                                                    <span><BsFillQuestionCircleFill size={13} /></span>
                                                )}
                                                on="hover"
                                                offsetY={-10}
                                                offsetX={10}
                                                position="right center"
                                            ><span className="textInfo"><small>Total BAVA tokens earned acrossed all farm </small></span>
                                            </Popup>
                                        </span><br />
                                        <span className="float-left "><b>
                                            {parseFloat(window.web3Ava.utils.fromWei(this.props.totalpendingReward, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 5 })}&nbsp;BAVA</b>
                                        </span>
                                        <span className="float-right ">
                                            <span>All pools compound at an optimal rate</span>
                                        </span>
                                    </small>
                                </span>
                            </div>
                            :
                            <div className="card-body ">
                                <span>
                                    <span className="float-left" style={{ color: 'black' }}>
                                        Your BAVA Balance<br />
                                        <div style={{ color: 'black' }}><big><b>Locked</b></big></div>
                                    </span>
                                    <span className="float-right" style={{ color: 'black' }}>
                                        Your Locked BAVA<br />
                                        <div style={{ color: 'black' }}><big><b>Locked</b></big></div>
                                    </span>
                                    <br /><br /><br />
                                </span>
                                <span>
                                    <small>
                                        <span className="float-left ">Total pending harvest&nbsp;&nbsp;
                                            <Popup
                                                trigger={open => (
                                                    <span><BsFillQuestionCircleFill size={13} /></span>
                                                )}
                                                on="hover"
                                                offsetY={-10}
                                                offsetX={10}
                                                position="right center"
                                            ><span className="textInfo"><small>Total BAVA tokens earned acrossed all farm </small></span>
                                            </Popup>
                                        </span></small><br />
                                    <span className="float-left ">
                                        <div style={{ color: 'black' }}><big><b>Locked</b></big></div>
                                    </span>
                                    <span className="float-right ">
                                        <small><span>All pools autocompound at an optimal rate</span></small>
                                    </span>
                                </span>
                            </div>
                        }
                    </div>
                </div>

                <div className="textMiddle center" ><b><big>BAVA Price: $ {this.props.BAVAPrice}&nbsp;&nbsp;
                    <Popup
                        trigger={open => (
                            <span><BsFillQuestionCircleFill size={13} /></span>
                        )}
                        on="hover"
                        offsetY={-10}
                        offsetX={10}
                        position="right center"
                    ><span className="textInfo"><small>Initial BAVA token price to USD will be fixed at the rate $ 0.10 </small></span>
                    </Popup></big></b></div>

                <div className="center" style={{ color: 'grey' }}><small>&nbsp;! Attention:&nbsp;Be sure to read <a href="https://baklavaspace.gitbook.io/" target="_blank">baklavaspace.gitbook</a> before using the pools so you are familiar with protocol risks and fees!</small></div>
                <br />
                <div className="ml-auto mr-auto" style={{ width: '1000px' }}>
                    <div className="">
                        <p className="textMiddleBold1" style={{ marginLeft: '2px' }}><big>Select Platform</big></p>
                        <span className="float-left">

                            <ButtonGroup>
                                {/* <Button variant="text" size="small" color="inherit" component={Link} to="/traderjoe/">All</Button> */}
                                <Button variant="text" size="small" color="inherit" component={Link} to="/menu/">Pangolin</Button>
                                <Button variant="outlined" size="small" color="inherit" component={Link} to="/traderjoe/">Trader Joe</Button>
                            </ButtonGroup>
                        </span>
                        <span className="float-right mr-4">
                            <ButtonGroup>
                                <Button variant="text" size="small" color="inherit" >Sort by</Button>
                            </ButtonGroup>
                        </span>
                    </div>
                    <br /><br />

                    <div>
                        {this.props.farmloading ?
                            <div className="" style={{ width: '1000px' }}>
                                {this.props.poolSegmentInfo[1].map((poolSegmentInfo, key) => {
                                    let i = this.props.poolSegmentInfo[1].indexOf(poolSegmentInfo)
                                    return (
                                        <div key={key}>
                                            {this.props.poolSegmentInfo[1][i].lpName == "AVAX-JOE" ? <div></div> :
                                                <div>
                                                    <div className="card mb-3 cardbody">
                                                        <div className="card-body" style={{ padding: '1rem' }}>
                                                            <div>
                                                                <div>
                                                                    <div className="float-left">
                                                                        <div className="textMiddle"><b>{this.props.poolSegmentInfo[1][i].lpName}</b></div>
                                                                        <div className="textWhiteGrey exLink0" onClick={() => {
                                                                            window.open(this.props.poolSegmentInfo[1][i].projectLink, '_blank')
                                                                        }}>Uses: {this.props.poolSegmentInfo[1][i].platform} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                        <div className="textWhiteGrey exLink0" onClick={() => {
                                                                            window.open(this.props.poolSegmentInfo[1][i].getLPLink, '_blank')
                                                                        }}>Get {this.props.poolSegmentInfo[1][i].lpName} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                        <div className="textWhiteGrey exLink0" onClick={() => {
                                                                            window.open(this.props.bavaContract, '_blank')
                                                                        }}>View On Explorer <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                    </div>
                                                                    <div className="float-right mr-auto">
                                                                        <table>
                                                                            <thead className="textWhiteMedium" style={{ color: 'black' }}>
                                                                                <tr>
                                                                                    <th scope="col" width="150">Wallet</th>
                                                                                    <th scope="col" width="150">Deposited</th>
                                                                                    <th scope="col">APR &nbsp;<Popup
                                                                                        trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                        on="hover"
                                                                                        offsetY={-10}
                                                                                        offsetX={10}
                                                                                        position="right center"
                                                                                    ><span className="textInfo"><small>APR are affected by the price of BAVA which has not yet stabilized. </small></span>
                                                                                        {/* <span className="textInfo"><small>If it shows 'NaN' or 'Infinity', it means currently the pool has no LP token staked. </small></span> */}
                                                                                    </Popup></th>
                                                                                    <th scope="col">APY</th>
                                                                                    <th scope="col">TVL</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="textWhiteMedium" style={{ color: 'grey' }}>
                                                                                <tr>
                                                                                    <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(this.props.lpTokenBalanceAccount[1][i]).toLocaleString('en-US', { maximumFractionDigits: 3 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                    <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(this.props.userSegmentInfo[1][i]).toLocaleString('en-US', { maximumFractionDigits: 3 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.apr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.apyDaily[1][i]).toExponential(3)}%</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                    <td className="">${parseFloat(this.props.tvl[1][i]).toLocaleString('en-US', { maximumFractionDigits: 10 })} </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <br /><br /><br /><br />
                                                                {this.props.farmOpen[1][i] ?
                                                                    <div>
                                                                        <div>
                                                                            <Buttons variant="outline-secondary" size="sm" style={{ width: '60px' }} onClick={() => {
                                                                                // this.props.setTrigger(true)
                                                                                this.props.setI(1, i, false)
                                                                            }}>Close</Buttons>&nbsp;&nbsp;&nbsp;</div>
                                                                        {this.props.wallet || this.props.walletConnect ? <div className="borderTop "><br /><div className="rowC">
                                                                            <div className="card cardbody float-left mr-3" style={{ width: '300px' }}>
                                                                                <div className="card-body" style={{ padding: '0.5rem' }}>
                                                                                    <span className="float-left" style={{ color: 'black' }}><small>BAVA earned</small></span><br />
                                                                                    <span className="float-left" style={{ color: 'black', marginTop: '8px' }}><small>{this.props.accountLoading ? <div>{parseFloat(this.props.pendingSegmentReward[1][i]).toFixed(3)}</div> :
                                                                                        <div className="ml-3 lds-facebook"><div></div><div></div><div></div></div>}</small></span>
                                                                                    <span className="float-right">
                                                                                        <Buttons
                                                                                            variant="success"
                                                                                            size="sm"
                                                                                            style={{ minWidth: '80px' }}
                                                                                            onClick={(event) => {
                                                                                                event.preventDefault()
                                                                                                this.props.harvest(i, "1")
                                                                                            }}>
                                                                                            Harvest
                                                                                        </Buttons></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="float-right">
                                                                                <span className="card cardbody float-right" style={{ width: '650px' }}>
                                                                                    <div className="card-body" style={{ padding: '0.5rem' }}>
                                                                                        {this.props.lpTokenSegmentAllowance[1][i] > 2000000000000000000000000000 ?
                                                                                            <div><Deposit
                                                                                                lpTokenBalanceAccount={this.props.lpTokenBalanceAccount}
                                                                                                poolSegmentInfo={this.props.poolSegmentInfo}
                                                                                                userSegmentInfo={this.props.userSegmentInfo}
                                                                                                i={i}
                                                                                                n='1'
                                                                                                deposit={this.props.deposit}
                                                                                                withdraw={this.props.withdraw}
                                                                                                approve={this.props.approve}
                                                                                            /></div>
                                                                                            :
                                                                                            <div>
                                                                                                <span className="float-left " style={{ color: 'black' }}><small>Enable Pool</small></span>
                                                                                                <Buttons className="btn-block"
                                                                                                    variant="outline-primary"
                                                                                                    size="sm"
                                                                                                    style={{ minWidth: '80px' }}
                                                                                                    onClick={(event) => {
                                                                                                        event.preventDefault()
                                                                                                        this.props.approve(i, '1')
                                                                                                    }}>
                                                                                                    Approve
                                                                                                </Buttons>
                                                                                            </div>}
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        </div> :
                                                                            <div className="center borderTop" >
                                                                                <br /><br />
                                                                                <span style={{ color: 'black' }}><small>Wallet Connection to Avalanche required</small></span>
                                                                            </div>}
                                                                    </div> :
                                                                    <div>
                                                                        <Buttons variant="outline-secondary" size="sm" style={{ width: '60px' }} onClick={() => {
                                                                            // this.props.setTrigger(true)
                                                                            this.props.setI(1, i, true)
                                                                        }}><b>Open</b></Buttons>&nbsp;&nbsp;&nbsp;</div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className="center">
                                <div className="bounceball"></div> &nbsp;
                                <div className="textLoadingSmall">NETWORK IS Loading...</div>
                            </div>
                        }
                    </div>
                </div><br /><br /><br /><br /><br />
            </div >
        );
    }
}

export default Menu;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from '@material-ui/core/Button';
import baklava from '../baklava.png';
import Buttons from 'react-bootstrap/Button'

import './App.css';


class Menu extends Component {

    render() {
        return (
            <div id="content" className="mt-5" style={{ Width: '100%', margin: "0", color: '#ff9a04' }}>
                <div className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
                    <div className="text-center">
                        <ButtonGroup>
                            <Button variant="outlined" color="inherit" component={Link} to="/menu/">Pangolin</Button>
                            <Button variant="text" color="inherit" component={Link} to="/traderjoe/">Trader Joe</Button>
                        </ButtonGroup>
                    </div>
                    <br />
                    <div className="text-center">
                        <img src={baklava} width="130" height="130" className="" alt="" />
                    </div>
                    <h1 className="center">
                        <b>Master Chef</b></h1>
                    <div className="center" style={{ color: 'silver' }}>&nbsp;Stake <b>&nbsp;LP Tokens&nbsp;</b> to earn AVAX and BAVA!!!</div>
                    <br />

                    <div className="rowC center ">
                        <div className="card mb-4 cardbody" style={{ minWidth: '350px', color: 'silver' }} >
                            <div className="card-body ">
                                <span>
                                    <span className="float-left" style={{ color: 'silver' }}>
                                        Your BAVA Balance<br /><b>{window.web3.utils.fromWei(this.props.bavaTokenBalance, 'Ether')}</b>
                                        <div>
                                        </div>
                                    </span><br /><br /><br />
                                </span>
                                <span>
                                    <small>
                                        <span className="float-left ">Pending harvest</span>
                                        <span className="float-right ">
                                            <span>
                                                {window.web3.utils.fromWei(this.props.totalpendingReward, 'Ether')}&nbsp;BAVA
                                            </span>
                                        </span>
                                    </small>
                                </span>
                            </div>
                        </div> &nbsp;&nbsp;&nbsp;

                        <div className="card mb-4 cardbody" >
                            <div className="card-body " style={{ minWidth: '350px', color: 'silver' }}>
                                <span>
                                    <span className="float-left ">
                                        Total BAVA Supply<br /><b>{window.web3.utils.fromWei(this.props.bavaTokenTotalSupply, 'Ether')}</b>
                                        <div>
                                        </div>
                                    </span><br /><br /><br />
                                    <span>
                                        <small>
                                            <span className="float-left ">Total Reward/block</span>
                                            <span className="float-right">
                                                <span>
                                                    {window.web3.utils.fromWei(this.props.totalrewardperblock, 'Ether')}&nbsp;BAVA
                                                </span>
                                            </span>
                                        </small>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="text center" ><b><big>BAVA Price: $ {this.props.BAVAPrice}</big></b></div>

                    <br />
                    <div className="center" style={{ color: 'silver' }}><b><big>Select Your Favourite farm entrees!</big></b></div>
                    <div className="center" style={{ color: 'silver' }}><small>&nbsp;! Attention:&nbsp;Be sure to read <a href="https://baklavaspace.gitbook.io/" target="_blank">baklavaspace.gitbook</a> before using the pools so you are familiar with protocol risks and fees!</small></div>
                    <br />


                    {/* ################################################################################################### */}
                    {/* <div className="rowC center">

                    <div className="card mb-4" style={{ maxWidth: '250px' }}>
                        <div className="card-body text-center">
                            <span>
                                <span className="text">
                                    <img src={purse} height='30' alt="" /><br /><br />
                                    <b>PURSE-USDC</b>
                                    <div>
                                        <span className=" text-muted"><small>Deposit<small className="textSmall">PURSE-USDC PANCAKE LP</small> to Earn PURSE</small></span><br /><br />
                                        <span className=" text-muted"><small>APY:  {(28000 * 365 * this.props.poolInfo[0].pursePerBlock / this.props.lpTokenInContract[0]) * 100} % </small></span><br />
                                        <span className=" text-muted"><small>LP Staked: {window.web3.utils.fromWei(this.props.userInfo[0].amount, 'Ether')}</small></span><br />
                                        <span className=" text-muted"><small>TVL: </small></span>
                                        <br /><br />
                                        <Button variant="outlined" color="default" component={Link} to="/menu/PURSE-USDC">Select</Button>
                                    </div>
                                </span>
                            </span>
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;

                    <div className="card mb-4" style={{ maxWidth: '250px' }}>
                        <div className="card-body text-center">
                            <span>
                                <span className="text">
                                    <img src={purse} height='30' alt="" /><br /><br />
                                    <b>PURSE-BNB</b>
                                    <div>
                                        <span className=" text-muted"><small>Deposit<small className="textSmall">PURSE-BNB PANCAKE LP</small> to Earn PURSE</small></span><br /><br />
                                        <span className=" text-muted"><small>APY:  {(28000 * 365 * this.props.poolInfo[1].pursePerBlock / this.props.lpTokenInContract[1]) * 100} % </small></span><br />
                                        <span className=" text-muted"><small>LP Staked: {window.web3.utils.fromWei(this.props.userInfo[1].amount, 'Ether')}</small></span><br />
                                        <span className=" text-muted"><small>TVL: </small></span>
                                        <br /><br />
                                        <Button variant="outlined" color="default" component={Link} to="/menu/PURSE-BNB">Select</Button>
                                    </div>
                                </span>
                            </span>
                        </div>
                    </div>
                </div> */}


                    {/* <div className="center" style={{ color: 'grey' }}><b><big>Dynamic added farm in progress...</big></b></div><br/> */}

                    {this.props.farmloading ?
                        <div className="row floated" >
                            {this.props.poolSegmentInfo[0].map((poolSegmentInfo, key) => {
                                let i = this.props.poolSegmentInfo[0].indexOf(poolSegmentInfo)
                                return (
                                    <div key={key}>
                                        <div className="col">
                                            <div className="card mb-4 cardbody card-body text-center" style={{ minWidth: '230px', maxWidth: '230px' }}>
                                                <span className="text">
                                                    <img src={baklava} height='45' alt="" /><br />
                                                    <b>{this.props.lpTokenSegmentAsymbol[0][i]}-{this.props.lpTokenSegmentBsymbol[0][i]}</b>
                                                    <div>
                                                        <span className=" " style={{ color: 'silver' }}><small>Deposit<br /><small className="textSmall">{this.props.lpTokenSegmentAsymbol[0][i]}-{this.props.lpTokenSegmentBsymbol[0][i]} Pangolin LP</small><br />to earn.</small></span><br /><br />
                                                        <span className="" style={{ color: 'silver' }}> {this.props.aprloading ? <small> <div>APR: {this.props.apr[0][i]} %</div></small> : <div className="center rowC">
                                                            <div><small>APR:</small></div>
                                                            <div className="lds-facebook"><div></div><div></div><div></div></div>
                                                        </div>} </span>
                                                        <span className=" " style={{ color: 'silver' }}><small>LP Staked: {window.web3.utils.fromWei(this.props.userSegmentInfo[0][i].amount, 'Ether')}</small></span><br />
                                                        <span className=" " style={{ color: 'silver' }}><small>TVL: $ {this.props.tvl[0][i]}</small></span>
                                                        <br /><br />
                                                        {/* <Button variant="outlined" color="default" component={Link} onClick={(event) => { this.props.setI(0, i) }} to="/deposit">Select</Button> */}
                                                        <Buttons variant="outline-warning" onClick={() => {
                                                            this.props.setTrigger(true)
                                                            this.props.setI(0, i)
                                                        }}>Select</Buttons>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
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

                {/* <nav className="bottombar navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow" >

                    <a
                        className="navbar-brand col-sm-3 col-md-2 mr-0"
                        href="https://www.pundix.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Baklava</a>

                    <span>
                        <ul className="navbar-nav px-20">
                            <li className="nav-item text-nowrap-small d-none d-sm-none d-sm-block">
                                <div className="text-light rowC" >
                                    <div>
                                        <a
                                            className="navbar-brand col-sm-3 col-md-2 mr-0"
                                            href="https://twitter.com/baklavaspace"
                                            target="_blank"
                                            rel="noopener noreferrer"                                           
                                        > <small>Twitter</small>
                                        </a>
                                    </div>&nbsp;
                                    <div>
                                        <a
                                            className="navbar-brand col-sm-3 col-md-2 mr-0"
                                            href="https://medium.com/@baklavaspace"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        > <small>Medium</small>
                                        </a>
                                    </div>&nbsp;
                                    <div>
                                        <a
                                            className="navbar-brand col-sm-3 col-md-2 mr-0"
                                            href="https://github.com/baklavaspace"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        > <small>Github</small>
                                        </a>
                                    </div>&nbsp;
                                    <div>
                                        <a
                                            className="navbar-brand col-sm-3 col-md-2 mr-0"
                                            href="https://discord.gg/tNCV9wR7yZ"
                                            target="_blank"
                                            rel="noopener noreferrer"                                            
                                        > <small>Discord</small>
                                        </a>
                                    </div>&nbsp;
                                    <div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </span >
                </nav > */}







            </div >
        );
    }
}

export default Menu;

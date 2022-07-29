import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Buttons from 'react-bootstrap/Button'
import MediaQuery from 'react-responsive';
import ImgNextGen from './ImgNextGen';
import Popup from 'reactjs-popup';
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Footer from './Footer'
import 'reactjs-popup/dist/index.css';
import './App.css';

import exlink from './images/link.webp';
import coin98 from './images/coin98.webp';
import fox from './images/metamask-fox.svg';
import walletconnectlogo from './images/walletconnect-logo.svg';

import bava from './images/logo.webp';
import savax from './images/sAvax.webp';
import qi from './images/qi.webp';
import ust from './images/ust.webp';
import png from './images/pangolin.webp';
import avax from './images/avax.svg';
import usdc from './images/usdc.svg';
import usdt from './images/usdt.svg';
import weth from './images/weth.svg';


class TraderJoe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            farmV1_joeOpen: [],
            depositAction: [],
            withdrawAction: []
        }
        this.clickfarmOpen = this.clickfarmOpen.bind(this)
        this.setAction = this.setAction.bind(this)
    }

    clickfarmOpen(i) {
        let ntg = 0
        this.state.farmV1_joeOpen[i] = !(this.state.farmV1_joeOpen[i])
        this.state.depositAction[i] = true
        this.state.withdrawAction[i] = false
        this.setState({ ntg })  //do ntg, just to push react setstate
    }

    setAction(i, page) {
        let ntg = 0
        if (page == 0) {
            this.state.depositAction[i] = true
            this.state.withdrawAction[i] = false
        } else {
            this.state.depositAction[i] = false
            this.state.withdrawAction[i] = true
        }
        this.setState({ ntg })
    }

    render() {
        const contentStyle = { background: '#fffae6', border: "1px solid #596169", width: "30%", borderRadius: "15px", minWidth: "320px" };
        return (
            <div id="content" className="" style={{ margin: "0", color: '#ff9a04' }}>
                <MediaQuery minWidth={601}>
                    <div className="ml-auto mr-auto card mb-3 cardbody" style={{ color: 'black' }}>
                        {this.props.wallet || this.props.walletConnect ?
                            <div className="card-body" style={{ paddingBottom: '5px' }}>
                                <div className='mb-5'>
                                    <span className="float-left" style={{ color: 'black', fontSize: '16px' }}>
                                        Your BAVA Balance<br /><b>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                                    </span>
                                    <span className="float-right" style={{ color: 'black', fontSize: '16px' }}>
                                        Your Locked BAVA<br /><b>{parseFloat(window.web3Ava.utils.fromWei(this.props.lockedBavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.lockedBavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                                    </span>
                                </div><br /><br />
                                <div>
                                    <span className="float-left" style={{ color: 'black', fontSize: '16px' }}>Total pending harvest&nbsp;&nbsp;
                                        <Popup
                                            trigger={open => (
                                                <span><BsFillQuestionCircleFill size={13} /></span>
                                            )}
                                            on="hover"
                                            offsetY={0}
                                            offsetX={5}
                                            position="right center"
                                        ><span className="textInfo"><small>Total BAVA tokens earned acrossed all farm </small></span>
                                        </Popup>
                                    </span><br />
                                    <span className="float-left " style={{ color: 'black', fontSize: '16px' }}><b>
                                        {parseFloat(window.web3Ava.utils.fromWei(this.props.totalpendingReward, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.totalpendingReward, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                                    </span>
                                    <span className="float-right ">
                                        <span><small>All pools compound at an optimal rate</small></span>
                                    </span>
                                </div>
                            </div>
                            :
                            <div className="card-body" style={{ paddingBottom: '5px' }}>
                                <span>
                                    <span className="float-left" style={{ color: 'silver' }}>
                                        Your BAVA Balance<br />
                                        <div style={{ color: 'silver' }}><b>0 BAVA</b></div>
                                    </span>
                                    <span className="float-right" style={{ color: 'silver' }}>
                                        Your Locked BAVA<br />
                                        <div style={{ color: 'silver' }}><b>0 BAVA</b></div>
                                    </span>
                                    <br /><br />
                                </span>
                                <span className="center mb-1">
                                    {this.props.farmloading ?
                                        <div>
                                            <Popup trigger={open => (<Buttons className="textDarkMedium cell2" variant="outline" size="lg" >Connect to display</Buttons>)} modal {...{ contentStyle }}>
                                                {close => (
                                                    <div>
                                                        <Buttons className="close cell2" style={{ background: "#fffae6", borderRadius: "12px", padding: "2px 5px", fontSize: "18px" }} onClick={close}>
                                                            &times;
                                                        </Buttons>
                                                        <div className="textWhiteMedium mb-2" style={{ borderBottom: "1px Solid Gray", padding: "10px" }}> Connect a Wallet </div>
                                                        <div className="center mt-4 mb-2">
                                                            <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                                                                await this.props.connectMetamask()
                                                            }}>
                                                                <img src={fox} width="23" height="23" className="float-right" alt="" />
                                                                <span className="float-left">Metamask</span></Buttons>
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
                                        : <Buttons className="textDarkMedium1 cell2" variant="outline" size="lg" >Connect to display</Buttons>
                                    }
                                </span>
                                <span>
                                    <span className="float-left" style={{ color: 'silver' }}>Total pending harvest&nbsp;
                                        <Popup
                                            trigger={open => (
                                                <span><BsFillQuestionCircleFill size={13} /></span>
                                            )}
                                            on="hover"
                                            offsetY={0}
                                            offsetX={5}
                                            position="right center"
                                        ><span className="textInfo"><small>Total BAVA tokens earned acrossed all farm </small></span>
                                        </Popup>
                                    </span><br />
                                    <span className="float-left">
                                        <div style={{ color: 'silver' }}><b>0 BAVA</b></div>
                                    </span>
                                    <span className="float-right" style={{ color: 'silver' }}>
                                        <small><span>All pools compound at an optimal rate</span></small>
                                    </span>
                                </span>
                            </div>
                        }
                    </div>
                </MediaQuery>

                <MediaQuery maxWidth={600}>
                    <div className="ml-auto mr-auto card mb-3 cardbody" style={{ color: 'black' }}>
                        {this.props.wallet || this.props.walletConnect ?
                            <div className="card-body" style={{ paddingBottom: '5px' }}>
                                <div>
                                    <div className="left mb-3" style={{ color: 'black', fontSize: '16px' }}>
                                        Your BAVA Balance<br /><b>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.bavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                                    </div>
                                    <div className="left mb-3" style={{ color: 'black', fontSize: '16px' }}>
                                        Your Locked BAVA<br /><b>{parseFloat(window.web3Ava.utils.fromWei(this.props.lockedBavaTokenBalance, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.lockedBavaTokenBalance, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                                    </div>
                                    <div className="left mb-2" style={{ color: 'black', fontSize: '16px' }}>Total pending harvest&nbsp;
                                        <Popup
                                            trigger={open => (
                                                <span><BsFillQuestionCircleFill size={13} /></span>
                                            )}
                                            on="hover"
                                            offsetY={0}
                                            offsetX={5}
                                            position="right center"
                                        ><span className="textInfo"><small>Total BAVA tokens earned acrossed all farm </small></span>
                                        </Popup><br /><b>{parseFloat(window.web3Ava.utils.fromWei(this.props.totalpendingReward, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA / $ {(window.web3Ava.utils.fromWei(this.props.totalpendingReward, 'Ether') * this.props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}</b>
                                    </div>
                                    <div className="left ">
                                        <span><small>All pools compound at an optimal rate</small></span>
                                    </div>
                                </div>
                            </div>
                            : <div className="card-body" style={{ paddingBottom: '5px' }}>
                                <div>
                                    <div className="left mb-3" style={{ color: 'silver' }}>
                                        Your BAVA Balance<br />
                                        <div style={{ color: 'silver' }}><b>0 BAVA</b></div>
                                        {/* <div className="float-right">
                                            {this.props.farmloading ?
                                                <div>
                                                    <Popup trigger={open => (<Buttons className="textDarkMedium cell2" style={{ maxWidth: '110px', height: '90px', marginRight: '15px' }} variant="outline" size="lg" >Connect to display</Buttons>)} modal {...{ contentStyle }}>
                                                        {close => (
                                                            <div>
                                                                <Buttons className="close cell2" style={{ background: "#fffae6", borderRadius: "12px", padding: "2px 5px", fontSize: "18px" }} onClick={close}>
                                                                    &times;
                                                                </Buttons>
                                                                <div className="textWhiteMedium mb-2" style={{ borderBottom: "1px Solid Gray", padding: "10px" }}> Connect a Wallet </div>
                                                                <div className="center mt-4 mb-2">
                                                                    <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                                                                        await this.props.connectMetamask()
                                                                    }}>
                                                                        <img src={fox} width="23" height="23" className="float-right" alt="" />
                                                                        <span className="float-left">Metamask</span></Buttons>
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
                                                : <Buttons className="textDarkMedium1 cell2" style={{ maxWidth: '110px', height: '90px', marginRight: '15px' }} variant="outline" size="lg" >Connect to display</Buttons>
                                            }
                                        </div> */}
                                    </div>
                                    <div className="left mb-3" style={{ color: 'silver' }}>
                                        Your Locked BAVA<br />
                                        <div style={{ color: 'silver' }}><b>0 BAVA</b></div>
                                    </div>
                                    <div className="left mb-2" style={{ color: 'silver' }}>Total pending harvest&nbsp;&nbsp;
                                        <Popup
                                            trigger={open => (
                                                <span><BsFillQuestionCircleFill size={13} /></span>
                                            )}
                                            on="hover"
                                            offsetY={0}
                                            offsetX={5}
                                            position="right center"
                                        ><span className="textInfo"><small>Total BAVA tokens earned acrossed all farm </small></span>
                                        </Popup><br /><div style={{ color: 'silver' }}><b>0 BAVA</b></div>
                                    </div>
                                    <span className="left " style={{ color: 'silver' }}>
                                        <small><span>All pools compound at an optimal rate</span></small>
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={400}>
                    <div className="center" style={{ marginBottom: '5px' }}>
                        <div>
                            <ImgNextGen
                                style={{ marginRight: '5px' }} srcWebp={bava} width="25" height="25" alt=""
                            /></div>
                        <div className="textbavaPriceBold" style={{ fontSize: '20px' }} onClick={() => {
                            window.open(`https://kyberswap.com/swap/avalanche/avax-to-bava`, '_blank')
                        }}><b>${this.props.BAVAPrice}</b></div>
                    </div>
                </MediaQuery>

                <div className="center" style={{ color: 'grey' }}><small>&nbsp;! Attention:&nbsp;Be sure to read <a href="https://baklavaspace.gitbook.io/" target="_blank">baklavaspace.gitbook</a> before using the pools so you are familiar with protocol risks and fees!</small></div>
                <div className="ml-auto mr-auto mt-3">
                     <MediaQuery minWidth={501}>
                        <div className="mb-4">
                            <div className="float-right">
                                <div className="textMiddleBold1 right" style={{ marginRight: '5px' }}><big>TVL</big></div>
                                <div className="textMiddleBold1 float-right" style={{ marginTop: '3px', marginRight: '5px' }}>$ {parseFloat(this.props.totalTVL).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                            </div>
                            <div className="textMiddleBold1 left" style={{ marginLeft: '2px', marginBottom: '5px' }}><big>Select Platform</big></div>
                            <div className="left">
                                <Buttons style={{ color: "#ff9a04" }} variant="link" size="sm" as={Link} to="/menu/v2">PANGOLIN</Buttons>
                                <Buttons style={{ color: "#ff9a04" }} variant="link" size="sm" as={Link} to="/menu/v2/kyber">KYBERSWAP</Buttons>
                                <Buttons style={{ color: "#ff9a04", border: "1px solid #ff9a04" }} variant="link" size="sm" as={Link} to="/menu/v2/traderjoe">TRADER JOE</Buttons>
                            </div>
                        </div>
                    </MediaQuery>
                    <MediaQuery maxWidth={500}>
                        <div className="mb-4">
                            <div className="left mb-1">
                                <div className="textMiddleBold1 left"><big>TVL</big></div>
                                <div className="textMiddleBold1 left">$ {parseFloat(this.props.totalTVL).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                            </div>
                            <div className="textMiddleBold1 left" style={{ marginLeft: '2px', marginBottom: '5px' }}><big>Select Platform</big></div>
                            <div className="left">
                                <MediaQuery minWidth={401}>
                                    <Buttons style={{ color: "#ff9a04" }} variant="link" size="sm" as={Link} to="/menu/v2">PANGOLIN</Buttons>
                                    <Buttons style={{ color: "#ff9a04" }} variant="link" size="sm" as={Link} to="/menu/v2/kyber">KYBERSWAP</Buttons>
                                    <Buttons style={{ color: "#ff9a04", border: "1px solid #ff9a04" }} variant="link" size="sm" as={Link} to="/menu/v2/traderjoe">TRADER JOE</Buttons>
                                </MediaQuery>
                                <MediaQuery maxWidth={400}>
                                    <Buttons style={{ color: "#ff9a04", fontSize: "0.8rem" }} variant="link" size="sm" as={Link} to="/menu/v2">PANGOLIN</Buttons>
                                    <Buttons style={{ color: "#ff9a04", fontSize: "0.8rem" }} variant="link" size="sm" as={Link} to="/menu/v2/kyber">KYBERSWAP</Buttons>
                                    <Buttons style={{ color: "#ff9a04", fontSize: "0.8rem", border: "1px solid #ff9a04" }} variant="link" size="sm" as={Link} to="/menu/v2/traderjoe">TRADER JOE</Buttons>
                                </MediaQuery>
                            </div>
                        </div>
                    </MediaQuery>






                    <div>
                        {this.props.farmloading ?
                            <div className="" style={{}}>
                                {this.props.bavaPoolSegmentInfo[1].map((bavaPoolSegmentInfo, key) => {
                                    let i = this.props.bavaPoolSegmentInfo[1].indexOf(bavaPoolSegmentInfo)
                                    return (
                                        <div key={key}>
                                            <div>
                                                <div className="card mb-3 cardbody">
                                                    <div className="card-body" style={{ padding: '1rem' }}>
                                                        <div className="card cardbody" style={{ border: '0px' }}>
                                                            <MediaQuery minWidth={1001}>
                                                                <div className='card-body rowC' style={{ padding: '0rem', cursor: 'pointer' }} onClick={() => {
                                                                    this.clickfarmOpen(i)
                                                                }}>
                                                                    <div className="float-left rowC" style={{ minWidth: '220px' }}>
                                                                        <span className="mr-3 mt-2">
                                                                            <div className="textMiddle" style={{ width: '48px' }}>
                                                                                {this.props.bavaPoolSegmentInfo[1][i].icon.map((icon, key) => {
                                                                                    return (<div key={key}>
                                                                                        {icon.image == "bava" && <img className={icon.imagePosition} src={bava} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "avax" && <img className={icon.imagePosition} src={avax} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "usdc" && <img className={icon.imagePosition} src={usdc} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "usdt" && <img className={icon.imagePosition} src={usdt} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "ust" && <img className={icon.imagePosition} src={ust} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "qi" && <img className={icon.imagePosition} src={qi} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "savax" && <img className={icon.imagePosition} src={savax} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "png" && <img className={icon.imagePosition} src={png} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "weth" && <img className={icon.imagePosition} src={weth} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                    </div>)
                                                                                })}
                                                                            </div>
                                                                        </span>
                                                                        <span>
                                                                            <div className="textMiddle"><b>{this.props.bavaPoolSegmentInfo[1][i].lpName}{this.props.bavaPoolSegmentInfo[1][i].status}</b></div>
                                                                            <div className="textGrey exLink0" onClick={() => {
                                                                                window.open(this.props.bavaPoolSegmentInfo[1][i].projectLink, '_blank')
                                                                            }}>Uses: {this.props.bavaPoolSegmentInfo[1][i].platform} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                            <div className="textGrey exLink0" onClick={() => {
                                                                                window.open(this.props.bavaPoolSegmentInfo[1][i].getLPLink, '_blank')
                                                                            }}>Get {this.props.bavaPoolSegmentInfo[1][i].lpName} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                            <div className="textGrey exLink0" onClick={() => {
                                                                                window.open(this.props.bavaContract, '_blank')
                                                                            }}>View On Explorer <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                        </span>
                                                                    </div>
                                                                    <div className="float-right mr-auto">
                                                                        <table>
                                                                            <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                <tr>
                                                                                    <th scope="col" width="140">Wallet</th>
                                                                                    <th scope="col" width="140">Deposited</th>
                                                                                    <th scope="col">Growth</th>
                                                                                    <th scope="col">APR&nbsp;<Popup
                                                                                        trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                        on="hover"
                                                                                        offsetY={0}
                                                                                        offsetX={5}
                                                                                        position="right center"
                                                                                        contentStyle={{ width: '150px' }}
                                                                                    ><div className="textInfo">APR Breakdown: </div><br />
                                                                                        <div className="textInfo">Baklava   : {parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div><br />
                                                                                        <div className="textInfo">TraderJoe : {parseFloat(this.props.bavaPoolSegmentInfo[1][i].total3rdPartyAPR).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div>
                                                                                    </Popup></th>
                                                                                    <th scope="col">APY <Popup
                                                                                        trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                        on="hover"
                                                                                        offsetY={0}
                                                                                        offsetX={5}
                                                                                        position="right center"
                                                                                        contentStyle={{ width: '150px' }}
                                                                                    ><div className="textInfo"><small>APY are calculated based on the compound APR number excluded locked reward.</small></div><br />
                                                                                        <div className="textInfo"><small>The value shown is based on daily compounding frequency.</small></div>
                                                                                    </Popup></th>
                                                                                    <th scope="col">TVL</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="textGrey">
                                                                                <tr>
                                                                                    <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaLpBalanceAccount[1][i]), 'Ether').toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                    <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaUserSegmentInfo[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaReturnRatio[1][i]).toLocaleString('en-US', { maximumFractionDigits: 5 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapyDaily[1][i]) > 1000000 ? <div>&#x3e;100,000%</div> : <div>{parseFloat(this.props.bavaapyDaily[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div>}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                    <td className="">$ {parseFloat(this.props.bavatvl[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </MediaQuery>
                                                            <MediaQuery maxWidth={1000}>
                                                                <div className='card-body' style={{ padding: '0rem', cursor: 'pointer' }} onClick={() => {
                                                                    this.clickfarmOpen(i)
                                                                }}>
                                                                    <div className="float-left rowC mb-3" style={{ minWidth: '220px' }}>
                                                                        <span className="mr-3 mt-2">
                                                                            <div className="textMiddle" style={{ width: '48px' }}>
                                                                                {this.props.bavaPoolSegmentInfo[1][i].icon.map((icon, key) => {
                                                                                    return (<div key={key}>
                                                                                        {icon.image == "bava" && <img className={icon.imagePosition} src={bava} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "avax" && <img className={icon.imagePosition} src={avax} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "usdc" && <img className={icon.imagePosition} src={usdc} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "usdt" && <img className={icon.imagePosition} src={usdt} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "ust" && <img className={icon.imagePosition} src={ust} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "qi" && <img className={icon.imagePosition} src={qi} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "savax" && <img className={icon.imagePosition} src={savax} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "png" && <img className={icon.imagePosition} src={png} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                        {icon.image == "weth" && <img className={icon.imagePosition} src={weth} width={icon.imageSize} height={icon.imageSize} alt="" />}
                                                                                    </div>)
                                                                                })}
                                                                            </div>
                                                                        </span>
                                                                        <span>
                                                                            <div className="textMiddle"><b>{this.props.bavaPoolSegmentInfo[1][i].lpName}{this.props.bavaPoolSegmentInfo[1][i].status}</b></div>
                                                                            <div className="textGrey exLink0" onClick={() => {
                                                                                window.open(this.props.bavaPoolSegmentInfo[1][i].projectLink, '_blank')
                                                                            }}>Uses: {this.props.bavaPoolSegmentInfo[1][i].platform} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                            <div className="textGrey exLink0" onClick={() => {
                                                                                window.open(this.props.bavaPoolSegmentInfo[1][i].getLPLink, '_blank')
                                                                            }}>Get {this.props.bavaPoolSegmentInfo[1][i].lpName} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                            <div className="textGrey exLink0" onClick={() => {
                                                                                window.open(this.props.bavaContract, '_blank')
                                                                            }}>View On Explorer <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                        </span>
                                                                    </div>
                                                                    <MediaQuery minWidth={701}>
                                                                        <div>
                                                                            <table className="float-right mr-auto">
                                                                                <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                    <tr>
                                                                                        <th scope="col" width="140">Wallet</th>
                                                                                        <th scope="col" width="140">Deposited</th>
                                                                                        <th scope="col">Growth</th>
                                                                                        <th scope="col">APR&nbsp;<Popup
                                                                                            trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                            on="hover"
                                                                                            offsetY={0}
                                                                                            offsetX={5}
                                                                                            position="right center"
                                                                                            contentStyle={{ width: '150px' }}
                                                                                        ><div className="textInfo">APR Breakdown: </div><br />
                                                                                            <div className="textInfo">Baklava   : {parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div><br />
                                                                                            <div className="textInfo">TraderJoe : {parseFloat(this.props.bavaPoolSegmentInfo[1][i].total3rdPartyAPR).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div>
                                                                                        </Popup></th>
                                                                                        <th scope="col">APY <Popup
                                                                                            trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                            on="hover"
                                                                                            offsetY={0}
                                                                                            offsetX={5}
                                                                                            position="right center"
                                                                                            contentStyle={{ width: '150px' }}
                                                                                        ><div className="textInfo"><small>APY are calculated based on the compound APR number excluded locked reward.</small></div><br />
                                                                                            <div className="textInfo"><small>The value shown is based on daily compounding frequency.</small></div>
                                                                                        </Popup></th>
                                                                                        <th scope="col">TVL</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="textGrey">
                                                                                    <tr>
                                                                                        <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaLpBalanceAccount[1][i]), 'Ether').toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                            <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                        <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaUserSegmentInfo[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                            <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                        <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaReturnRatio[1][i]).toLocaleString('en-US', { maximumFractionDigits: 5 })}</div> : <div className="center">
                                                                                            <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                        <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div> : <div className="center">
                                                                                            <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                        <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapyDaily[1][i]) > 1000000 ? <div>&#x3e;100,000%</div> : <div>{parseFloat(this.props.bavaapyDaily[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div>}</div> : <div className="center">
                                                                                            <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                        <td className="">$ {parseFloat(this.props.bavatvl[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </MediaQuery>
                                                                    <MediaQuery maxWidth={700}>
                                                                        <MediaQuery minWidth={551}>
                                                                            <div>
                                                                                <table className="float-right mr-auto">
                                                                                    <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                        <tr>
                                                                                            <th scope="col" width="140">Wallet</th>
                                                                                            <th scope="col" width="140">Deposited</th>
                                                                                            <th scope="col">Growth</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="textGrey">
                                                                                        <tr>
                                                                                            <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaLpBalanceAccount[1][i]), 'Ether').toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                            <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaUserSegmentInfo[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                            <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaReturnRatio[1][i]).toLocaleString('en-US', { maximumFractionDigits: 5 })}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                        <tr>
                                                                                            <th scope="col">APR&nbsp;<Popup
                                                                                                trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                                on="hover"
                                                                                                offsetY={0}
                                                                                                offsetX={5}
                                                                                                position="right center"
                                                                                                contentStyle={{ width: '150px' }}
                                                                                            ><div className="textInfo">APR Breakdown: </div><br />
                                                                                                <div className="textInfo">Baklava   : {parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div><br />
                                                                                                <div className="textInfo">TraderJoe : {parseFloat(this.props.bavaPoolSegmentInfo[1][i].total3rdPartyAPR).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div>
                                                                                            </Popup></th>
                                                                                            <th scope="col">APY <Popup
                                                                                                trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                                on="hover"
                                                                                                offsetY={0}
                                                                                                offsetX={5}
                                                                                                position="right center"
                                                                                                contentStyle={{ width: '150px' }}
                                                                                            ><div className="textInfo"><small>APY are calculated based on the compound APR number excluded locked reward.</small></div><br />
                                                                                                <div className="textInfo"><small>The value shown is based on daily compounding frequency.</small></div>
                                                                                            </Popup></th>
                                                                                            <th scope="col">TVL</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="textGrey">
                                                                                        <tr>
                                                                                            <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                            <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapyDaily[1][i]) > 1000000 ? <div>&#x3e;100,000%</div> : <div>{parseFloat(this.props.bavaapyDaily[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div>}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                            <td className="">$ {parseFloat(this.props.bavatvl[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </MediaQuery>
                                                                        <MediaQuery maxWidth={550}>
                                                                            <div>
                                                                                <table className="float-right mr-auto">
                                                                                    <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                        <tr>
                                                                                            <th scope="col" width="140">Wallet</th>
                                                                                            <th scope="col" width="140">Deposited</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="textGrey">
                                                                                        <tr>
                                                                                            <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaLpBalanceAccount[1][i]), 'Ether').toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                            <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaUserSegmentInfo[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                        <tr>
                                                                                            <th scope="col">Growth</th>
                                                                                            <th scope="col">APR&nbsp;<Popup
                                                                                                trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                                on="hover"
                                                                                                offsetY={0}
                                                                                                offsetX={5}
                                                                                                position="right center"
                                                                                                contentStyle={{ width: '150px' }}
                                                                                            ><div className="textInfo">APR Breakdown: </div><br />
                                                                                                <div className="textInfo">Baklava   : {parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div><br />
                                                                                                <div className="textInfo">TraderJoe : {parseFloat(this.props.bavaPoolSegmentInfo[1][i].total3rdPartyAPR).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div>
                                                                                            </Popup></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="textGrey">
                                                                                        <tr>
                                                                                            <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaLpBalanceAccount[1][i]), 'Ether').toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                            <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                        <tr>
                                                                                            <th scope="col">APY <Popup
                                                                                                trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                                on="hover"
                                                                                                offsetY={0}
                                                                                                offsetX={5}
                                                                                                position="right center"
                                                                                                contentStyle={{ width: '150px' }}
                                                                                            ><div className="textInfo"><small>APY are calculated based on the compound APR number excluded locked reward.</small></div><br />
                                                                                                <div className="textInfo"><small>The value shown is based on daily compounding frequency.</small></div>
                                                                                            </Popup></th>
                                                                                            <th scope="col">TVL</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="textGrey">
                                                                                        <tr>
                                                                                            <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.bavaapyDaily[1][i]) > 1000000 ? <div>&#x3e;100,000%</div> : <div>{parseFloat(this.props.bavaapyDaily[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div>}</div> : <div className="center">
                                                                                                <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                            <td className="">$ {parseFloat(this.props.bavatvl[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </MediaQuery>
                                                                    </MediaQuery>
                                                                </div>
                                                            </MediaQuery>
                                                        </div>

                                                        {this.state.farmV1_joeOpen[i] ?
                                                            <div>
                                                                {this.props.wallet || this.props.walletConnect ?
                                                                    <div className="borderTop ">
                                                                        <div className="mt-3">
                                                                            <MediaQuery minWidth={951}>
                                                                                <div className="float-left">
                                                                                    <div className="card cardbody mr-3" style={{ marginBottom: '6px', width: '300px' }}>
                                                                                        <div className="card-body" style={{ padding: '0.5rem' }}>
                                                                                            <span className="float-left" style={{ color: 'black' }}><small>BAVA earned</small></span><br />
                                                                                            <span className="float-left" style={{ color: 'black', marginTop: '8px' }}><small>{this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaPendingSegmentReward[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div> :
                                                                                                <div className="ml-3 lds-facebook"><div></div><div></div><div></div></div>}</small></span>
                                                                                            <span className="float-right">
                                                                                                <Buttons
                                                                                                    variant="success"
                                                                                                    size="sm"
                                                                                                    style={{ minWidth: '80px' }}
                                                                                                    onClick={(event) => {
                                                                                                        event.preventDefault()
                                                                                                        this.props.harvest(i, 1, 1)
                                                                                                    }}>
                                                                                                    Harvest
                                                                                                </Buttons></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </MediaQuery>
                                                                            <MediaQuery maxWidth={950}>
                                                                                <div>
                                                                                    <div className="card cardbody" style={{ marginBottom: '6px' }}>
                                                                                        <div className="card-body" style={{ padding: '0.5rem' }}>
                                                                                            <span className="float-left" style={{ color: 'black' }}><small>BAVA earned</small></span><br />
                                                                                            <span className="float-left" style={{ color: 'black', marginTop: '8px' }}><small>{this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.bavaPendingSegmentReward[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div> :
                                                                                                <div className="ml-3 lds-facebook"><div></div><div></div><div></div></div>}</small></span>
                                                                                            <span className="float-right">
                                                                                                <Buttons
                                                                                                    variant="success"
                                                                                                    size="sm"
                                                                                                    style={{ minWidth: '80px' }}
                                                                                                    onClick={(event) => {
                                                                                                        event.preventDefault()
                                                                                                        this.props.harvest(i, 1, 1)
                                                                                                    }}>
                                                                                                    Harvest
                                                                                                </Buttons></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </MediaQuery>

                                                                            <div className="card cardbody" style={{ minWidth: '300px' }}>
                                                                                <div className="card-body" style={{ padding: '0.5rem' }}>
                                                                                    <div className='ml-2 mt-2 mb-2'>
                                                                                        {this.state.depositAction[i] == true ?
                                                                                            <div style={{ height: '30px' }}>
                                                                                                <div className='float-left' style={{ paddingTop: '0px' }}>
                                                                                                    <ButtonGroup>
                                                                                                        <div>
                                                                                                            <Buttons className="textTransparentButton center" style={{ textDecoration: 'none', marginRight: '5px' }} variant="link" size="sm" onClick={async () => {
                                                                                                                await this.setAction(i, 0)
                                                                                                            }}><b>Deposit</b></Buttons></div>
                                                                                                        <div>
                                                                                                            <Buttons className="textBlackButton center mr-1" style={{ textDecoration: 'none' }} variant="link" size="sm" onClick={async () => {
                                                                                                                await this.setAction(i, 1)
                                                                                                            }}>Withdraw</Buttons></div>
                                                                                                    </ButtonGroup>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <div style={{ height: '30px' }}>
                                                                                                <div className='float-left' style={{ paddingTop: '0px' }}>
                                                                                                    <ButtonGroup>
                                                                                                        <div>
                                                                                                            <Buttons className="textBlackButton center mr-1" style={{ textDecoration: 'none' }} variant="link" size="sm" onClick={async () => {
                                                                                                                await this.setAction(i, 0)
                                                                                                            }}><b>Deposit</b></Buttons></div>
                                                                                                        <div>
                                                                                                            <Buttons className="textTransparentButton center mr-1" style={{ textDecoration: 'none' }} variant="link" size="sm" onClick={async () => {
                                                                                                                await this.setAction(i, 1)
                                                                                                            }}>Withdraw</Buttons></div>
                                                                                                    </ButtonGroup>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                        {/* {this.props.bavaLpSegmentAllowance[1][i] > 2000000000000000000000000000 ?
                                                                                        <div><Deposit
                                                                                            lpBalanceAccount={this.props.bavaLpBalanceAccount}
                                                                                            poolSegmentInfo={this.props.bavaPoolSegmentInfo}
                                                                                            userSegmentInfo={this.props.bavaUserSegmentInfo}
                                                                                            i={i}
                                                                                            n='1'
                                                                                            v='1'
                                                                                            deposit={this.props.deposit}
                                                                                            withdraw={this.props.withdraw}
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
                                                                                                    this.props.approve(i, 1, 1)
                                                                                                }}>
                                                                                                Approve
                                                                                            </Buttons>
                                                                                        </div>} */}
                                                                                    </div>
                                                                                    <div className='borderBottom'></div>
                                                                                    <div className='ml-1 mr-1'>
                                                                                        {this.state.depositAction[i] == true ?
                                                                                            <div><Deposit
                                                                                                wallet={this.props.wallet}
                                                                                                walletConnect={this.props.walletConnect}
                                                                                                accountLoading={this.props.accountLoading}
                                                                                                // lpBalanceAccount={this.props.lpBalanceAccountV2_3}
                                                                                                // poolSegmentInfo={this.props.poolSegmentInfoV2_3}
                                                                                                // userSegmentInfo={this.props.userSegmentInfoV2_3}
                                                                                                lpSegmentAllowanceV2_3={this.props.bavaLpSegmentAllowance[1][i]}
                                                                                                lpBalanceAccount={this.props.bavaLpBalanceAccount}
                                                                                                poolSegmentInfo={this.props.bavaPoolSegmentInfo}
                                                                                                userSegmentInfo={this.props.bavaUserSegmentInfo}
                                                                                                i={i}
                                                                                                n='1'
                                                                                                v='1'
                                                                                                approve={this.props.approve}
                                                                                                deposit={this.props.deposit}
                                                                                                withdraw={this.props.withdraw}
                                                                                            /></div>
                                                                                            :
                                                                                            <div><Withdraw
                                                                                                wallet={this.props.wallet}
                                                                                                walletConnect={this.props.walletConnect}
                                                                                                accountLoading={this.props.accountLoading}
                                                                                                // lpBalanceAccount={this.props.lpBalanceAccountV2_3}
                                                                                                // poolSegmentInfo={this.props.poolSegmentInfoV2_3}
                                                                                                // userSegmentInfo={this.props.userSegmentInfoV2_3}
                                                                                                lpSegmentAllowanceV2_3={this.props.bavaLpSegmentAllowance[1][i]}
                                                                                                lpBalanceAccount={this.props.bavaLpBalanceAccount}
                                                                                                poolSegmentInfo={this.props.bavaPoolSegmentInfo}
                                                                                                userSegmentInfo={this.props.bavaUserSegmentInfo}
                                                                                                i={i}
                                                                                                n='1'
                                                                                                v='1'
                                                                                                approve={this.props.approve}
                                                                                                deposit={this.props.deposit}
                                                                                                withdraw={this.props.withdraw}
                                                                                            /></div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="center borderTop" >
                                                                        <span className="mt-3" style={{ color: 'black' }}><small>Wallet Connection to Avalanche required</small></span>
                                                                    </div>}
                                                            </div>
                                                            : <div></div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )}




                                {/* {this.props.poolSegmentInfo[1].map((poolSegmentInfo, key) => {
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
                                                                        <div className="textMiddle"><b>{this.props.poolSegmentInfo[1][i].lpName}{this.props.poolSegmentInfo[1][i].status}</b></div>
                                                                        <div className="textGrey exLink0" onClick={() => {
                                                                            window.open(this.props.poolSegmentInfo[1][i].projectLink, '_blank')
                                                                        }}>Uses: {this.props.poolSegmentInfo[1][i].platform} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                        <div className="textGrey exLink0" onClick={() => {
                                                                            window.open(this.props.poolSegmentInfo[1][i].getLPLink, '_blank')
                                                                        }}>Get {this.props.poolSegmentInfo[1][i].lpName} <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                        <div className="textGrey exLink0" onClick={() => {
                                                                            window.open(this.props.bavaContract, '_blank')
                                                                        }}>View On Explorer <img src={exlink} style={{ marginBottom: "3px" }} height='12' alt="" /></div>
                                                                    </div>
                                                                    <div className="float-right mr-auto">
                                                                        <table>
                                                                            <thead className="textBlackSmall" style={{ color: 'black' }}>
                                                                                <tr>
                                                                                    <th scope="col" width="140">Wallet</th>
                                                                                    <th scope="col" width="140">Deposited</th>
                                                                                    <th scope="col">Growth</th>
                                                                                    <th scope="col">APR&nbsp;<Popup
                                                                                        trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                        on="hover"
                                                                                        offsetY={-8}
                                                                                        offsetX={5}
                                                                                        position="right center"
                                                                                        contentStyle={{ width: '150px' }}
                                                                                    ><div className="textInfo">APR Breakdown: </div><br />
                                                                                        <div className="textInfo">Baklava   : {parseFloat(this.props.apr[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div><br />
                                                                                        <div className="textInfo">TraderJoe : {parseFloat(this.props.poolSegmentInfo[1][i].total3rdPartyAPR).toLocaleString('en-US', { maximumFractionDigits: 0 })} %</div>
                                                                                    </Popup></th>
                                                                                    <th scope="col">APY <Popup
                                                                                    trigger={open => (<span><BsFillQuestionCircleFill style={{ marginBottom: "2px" }} size={10} /></span>)}
                                                                                    on="hover"
                                                                                    offsetY={-8}
                                                                                    offsetX={5}
                                                                                    position="right center"
                                                                                    contentStyle={{ width: '150px' }}
                                                                                ><div className="textInfo"><small>APY are calculated based on the compound APR number excluded locked reward.</small></div><br />
                                                                                    <div className="textInfo"><small>The value shown is based on daily compounding frequency.</small></div>
                                                                                </Popup></th>
                                                                                    <th scope="col">TVL</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="textGrey">
                                                                                <tr>
                                                                                    <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.lpBalanceAccount[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                    <td className="">{(this.props.wallet || this.props.walletConnect) && this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.userSegmentInfo[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 18 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.returnRatio[1][i]).toLocaleString('en-US', { maximumFractionDigits: 5 })}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{(parseFloat(this.props.apr[1][i]) + + parseFloat(this.props.poolSegmentInfo[1][i].total3rdPartyAPR)).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>} </td>
                                                                                    <td className="">{this.props.aprloading ? <div>{parseFloat(this.props.apyDaily[1][i])>1000000 ? <div>&#x3e;100,000%</div> : <div>{parseFloat(this.props.apyDaily[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })}%</div>}</div> : <div className="center">
                                                                                        <div className="lds-facebook"><div></div><div></div><div></div></div></div>}</td>
                                                                                    <td className="">$ {parseFloat(this.props.tvl[1][i]).toLocaleString('en-US', { maximumFractionDigits: 0 })} </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <br /><br /><br /><br />
                                                                {this.props.farmV2Open[i] ?
                                                                    <div>
                                                                        <div>
                                                                            <Buttons variant="outline-secondary" size="sm" style={{ width: '60px' }} onClick={() => {
                                                                                // this.props.setTrigger(true)
                                                                                this.props.setI(i, false, 2)
                                                                            }}>Close</Buttons>&nbsp;&nbsp;&nbsp;</div>
                                                                        {this.props.wallet || this.props.walletConnect ? <div className="borderTop "><br /><div className="rowC">
                                                                            <div className="card cardbody float-left mr-3" style={{ width: '300px' }}>
                                                                                <div className="card-body" style={{ padding: '0.5rem' }}>
                                                                                    <span className="float-left" style={{ color: 'black' }}><small>BAVA earned</small></span><br />
                                                                                    <span className="float-left" style={{ color: 'black', marginTop: '8px' }}><small>{this.props.accountLoading ? <div>{parseFloat(window.web3Ava.utils.fromWei(this.props.pendingSegmentReward[1][i], 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div> :
                                                                                        <div className="ml-3 lds-facebook"><div></div><div></div><div></div></div>}</small></span>
                                                                                    <span className="float-right">
                                                                                        <Buttons
                                                                                            variant="success"
                                                                                            size="sm"
                                                                                            style={{ minWidth: '80px' }}
                                                                                            onClick={(event) => {
                                                                                                event.preventDefault()
                                                                                                this.props.harvest(i, 1, 2)
                                                                                            }}>
                                                                                            Harvest
                                                                                        </Buttons></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="float-right">
                                                                                <span className="card cardbody float-right" style={{ width: '650px' }}>
                                                                                    <div className="card-body" style={{ padding: '0.5rem' }}>
                                                                                        {this.props.lpSegmentAllowance[1][i] > 2000000000000000000000000000 ?
                                                                                            <div><Deposit
                                                                                                lpBalanceAccount={this.props.lpBalanceAccount}
                                                                                                poolSegmentInfo={this.props.poolSegmentInfo}
                                                                                                userSegmentInfo={this.props.userSegmentInfo}
                                                                                                i={i}
                                                                                                n='1'
                                                                                                v='2'
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
                                                                                                        this.props.approve(i, 1, 2)
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
                                                                            this.props.setI(i, true, 2)
                                                                        }}><b>Open</b></Buttons>&nbsp;&nbsp;&nbsp;</div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })} */}
                            </div>
                            :
                            <div className="center">
                                <div style={{ marginBottom: '350px' }}>
                                    <div className="bounceball"></div> &nbsp;
                                    <div className="textLoadingSmall">NETWORK IS Loading...</div>
                                    {/* <div className="textLoadingSmall">Sorry, we're down for scheduled mainenance right now.</div> */}
                                </div>
                            </div>
                        }
                    </div>
                </div><br /><br /><br />
                <Footer />
            </div >
        );
    }
}

export default TraderJoe;

import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './App.css';
import Popup from 'reactjs-popup';
import baklava from '../baklava.png'
import discord from '../discord.svg'
import twitter from '../twitter.svg'
import medium from '../medium.svg'
import git from '../github.svg'
import gitbook from '../docs.svg'

class Airdrop extends Component {

    constructor(props) {
        super(props)
        this.state = { addValid: false }
        this.state = { message: '' }
        this.state = { claimMessage: '' }
    }

    render() {
        return (
            <div id="content" className="mt-4">
                <label className="textWhite center mb-5" style={{ fontSize: '40px', color: 'black' }}><big><b>BAVA Airdrop</b></big></label>
                <div className="rowC">
                    <div className="card cardbody mr-3" style={{ width: '450px', height: '450px', color: 'black' }}>
                        <div className="card-body center">
                            <span>
                                <table className=" textBlackSmall text-center mb-4" style={{ width: '400px', color: 'black'}}>
                                    <thead>
                                        <tr >
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.props.timeConverter(this.props.airdropStart)}</td>
                                            <td>{this.props.timeConverter(this.props.airdropEnd)}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <table className=" textBlackSmall text-center mb-4" style={{ width: '400px', color: 'black' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Airdrop Amount</th>
                                            <th scope="col" style={{ border: '0px'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{parseFloat(window.web3Ava.utils.fromWei(this.props.airdropAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} BAVA</td>
                                            <td style={{ border: '0px'}}></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="textBlackMedium ml-3" style={{ color: 'black' }}><b>How to claim token:</b></div>
                                <ul>
                                    <li className="textBlackSmall">Make sure web app is connected to the wallet(Avalanche network).</li>
                                    <li className="textBlackSmall">Check if your address is registered airdrop address.</li>
                                    <li className="textBlackSmall">Make sure you have AVAX to pay for transaction fees (~1 USD worth of AVAX, paid to the network).</li>
                                    <li className="textBlackSmall">Click on claim and confirm the transaction to claim your BAVA tokens.</li>
                                </ul>
                            </span>
                        </div>
                    </div>
                    
                    {this.props.wallet || this.props.walletConnect ?
                        
                        // <div className="card cardbody" style={{ width: '450px', color: 'white' }}>
                        //     <div className="card-body">
                        //         <div>
                        //             <div>
                        //                 <div className="textBlackMedium mb-1"><b>Address:</b></div>
                        //                 <div className="textBlackSmall mb-1"><b>{this.props.account}</b></div>
                        //             </div>
                        //             <div className="center mt-2 mb-4">
                        //                 <Button
                        //                     className="btn-block"
                        //                     variant="success"
                        //                     size="sm"
                        //                     style={{ minWidth: '80px' }}
                        //                     onClick={(event) => {
                        //                         event.preventDefault()
                        //                         this.props.checkAirdrop(this.props.account)
                        //                     }}>Check
                        //                 </Button>
                        //             </div>
                        //             {this.props.airdropCheck ? <div>{this.props.validAirdrop ? <div className="textBlackMedium">Result: Address registered
                        //             <div className="center mt-2 mb-4">
                        //                 <Button
                        //                     className="btn-block"
                        //                     variant="primary"
                        //                     size="sm"
                        //                     style={{ minWidth: '80px' }}
                        //                     onClick={(event) => {
                        //                         event.preventDefault()
                        //                         this.props.claimAirdrop()
                        //                     }}>Claim
                        //                 </Button>
                        //             </div>
                        //             </div>
                        //             :<div className="textBlackMedium">Result: Address not registered</div>                                    
                        //             }</div>
                        //             : <div></div>                                    
                        //         }
                                    
                        //         </div>
                        //     </div>
                        // </div>
                        <div className="card cardbody" style={{ width: '450px', height: '150px'}}>
                        <div className="card-body">
                            <div>
                            <div className="center textBlackMedium mt-2" style={{ color: 'black', fontSize: '18px' }}><b><big>First airdrop claim period has ended!</big></b></div>
                            <div className="center comingSoon mt-4" style={{ color: '#ffae00', fontSize: '18px', opacity: "0"  }}><b><big>2ND AIRDROP IS COMING SOON!</big></b></div>
                            </div>
                        </div>
                    </div>
                        :
                        <div className="card cardbody" style={{ width: '450px', height: '150px'}}>
                            <div className="card-body">
                                <div>
                                <div className="center textBlackMedium mt-2" style={{ color: 'black', fontSize: '18px' }}><b><big>First airdrop claim period has ended!</big></b></div>
                                <div className="center comingSoon mt-4" style={{ color: '#ffae00', fontSize: '18px', opacity: "0"  }}><b><big>2ND AIRDROP IS COMING SOON!</big></b></div>
                                    {/* <div className="center textBlackMedium mt-2 mb-3"><b>Connect wallet to claim BAVA airdrop</b></div> */}
                                    {/* <div className="center mt-4"><button type="submit" className="btn btn-primary btn-lg mt-3" onClick={async () => {
                                        await this.props.connectMetamask()
                                    }}>Connect</button></div> */}
                                </div>
                            </div>
                        </div>
                    }
                </div><br /><br /><br /><br /><br />
                <div className="rowS center">
                    <img className="center" src={baklava} width="30" alt="" />&nbsp;&nbsp;
                    <div className="center" style={{ color: "black", fontSize: '20px', marginRight: "25px" }}><b>BAKLAVA.SPACE</b></div>
                </div>
                <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Tools for defi users.</div>
                <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Baklava Farms autocompound farm rewards.</div>
                <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Use at your own risk.</div>

                <div className="center" style={{ marginTop: "20px" }}>
                    <div className="rowC" style={{ marginTop: "8px" }}>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://baklavaspace.gitbook.io/`, '_blank')
                        }}><Popup
                            trigger={open => (
                                <img src={gitbook} width="20" height="20" align="right" alt="" />
                            )}
                            on="hover"
                            offsetY={0}
                            offsetX={0}
                            position="bottom center"
                            contentStyle={{ width: '75px' }}
                        ><span className="textInfo">Gitbook</span>
                            </Popup>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://twitter.com/baklavaspace`, '_blank')
                        }}><Popup
                            trigger={open => (
                                <img src={twitter} width="20" height="20" align="right" alt="" />
                            )}
                            on="hover"
                            offsetY={0}
                            offsetX={0}
                            position="bottom center"
                            contentStyle={{ width: '70px' }}
                        ><span className="textInfo">Twitter</span>
                            </Popup>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://medium.com/@baklavaspace`, '_blank')
                        }}><Popup
                            trigger={open => (
                                <img src={medium} width="20" height="20" align="right" alt="" />
                            )}
                            on="hover"
                            offsetY={0}
                            offsetX={0}
                            position="bottom center"
                            contentStyle={{ width: '75px' }}
                        ><span className="textInfo">Medium</span>
                            </Popup>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://github.com/baklavaspace`, '_blank')
                        }}><Popup
                            trigger={open => (
                                <img src={git} width="20" height="20" align="right" alt="" />
                            )}
                            on="hover"
                            offsetY={0}
                            offsetX={0}
                            position="bottom center"
                            contentStyle={{ width: '40px' }}
                        ><span className="textInfo">Git</span>
                            </Popup>
                        </div>
                        <div className="exLink0" style={{ marginRight: '0px' }} onClick={() => {
                            window.open(`https://discord.gg/E6aYX5ukAw`, '_blank')
                        }}><Popup
                            trigger={open => (
                                <img src={discord} width="20" height="20" align="right" alt="" />
                            )}
                            on="hover"
                            offsetY={0}
                            offsetX={0}
                            position="bottom center"
                            contentStyle={{ width: '75px' }}
                        ><span className="textInfo">Discord</span>
                            </Popup>
                        </div>
                    </div></div><br /><br />
            </div >

        );
    }
}

export default Airdrop;

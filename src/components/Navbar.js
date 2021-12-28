import React, { Component } from 'react'
import Buttons from 'react-bootstrap/Button'
import baklava from '../baklava.png'
import { Link } from 'react-router-dom';
import discord from '../discord.svg'
import twitter from '../twitter.svg'
import medium from '../medium.svg'
import git from '../github.svg'
import gitbook from '../docs.svg'
import fox from '../metamask-fox.svg'
import walletconnectLogo from '../walletconnect-logo.svg'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './App.css'

class Navb extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark top flex-md-nowrap p-0 mt-2">
        <a
          className=" col-md-0 textMiddleBold1"
          href="https://twitter.com/baklavaspace"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', marginLeft: "15px" }}
        ><img src={baklava} width="50" height="50" alt="" />&nbsp;BAKLAVA.SPACE</a>
        <span>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap-small d-none d-sm-none d-sm-block">
              <div className="text-light rowC">

                <div className="rowC" style={{ marginTop: "8px" }}>
                  <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
                    window.open(`https://baklavaspace.gitbook.io/`, '_blank')
                  }}><img src={gitbook} width="20" height="20" align="right" alt="" />
                  </div>
                  <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
                    window.open(`https://twitter.com/baklavaspace`, '_blank')
                  }}><img src={twitter} width="20" height="20" align="right" alt="" />
                  </div>
                  <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
                    window.open(`https://medium.com/@baklavaspace`, '_blank')
                  }}><img src={medium} width="20" height="20" align="right" alt="" />
                  </div>
                  <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
                    window.open(`https://github.com/baklavaspace`, '_blank')
                  }}><img src={git} width="20" height="20" align="right" alt="" />
                  </div>
                  <div className="exLink0" style={{ marginRight: '60px' }} onClick={() => {
                    window.open(`https://discord.gg/tNCV9wR7y`, '_blank')
                  }}><img src={discord} width="20" height="20" align="right" alt="" />
                  </div>
                </div>

                <div>
                  <Link to="/menu/">
                    <Buttons className="textWhiteLarge center" style={{ width: '100px', height: '30px' }} variant="secondary" size="lg"> Menu</Buttons>
                  </Link>
                  {/* <Button variant="info" size="sm" onClick={() => {
                  }}>{this.props.networkName}
                  </Button> */}
                </div>&nbsp;&nbsp;

                <div>
                  {this.props.wallet || this.props.walletConnect ?
                    <div>
                      <Popup trigger={open => (
                        <Buttons className="textWhiteLarge center" style={{ width: '100px', height: '30px' }} variant="warning" size="sm" > {this.props.first4Account}...{this.props.last4Account}</Buttons>
                      )}
                        on="hover"
                        position="bottom right"
                        offsetY={5}
                        offsetX={0}
                        mouseLeaveDelay={100}
                        contentStyle={{ padding: '5px' }}
                        arrow={false}
                      ><div>
                          <div className='dropdown0' onClick={() => {
                            window.open(`https://bscscan.com/address/${this.props.account}`, '_blank')
                          }}>Wallet</div>
                          <div className='dropdown' onClick={() => {
                            this.props.setWalletTrigger(false)
                            if (this.props.walletConnect == true) {
                              this.props.WalletDisconnect()
                            }
                          }}>Disconnect</div>
                        </div>
                      </Popup>
                    </div>
                    : <div>
                      <Popup trigger={open => (
                        <Buttons className="textWhiteLarge center" style={{ width: '100px', height: '30px' }} variant="warning" size="lg" >CONNECT</Buttons>
                      )}
                        on="hover"
                        position="bottom right"
                        offsetY={5}
                        offsetX={0}
                        mouseLeaveDelay={100}
                        contentStyle={{ padding: '5px' }}
                        arrow={false}
                      >
                        <div>
                          <div className='dropdown0' onClick={async () => {
                            await this.props.connectWallet()
                          }
                          }><img src={fox} width="23" height="23" className="d-inline-block" alt="" />&nbsp; Metamask</div>
                          <div className='dropdown' onClick={async () => {
                            await this.props.WalletConnect()
                          }
                          }><img src={walletconnectLogo} width="26" height="23" className="d-inline-block" alt="" />&nbsp; WalletConnect</div>
                        </div>
                      </Popup>
                    </div>}
                </div>&nbsp;
              </div>
            </li>
          </ul>
        </span>
      </nav>

    );
  }
}

export default Navb;

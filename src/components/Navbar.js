import React, { Component } from 'react'
import Buttons from 'react-bootstrap/Button'
import baklava from '../baklava.png'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import discord from '../discord.svg'
import twitter from '../twitter.svg'
import medium from '../medium.svg'
import git from '../github.svg'
import gitbook from '../docs.svg'
import fox from '../metamask-fox.svg'
import coin98 from '../coin98.png'
import walletconnectLogo from '../walletconnect-logo.svg'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './App.css'

class Navb extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark top flex-md-nowrap p-0 mt-2">
        <span className="rowC" style={{ textDecoration: 'none', marginLeft: "15px", marginTop: "8px" }}>
          <a
            className="textMiddleBold1"
            href="https://baklava.space/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', marginRight: "20px" }}
          ><img src={baklava} width="50" height="50" alt="" />&nbsp;BAKLAVA.SPACE</a>

          <div
            style={{ marginLeft: "25px", marginTop: "13px" }}
          ><NavLink className="textSmallBold1" activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/menu/">Farm</NavLink></div>
          <div
            style={{ marginLeft: "25px", marginTop: "13px" }}
          ><NavLink className="textSmallBold1" activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/stake/">Stake</NavLink></div>
          <div
            style={{ marginLeft: "25px", marginTop: "13px" }}
          ><NavLink className="textSmallBold1" activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/claim/">Claim</NavLink></div>
        </span>


        <span>
          <div className="navbar-nav px-3 text-light rowC">
            <div className="rowC" style={{ marginTop: "8px" }}>
              <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
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
              <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
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
              <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
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
              <div className="exLink0" style={{ marginRight: '30px' }} onClick={() => {
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
              <div className="exLink0" style={{ marginRight: '60px' }} onClick={() => {
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
            </div>

            <div>
              {/* <Popup trigger={open => ( */}
              <Link to="/menu/">
                <Buttons className="textWhiteLarge center" style={{ width: '100px', height: '30px' }} variant="secondary" size="lg"> Menu</Buttons>
              </Link>
              {/* )}
                on="hover"
                position="bottom left"
                offsetY={0}
                offsetX={0}
                mouseLeaveDelay={100}
                contentStyle={{ padding: '5px', width: '120px', textDecoration: "none" }}
                arrow={false}
              ><div>
                  <Link to="/menu/"></Link>
                  <div className='dropdown0'><Link className="exLink0 ml-3" to="/menu/">  Farm</Link></div>
                  <div className='dropdown'><Link className="exLink0 ml-3" to="/airdrop/">Airdrop</Link></div>
                </div>
              </Popup> */}
            </div>&nbsp;&nbsp;

            <div>
              {this.props.wallet || this.props.walletConnect ?
                <div>
                  <Popup trigger={open => (
                    <Buttons className="textWhiteLarge center" style={{ width: '100px', height: '30px' }} variant="warning" size="sm" > {this.props.first4Account}...{this.props.last4Account}</Buttons>
                  )}
                    on="hover"
                    position="bottom right"
                    offsetY={0}
                    offsetX={0}
                    mouseLeaveDelay={100}
                    contentStyle={{ padding: '5px' }}
                    arrow={false}
                  ><div>
                      <div className='dropdown0' onClick={() => {
                        window.open(`https://snowtrace.io/address/${this.props.account}`, '_blank')
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
                    offsetY={0}
                    offsetX={0}
                    mouseLeaveDelay={100}
                    contentStyle={{ padding: '5px' }}
                    arrow={false}
                  >
                    <div>
                      <div className='dropdown0' onClick={async () => {
                        await this.props.connectMetamask()
                      }}><img src={fox} width="23" height="23" className="d-inline-block" alt="" />&nbsp; Metamask</div>
                      <div className='dropdown0' onClick={async () => {
                        await this.props.connectCoin98()
                      }}><img src={coin98} width="23" height="23" className="d-inline-block" alt="" />&nbsp; Coin98</div>
                      <div className='dropdown' onClick={async () => {
                        await this.props.mobileWalletConnect()
                      }}><img src={walletconnectLogo} width="26" height="23" className="d-inline-block" alt="" />&nbsp; WalletConnect</div>
                    </div>
                  </Popup>
                </div>}
            </div>&nbsp;
          </div>
        </span>
      </nav>

    );
  }
}

export default Navb;

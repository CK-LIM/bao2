import React, { Component } from 'react'
import MediaQuery from 'react-responsive';
import Buttons from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import ImgNextGen from './ImgNextGen';
import { slide as Menu } from 'react-burger-menu'
import Dropdown from 'react-bootstrap/Dropdown'
import 'reactjs-popup/dist/index.css';
import './App.css';

import baklava from './images/baklava.webp';
import coin98 from './images/coin98.webp';
import logo from './images/logo.webp';
import fox from './images/metamask-fox.svg';
import walletconnectlogo from './images/walletconnect-logo.svg';


class Navb extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show2: false,
      show: false,
      color: false
    }
    this.showDropdown = this.showDropdown.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
    this.show2Dropdown = this.show2Dropdown.bind(this)
    this.hide2Dropdown = this.hide2Dropdown.bind(this)
  }

  showDropdown(i) {
    let show = this.state.show
    this.setState({ show: true })  //do ntg, just to push react setstate
  }

  hideDropdown() {
    this.setState({ show: false })  //do ntg, just to push react setstate
  }

  show2Dropdown(i) {
    let show2 = this.state.show2
    this.setState({ show2: true })  //do ntg, just to push react setstate

  }

  hide2Dropdown() {
    this.setState({ show2: false })  //do ntg, just to push react setstate
  }

  setColor(bool) {
    this.setState({ color: bool })  //do ntg, just to push react setstate
  }

  render() {
    const contentStyle = { background: '#fffae6', border: "1px solid #596169", width: "30%", borderRadius: "15px", minWidth: "320px" };

    const changeColor = () => {
      if (window.scrollY >= 40) {
        this.setColor(true)
      } else {
        this.setColor(false)
      }
      window.removeEventListener('scroll', changeColor, true)
    }

    window.addEventListener('scroll', changeColor, true)

    return (
      <Navbar className="navbar top" style={this.state.color ? { height: "70px", position: "fixed", width: "100%", top: "0", zIndex: "999", backgroundColor: "#fffae6", borderBottom: "0.5px solid rgb(224, 224, 224)" } : { height: "70px", position: "fixed", width: "100%", top: "0", zIndex: "999", backgroundColor: "#fffae6" }}>
        <Nav>
          <MediaQuery maxWidth={1050}>
            <Menu>
              <div className='dropdown0'><NavLink className='dropdown' to='/menu/v2/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Farm</NavLink></div>
              <div className='dropdown0'><NavLink className='dropdown' to='/stake/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Stake</NavLink></div>
              {/* <div className='dropdown0'><NavLink className='dropdown' to='/claim/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Claim</NavLink></div> */}
              {/* <div className='dropdown0'><NavLink className='dropdown' to='/collateral/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Collateral</NavLink></div> */}
              <div className='dropdown0'><NavLink className='dropdown' to='/litepaper/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>LitePaper</NavLink></div>
              <div className='dropdown0'><NavLink className='dropdown' to='/synthetic/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Synthetic</NavLink></div>
            </Menu>
          </MediaQuery>

          <MediaQuery minWidth={1051}>
            <NavLink className="topleft" to="/">
              <ImgNextGen
                srcWebp={baklava}
                width="35" alt=""
              />
            </NavLink>
          </MediaQuery>
          <MediaQuery minWidth={501}>
            <NavLink className="topleft1 textMiddleBold2 reallyBold" to="/"><b>BAKLAVA.SPACE</b></NavLink>
          </MediaQuery>
          <MediaQuery minWidth={280} maxWidth={500}>
            <NavLink className="topleft1 textMiddleBold2 reallyBold" to="/"><b>BAKLAVA</b></NavLink>
          </MediaQuery>


          <div className="rowS topleft2" style={{ textDecoration: 'none' }}>
            <MediaQuery minWidth={1051}>
              <div style={{ marginLeft: "25px" }} >
                <Dropdown style={{ padding: "0px" }}
                  onMouseEnter={this.showDropdown}
                  onMouseLeave={this.hideDropdown}
                  show={this.state.show}
                >
                  <Dropdown.Toggle className='center cell2' variant="transparent" style={{ paddingLeft: "10px" }}>
                    <NavLink className="textSmallBold1" activeClassName="" activeStyle={{ fontWeight: "bold", color: "#ffae00" }} to="/menu/v2/">Farm &#8595;</NavLink>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ backgroundColor: "#fffae6", marginTop: "0px", padding: '0px', minWidth: '7rem' }}>
                    <Dropdown.Item as={Link} to="/menu/" className='cell2' style={{ padding: '0px', marginLeft: "8px", width: '50px' }}>
                      <div className="dropdown center" style={{ fontSize: '16px', marginLeft: "20px" }}>Version 1</div>
                    </Dropdown.Item>
                    <Dropdown.Divider style={{ marginTop: "4px", marginBottom: '4px' }} />
                    <Dropdown.Item as={Link} to="/menu/v2/" className='cell2' style={{ padding: '0px', marginLeft: "8px", width: '50px' }}>
                      <div className="dropdown center" style={{ fontSize: '16px', marginLeft: "20px" }}>Version 2</div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div
                style={{ marginLeft: "10px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffae00" }} to="/stake/">Stake</NavLink></div>
              {/* <div
                style={{ marginLeft: "20px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffae00" }} to="/claim/">Claim</NavLink></div> */}
              {/* <div
                style={{ marginLeft: "20px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffae00" }} to="/collateral/">Collateral</NavLink></div> */}
              <div
                style={{ marginLeft: "20px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffae00" }} to="/litepaper/">LitePaper</NavLink></div>
              <div
                style={{ marginLeft: "20px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffae00" }} to="/synthetic/">Synthetic</NavLink></div>
            </MediaQuery>
          </div>


          <div>
            <div >
              <ul className="topright rowC">
                <MediaQuery minWidth={401}>
                  <div className="center" style={{ marginTop: '2px', marginRight: '12px' }}>
                    <ImgNextGen
                      srcWebp={logo}
                      style={{ marginRight: '5px' }} width="25" height="25" alt=""
                    />
                    <div className="textbavaPriceBold" onClick={() => {
                      window.open(`https://kyberswap.com/swap/avalanche/avax-to-bava`, '_blank')
                    }}><b>${this.props.BAVAPrice}</b></div>
                  </div>
                </MediaQuery>
                <MediaQuery minWidth={601}>
                  <div>
                    <Buttons className="textWhiteLarge center" style={{ height: '30px', marginRight: '8px' }} variant="secondary" size="lg">&nbsp;Avalanche&nbsp;</Buttons>
                  </div>
                </MediaQuery>
                <div>
                  {this.props.wallet || this.props.walletConnect ?
                    <Dropdown
                      onMouseEnter={this.show2Dropdown}
                      onMouseLeave={this.hide2Dropdown}
                      show={this.state.show2}
                      autoClose="outside"
                      style={{ padding: '0px', paddingBottom: "5px" }}
                    >
                      <Dropdown.Toggle className='textWhiteLarge center cell2' variant="warning" size="sm" style={{ backgroundColor: "#ffc107", width: '110px', height: '30px' }}>
                        <div>{this.props.first4Account}...{this.props.last4Account}</div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ backgroundColor: "#fffae6", margin: "0px", padding: '5px', minWidth: '110px', maxWidth: '110px' }}>
                        <Dropdown.Item className="cell2 dropdown0" style={{ margin: '0px', padding: '5px', fontSize: '16px' }}>
                          <div onClick={() => {
                            window.open(`https://snowtrace.io/address/${this.props.account}`, '_blank')
                          }}>Wallet</div>
                        </Dropdown.Item>
                        <Dropdown.Item className="cell2 dropdown" style={{ margin: '0px', padding: '5px', fontSize: '16px' }}>
                          <div onClick={async () => {
                            this.props.setWalletTrigger(false)
                            if (this.props.walletConnect == true) {
                              await this.props.WalletDisconnect()
                            }
                            await this.hide2Dropdown()
                          }}>Disconnect</div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    : <div>
                      <Popup trigger={open => (<Buttons className="textWhiteLarge center" style={{ width: '110px', height: '30px' }} variant="warning" size="lg" >Connect</Buttons>)} modal {...{ contentStyle }}>
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
                    </div>}
                </div>&nbsp;
              </ul>
            </div>
          </div>
        </Nav>
      </Navbar>
    );
  }
}

export default Navb;

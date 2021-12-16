import React, { Component } from 'react'
// import Navbar from 'react-bootstrap/Navbar'
// import Identicon from 'identicon.js';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import baklava from '../baklava.png'
import discord from '../discord.png'
import twitter from '../twitter.png'
import medium from '../medium.png'
import git from '../git.png'
import gitbook from '../gitbook.png'
import fox from '../metamask-fox.svg'
import walletconnectLogo from '../walletconnect-logo.svg'
import './App.css'
import {
  // Nav,
  NavLink
  // Bars,
  // NavMenu,
  // NavBtn
} from './NavMenu'


class Navb extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 ">

        <a
          className="navbar-brand  col-md-0 "
          href="https://twitter.com/baklavaspace"
          target="_blank"
          rel="noopener noreferrer"
        >&nbsp;&nbsp;&nbsp;
          <img src={baklava} width="30" height="30" alt="" />
          &nbsp; Baklava
        </a>

        <span>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap-small d-none d-sm-none d-sm-block">
              <div className="text-light rowC">
                <div>
                  <NavLink to='/home' >Home</NavLink>
                </div>&nbsp;&nbsp;
                <div>
                  <NavLink to='/menu' >Menu</NavLink>
                </div>&nbsp;&nbsp;
                <div>
                  <Button variant="info" size="sm" onClick={() => {
                  }}>{this.props.networkName}
                  </Button>
                </div>&nbsp;
                <div>
                  {this.props.wallet || this.props.walletConnect ?
                    <DropdownButton
                      id="dropdown-menu-align-end"
                      variant="secondary"
                      menuvariant="secondary"
                      size="sm"
                      align="start"
                      title={`${this.props.first4Account}...${this.props.last4Account}`}
                    >
                      <Dropdown.Item onClick={() => {
                        window.open(`https://cchain.explorer.avax-test.network/address/${this.props.account}`, '_blank')
                      }}>Wallet</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item variant="secondary" onClick={() => {
                        this.props.setWalletTrigger(false)
                        if (this.props.walletConnect == true) {
                          this.props.WalletDisconnect()
                        }
                      }}>Disconnect</Dropdown.Item>
                    </DropdownButton>
                    : <DropdownButton                    
                      id="dropdown-menu-align-end"
                      variant="secondary"
                      menuvariant="secondary"
                      size="sm"
                      align="end"
                      title="Connect Wallet"
                    >
                      <Dropdown.Item variant="secondary" onClick={async () => {
                        await this.props.connectWallet()
                      }
                      }><img src={fox} width="23" height="23" className="d-inline-block" alt=""/>&nbsp; Metamask</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item variant="dark" onClick={() => {
                        this.props.WalletConnect()
                      }}><img src={walletconnectLogo} width="26" height="23" className="d-inline-block" alt=""/>&nbsp;WalletConnect</Dropdown.Item>
                    
                    </DropdownButton>}
                </div>&nbsp;
                <div>
                  <DropdownButton
                    id="dropdown-menu-align-end"
                    variant="secondary"
                    size="sm"
                    align="end"
                    title="..."
                  ><Dropdown.Item onClick={() => {
                    window.open(`https://baklavaspace.gitbook.io/`, '_blank')
                  }
                  }>Docs
                      <img src={gitbook} width="25" height="25" align="right" alt="" />
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      window.open(`https://twitter.com/baklavaspace`, '_blank')
                    }
                    }>Twitter
                      <img src={twitter} width="25" height="25" align="right" alt="" />
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      window.open(`https://medium.com/@baklavaspace`, '_blank')
                    }
                    }>Medium
                      <img src={medium} width="25" height="25" align="right" alt="" />
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      window.open(`https://github.com/baklavaspace`, '_blank')
                    }
                    }>Github
                      <img src={git} width="25" height="25" align="right" alt="" />
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      window.open(`https://discord.gg/tNCV9wR7y`, '_blank')
                    }
                    }>Discord
                      <img src={discord} width="25" height="25" align="right" alt="" />
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </li>
          </ul>
        </span>
      </nav>

    );
  }
}

export default Navb;

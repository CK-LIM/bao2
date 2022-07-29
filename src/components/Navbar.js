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
import discord from './images/discord.svg';
import docs from './images/docs.svg';
import github from './images/github.svg';
import medium from './images/medium.svg';
import twitter from './images/twitter.svg';
import coin98 from './images/coin98.webp';
import fox from './images/metamask-fox.svg';
import walletconnectlogo from './images/walletconnect-logo.svg';

class Navb extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      show2: false,
      color: false
    }
    this.showDropdown = this.showDropdown.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
    this.show2Dropdown = this.show2Dropdown.bind(this)
    this.hide2Dropdown = this.hide2Dropdown.bind(this)
  }

  showDropdown(i) {
    let show = this.state.show
    this.setState({ show: !show })  //do ntg, just to push react setstate
  }

  hideDropdown() {
    let show = this.state.show
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
        <Nav style={{ minWidth: '250px' }}>
          <MediaQuery maxWidth={1200}>
            <Menu >
              <div className='dropdown0'><NavLink className='dropdown' to='/menu/v2/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Farm</NavLink></div>
              <div className='dropdown0'><NavLink className='dropdown' to='/stake/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Stake</NavLink></div>
              {/* <div className='dropdown0'><NavLink className='dropdown' to='/claim/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Claim</NavLink></div> */}
              {/* <div className='dropdown0'><NavLink className='dropdown' to='/collateral/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Collateral</NavLink></div> */}
              <div className='dropdown0'><NavLink className='dropdown' to='/synthetic/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Synthetic</NavLink></div>
              <div className='dropdown0'><NavLink className='dropdown' to='/litepaper/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>LitePaper</NavLink></div>
            </Menu>
          </MediaQuery>

          <MediaQuery minWidth={1201}>
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
            <MediaQuery minWidth={1201}>
              {/* <div
                style={{ marginLeft: "25px" }}
              ><Popup trigger={open => (
                <NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/menu/v2/">Farm &#8595;</NavLink>
              )}
                on="hover"
                position="bottom center"
                offsetY={5}
                offsetX={0}
                mouseLeaveDelay={100}
                contentStyle={{ padding: '3px', width: '90px', textDecoration: "none" }}
                arrow={false}
              ><div>
                    <Link to="/traderjoe/"></Link>
                    <div className='dropdown0'><Link className="textInfo center" to="/menu/">Version 1</Link></div>
                    <div className='dropdown'><Link className="textInfo center" to="/menu/v2/">Version 2</Link></div>
                  </div>
                </Popup>
              </div> */}

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
                      <div className="dropdown center" style={{ fontSize: '15px', marginLeft: "20px" }}>Version 1</div>
                    </Dropdown.Item>
                    <Dropdown.Divider style={{ marginTop: "4px", marginBottom: '4px' }} />
                    <Dropdown.Item as={Link} to="/menu/v2/" className='cell2' style={{ padding: '0px', marginLeft: "8px", width: '50px' }}>
                      <div className="dropdown center" style={{ fontSize: '15px', marginLeft: "20px" }}>Version 2</div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div
                style={{ marginLeft: "10px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/stake/">Stake</NavLink></div>
              {/* <div
                style={{ marginLeft: "20px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/claim/">Claim</NavLink></div> */}
              {/* <div
                style={{ marginLeft: "25px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/collateral/">Collateral</NavLink></div> */}
              <div
                style={{ marginLeft: "20px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/litepaper/">LitePaper</NavLink></div>
              <div
                style={{ marginLeft: "20px" }}
              ><NavLink className="textSmallBold1" activeClassName=" " activeStyle={{ fontWeight: "bold", color: "#ffc400" }} to="/synthetic/">Synthetic</NavLink></div>
            </MediaQuery>
          </div>

          <div>
            <MediaQuery minWidth={771}>
              <div className="center topright1">
                <div className="rowC">
                  <Link className="exLink0" style={{ marginRight: '40px' }} to={{ pathname: "https://baklavaspace.gitbook.io/" }} target="_blank">
                    <div className="center mb-2"><img src={docs} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                  <Link className="exLink0" style={{ marginRight: '40px' }} to={{ pathname: "https://twitter.com/baklavaspace" }} target="_blank">
                    <div className="center mb-2"><img src={twitter} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                  <Link className="exLink0" style={{ marginRight: '40px' }} to={{ pathname: "https://medium.com/@baklavaspace" }} target="_blank">
                    <div className="center mb-2"><img src={medium} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                  <Link className="exLink0" style={{ marginRight: '40px' }} to={{ pathname: "https://github.com/baklavaspace" }} target="_blank">
                    <div className="center mb-2"><img src={github} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                  <Link className="exLink0" style={{ marginRight: '20px' }} to={{ pathname: "https://discord.gg/E6aYX5ukAw" }} target="_blank">
                    <div className="center mb-2"><img src={discord} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                </div>
              </div>
            </MediaQuery>

            <div>
              <MediaQuery minWidth={501}>
                <ul className="topright0">
                  <div className=' center'><NavLink className='dropdown textWhiteLarge center' to='/menu/v2/' style={{ width: '125px', borderRadius: "10px", height: '35px', background: "#ffae00" }}>Launch App</NavLink></div>
                </ul>
              </MediaQuery>
              <MediaQuery maxWidth={500}>
                <ul className="topright00">
                  <div className=' center'><NavLink className='dropdown textWhiteLarge center' to='/menu/v2/' style={{ width: '125px', borderRadius: "10px", height: '35px', background: "#ffae00" }}>Launch App</NavLink></div>
                </ul>
              </MediaQuery>
            </div>
          </div>
        </Nav>
      </Navbar>
    );
  }
}

export default Navb;

import React, { Component } from 'react'
import './App.css';
import baklava from '../baklava.png'
import discord from '../discord.svg'
import twitter from '../twitter.svg'
import medium from '../medium.svg'
import git from '../github.svg'
import gitbook from '../docs.svg'

class Airdrop extends Component {

    render() {
        return (
            <div id="content" className="mt-5">
                <label className="textWhite center mb-5" style={{ fontSize: '40px', color: 'black' }}><big><b>Mint your synthetic asset</b></big></label>
                <div className="center " style={{ marginTop: "25px" }}>
                    <img src="https://whitelist.mirror.finance/images/AAPL.png" width="50" height="50" alt="" />&nbsp;&nbsp;
                    <img src="https://whitelist.mirror.finance/images/TSLA.png" width="50" height="50" alt="" />&nbsp;&nbsp;
                    <img src="https://whitelist.mirror.finance/images/FB.png" width="50" height="50" alt="" />&nbsp;&nbsp;
                    <img src="https://whitelist.mirror.finance/images/GOOGL.png" width="50" height="50" alt="" />&nbsp;&nbsp;
                    <img src="https://whitelist.mirror.finance/images/ABNB.png" width="50" height="50" alt="" />&nbsp;&nbsp;
                </div>
                <div className="center comingSoon" style={{ color: '#ffae00', fontSize: '40px', marginTop: "80px", opacity: "0" }}><b><big>Coming Soon!</big></b></div>

                <br /><br /><br /><br /><br />
                <div className="rowS center">
                    <img className="center" src={baklava} width="30" alt="" />&nbsp;&nbsp;
                    <div className="center" style={{ color: "black", fontSize: '20px', marginRight: "25px" }}><b>BAKLAVA.SPACE</b></div>
                </div>
                <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Tools for defi users.</div>
                <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Baklava Farms autocompound farm rewards.</div>
                <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Use at your own risk.</div>

                <div className="center" style={{ marginTop: "15px" }}>
                    <div className="rowC">
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://baklavaspace.gitbook.io/`, '_blank')
                        }}><div className="center mb-2"><img src={gitbook} width="20" height="20" align="right" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://twitter.com/baklavaspace`, '_blank')
                        }}><div className="center mb-2"><img src={twitter} width="20" height="20" align="right" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://medium.com/@baklavaspace`, '_blank')
                        }}><div className="center mb-2"><img src={medium} width="20" height="20" align="right" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://github.com/baklavaspace`, '_blank')
                        }}><div className="center mb-2"><img src={git} width="20" height="20" align="right" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '0px' }} onClick={() => {
                            window.open(`https://discord.gg/E6aYX5ukAw`, '_blank')
                        }}><div className="center mb-2"><img src={discord} width="20" height="20" align="right" alt="" /></div>
                        </div>
                    </div></div><br />
            </div>
        );
    }
}

export default Airdrop;
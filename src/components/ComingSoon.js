import React, { Component } from 'react'
import baklava from '../baklava.png';
import discord from '../discord.svg'
import twitter from '../twitter.svg'
import medium from '../medium.svg'
import git from '../github.svg'
import './App.css';

class ComingSoon extends Component {

    render() {
        return (
            <div id="content" className="mt-3">
                <div className="rowC">
                    <div className="" style={{ marginTop: '120px', opacity: '0.8', marginLeft: '-50px' }}>
                        <img className="" src={baklava} width="450" height="450" alt="" />
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{ maxWidth: '1050px', marginRight: '0px' }}>
                        <div className="center text comingSoon" style={{ fontSize: '80px', opacity: '0' }}><b>Baklava Vision</b></div><br />
                        <div className="text-center comingSoon1" style={{ fontSize: '15px', color: 'silver', opacity: '0' }}>Synthetic assets presents the greatest frontier of DeFi. This money market is more than $10 trillion dollar, triumphing the spot market. DeFi allows the creation of synthetic assets in an unimaginable ways and anything that can find price and liquidity can become a synthetic asset. </div>
                        <br />
                        <div className="text-center comingSoon1" style={{ fontSize: '15px', color: 'silver', opacity: '0' }}>The word baklava is Turkish, possibly from a Mongolian root meaning to wrap up or pile up. These delicious pastries are the tradition of taking something good that exists, and layered it up into being a new treasure. Baklava Space aims to do this by being a new protocol that adds features to existing DeFi systems.</div>
                        <br />
                        <div className="text-center comingSoon1" style={{ fontSize: '15px', color: 'silver', opacity: '0' }}>Baklava space is first focused on providing a fair early distribution, and then on the creation of synthetic assets, where BAVA will be used to pay fees to mint synthetics and burned, continually reducing supply and adding value to all BAVA holders.</div>
                        <br /><br />
                        <div className="center comingSoon2" style={{ opacity: '0' }}>
                            <span><img src={twitter} width="45" height="45" align="right" style={{ cursor: "pointer" }} alt="" onClick={() => {
                                window.open(`https://twitter.com/baklavaspace`, '_blank')
                            }} /></span>&nbsp;&nbsp;
                            <span><img src={medium} width="55" height="55" align="right" style={{ cursor: "pointer" }} alt="" onClick={() => {
                                window.open(`https://medium.com/@baklavaspace`, '_blank')
                            }} /></span>&nbsp;
                            <span><img src={discord} width="55" height="55" align="right" style={{ cursor: "pointer" }} alt="" onClick={() => {
                                window.open(`https://discord.gg/tNCV9wR7y`, '_blank')
                            }} /></span>
                        </div>
                        <div className="text-center comingSoon3" style={{ color: 'white', fontSize: '85px', opacity: '0' }}><b>Coming Soon!!!</b></div>

                    </div>

                </div>
            </div>

        );
    }
}

export default ComingSoon;

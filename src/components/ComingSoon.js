import React, { Component } from 'react'
import baklava from '../baklava.png';
import discord from '../discord.png'
import twitter from '../twitter.png'
import medium from '../medium.png'
import git from '../git.png'
import './App.css';

class ComingSoon extends Component {

    render() {
        return (
            <div id="content" className="mt-5">
                <div className="rowC">
                    <div className="" style={{marginTop: '80px'}}>
                        <img src={baklava} width="550" height="550" className="" alt="" />
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{ maxWidth: '900px' }}>
                        <div className="center text" style={{ fontSize: '80px' }}><b>Baklava Vision</b></div><br /><br />
                        <div className="text-center" style={{ fontSize: '18px', color: 'silver' }}>Synthetic assets presents the greatest frontier of DeFi. This money market is more than $10 trillion dollar, triumphing the spot market. DeFi allows the creation of synthetic assets in an unimaginable ways and anything that can find price and liquidity can become a synthetic asset. </div>
                        <br />
                        <div className="text-center" style={{ fontSize: '18px',color: 'silver' }}>The word baklava is Turkish, possibly from a Mongolian root meaning to wrap up or pile up. These delicious pastries are the tradition of taking something good that exists, and layered it up into being a new treasure. Baklava Space aims to do this by being a new protocol that adds features to existing DeFi systems.</div>
                        <br />
                        <div className="text-center" style={{ fontSize: '18px',color: 'silver' }}>Baklava space is first focused on providing a fair early distribution, and then on the creation of synthetic assets, where BAVA will be used to pay fees to mint synthetics and burned, continually reducing supply and adding value to all BAVA holders.</div>
                        <br /><br />
                        <div className="center">
                            <span><img src={twitter} width="55" height="55" align="right" style={{cursor: "pointer" }} alt="" onClick={() => {
                                window.open(`https://twitter.com/baklavaspace`, '_blank')
                            }} /></span>&nbsp;&nbsp;
                            <span><img src={medium} width="65" height="65" align="right" style={{cursor: "pointer" }} alt="" onClick={() => {
                                window.open(`https://medium.com/@baklavaspace`, '_blank')
                            }} /></span>&nbsp;
                            {/* <span><img src={git} width="55" height="55" align="right" alt="" onClick={() => {
                                window.open(`https://github.com/baklavaspace`, '_blank')
                            }} /></span> */}
                            <span><img src={discord} width="65" height="65" align="right" style={{cursor: "pointer" }} alt="" onClick={() => {
                                window.open(`https://discord.gg/tNCV9wR7y`, '_blank')
                            }} /></span>
                        </div>
                        <br />
                        <div className="center" style={{ color: 'white', fontSize: '85px' }}><b>Coming Soon!!!</b></div>
                    </div>




                </div>
            </div>

        );
    }
}

export default ComingSoon;

import React, { Component } from 'react'
import litepaper from '../Litepaper_Protocol.pdf'
import litepaper_turkish from '../Litepaper_Protocol(turkish).pdf'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Buttons from 'react-bootstrap/Button'
import './App.css';
import baklava from '../baklava.png'
import discord from '../discord.svg'
import twitter from '../twitter.svg'
import medium from '../medium.svg'
import git from '../github.svg'
import gitbook from '../docs.svg'

class LitePaper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            turkish: false,
            english: false
        }
        this.clickLanguage = this.clickLanguage.bind(this)
    }

    clickLanguage(language, boolean) {
        // this.setState({
        //     farmV2_2Open[pair]: boolean
        // })
        let ntg = 0
        if (language == "turkish") {
            this.state.turkish = boolean
            this.state.english = false
        } else {
            this.state.english = boolean
            this.state.turkish = false
        }
        this.setState({ ntg })  //do ntg, just to push react setstate
    }

    render() {
        return (
            <div id="content">
                <span className="center mb-3">
                    {this.state.turkish ? <div>
                        <Buttons variant="text" size="small" color="inherit" onClick={async () => {
                            await this.clickLanguage("english", true)
                        }}>English</Buttons>
                        <Buttons variant="outlined" size="small" color="inherit" onClick={async () => {
                            await this.clickLanguage("turkish", true)
                        }}>Turkish</Buttons></div> :
                        <div>
                            <Buttons variant="outlined" size="small" color="inherit" onClick={async () => {
                                await this.clickLanguage("english", true)
                            }}>English</Buttons>
                            <Buttons variant="text" size="small" color="inherit" onClick={async () => {
                                await this.clickLanguage("turkish", true)
                            }}>Turkish</Buttons></div>}
                </span>
                <div className="center textMiddle">
                    {this.state.turkish ? <object data={litepaper_turkish} type="application/pdf" width="1000px" height="950px"></object> : <object data={litepaper} type="application/pdf" width="1000px" height="950px"></object>}
                </div>
            </div>

        );
    }
}

export default LitePaper;

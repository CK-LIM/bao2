import React, { Component } from 'react'
import litepaper from './images/Litepaper_Protocol.pdf'
import litepaper_turkish from './images/Litepaper_Protocol(turkish).pdf'
import Buttons from 'react-bootstrap/Button'
import './App.css';
import Footer from './Footer'


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
                    {this.state.turkish ?
                        <div>
                            <Buttons style={{ color: "black", fontSize: "16px" }} variant="link" size="sm" onClick={async () => {
                                await this.clickLanguage("english", true)
                            }}>English</Buttons>
                            <Buttons style={{ color: "#ff9a04", border: "1px solid #ff9a04", fontSize: "16px" }} variant="link" size="sm" onClick={async () => {
                                await this.clickLanguage("turkish", true)
                            }}>Turkish</Buttons>
                        </div>
                        : <div>
                            <Buttons style={{ color: "#ff9a04", border: "1px solid #ff9a04", fontSize: "16px" }} variant="link" size="sm" onClick={async () => {
                                await this.clickLanguage("english", true)
                            }}>English</Buttons>
                            <Buttons style={{ color: "black", fontSize: "16px" }} variant="link" size="sm" onClick={async () => {
                                await this.clickLanguage("turkish", true)
                            }}>Turkish</Buttons>
                        </div>}
                </span>
                <div className="center textMiddle">
                    {this.state.turkish ? <object data={litepaper_turkish} type="application/pdf" width="100%" height="700px"></object> : <object data={litepaper} type="application/pdf" width="100%" height="700px"></object>}
                </div>
                <Footer />
            </div>

        );
    }
}

export default LitePaper;

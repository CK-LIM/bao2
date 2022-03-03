import React, { Component } from 'react'
import litepaper from '../Litepaper_Protocol.pdf'
import './App.css';

class LitePaper extends Component {

    render() {
        return (
            <div id="content">
                <div className="center textMiddle">
                    <object data={litepaper} type="application/pdf" width="1100px" height="950px"></object>
                </div>
            </div>

        );
    }
}

export default LitePaper;

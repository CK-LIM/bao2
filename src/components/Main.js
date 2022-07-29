import React, { Component } from 'react'
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import ImgNextGen from './ImgNextGen';
import { IMAGES } from "./Images"
import './App.css';

// import baklava from './images/baklava.webp';
// import baklava_mainBottom_removebg from './images/baklava_mainBottom_removebg.webp';
// import joe from './images/joe.webp';
// import pangolin from './images/pangolin.webp';
// import kyber from './images/kyber.webp';

import discord from './images/discord.svg';
import docs from './images/docs.svg';
import github from './images/github.svg';
import medium from './images/medium.svg';
import twitter from './images/twitter.svg';


class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imgsLoaded: true
    }
  }

  setImgsLoaded(bool) {
    let imgsLoaded
    this.setState(imgsLoaded = bool)
  }

  render() {
    const loadImage = image => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = image.url
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image.url)
          }, 1000)

        loadImg.onerror = err => reject(err)
      })
    }

    return (
      <div id="content">
        <MediaQuery minWidth={771}>
          <div className="text-center" style={{ marginTop: "35px" }}>
            <ImgNextGen
              srcWebp={IMAGES[0].url}
              width="200" height="200" className="" alt=""
            />
          </div>
          <div className="center text" style={{ fontSize: "45px" }}>BAKLAVA SPACE</div>
          <div className="center textMiddleBold" style={{ fontSize: "25px", marginTop: "5px" }}><b>Baklava stands for "layered, rich, and sweet". </b></div>
          <div className="center textMiddle" style={{ fontSize: "18px", marginTop: "10px" }}>Baklava Space is designed as a combination of automated yield farming</div>
          <div className="center textMiddle" style={{ fontSize: "18px" }}>for your LP tokens and a synthetic creation mechainsm using LP tokens.</div>
          <div className="center" style={{ marginTop: "40px" }} >
            <Link className="exLink0" style={{ marginRight: '35px' }} to={{ pathname: "https://traderjoexyz.com/#/home" }} target="_blank">
              <div className="center mb-2">
                <ImgNextGen
                  srcWebp={IMAGES[2].url}
                  width="50" height="50" align="right" alt=""
                />
              </div>
            </Link>
            <Link className="exLink0" style={{ marginRight: '33px' }} to={{ pathname: "https://app.pangolin.exchange/" }} target="_blank">
              <div className="center mb-2">
                <ImgNextGen
                  srcWebp={IMAGES[3].url}
                  width="50" height="50" align="right" alt=""
                />
              </div>
            </Link>
            <Link className="exLink0" to={{ pathname: "https://kyberswap.com/#/about/" }} target="_blank">
              <div className="center mb-2">
                <ImgNextGen
                  srcWebp={IMAGES[4].url}
                  width="50" height="50" align="right" alt=""
                />
              </div>
            </Link>
          </div>
          <MediaQuery minHeight={700}>
            <ImgNextGen
              srcWebp={IMAGES[1].url}
              alt=""
              height="8%" width="100%" className="fixed-bottom"
            />
          </MediaQuery>
        </MediaQuery>


        <MediaQuery minWidth={401} maxWidth={770}>
          <div style={{ minWidth: "300px" }} >
            <div className="center">
              <ImgNextGen
                srcWebp={IMAGES[0].url}
                width="180" height="180" className="" alt=""
              />
            </div>
            <div className="center text" style={{ fontSize: "40px" }}>BAKLAVA SPACE</div>
            <div className="center textMiddleBold ml-3 mr-3" style={{ fontSize: "23px", marginTop: "5px" }}><b>Baklava stands for "layered, rich, and sweet". </b></div>
            <div className="center textMiddle ml-3 mr-3" style={{ fontSize: "16px", marginTop: "10px" }}>Baklava Space is designed as a combination of automated yield farming for your LP tokens and a synthetic creation mechainsm using LP tokens.</div>
            <div className="center" style={{ marginTop: "40px" }} >
              <Link className="exLink0" style={{ marginRight: '35px' }} to={{ pathname: "https://traderjoexyz.com/#/home" }} target="_blank">
                <div className="center mb-2">
                  <ImgNextGen
                    srcWebp={IMAGES[2].url}
                    width="45" height="45" align="right" alt=""
                  />
                </div>
              </Link>
              <Link className="exLink0" style={{ marginRight: '33px' }} to={{ pathname: "https://app.pangolin.exchange/" }} target="_blank">
                <div className="center mb-2">
                  <ImgNextGen
                    srcWebp={IMAGES[3].url}
                    width="45" height="45" align="right" alt=""
                  />
                </div>
              </Link>
              <Link className="exLink0" to={{ pathname: "https://kyberswap.com/#/about/" }} target="_blank">
                <div className="center mb-2">
                  <ImgNextGen
                    srcWebp={IMAGES[4].url}
                    width="45" height="45" align="right" alt=""
                  />
                </div>
              </Link>
            </div>
            <MediaQuery minHeight={701}>
              <div className="center fixed-bottom" style={{ marginBottom: "30px" }}>
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
                  <Link className="exLink0" style={{ marginRight: '' }} to={{ pathname: "https://discord.gg/E6aYX5ukAw" }} target="_blank">
                    <div className="center mb-2"><img src={discord} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                </div>
              </div>
            </MediaQuery>
            <MediaQuery maxHeight={700}>
              <div className="center" style={{ marginTop: "60px" }}>
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
                  <Link className="exLink0" style={{ marginRight: '' }} to={{ pathname: "https://discord.gg/E6aYX5ukAw" }} target="_blank">
                    <div className="center mb-2"><img src={discord} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                </div>
              </div>
              <br />
            </MediaQuery>
          </div>
        </MediaQuery>









        <MediaQuery maxWidth={400}>
          <div style={{ minWidth: "300px" }}>
            <div className="text-center">
              <ImgNextGen
                srcWebp={IMAGES[0].url}
                width="180" height="180" className="" alt=""
              />
            </div>
            <div className="center text" style={{ fontSize: "35px" }}>BAKLAVA SPACE</div>
            <div className="center textMiddleBold ml-3 mr-3" style={{ fontSize: "20px" }}><b>Baklava stands for "layered, rich, and sweet". </b></div>
            <div className="center textMiddle ml-3 mr-3" style={{ fontSize: "15px" }}>Baklava Space is designed as a combination of automated yield farming for your LP tokens and a synthetic creation mechainsm using LP tokens.</div>
            <div className="center" style={{ marginTop: "30px" }} >
              <Link className="exLink0" style={{ marginRight: '35px' }} to={{ pathname: "https://traderjoexyz.com/#/home" }} target="_blank">
                <div className="center mb-2">
                  <ImgNextGen
                    srcWebp={IMAGES[2].url}
                    width="40" height="40" align="right" alt=""
                  />
                </div>
              </Link>
              <Link className="exLink0" style={{ marginRight: '33px' }} to={{ pathname: "https://app.pangolin.exchange/" }} target="_blank">
                <div className="center mb-2">
                  <ImgNextGen
                    srcWebp={IMAGES[3].url}
                    width="40" height="40" align="right" alt=""
                  />
                </div>
              </Link>
              <Link className="exLink0" to={{ pathname: "https://kyberswap.com/#/about/" }} target="_blank">
                <div className="center mb-2">
                  <ImgNextGen
                    srcWebp={IMAGES[4].url}
                    width="40" height="40" align="right" alt=""
                  />
                </div>
              </Link>
            </div>
            <MediaQuery minHeight={701}>
              <div className="center fixed-bottom" style={{ marginBottom: "30px" }}>
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
                  <Link className="exLink0" style={{ marginRight: '' }} to={{ pathname: "https://discord.gg/E6aYX5ukAw" }} target="_blank">
                    <div className="center mb-2"><img src={discord} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                </div>
              </div>
            </MediaQuery>
            <MediaQuery maxHeight={700}>
              <div className="center" style={{ marginTop: "60px" }}>
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
                  <Link className="exLink0" style={{ marginRight: '' }} to={{ pathname: "https://discord.gg/E6aYX5ukAw" }} target="_blank">
                    <div className="center mb-2"><img src={discord} width="20" height="20" align="right" alt="" /></div>
                  </Link>
                </div>
              </div>
              <br />
            </MediaQuery>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default Main;

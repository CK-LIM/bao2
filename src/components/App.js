import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WalletConnectProvider from "@walletconnect/web3-provider";

import LpToken from '../abis/LpToken.json'
import IPancakePair from '../abis/IPancakePair.json'
import BavaToken from '../abis/BavaToken.json'
import BavaMasterFarmer from '../abis/BavaMasterFarmer.json'

import Navb from './Navbar'
import Main from './Main'
import Menu from './Menu'
import TraderJoe from './TraderJoe'
import Deposit from './Deposit'
import Popup from './Popup'
import './Popup.css'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.loadTVLAPR()
    while (this.state.loading == true) {
      await this.loadBlockchainData()
      console.log("repeatfalse")
      await this.delay(1500);
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const web3Ava = window.web3Ava

    const networkId = "1"
    this.setState({ networkId })

    if (this.state.metamask == true) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      this.setState({ chainId })
      if (this.state.chainId == "0x61") {
        this.setState({ networkName: "BSC Testnet" })
      } else if (this.state.chainId == "0x38") {
        this.setState({ networkName: "BSC" })
      } else if (this.state.chainId == "0x1") {
        this.setState({ networkName: "Ethereum" })
      } else if (this.state.chainId == "0x3") {
        this.setState({ networkName: "Ropsten" })
      } else if (this.state.chainId == "0x4") {
        this.setState({ networkName: "Rinkeby" })
      } else if (this.state.chainId == "0x2a") {
        this.setState({ networkName: "Kovan" })
      } else if (this.state.chainId == "0x89") {
        this.setState({ networkName: "Polygon" })
      } else if (this.state.chainId == "0x13881") {
        this.setState({ networkName: "Mumbai" })
      } else if (this.state.chainId == "0xa869") {
        this.setState({ networkName: "Fuji" })
      } else if (this.state.chainId == "0xa86a") {
        this.setState({ networkName: "Avalanche" })
      }
      window.ethereum.on('chainChanged', this.handleChainChanged);
      window.ethereum.on('accountsChanged', this.handleAccountsChanged);
    } else {
      this.setState({ chainID: "0x" })
      this.setState({ networkName: "Unavailable" })
    }



    if (this.state.wallet == false && this.state.walletConnect == false) {
      console.log("abc")
      // Load bavaToken
      const bavaTokenData = BavaToken.networks[networkId]

      if (bavaTokenData) {
        const bavaToken = new web3Ava.eth.Contract(BavaToken.abi, bavaTokenData.address)
        this.setState({ bavaToken })
        let bavaTokenBalance = 0
        this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
        let bavaTokenTotalSupply = await bavaToken.methods.totalSupply().call()
        let bavaTokenCapSupply = await bavaToken.methods.cap().call()
        let bavaTokenLock = await bavaToken.methods.totalLock().call()
        this.setState({ bavaTokenTotalSupply: bavaTokenTotalSupply.toString() })
        this.setState({ bavaTokenCapSupply: bavaTokenCapSupply.toString() })
        this.setState({ bavaTokenLock: bavaTokenLock.toString() })
      }

      // Load bavaMasterFarmer
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[networkId]
      if (bavaMasterFarmeryData) {
        const bavaMasterFarmer = new web3Ava.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
        this.setState({ bavaMasterFarmer })

        let poolLength = await bavaMasterFarmer.methods.poolLength().call()
        let startBlk = await bavaMasterFarmer.methods.START_BLOCK().call()
        this.setState({ poolLength })
        this.setState({ startBlk })
        let totalrewardperblock = await bavaMasterFarmer.methods.REWARD_PER_BLOCK().call()
        this.setState({ totalrewardperblock: totalrewardperblock.toString() })
        console.log(this.state.totalrewardperblock)
        let totalpendingReward = 0

        let userSegmentInfo = [[], []]
        let poolSegmentInfo = [[], []]
        let lpTokenBalanceAccount = [[], []]
        let lpTokenSegmentAsymbol = [[], []]
        let lpTokenSegmentBsymbol = [[], []]
        let lpTokenSegmentAllowance = [[], []]
        let pendingSegmentReward = [[], []]
        let n = 0
        let i = 0
        let totalallocPoint = 0
        for (i = 0; i < this.state.poolLength; i++) {

          let poolInfo = await bavaMasterFarmer.methods.poolInfo(i).call()
          let lpTokenAddress = poolInfo.lpToken
          let lpTokenPair = new web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
          let lpTokenPairA = await lpTokenPair.methods.token0().call()
          let lpTokenPairB = await lpTokenPair.methods.token1().call()
          let lpTokenA = new web3Ava.eth.Contract(LpToken.abi, lpTokenPairA)
          let lpTokenB = new web3Ava.eth.Contract(LpToken.abi, lpTokenPairB)
          let lpTokenPairsymbol = await lpTokenPair.methods.symbol().call()
          let lpTokenAsymbol = await lpTokenA.methods.symbol().call()
          let lpTokenBsymbol = await lpTokenB.methods.symbol().call()

          if (lpTokenAsymbol.slice(-2) === ".e") {
            lpTokenAsymbol = lpTokenAsymbol.slice(0, -2)
          }
          if (lpTokenBsymbol.slice(-2) === ".e") {
            lpTokenBsymbol = lpTokenBsymbol.slice(0, -2)
          }
          totalpendingReward = 0
          totalallocPoint += parseInt(poolInfo["allocPoint"])

          if (lpTokenPairsymbol == "PGL") {
            userSegmentInfo[0][n] = { amount: "", blockdelta: "", firstDepositBlock: "", lastDepositBlock: "", lastWithdrawBlock: "", rewardDebt: "", rewardDebtAtBlock: "" }
            poolSegmentInfo[0][n] = poolInfo
            lpTokenBalanceAccount[0][n] = "0"
            lpTokenSegmentAsymbol[0][n] = lpTokenAsymbol
            lpTokenSegmentBsymbol[0][n] = lpTokenBsymbol
            pendingSegmentReward[0][n] = "0"
            lpTokenSegmentAllowance[0][n] = "0"
            n += 1
          } else {
            userSegmentInfo[1][n] = { amount: "", blockdelta: "", firstDepositBlock: "", lastDepositBlock: "", lastWithdrawBlock: "", rewardDebt: "", rewardDebtAtBlock: "" }
            poolSegmentInfo[1][n] = poolInfo
            lpTokenBalanceAccount[1][n] = "0"
            lpTokenSegmentAsymbol[1][n] = lpTokenAsymbol
            lpTokenSegmentBsymbol[1][n] = lpTokenBsymbol
            pendingSegmentReward[1][n] = "0"
            lpTokenSegmentAllowance[1][n] = "0"
            n += 1
          }
        }
        this.setState({ userSegmentInfo })
        this.setState({ lpTokenBalanceAccount })
        this.setState({ lpTokenSegmentAsymbol })
        this.setState({ lpTokenSegmentBsymbol })
        this.setState({ pendingSegmentReward })
        this.setState({ lpTokenSegmentAllowance })
        this.setState({ totalallocPoint })
        this.setState({ poolSegmentInfo })
        this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
        this.setState({ farmloading: true })
      }
    }

    // #########################################################################################################################
    else {
      console.log("abc")

      // Load bavaToken
      let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
      let bavaTokenTotalSupply = await this.state.bavaToken.methods.totalSupply().call()
      let bavaTokenCapSupply = await this.state.bavaToken.methods.cap().call()
      let bavaTokenLock = await this.state.bavaToken.methods.totalLock().call()
      this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
      this.setState({ bavaTokenTotalSupply: bavaTokenTotalSupply.toString() })
      this.setState({ bavaTokenCapSupply: bavaTokenCapSupply.toString() })
      this.setState({ bavaTokenLock: bavaTokenLock.toString() })

      // Load bavaMasterFarmer
      // let poolLength = await this.state.bavaMasterFarmer.methods.poolLength().call()
      // let startBlk = await this.state.bavaMasterFarmer.methods.START_BLOCK().call()
      // this.setState({ poolLength })
      // this.setState({ startBlk })
      let totalpendingReward = 0

      let userSegmentInfo = [[], []]
      let poolSegmentInfo = [[], []]
      let lpTokenBalanceAccount = [[], []]
      let lpTokenSegmentAsymbol = [[], []]
      let lpTokenSegmentBsymbol = [[], []]
      let lpTokenSegmentAllowance = [[], []]
      let pendingSegmentReward = [[], []]
      let lpTokenValue = [[], []]
      let n = 0
      let i = 0
      // let totalallocPoint = 0
      for (i = 0; i < this.state.poolLength; i++) {

        let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
        let poolInfo = await this.state.bavaMasterFarmer.methods.poolInfo(i).call()

        let lpTokenAddress = poolInfo.lpToken
        let lpTokenPair = new web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
        let lpTokenPairA = await lpTokenPair.methods.token0().call()
        let lpTokenPairB = await lpTokenPair.methods.token1().call()
        let lpTokenA = new web3Ava.eth.Contract(LpToken.abi, lpTokenPairA)
        let lpTokenB = new web3Ava.eth.Contract(LpToken.abi, lpTokenPairB)
        let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
        let lpTokenPairsymbol = await lpTokenPair.methods.symbol().call()
        let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.bavaMasterFarmer._address).call()
        let lpTokenAsymbol = await lpTokenA.methods.symbol().call()
        let lpTokenBsymbol = await lpTokenB.methods.symbol().call()

        let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
        if (lpTokenAsymbol.slice(-2) === ".e") {
          lpTokenAsymbol = lpTokenAsymbol.slice(0, -2)
        }
        if (lpTokenBsymbol.slice(-2) === ".e") {
          lpTokenBsymbol = lpTokenBsymbol.slice(0, -2)
        }
        totalpendingReward += parseInt(pendingReward)

        if (lpTokenPairsymbol == "PGL") {
          userSegmentInfo[0][n] = userInfo
          poolSegmentInfo[0][n] = poolInfo
          lpTokenBalanceAccount[0][n] = lpTokenBalance
          lpTokenSegmentAsymbol[0][n] = lpTokenAsymbol
          lpTokenSegmentBsymbol[0][n] = lpTokenBsymbol
          lpTokenSegmentAllowance[0][n] = lpTokenAllowance
          pendingSegmentReward[0][n] = web3.utils.fromWei(pendingReward, 'Ether')
          n += 1
        } else {
          userSegmentInfo[1][n] = userInfo
          poolSegmentInfo[1][n] = poolInfo
          lpTokenBalanceAccount[1][n] = lpTokenBalance
          lpTokenSegmentAsymbol[1][n] = lpTokenAsymbol
          lpTokenSegmentBsymbol[1][n] = lpTokenBsymbol
          lpTokenSegmentAllowance[1][n] = lpTokenAllowance
          pendingSegmentReward[1][n] = web3.utils.fromWei(pendingReward, 'Ether')
          n += 1
        }
      }
      this.setState({ userSegmentInfo })
      this.setState({ lpTokenBalanceAccount })
      this.setState({ lpTokenSegmentAsymbol })
      this.setState({ lpTokenSegmentBsymbol })
      this.setState({ pendingSegmentReward })
      this.setState({ lpTokenSegmentAllowance })
      this.setState({ lpTokenValue })
      this.setState({ poolSegmentInfo })
      this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })

    }
    this.setState({ farmloading: true })

  }

  async loadTVLAPR() {
    // ***************************TVL & APR***********************************************************************

    // Load bavaMasterFarmer
    const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]

    let lpTokenSegmentInContract = [[], []]
    let lpTokenValue = [[], []]
    let tvl = [[], []]
    let apr = [[], []]
    let n = 0
    let i = 0
    for (i = 0; i < this.state.poolLength; i++) {

      let poolInfo = await this.state.bavaMasterFarmer.methods.poolInfo(i).call()
      let lpTokenAddress = poolInfo.lpToken
      let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
      let lpTokenPairA = await lpTokenPair.methods.token0().call()
      let lpTokenPairB = await lpTokenPair.methods.token1().call()
      let lpTokenA = new window.web3Ava.eth.Contract(LpToken.abi, lpTokenPairA)
      let lpTokenB = new window.web3Ava.eth.Contract(LpToken.abi, lpTokenPairB)
      let lpTokenPairsymbol = await lpTokenPair.methods.symbol().call()
      let lpTokenAsymbol = await lpTokenA.methods.symbol().call()
      let lpTokenBsymbol = await lpTokenB.methods.symbol().call()

      let lpTokenInContract = await lpTokenPair.methods.balanceOf(bavaMasterFarmeryData.address).call()
      lpTokenInContract = window.web3Ava.utils.fromWei(lpTokenInContract, "ether")
      let lpTokenTSupply = await lpTokenPair.methods.totalSupply().call()
      let lpTokenABalanceContract = await lpTokenA.methods.balanceOf(lpTokenAddress).call()
      let lpTokenBBalanceContract = await lpTokenB.methods.balanceOf(lpTokenAddress).call()

      let tokenAPrice = 0
      let tokenBPrice = 0
      if (lpTokenAsymbol.slice(-2) === ".e") {
        lpTokenAsymbol = lpTokenAsymbol.slice(0, -2)
      }
      if (lpTokenBsymbol.slice(-2) === ".e") {
        lpTokenBsymbol = lpTokenBsymbol.slice(0, -2)
      }
      if (lpTokenAsymbol == "BAVA") {
        tokenAPrice = this.state.BAVAPrice
      } else if (lpTokenAsymbol == "WAVAX") {
        tokenAPrice = this.state.WAVAXPrice
      } else if (lpTokenAsymbol == "PNG") {
        tokenAPrice = this.state.PNGPrice
      } else if (lpTokenAsymbol == "WETH") {
        tokenAPrice = this.state.WETHPrice
      } else if (lpTokenAsymbol == "USDT") {
        tokenAPrice = this.state.USDTPrice
      } else if (lpTokenAsymbol == "USDC") {
        tokenAPrice = this.state.USDCPrice
      }
      if (lpTokenBsymbol == "BAVA") {
        tokenBPrice = this.state.BAVAPrice
      } else if (lpTokenBsymbol == "WAVAX") {
        tokenBPrice = this.state.WAVAXPrice
      } else if (lpTokenBsymbol == "PNG") {
        tokenBPrice = this.state.PNGPrice
      } else if (lpTokenBsymbol == "WETH") {
        tokenBPrice = this.state.WETHPrice
      } else if (lpTokenBsymbol == "USDT") {
        tokenBPrice = this.state.USDTPrice
      } else if (lpTokenBsymbol == "USDC") {
        tokenBPrice = this.state.USDCPrice
      }
      // totalallocPoint += parseInt(poolInfo["allocPoint"])

      if (lpTokenPairsymbol == "PGL") {
        lpTokenSegmentInContract[0][n] = lpTokenInContract
        lpTokenValue[0][n] = ((lpTokenABalanceContract * tokenAPrice) + (lpTokenBBalanceContract * tokenBPrice)) / lpTokenTSupply
        tvl[0][n] = lpTokenValue[0][n] * lpTokenInContract
        apr[0][n] = ((28000 * 315 * 365 * poolInfo.allocPoint * window.web3Ava.utils.fromWei(this.state.totalrewardperblock, 'ether') * this.state.BAVAPrice) / (lpTokenSegmentInContract[0][n] * this.state.totalallocPoint * lpTokenValue[0][n])) * 100
        n += 1
      } else {
        lpTokenSegmentInContract[1][n] = lpTokenInContract
        lpTokenValue[1][n] = ((lpTokenABalanceContract * tokenAPrice) + (lpTokenBBalanceContract * tokenBPrice)) / lpTokenTSupply
        tvl[1][n] = lpTokenValue[1][n] * lpTokenInContract
        apr[1][n] = ((28000 * 315 * 365 * poolInfo.allocPoint * window.web3Ava.utils.fromWei(this.state.totalrewardperblock, 'ether') * this.state.BAVAPrice) / (lpTokenSegmentInContract[1][n] * this.state.totalallocPoint * lpTokenValue[1][n])) * 100
        n += 1
      }
    }

    this.setState({ tvl })
    this.setState({ apr })

    this.setState({ aprloading: true })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      // await window.ethereum.enable()
      this.setState({ metamask: true })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      this.setState({ metamask: true })
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      this.setState({ metamask: false })
    }
    window.web3Ava = new Web3(`https://api.avax-test.network/ext/bc/C/rpc`);
    // let response = await fetch(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/43114/USD/0x65378b697853568dA9ff8EaB60C13E1Ee9f4a654%2C0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7%2C0x60781c2586d68229fde47564546784ab3faca982%2C0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB%2C0xc7198437980c041c805A1EDcbA50c1Ce5db95118%2C0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/?key=${process.env.REACT_APP_covalentapikey}`);
    let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=husky-avax%2Cwrapped-avax%2Cpangolin%2Cweth%2Cusd-coin%2Ctether&vs_currencies=usd`);
    const myJson = await response.json();
    let BAVAPrice = myJson["husky-avax"]["usd"]
    this.setState({ BAVAPrice: "0.10" })
    let WAVAXPrice = myJson["wrapped-avax"]["usd"]
    this.setState({ WAVAXPrice: WAVAXPrice.toFixed(10) })
    let PNGPrice = myJson["pangolin"]["usd"]
    this.setState({ PNGPrice: PNGPrice.toFixed(10) })
    let WETHPrice = myJson["weth"]["usd"]
    this.setState({ WETHPrice: WETHPrice.toFixed(10) })
    let USDTPrice = myJson["tether"]["usd"]
    this.setState({ USDTPrice: USDTPrice.toFixed(10) })
    let USDCPrice = myJson["usd-coin"]["usd"]
    this.setState({ USDCPrice: USDCPrice.toFixed(10) })
    this.setState({ loading: true })
  }



  connectWallet = () => {
    if (this.state.metamask == true) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async () => {
          await this.switchNetwork()
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId == "0xa869") {
            this.setWalletTrigger(true)
            this.WalletDisconnect()
            // this.componentWillMount()
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
      // this.componentWillMount()
    } else {
      alert("No wallet provider was found")
    }

  }


  WalletConnect = async () => {
    window.provider = new WalletConnectProvider({
      rpc: {
        1: "https://api.avax-test.network/ext/bc/C/rpc"
      },
      // chainId: 1,
    });
    await window.provider.enable();
    window.web3Con = await new Web3(window.provider);
    const accounts = await window.web3Con.eth.getAccounts();
    // const chainId = await window.web3.eth.net.getId() 
    const chainId = await window.provider.request('eth_chainId');
    console.log(chainId)
    this.setState({ account: accounts[0] })
    const first4Account = this.state.account.substring(0, 4)
    const last4Account = this.state.account.slice(-4)
    this.setState({ first4Account: first4Account })
    this.setState({ last4Account: last4Account })
    this.setState({ walletConnect: true })
    this.setWalletTrigger(false)
  }

  WalletDisconnect = async () => {
    if (this.state.walletConnect == true) {
      console.log("disconnected")
      await window.provider.disconnect()
      this.setState({ walletConnect: false })
    }
  }



  switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa869' }],
      });
    } catch (switchError) {
      // console.log(switchError.code)
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          // console.log(switchError.code)
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xa869', rpcUrls: ['https://data-seed-prebsc-1-s2.binance.org:8545'], chainName: 'Fuji',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB', // 2-6 characters long
                decimals: 18
              }, blockExplorerUrls: ['https://testnet.bscscan.com/']
            }],
          });
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          this.setState({ chainId })
          if (this.state.chainId == "0x61") {
            this.setState({ networkName: "BSC Testnet" })
          } else if (this.state.chainId == "0x38") {
            this.setState({ networkName: "BSC" })
          } else if (this.state.chainId == "0x1") {
            this.setState({ networkName: "Ethereum" })
          } else if (this.state.chainId == "0x3") {
            this.setState({ networkName: "Ropsten" })
          } else if (this.state.chainId == "0x4") {
            this.setState({ networkName: "Rinkeby" })
          } else if (this.state.chainId == "0x2a") {
            this.setState({ networkName: "Kovan" })
          } else if (this.state.chainId == "0x89") {
            this.setState({ networkName: "Polygon" })
          } else if (this.state.chainId == "0x13881") {
            this.setState({ networkName: "Mumbai" })
          } else if (this.state.chainId == "0xa869") {
            this.setState({ networkName: "Fuji" })
          } else if (this.state.chainId == "0xa86a") {
            this.setState({ networkName: "Avalanche" })
          }
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }


  handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
      this.setWalletTrigger(false)
    } else if (accounts[0] !== this.state.account) {
      this.setState({ account: accounts[0] })
      // this.state.account = accounts[0];
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      // Do any other work!
    }
  }

  handleChainChanged = async (_chainId) => {
    // We recommend reloading the page, unless you must do otherwise
    // window.location.reload();
    console.log("network changed")
    if (_chainId != "0xa869") {
      this.setWalletTrigger(false)
    }
    if (this.state.chainId !== _chainId) {
      console.log(this.state.chainId)
      console.log(_chainId)
      console.log("network changed2")
      this.state.chainId = _chainId

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      this.setState({ chainId })
      if (this.state.chainId == "0x61") {
        this.setState({ networkName: "BSC Testnet" })
      } else if (this.state.chainId == "0x38") {
        this.setState({ networkName: "BSC" })
      } else if (this.state.chainId == "0x1") {
        this.setState({ networkName: "Ethereum" })
      } else if (this.state.chainId == "0x3") {
        this.setState({ networkName: "Ropsten" })
      } else if (this.state.chainId == "0x4") {
        this.setState({ networkName: "Rinkeby" })
      } else if (this.state.chainId == "0x2a") {
        this.setState({ networkName: "Kovan" })
      } else if (this.state.chainId == "0x89") {
        this.setState({ networkName: "Polygon" })
      } else if (this.state.chainId == "0x13881") {
        this.setState({ networkName: "Mumbai" })
      } else if (this.state.chainId == "0xa869") {
        this.setState({ networkName: "Fuji" })
      } else if (this.state.chainId == "0xa86a") {
        this.setState({ networkName: "Avalanche" })
      }
      this.switchNetwork()
      // Run any other necessary logic...
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  deposit = async (i, amount) => {
    if (this.state.walletConnect == true) {
      this.setState({ loading: true })
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      bavaMasterFarmer.methods.deposit(i, amount, this.state.account).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        this.componentWillMount()
      })
    } else if (this.state.wallet == true) {
      this.setState({ loading: true })
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      bavaMasterFarmer.methods.deposit(i, amount, this.state.account).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        this.componentWillMount()
      })
    }
  }

  approve = async (i, n) => {
    if (this.state.walletConnect == true) {
      this.setState({ loading: false })
      let lpTokenAddress = await this.state.poolSegmentInfo[n][i].lpToken
      let lpToken = new window.web3Con.eth.Contract(LpToken.abi, lpTokenAddress)
      await lpToken.methods.approve(this.state.bavaMasterFarmer._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account })
      this.componentWillMount()
      this.setState({ loading: true })
    } else if (this.state.wallet == true) {
      this.setState({ loading: false })
      let lpTokenAddress = await this.state.poolSegmentInfo[n][i].lpToken
      let lpToken = new window.web3.eth.Contract(LpToken.abi, lpTokenAddress)
      await lpToken.methods.approve(this.state.bavaMasterFarmer._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account })
      this.componentWillMount()
      this.setState({ loading: true })
    }
  }

  withdraw = (i, amount) => {
    if (this.state.walletConnect == true) {
      this.setState({ loading: true })
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      bavaMasterFarmer.methods.withdraw(i, amount, this.state.account).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        this.componentWillMount()
      })
    } else if (this.state.wallet == true) {
      this.setState({ loading: true })
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      bavaMasterFarmer.methods.withdraw(i, amount, this.state.account).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        this.componentWillMount()
      })
    }
  }

  harvest = async (i, n) => {
    if (this.state.walletConnect == true) {
      this.setState({ loading: false })
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)

      if (this.state.pendingSegmentReward[n][i] <= 0) {
        alert("No token to harvest! Please deposit PANCAKE LP to earn PURSE")
      } else {
        this.setState({ loading: true })
        bavaMasterFarmer.methods.claimReward(i).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          this.componentWillMount()
        })
      }
      this.setState({ loading: true })
    } else if (this.state.wallet == true) {
      this.setState({ loading: false })
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)

      if (this.state.pendingSegmentReward[n][i] <= 0) {
        alert("No token to harvest! Please deposit PANCAKE LP to earn PURSE")
      } else {
        this.setState({ loading: true })
        bavaMasterFarmer.methods.claimReward(i).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
          this.componentWillMount()
        })
      }
      this.setState({ loading: true })
    } else {
      alert("Wallet is not connected")
    }
  }


  setI = (type, pair) => {
    this.setState({ n: type })
    this.setState({ i: pair })
  }

  setTrigger = (state) => {
    this.setState({ buttonPopup: state })
  }

  setWalletTrigger = async (state) => {
    if (state == false) {
      await this.setState({ wallet: state })
    } else {
      console.log("trigger")
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ wallet: state })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      lpToken: {},
      bavaToken: {},
      restakingFarm: {},
      bavaTokenBalance: '0',
      bavaTokenTotalSupply: '0',
      bavaTokenCapSupply: '0',
      bavaTokenLock: '0',
      i: '0',
      n: '0',
      loading: false,
      farmloading: false,
      wallet: false,
      metamask: false,
      aprloading: false,
      walletConnect: false,
      userSegmentInfo: [[], []],
      poolSegmentInfo: [[], []],
      lpTokenSegmentInContract: [[], []],
      lpTokenBalanceAccount: [[], []],
      lpTokenSegmentAsymbol: [[], []],
      lpTokenSegmentBsymbol: [[], []],
      pendingSegmentReward: [[], []],
      lpTokenSegmentAllowance: [[], []],
      lpTokenValue: [[], []],
      tvl: [[], []],
      totalrewardperblock: '0',
      totalpendingReward: '0',
      buttonPopup: false,
      networkName: "Loading",
      poolLength: '0',
      startBlk: '0',
      totalallocPoint: '0'

    }
  }

  render() {
    let maincontent
    let menucontent
    let depositcontent
    let traderjoecontent
    if (this.state.loading == false) {
      maincontent =
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="textLoading">NETWORK IS Loading...</div>
          </div>
        </div>
      depositcontent =
        <div className="textLoadingSmall">Loading...</div>
      menucontent =
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="textLoading">NETWORK IS Loading...</div>
          </div>
        </div>
    } else {
      maincontent = <Main
        lpTokenBalance={this.state.lpTokenBalance}
        bavaTokenBalance={this.state.bavaTokenBalance}
        deposit={this.deposit}
        withdraw={this.withdraw}
        lpTokenInContract={this.state.lpTokenInContract}
        poolLength={this.state.poolLength}
        totalrewardperblock={this.state.totalrewardperblock}
        startBlk={this.state.startBlk}
        bavaTokenTotalSupply={this.state.bavaTokenTotalSupply}
        bavaTokenCapSupply={this.state.bavaTokenCapSupply}
        bavaTokenLock={this.state.bavaTokenLock}
      />
      menucontent = <Menu
        lpTokenBalance={this.state.lpTokenBalance}
        bavaTokenBalance={this.state.bavaTokenBalance}
        deposit={this.deposit}
        withdraw={this.withdraw}
        setI={this.setI}
        bavaTokenTotalSupply={this.state.bavaTokenTotalSupply}
        totalpendingReward={this.state.totalpendingReward}
        totalrewardperblock={this.state.totalrewardperblock}
        userSegmentInfo={this.state.userSegmentInfo}
        poolSegmentInfo={this.state.poolSegmentInfo}
        lpTokenBalanceAccount={this.state.lpTokenBalanceAccount}
        lpTokenSegmentAsymbol={this.state.lpTokenSegmentAsymbol}
        lpTokenSegmentBsymbol={this.state.lpTokenSegmentBsymbol}
        pendingSegmentReward={this.state.pendingSegmentReward}
        buttonPopup={this.state.buttonPopup}
        setTrigger={this.setTrigger}
        harvest={this.harvest}
        BAVAPrice={this.state.BAVAPrice}
        tvl={this.state.tvl}
        totalallocPoint={this.state.totalallocPoint}
        apr={this.state.apr}
        farmloading={this.state.farmloading}
        aprloading={this.state.aprloading}
      />
      depositcontent = <Deposit
        lpTokenBalance={this.state.lpTokenBalance}
        bavaTokenBalance={this.state.bavaTokenBalance}
        deposit={this.deposit}
        withdraw={this.withdraw}
        i={this.state.i}
        n={this.state.n}
        userSegmentInfo={this.state.userSegmentInfo}
        poolSegmentInfo={this.state.poolSegmentInfo}
        lpTokenBalanceAccount={this.state.lpTokenBalanceAccount}
        lpTokenSegmentAsymbol={this.state.lpTokenSegmentAsymbol}
        lpTokenSegmentBsymbol={this.state.lpTokenSegmentBsymbol}
        pendingSegmentReward={this.state.pendingSegmentReward}
        lpTokenSegmentAllowance={this.state.lpTokenSegmentAllowance}
        wallet={this.state.wallet}
        apr={this.state.apr}
        walletConnect={this.state.walletConnect}
        approve={this.approve}
        connectWallet={this.connectWallet}
      />
      traderjoecontent = <TraderJoe
        lpTokenBalance={this.state.lpTokenBalance}
        bavaTokenBalance={this.state.bavaTokenBalance}
        deposit={this.deposit}
        withdraw={this.withdraw}
        setI={this.setI}
        bavaTokenTotalSupply={this.state.bavaTokenTotalSupply}
        totalpendingReward={this.state.totalpendingReward}
        totalrewardperblock={this.state.totalrewardperblock}
        userSegmentInfo={this.state.userSegmentInfo}
        poolSegmentInfo={this.state.poolSegmentInfo}
        lpTokenBalanceAccount={this.state.lpTokenBalanceAccount}
        lpTokenSegmentAsymbol={this.state.lpTokenSegmentAsymbol}
        lpTokenSegmentBsymbol={this.state.lpTokenSegmentBsymbol}
        pendingSegmentReward={this.state.pendingSegmentReward}
        buttonPopup={this.state.buttonPopup}
        setTrigger={this.setTrigger}
        BAVAPrice={this.state.BAVAPrice}
        tvl={this.state.tvl}
        totalallocPoint={this.state.totalallocPoint}
        apr={this.state.apr}
        farmloading={this.state.farmloading}
        aprloading={this.state.aprloading}
      />
    }

    return (
      <Router>
        <div>
          <Navb
            account={this.state.account}
            first4Account={this.state.first4Account}
            last4Account={this.state.last4Account}
            wallet={this.state.wallet}
            setWalletTrigger={this.setWalletTrigger}
            loadWeb3={this.loadWeb3}
            connectWallet={this.connectWallet}
            WalletConnect={this.WalletConnect}
            WalletDisconnect={this.WalletDisconnect}
            networkName={this.state.networkName}
            walletConnect={this.state.walletConnect}
          />
          <div className="container-fluid mt-4">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '850px' }}>
                <div className="content mr-auto ml-auto">
                  <Switch>
                    <Route path="/" exact > {maincontent} </Route>
                    <Route path="/home" exact > {maincontent} </Route>
                    <Route path="/menu" exact > {menucontent} </Route>
                    <Route path="/deposit" exact > {depositcontent} </Route>
                    <Route path="/traderjoe/" exact > {traderjoecontent} </Route>
                  </Switch>
                  <Popup trigger={this.state.buttonPopup} setTrigger={this.setTrigger}>
                    {depositcontent}
                  </Popup>
                </div>

              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WalletConnectProvider from "@walletconnect/web3-provider";

import LpToken from '../abis/Interface/LpToken.json'
import IPancakePair from '../abis/Interface/IPancakePair.json'
import BavaToken from '../abis/BavaToken.json'
import BavaMasterFarmer from '../abis/BavaMasterFarmerV2.json'
import BavaMasterFarmerV1 from '../abis/BavaMasterFarmerV1.json'

import Farm from './tokens_config/farm.json'
import FarmV1 from './tokens_config/farmV1.json'

import Navb from './Navbar'
import Main from './Main'
import Menu from './Menu'
import TraderJoe from './TraderJoe'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadFarmData()
    await this.loadBlockchainData()
    this.loadTVLAPR()
    while (this.state.loading == true) {
      await this.loadBlockchainData()
      await this.delay(2000);
    }
  }

  async loadFarmData() {
    const farm = Farm.farm
    this.setState({ farm })
    const farmBava = FarmV1.farm
    this.setState({ farmBava })
  }

  async loadBlockchainData() {
    const web3Ava = window.web3Ava
    // const web3AvaTest = window.web3AvaTest
    const networkId = "1"
    this.setState({ networkId })
    const farmNetworkId = "43114"
    this.setState({ farmNetworkId })
    const farmNetwork = "MAINNET"
    this.setState({ farmNetwork })

    const bavaContract = 'https://snowtrace.io/address/0xb5a054312a73581a3c0fed148b736911c02f4539'
    this.setState({ bavaContract })

    if (window.ethereum) {
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
      // Load bavaToken
      const bavaToken = new web3Ava.eth.Contract(BavaToken.abi, process.env.REACT_APP_bavatoken_address)
      this.setState({ bavaToken })

      // Load bavaMasterFarmer
      const bavaMasterFarmer = new web3Ava.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      const bavaMasterFarmerV1 = new web3Ava.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      this.setState({ bavaMasterFarmer })
      this.setState({ bavaMasterFarmerV1 })

      let bavaPoolLength = await bavaMasterFarmerV1.methods.poolLength().call()
      let poolLength = await bavaMasterFarmer.methods.poolLength().call()
      this.setState({ bavaPoolLength })
      this.setState({ poolLength })

      let bavaPoolSegmentInfo = [[], []]
      let poolSegmentInfo = [[], []]
      let returnRatio = [[], []]
      let bavaReturnRatio = [[], []]
      let n = 0
      let b = 0

      let bavaLpTokenPairsymbols = []
      let bavaLpTokenAddresses = []
      let lpTokenPairsymbols = []
      let lpTokenAddresses = []

      let returnRatioArray = this.state.myJsonMongo["ReturnRatio"]

      // UserInfo
      let totalpendingReward = "0"
      let bavaTokenBalance = 0
      let pendingSegmentReward = [[], []]

      this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
      this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
      this.setState({ pendingSegmentReward })

      for (let i = 0; i < this.state.bavaPoolLength; i++) {
        let bavaPoolInfo = this.state.farmBava[i]
        let bavaLpTokenAddress = bavaPoolInfo.lpAddresses[farmNetworkId]
        let bavaLpTokenPairsymbol = bavaPoolInfo.lpTokenPairsymbol
        bavaLpTokenPairsymbols[i] = bavaLpTokenPairsymbol
        bavaLpTokenAddresses[i] = bavaLpTokenAddress

        if (bavaLpTokenPairsymbol == "PGL" || bavaLpTokenPairsymbol == "PNG") {
          bavaPoolSegmentInfo[0][b] = bavaPoolInfo
          bavaReturnRatio[0][b] = 1
          b += 1
        } else {
          bavaPoolSegmentInfo[1][b] = bavaPoolInfo
          bavaReturnRatio[1][b] = 1
          b += 1
        }
      }

      for (let i = 0; i < this.state.poolLength; i++) {
        let poolInfo = this.state.farm[i]
        let lpTokenAddress = poolInfo.lpAddresses[farmNetworkId]
        let lpTokenPairsymbol = poolInfo.lpTokenPairsymbol
        lpTokenPairsymbols[i] = lpTokenPairsymbol
        lpTokenAddresses[i] = lpTokenAddress

        if (lpTokenPairsymbol == "PGL" || lpTokenPairsymbol == "PNG") {
          poolSegmentInfo[0][n] = poolInfo
          returnRatio[0][n] = returnRatioArray[n]["returnRatio"]
          n += 1
        } else {
          poolSegmentInfo[1][n] = poolInfo
          returnRatio[1][n] = returnRatioArray[n]["returnRatio"]
          n += 1
        }
      }

      this.setState({ poolSegmentInfo })
      this.setState({ bavaPoolSegmentInfo })
      this.setState({ lpTokenPairsymbols })
      this.setState({ lpTokenAddresses })
      this.setState({ bavaLpTokenPairsymbols })
      this.setState({ bavaLpTokenAddresses })
      this.setState({ returnRatio })
      this.setState({ bavaReturnRatio })
      this.setState({ farmloading: true })
    }


    // #########################################################################################################################
    else {
      // Load bavaToken
      let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
      this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
      let lockedBavaTokenBalance = await this.state.bavaToken.methods.lockOf(this.state.account).call()
      this.setState({ lockedBavaTokenBalance: lockedBavaTokenBalance.toString() })

      let poolSegmentInfo = [[], []]
      let bavaPoolSegmentInfo = [[], []]
      let totalpendingReward = 0

      let userSegmentInfo = [[], []]
      let lpBalanceAccount = [[], []]
      let lpSegmentAllowance = [[], []]
      let pendingSegmentReward = [[], []]

      let bavaUserSegmentInfo = [[], []]
      let bavaLpBalanceAccount = [[], []]
      let bavaLpSegmentAllowance = [[], []]
      let bavaPendingSegmentReward = [[], []]

      let b = 0
      let n = 0
      let i = 0

      let response0 = []
      let response1 = []
      let response2 = []
      let response3 = []

      let bavaResponse0 = []
      let bavaResponse1 = []
      let bavaResponse2 = []
      let bavaResponse3 = []

      for (i = 0; i < this.state.poolLength; i++) {
        response0[i] = this.loadUserInfo(i)
        response1[i] = this.loadUserInfo1(i)
        response2[i] = this.loadUserInfo2(i)
        response3[i] = this.loadUserInfo3(i)
      }

      for (i = 0; i < this.state.bavaPoolLength; i++) {
        bavaResponse0[i] = this.loadBavaUserInfo(i)
        bavaResponse1[i] = this.loadBavaUserInfo1(i)
        bavaResponse2[i] = this.loadBavaUserInfo2(i)
        bavaResponse3[i] = this.loadBavaUserInfo3(i)
      }

      for (i = 0; i < this.state.poolLength; i++) {
        if (this.state.lpTokenPairsymbols[i] == "PGL" || this.state.lpTokenPairsymbols[i] == "PNG") {
          userSegmentInfo[0][n] = (await response0[i]).amount
          poolSegmentInfo[0][n] = this.state.farm[i]
          lpBalanceAccount[0][n] = await response1[i]
          lpSegmentAllowance[0][n] = await response2[i]
          pendingSegmentReward[0][n] = await response3[i]
          n += 1
        } else {
          userSegmentInfo[1][n] = (await response0[i]).amount
          poolSegmentInfo[1][n] = this.state.farm[i]
          lpBalanceAccount[1][n] = await response1[i]
          lpSegmentAllowance[1][n] = await response2[i]
          pendingSegmentReward[1][n] = await response3[i]
          n += 1
        }
        totalpendingReward += parseInt(await response3[i])
      }

      for (i = 0; i < this.state.bavaPoolLength; i++) {
        if (this.state.bavaLpTokenPairsymbols[i] == "PGL" || this.state.bavaLpTokenPairsymbols[i] == "PNG") {
          bavaUserSegmentInfo[0][b] = (await bavaResponse0[i]).amount
          bavaPoolSegmentInfo[0][b] = this.state.farmBava[i]
          bavaLpBalanceAccount[0][b] = await bavaResponse1[i]
          bavaLpSegmentAllowance[0][b] = await bavaResponse2[i]
          bavaPendingSegmentReward[0][b] = await bavaResponse3[i]
          b += 1
        } else {
          bavaUserSegmentInfo[1][b] = (await bavaResponse0[i]).amount
          bavaPoolSegmentInfo[1][b] = this.state.farmBava[i]
          bavaLpBalanceAccount[1][b] = await bavaResponse1[i]
          bavaLpSegmentAllowance[1][b] = await bavaResponse2[i]
          bavaPendingSegmentReward[1][b] = await bavaResponse3[i]
          b += 1
        }
        totalpendingReward += parseInt(await bavaResponse3[i])
      }

      this.setState({ poolSegmentInfo })
      this.setState({ bavaPoolSegmentInfo })
      this.setState({ userSegmentInfo })
      this.setState({ bavaUserSegmentInfo })
      this.setState({ lpBalanceAccount })
      this.setState({ bavaLpBalanceAccount })
      this.setState({ lpSegmentAllowance })
      this.setState({ bavaLpSegmentAllowance })
      this.setState({ pendingSegmentReward })
      this.setState({ bavaPendingSegmentReward })
      this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
      this.setState({ farmloading: true })
      this.setState({ accountLoading: true })
    }
  }

  // ***************************User Info***********************************************************************************************
  // bavaMasterFarmerV2

  async loadUserInfo(i) {
    let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
    return userInfo
  }

  async loadUserInfo1(i) {
    let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.lpTokenAddresses[i])
    let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
    return lpTokenBalance
  }

  async loadUserInfo2(i) {
    let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.lpTokenAddresses[i])
    let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.bavaMasterFarmer._address).call()
    return lpTokenAllowance
  }

  async loadUserInfo3(i) {
    let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
    return pendingReward
  }

  // bavaMasterFarmerV1****************

  async loadBavaUserInfo(i) {
    let userInfo = await this.state.bavaMasterFarmerV1.methods.userInfo(i, this.state.account).call()
    return userInfo
  }

  async loadBavaUserInfo1(i) {
    let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.bavaLpTokenAddresses[i])
    let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
    return lpTokenBalance
  }

  async loadBavaUserInfo2(i) {
    let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.bavaLpTokenAddresses[i])
    let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.bavaMasterFarmerV1._address).call()
    return lpTokenAllowance
  }

  async loadBavaUserInfo3(i) {
    let pendingReward = await this.state.bavaMasterFarmerV1.methods.pendingReward(i, this.state.account).call()
    return pendingReward
  }

  // ***************************TVL & APR***********************************************************************
  async loadTVLAPR() {

    let tvl = [[], []]
    let apr = [[], []]
    let apyDaily = [[], []]
    let bavatvl = [[], []]
    let bavaapr = [[], []]
    let bavaapyDaily = [[], []]

    let n = 0
    let b = 0
    let totalTVL = 0

    let tvlArray = this.state.myJsonMongo["TVL"]
    let aprArray = this.state.myJsonMongo["APR"]
    let apyArray = this.state.myJsonMongo["APY"]
    let bavatvlArray = this.state.myJsonMongo["BAVATVL"]
    let bavaaprArray = this.state.myJsonMongo["BAVAAPR"]
    let bavaapyArray = this.state.myJsonMongo["BAVAAPY"]

    for (let i = 0; i < this.state.poolLength; i++) {
      totalTVL += parseInt(tvlArray[n]["tvl"])
      if (this.state.lpTokenPairsymbols[i] == "PGL" || this.state.lpTokenPairsymbols[i] == "PNG") {
        tvl[0][n] = tvlArray[n]["tvl"]
        apr[0][n] = aprArray[n]["apr"]
        apyDaily[0][n] = apyArray[n]["apyDaily"]
        n += 1
      } else {
        tvl[1][n] = tvlArray[n]["tvl"]
        apr[1][n] = aprArray[n]["apr"]
        apyDaily[1][n] = apyArray[n]["apyDaily"]
        n += 1
      }
    }

    for (let i = 0; i < this.state.bavaPoolLength; i++) {
      totalTVL += parseInt(bavatvlArray[b]["tvl"])
      if (this.state.bavaLpTokenPairsymbols[i] == "PGL" || this.state.bavaLpTokenPairsymbols[i] == "PNG") {
        bavatvl[0][b] = bavatvlArray[b]["tvl"]
        bavaapr[0][b] = bavaaprArray[b]["apr"]
        bavaapyDaily[0][b] = bavaapyArray[b]["apyDaily"]
        b += 1
      } else {
        bavatvl[1][b] = bavatvlArray[b]["tvl"]
        bavaapr[1][b] = bavaaprArray[b]["apr"]
        bavaapyDaily[1][b] = bavaapyArray[b]["apyDaily"]
        b += 1
      }
    }

    this.setState({ totalTVL })
    this.setState({ tvl })
    this.setState({ apr })
    this.setState({ apyDaily })
    this.setState({ bavatvl })
    this.setState({ bavaapr })
    this.setState({ bavaapyDaily })
    this.setState({ aprloading: true })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    window.web3Ava = new Web3(`https://api.avax.network/ext/bc/C/rpc`);
    let responseMongo = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/bdl-uyejj/endpoint/tvl`);
    const myJsonMongo = await responseMongo.json();
    this.setState({ myJsonMongo })

    let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=joe%2Cwrapped-avax%2Cpangolin%2Cweth%2Cusd-coin%2Ctether%2Cbenqi&vs_currencies=usd`);
    const myJson = await response.json();

    let bavaPrice = myJsonMongo["BAVAPrice"]["$numberDouble"]
    this.setState({ BAVAPrice: parseFloat(bavaPrice).toFixed(5) })
    let AVAXPrice = myJson["wrapped-avax"]["usd"]
    this.setState({ AVAXPrice: AVAXPrice.toFixed(6) })
    let PNGPrice = myJson["pangolin"]["usd"]
    this.setState({ PNGPrice: PNGPrice.toFixed(6) })
    let WETHPrice = myJson["weth"]["usd"]
    this.setState({ WETHPrice: WETHPrice.toFixed(6) })
    let USDTPrice = myJson["tether"]["usd"]
    this.setState({ USDTPrice: USDTPrice.toFixed(6) })
    let USDCPrice = myJson["usd-coin"]["usd"]
    this.setState({ USDCPrice: USDCPrice.toFixed(6) })
    let JOEPrice = myJson["joe"]["usd"]
    this.setState({ JOEPrice: JOEPrice.toFixed(6) })
    let QIPrice = myJson["benqi"]["usd"]
    this.setState({ QIPrice: QIPrice.toFixed(6) })
    this.setState({ loading: true })
  }


  connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async () => {
          await this.switchNetwork()
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId == "0xa86a") {
            this.WalletDisconnect()
            this.setWalletTrigger(true)
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
      this.componentWillMount()
    } else {
      alert("No wallet provider was found")
    }
  }

  connectCoin98 = () => {
    if (window.coin98) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(async (accounts) => {
          let chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId == "0xa86a") {
            if (accounts[0]) {
              this.WalletDisconnect()
              this.setWalletTrigger(true)
            } else {
              alert("No wallet found, please create wallet")
            }
          } else {
            alert("Wrong Network, please switch to Avalanche network")
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
    } else {
      alert("No wallet provider was found")
    }
  }


  WalletConnect = async () => {
    window.provider = new WalletConnectProvider({
      rpc: {
        43114: "https://api.avax.network/ext/bc/C/rpc"
        // 1: "https://api.avax.network/ext/bc/C/rpc"
      },
      chainId: 43114,
    });
    await window.provider.enable();
    window.web3Con = await new Web3(window.provider);
    const accounts = await window.web3Con.eth.getAccounts();
    const chainId = await window.provider.request('eth_chainId');
    this.setState({ account: accounts[0] })
    const first4Account = this.state.account.substring(0, 4)
    const last4Account = this.state.account.slice(-4)
    this.setState({ first4Account: first4Account })
    this.setState({ last4Account: last4Account })
    this.setState({ walletConnect: true })
    this.setWalletTrigger(false)
    await this.componentWillMount()
  }

  WalletDisconnect = async () => {
    if (this.state.walletConnect == true) {
      await window.provider.disconnect()
      this.setState({ walletConnect: false })
      this.setState({ accountLoading: false })
    }
  }

  switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa86a' }],
      })
    }
    catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          // console.log(switchError.code)
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xa86a', rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'], chainName: 'Avalanche Mainnet C-Chain',
              nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX', // 2-6 characters long
                decimals: 18
              }, blockExplorerUrls: ['https://snowtrace.io/']
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
      this.setWalletTrigger(false)
    } else if (accounts[0] !== this.state.account) {
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.loadBlockchainData()
      // Do any other work!
    }
  }

  handleChainChanged = async (_chainId) => {
    // We recommend reloading the page, unless you must do otherwise
    if (_chainId != "0xa86a") {
      this.setWalletTrigger(false)
    }
    if (this.state.chainId !== _chainId) {
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

  deposit = async (i, amount, n, v) => {
    let bavaMasterFarmer
    if (this.state.walletConnect == true) {
      if (v == 1) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      } else if (v == 2) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      }
    } else if (this.state.wallet == true) {
      if (v == 1) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      } else if (v == 2) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      }
    }
    await bavaMasterFarmer.methods.deposit(i, amount).send({ from: this.state.account }).then(async (result) => {
      let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
      this.state.userSegmentInfo[n][i] = userInfo.amount
      let lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
      let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
      let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
      this.state.lpBalanceAccount[n][i] = lpTokenBalance
      let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
      this.state.bavaTokenBalance = bavaTokenBalance
      let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
      this.state.pendingSegmentReward[n][i] = pendingReward
      this.componentWillMount()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  approve = async (i, n, v) => {
    let lpTokenAddress
    let bavaMasterFarmerAddress
    let lpToken
    if (v == 1) {
      lpTokenAddress = this.state.bavaPoolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
      bavaMasterFarmerAddress = this.state.bavaMasterFarmerV1._address
    } else if (v == 2) {
      lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
      bavaMasterFarmerAddress = this.state.bavaMasterFarmer._address
    }
    if (this.state.walletConnect == true) {
      lpToken = new window.web3Con.eth.Contract(LpToken.abi, lpTokenAddress)
    } else if (this.state.wallet == true) {
      lpToken = new window.web3.eth.Contract(LpToken.abi, lpTokenAddress)
    }
    await lpToken.methods.approve(bavaMasterFarmerAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
      let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, bavaMasterFarmerAddress).call()
      this.state.lpSegmentAllowance[n][i] = lpTokenAllowance
      this.componentWillMount()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  withdraw = async (i, amount, n, v) => {
    let bavaMasterFarmer
    if (this.state.walletConnect == true) {
      if (v == 1) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      } else if (v == 2) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      }
    } else if (this.state.wallet == true) {
      if (v == 1) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      } else if (v == 2) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      }
    }
    await bavaMasterFarmer.methods.withdraw(i, amount).send({ from: this.state.account }).then(async (result) => {
      let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
      this.state.userSegmentInfo[n][i] = userInfo.amount
      let lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
      let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
      let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
      this.state.lpBalanceAccount[n][i] = lpTokenBalance
      let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
      this.state.bavaTokenBalance = bavaTokenBalance
      let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
      this.state.pendingSegmentReward[n][i] = pendingReward
      this.componentWillMount()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  harvest = async (i, n, v) => {
    let bavaMasterFarmer
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        if (v == 1) {
          bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
          if (this.state.bavaPendingSegmentReward[n][i] <= 0) {
            alert("No token to harvest! Please deposit LP to earn BAVA")
            return
          }
        } else if (v == 2) {
          bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
          if (this.state.pendingSegmentReward[n][i] <= 0) {
            alert("No token to harvest! Please deposit LP to earn BAVA")
            return
          }
        }
      } else if (this.state.wallet == true) {
        if (v == 1) {
          bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
          if (this.state.bavaPendingSegmentReward[n][i] <= 0) {
            alert("No token to harvest! Please deposit LP to earn BAVA")
            return
          }
        } else if (v == 2) {
          bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
          if (this.state.pendingSegmentReward[n][i] <= 0) {
            alert("No token to harvest! Please deposit LP to earn BAVA")
            return
          }
        }
      }
      bavaMasterFarmer.methods.claimReward(i).send({ from: this.state.account }).then(async (result) => {
        let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
        this.state.bavaTokenBalance = bavaTokenBalance
        let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
        this.state.pendingSegmentReward[n][i] = pendingReward
        this.componentWillMount()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  setI = (pair, boolean, version) => {
    if (version == 1) {
      this.state.farmV1Open[pair] = boolean
    } else if (version == 2) {
      this.state.farmV2Open[pair] = boolean
    }
    this.setState({ i: pair })  //do ntg, just to push react setstate
  }

  setWalletTrigger = async (state) => {
    if (state == false) {
      // await window.ethereum.disconnect()
      await this.setState({ wallet: state })
      this.setState({ accountLoading: state })
    } else {
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
      bavaContract: '',
      i: '0',
      n: '0',
      loading: false,
      farmloading: false,
      wallet: false,
      aprloading: false,
      walletConnect: false,
      farmV1Open: [],
      farmV2Open: [],
      userSegmentInfo: [[], []],
      poolSegmentInfo: [[], []],
      lpTokenSegmentInContract: [[], []],
      lpBalanceAccount: [[], []],
      lpTokenSegmentBsymbol: [[], []],
      pendingSegmentReward: [[], []],
      lpSegmentAllowance: [[], []],
      bavaLpSegmentAllowance: [[], []],
      bavaLpBalanceAccount: [[], []],
      lpTokenValue: [[], []],
      tvl: [[], []],
      apr: [[], []],
      apyDaily: [[], []],
      bavatvl: [[], []],
      bavaapr: [[], []],
      bavaapyDaily: [[], []],
      returnRatio: [[], []],
      bavaReturnRatio: [[], []],
      totalpendingReward: '0',
      buttonPopup: false,
      networkName: "Loading",
      poolLength: '0',
      startBlk: '0',
      totalTVL: '0',
      lockedBavaTokenBalance: '0',
      accountLoading: false
    }
  }

  render() {
    let maincontent
    let menucontent
    let traderjoecontent
    if (this.state.loading == false) {
      maincontent =
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="textLoading">NETWORK IS Loading...</div>
          </div>
        </div>
      menucontent =
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="textLoading">NETWORK IS Loading...</div>
          </div>
        </div>
      traderjoecontent =
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
        approve={this.approve}
        setI={this.setI}
        lpSegmentAllowance={this.state.lpSegmentAllowance}
        bavaContract={this.state.bavaContract}
        bavaTokenTotalSupply={this.state.bavaTokenTotalSupply}
        totalpendingReward={this.state.totalpendingReward}
        userSegmentInfo={this.state.userSegmentInfo}
        poolSegmentInfo={this.state.poolSegmentInfo}
        lpBalanceAccount={this.state.lpBalanceAccount}
        pendingSegmentReward={this.state.pendingSegmentReward}
        buttonPopup={this.state.buttonPopup}
        harvest={this.harvest}
        BAVAPrice={this.state.BAVAPrice}
        tvl={this.state.tvl}
        apr={this.state.apr}
        apyDaily={this.state.apyDaily}
        farmloading={this.state.farmloading}
        aprloading={this.state.aprloading}
        walletConnect={this.state.walletConnect}
        wallet={this.state.wallet}
        farmV1Open={this.state.farmV1Open}
        farmV2Open={this.state.farmV2Open}
        accountLoading={this.state.accountLoading}
        lockedBavaTokenBalance={this.state.lockedBavaTokenBalance}
        totalTVL={this.state.totalTVL}
        bavaPoolSegmentInfo={this.state.bavaPoolSegmentInfo}
        bavaLpTokenPairsymbols={this.state.bavaLpTokenPairsymbols}
        bavaLpTokenAddresses={this.state.bavaLpTokenAddresses}
        bavaUserSegmentInfo={this.state.bavaUserSegmentInfo}
        bavaLpBalanceAccount={this.state.bavaLpBalanceAccount}
        bavaLpSegmentAllowance={this.state.bavaLpSegmentAllowance}
        bavaPendingSegmentReward={this.state.bavaPendingSegmentReward}
        bavatvl={this.state.bavatvl}
        bavaapr={this.state.bavaapr}
        bavaapyDaily={this.state.bavaapyDaily}
        returnRatio={this.state.returnRatio}
        bavaReturnRatio={this.state.bavaReturnRatio}
      />
      traderjoecontent = <TraderJoe
        lpTokenBalance={this.state.lpTokenBalance}
        bavaTokenBalance={this.state.bavaTokenBalance}
        deposit={this.deposit}
        withdraw={this.withdraw}
        approve={this.approve}
        setI={this.setI}
        lpSegmentAllowance={this.state.lpSegmentAllowance}
        bavaContract={this.state.bavaContract}
        bavaTokenTotalSupply={this.state.bavaTokenTotalSupply}
        totalpendingReward={this.state.totalpendingReward}
        userSegmentInfo={this.state.userSegmentInfo}
        poolSegmentInfo={this.state.poolSegmentInfo}
        lpBalanceAccount={this.state.lpBalanceAccount}
        pendingSegmentReward={this.state.pendingSegmentReward}
        buttonPopup={this.state.buttonPopup}
        harvest={this.harvest}
        BAVAPrice={this.state.BAVAPrice}
        tvl={this.state.tvl}
        apr={this.state.apr}
        apyDaily={this.state.apyDaily}
        farmloading={this.state.farmloading}
        aprloading={this.state.aprloading}
        walletConnect={this.state.walletConnect}
        wallet={this.state.wallet}
        farmV1Open={this.state.farmV1Open}
        farmV2Open={this.state.farmV2Open}
        accountLoading={this.state.accountLoading}
        lockedBavaTokenBalance={this.state.lockedBavaTokenBalance}
        totalTVL={this.state.totalTVL}
        bavaPoolSegmentInfo={this.state.bavaPoolSegmentInfo}
        bavaLpTokenPairsymbols={this.state.bavaLpTokenPairsymbols}
        bavaLpTokenAddresses={this.state.bavaLpTokenAddresses}
        bavaUserSegmentInfo={this.state.bavaUserSegmentInfo}
        bavaLpBalanceAccount={this.state.bavaLpBalanceAccount}
        bavaLpSegmentAllowance={this.state.bavaLpSegmentAllowance}
        bavaPendingSegmentReward={this.state.bavaPendingSegmentReward}
        bavatvl={this.state.bavatvl}
        bavaapr={this.state.bavaapr}
        bavaapyDaily={this.state.bavaapyDaily}
        returnRatio={this.state.returnRatio}
        bavaReturnRatio={this.state.bavaReturnRatio}
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
            connectMetamask={this.connectMetamask}
            WalletConnect={this.WalletConnect}
            WalletDisconnect={this.WalletDisconnect}
            connectCoin98={this.connectCoin98}
            connectCoin98={this.connectCoin98}
            networkName={this.state.networkName}
            walletConnect={this.state.walletConnect}
          />
          <div className="container-fluid mt-4">
            <div className="row">
              <main role="main" className="content ml-auto mr-auto" >
                <Switch>
                  <Route path="/" exact > {maincontent} </Route>
                  <Route path="/home" exact > {maincontent} </Route>
                  <Route path="/menu" exact > {menucontent} </Route>
                  <Route path="/traderjoe/" exact > {traderjoecontent} </Route>
                </Switch>
              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
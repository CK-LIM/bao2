import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WalletConnectProvider from "@walletconnect/web3-provider";

import LpToken from '../abis/Interface/LpToken.json'
import IPancakePair from '../abis/Interface/IPancakePair.json'
import BavaToken from '../abis/BavaToken.json'
import BavaMasterFarmer from '../abis/BavaMasterFarmerV2.json'
// import Farm from './tokens_config/farmTestnet.json'
import Farm from './tokens_config/farm.json'

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
      await this.delay(5000);
    }
  }

  async loadFarmData() {
    const farm = Farm.farm
    this.setState({ farm })
  }

  async loadBlockchainData() {
    const web3Ava = window.web3Ava
    const networkId = "1"
    this.setState({ networkId })
    const farmNetworkId = "43114"
    this.setState({ farmNetworkId })
    const farmNetwork = "MAINNET"
    this.setState({ farmNetwork })

    const bavaContract = 'https://snowtrace.io/address/0xb5a054312a73581a3c0fed148b736911c02f4539'
    this.setState({ bavaContract })

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
      // Load bavaToken
      const bavaTokenData = BavaToken.networks[networkId]

      if (bavaTokenData) {
        const bavaToken = new web3Ava.eth.Contract(BavaToken.abi, bavaTokenData.address)
        this.setState({ bavaToken })
        // let bavaTokenTotalSupply = await bavaToken.methods.totalSupply().call()
        // let bavaTokenCapSupply = await bavaToken.methods.cap().call()
        // let bavaTokenLock = await bavaToken.methods.totalLock().call()
        // this.setState({ bavaTokenTotalSupply: bavaTokenTotalSupply.toString() })
        // this.setState({ bavaTokenCapSupply: bavaTokenCapSupply.toString() })
        // this.setState({ bavaTokenLock: bavaTokenLock.toString() })
      }

      // Load bavaMasterFarmer
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[networkId]
      if (bavaMasterFarmeryData) {
        const bavaMasterFarmer = new web3Ava.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
        this.setState({ bavaMasterFarmer })

        let poolLength = await bavaMasterFarmer.methods.poolLength().call()
        // let startBlk = await bavaMasterFarmer.methods.START_BLOCK().call()
        this.setState({ poolLength })
        // this.setState({ startBlk })
        let totalrewardperblock = await bavaMasterFarmer.methods.REWARD_PER_BLOCK().call()
        this.setState({ totalrewardperblock: totalrewardperblock.toString() })

        let poolSegmentInfo = [[], []]
        let lpTokenSegmentAsymbol = [[], []]
        let lpTokenSegmentBsymbol = [[], []]
        let n = 0
        let totalallocPoint = 0

        let lpTokenAsymbols = []
        let lpTokenBsymbols = []
        let lpTokenPairAs = []
        let lpTokenPairBs = []
        let lpTokenPairsymbols = []
        let lpTokenAddresses = []
        let allocPoints = []

        let totalpendingReward = "0"
        let bavaTokenBalance = 0
        let userSegmentInfo = [[], []]
        let pendingSegmentReward = [[], []]

        this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
        this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
        this.setState({ userSegmentInfo })
        this.setState({ pendingSegmentReward })
        // console.log(this.state.poolLength)
        for (let i = 0; i < this.state.poolLength; i++) {
          let poolInfo = this.state.farm[i]
          let lpTokenAddress = poolInfo.lpAddresses[farmNetworkId]
          let lpTokenPairA = poolInfo.token[this.state.farmNetwork]["address"]
          let lpTokenPairB = poolInfo.quoteToken[this.state.farmNetwork]["address"]
          let lpTokenPairsymbol = poolInfo.lpTokenPairsymbol
          let lpTokenAsymbol = poolInfo.token[this.state.farmNetwork]["symbol"]
          let lpTokenBsymbol = poolInfo.quoteToken[this.state.farmNetwork]["symbol"]
          // console.log(poolInfo)
          lpTokenAsymbols[i] = lpTokenAsymbol
          lpTokenBsymbols[i] = lpTokenBsymbol
          lpTokenPairAs[i] = lpTokenPairA
          lpTokenPairBs[i] = lpTokenPairB
          lpTokenPairsymbols[i] = lpTokenPairsymbol
          lpTokenAddresses[i] = lpTokenAddress
          allocPoints[i] = poolInfo.allocPoint

          totalallocPoint += parseInt(poolInfo.allocPoint)

          if (lpTokenPairsymbol == "PGL" || lpTokenPairsymbol == "PNG") {
            poolSegmentInfo[0][n] = poolInfo
            lpTokenSegmentAsymbol[0][n] = lpTokenAsymbol
            lpTokenSegmentBsymbol[0][n] = lpTokenBsymbol
            n += 1
          } else {
            poolSegmentInfo[1][n] = poolInfo
            lpTokenSegmentAsymbol[1][n] = lpTokenAsymbol
            lpTokenSegmentBsymbol[1][n] = lpTokenBsymbol
            n += 1
          }
        }

        this.setState({ lpTokenSegmentAsymbol })
        this.setState({ lpTokenSegmentBsymbol })
        this.setState({ totalallocPoint })
        this.setState({ poolSegmentInfo })

        this.setState({ lpTokenAsymbols })
        this.setState({ lpTokenBsymbols })
        this.setState({ lpTokenPairAs })
        this.setState({ lpTokenPairBs })
        this.setState({ lpTokenPairsymbols })
        this.setState({ lpTokenAddresses })
        this.setState({ allocPoints })
        this.setState({ farmloading: true })
      }
    }

    // #########################################################################################################################
    else {
      // Load bavaToken
      let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
      this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })

      let totalpendingReward = 0
      let userSegmentInfo = [[], []]
      let lpTokenBalanceAccount = [[], []]
      let lpTokenSegmentAllowance = [[], []]
      let pendingSegmentReward = [[], []]
      let poolSegmentInfo = [[], []]

      let n = 0
      let i = 0

      for (i = 0; i < this.state.poolLength; i++) {

        let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
        let lpTokenPair = new web3Ava.eth.Contract(IPancakePair.abi, this.state.lpTokenAddresses[i])
        let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
        let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.bavaMasterFarmer._address).call()
        let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
        totalpendingReward += parseInt(pendingReward)

        if (this.state.lpTokenPairsymbols[i] == "PGL" || this.state.lpTokenPairsymbols[i] == "PNG") {
          userSegmentInfo[0][n] = window.web3Ava.utils.fromWei(userInfo.amount, 'Ether')
          poolSegmentInfo[0][n] = this.state.farm[i]
          lpTokenBalanceAccount[0][n] = window.web3Ava.utils.fromWei(lpTokenBalance, 'Ether')
          lpTokenSegmentAllowance[0][n] = lpTokenAllowance
          pendingSegmentReward[0][n] = window.web3Ava.utils.fromWei(pendingReward, 'Ether')
          n += 1
        } else {
          userSegmentInfo[1][n] = window.web3Ava.utils.fromWei(userInfo.amount, 'Ether')
          poolSegmentInfo[1][n] = this.state.farm[i]
          lpTokenBalanceAccount[1][n] = window.web3Ava.utils.fromWei(lpTokenBalance, 'Ether')
          lpTokenSegmentAllowance[1][n] = lpTokenAllowance
          pendingSegmentReward[1][n] = window.web3Ava.utils.fromWei(pendingReward, 'Ether')
          n += 1
        }
      }
      this.setState({ userSegmentInfo })
      this.setState({ poolSegmentInfo })
      this.setState({ lpTokenBalanceAccount })
      this.setState({ lpTokenSegmentAllowance })
      this.setState({ pendingSegmentReward })
      this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
      this.setState({ farmloading: true })
      this.setState({ accountLoading: true })
    }
  }


  // ***************************TVL & APR***********************************************************************
  async loadTVLAPR() {
    // Load bavaMasterFarmer
    const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]

    let lpTokenValue = [[], []]
    let tvl = [[], []]
    let apr = [[], []]
    let apyDaily = [[], []]
    let n = 0

    for (let i = 0; i < this.state.poolLength; i++) {
      let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.lpTokenAddresses[i])
      let lpTokenA = new window.web3Ava.eth.Contract(LpToken.abi, this.state.lpTokenPairAs[i])
      let lpTokenB = new window.web3Ava.eth.Contract(LpToken.abi, this.state.lpTokenPairBs[i])

      let lpTokenInContract = await this.state.bavaMasterFarmer.methods.poolInfo(i).call()
      lpTokenInContract = window.web3Ava.utils.fromWei(lpTokenInContract.depositAmount, "ether")

      let lpTokenTSupply = await lpTokenPair.methods.totalSupply().call()
      let lpTokenABalanceContract = await lpTokenA.methods.balanceOf(this.state.lpTokenAddresses[i]).call()
      let lpTokenBBalanceContract = await lpTokenB.methods.balanceOf(this.state.lpTokenAddresses[i]).call()

      let tokenAPrice = 0
      let tokenBPrice = 0

      if (this.state.lpTokenAsymbols[i] == "BAVA") {
        tokenAPrice = this.state.BAVAPrice
      } else if (this.state.lpTokenAsymbols[i] == "AVAX") {
        tokenAPrice = this.state.AVAXPrice
      } else if (this.state.lpTokenAsymbols[i] == "PNG") {
        tokenAPrice = this.state.PNGPrice
      } else if (this.state.lpTokenAsymbols[i] == "WETH.e") {
        tokenAPrice = this.state.WETHPrice
      } else if (this.state.lpTokenAsymbols[i] == "USDT.e") {
        tokenAPrice = this.state.USDTPrice
      } else if (this.state.lpTokenAsymbols[i] == "USDC.e") {
        tokenAPrice = this.state.USDCPrice
      } else if (this.state.lpTokenAsymbols[i] == "JOE") {
        tokenAPrice = this.state.JOEPrice
      }
      if (this.state.lpTokenBsymbols[i] == "BAVA") {
        tokenBPrice = this.state.BAVAPrice
      } else if (this.state.lpTokenBsymbols[i] == "AVAX") {
        tokenBPrice = this.state.AVAXPrice
      } else if (this.state.lpTokenBsymbols[i] == "PNG") {
        tokenBPrice = this.state.PNGPrice
      } else if (this.state.lpTokenBsymbols[i] == "WETH.e") {
        tokenBPrice = this.state.WETHPrice
      } else if (this.state.lpTokenBsymbols[i] == "USDT.e") {
        tokenBPrice = this.state.USDTPrice
      } else if (this.state.lpTokenBsymbols[i] == "USDC.e") {
        tokenBPrice = this.state.USDCPrice
      } else if (this.state.lpTokenBsymbols[i] == "JOE") {
        tokenBPrice = this.state.JOEPrice
      }

      if (this.state.lpTokenPairsymbols[i] == "PGL" || this.state.lpTokenPairsymbols[i] == "PNG") {
        lpTokenValue[0][n] = ((lpTokenABalanceContract * tokenAPrice) + (lpTokenBBalanceContract * tokenBPrice)) / lpTokenTSupply
        if (this.state.lpTokenPairsymbols[i] == "PNG") {
          tvl[0][n] = tokenAPrice * lpTokenInContract
        } else {
          tvl[0][n] = lpTokenValue[0][n] * lpTokenInContract
        }
        apr[0][n] = ((28000 * 315 * 365 * this.state.allocPoints[i] * window.web3Ava.utils.fromWei(this.state.totalrewardperblock, 'ether') * this.state.BAVAPrice) / (this.state.totalallocPoint * tvl[0][n])) * 100
        apyDaily[0][n] = (Math.pow((1 + apr[0][n] / 36500), 365) - 1) * 100
        n += 1
      } else {
        lpTokenValue[1][n] = ((lpTokenABalanceContract * tokenAPrice) + (lpTokenBBalanceContract * tokenBPrice)) / lpTokenTSupply
        if (this.state.lpTokenPairsymbols[i] == "JOE") {
          tvl[1][n] = tokenAPrice * lpTokenInContract
        } else {
          tvl[1][n] = lpTokenValue[1][n] * lpTokenInContract
        }
        apr[1][n] = ((28000 * 315 * 365 * this.state.allocPoints[i] * window.web3Ava.utils.fromWei(this.state.totalrewardperblock, 'ether') * this.state.BAVAPrice) / (this.state.totalallocPoint * tvl[1][n])) * 100
        apyDaily[1][n] = (Math.pow((1 + apr[1][n] / 36500), 365) - 1) * 100
        n += 1
      }
    }

    this.setState({ tvl })
    this.setState({ apr })
    this.setState({ apyDaily })
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
    window.web3Ava = new Web3(`https://api.avax.network/ext/bc/C/rpc`);
    // window.web3Ava = new Web3(`https://speedy-nodes-nyc.moralis.io/${process.env.REACT_APP_moralisapiKey}/avalanche/mainnet`);
    // let response = await fetch(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/43114/USD/0x65378b697853568dA9ff8EaB60C13E1Ee9f4a654%2C0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7%2C0x60781c2586d68229fde47564546784ab3faca982%2C0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB%2C0xc7198437980c041c805A1EDcbA50c1Ce5db95118%2C0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/?key=${process.env.REACT_APP_covalentapikey}`);
    let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=joe%2Cwrapped-avax%2Cpangolin%2Cweth%2Cusd-coin%2Ctether&vs_currencies=usd`);
    const myJson = await response.json();
    // let BAVAPrice = myJson["husky-avax"]["usd"]
    this.setState({ BAVAPrice: "0.10" })
    let AVAXPrice = myJson["wrapped-avax"]["usd"]
    this.setState({ AVAXPrice: AVAXPrice.toFixed(5) })
    let PNGPrice = myJson["pangolin"]["usd"]
    this.setState({ PNGPrice: PNGPrice.toFixed(5) })
    let WETHPrice = myJson["weth"]["usd"]
    this.setState({ WETHPrice: WETHPrice.toFixed(5) })
    let USDTPrice = myJson["tether"]["usd"]
    this.setState({ USDTPrice: USDTPrice.toFixed(5) })
    let USDCPrice = myJson["usd-coin"]["usd"]
    this.setState({ USDCPrice: USDCPrice.toFixed(5) })
    let JOEPrice = myJson["joe"]["usd"]
    this.setState({ JOEPrice: JOEPrice.toFixed(5) })
    this.setState({ loading: true })
  }


  connectWallet = () => {
    if (this.state.metamask == true) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async () => {
          await this.switchNetwork()
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          console.log(chainId)
          if (chainId == "0xa86a") {
            this.WalletDisconnect()
            this.setWalletTrigger(true)
            await this.componentWillMount()
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
        1: "https://api.avax-test.network/ext/bc/C/rpc"
      },
      // chainId: 1,
    });
    await window.provider.enable();
    window.web3Con = await new Web3(window.provider);
    const accounts = await window.web3Con.eth.getAccounts();
    // const chainId = await window.web3.eth.net.getId() 
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

      // let totalpendingReward = "0"
      // let bavaTokenBalance = 0
      // let userSegmentInfo = [[], []]
      // let pendingSegmentReward = [[], []]

      // this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
      // this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
      // this.setState({ userSegmentInfo })
      // this.setState({ pendingSegmentReward })
      this.setState({ accountLoading: false })
    }
  }



  switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa86a' }],
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
      // console.log('Please connect to MetaMask.');
      this.setWalletTrigger(false)
    } else if (accounts[0] !== this.state.account) {
      this.setState({ account: accounts[0] })
      // this.state.account = accounts[0];
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
    // window.location.reload();
    // console.log("network changed")
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

  deposit = async (i, amount, n) => {
    if (this.state.walletConnect == true) {
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      await bavaMasterFarmer.methods.deposit(i, amount).send({ from: this.state.account }).then(async (result) => {
        let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
        this.state.userSegmentInfo[n][i] = window.web3Ava.utils.fromWei(userInfo.amount, 'Ether')
        let lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
        let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
        let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
        this.state.lpTokenBalanceAccount[n][i] = window.web3Ava.utils.fromWei(lpTokenBalance, 'Ether')
        let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
        this.state.bavaTokenBalance = bavaTokenBalance
        let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
        this.state.pendingSegmentReward[n][i] = window.web3Ava.utils.fromWei(pendingReward, 'ether')
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
    } else if (this.state.wallet == true) {
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      await bavaMasterFarmer.methods.deposit(i, amount).send({ from: this.state.account }).then(async (result) => {
        let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
        this.state.userSegmentInfo[n][i] = window.web3Ava.utils.fromWei(userInfo.amount, 'Ether')
        let lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
        let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
        let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
        this.state.lpTokenBalanceAccount[n][i] = window.web3Ava.utils.fromWei(lpTokenBalance, 'Ether')
        let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
        this.state.bavaTokenBalance = bavaTokenBalance
        let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
        this.state.pendingSegmentReward[n][i] = window.web3Ava.utils.fromWei(pendingReward, 'ether')
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

  approve = async (i, n) => {
    if (this.state.walletConnect == true) {
      let lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
      let lpToken = new window.web3Con.eth.Contract(LpToken.abi, lpTokenAddress)
      lpToken.methods.approve(this.state.bavaMasterFarmer._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
        let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
        let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.bavaMasterFarmer._address).call()
        this.state.lpTokenSegmentAllowance[n][i] = lpTokenAllowance
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
    } else if (this.state.wallet == true) {
      this.setState({ loading: false })
      let lpTokenAddress = await this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
      let lpToken = new window.web3.eth.Contract(LpToken.abi, lpTokenAddress)
      lpToken.methods.approve(this.state.bavaMasterFarmer._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
        let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
        let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.bavaMasterFarmer._address).call()
        this.state.lpTokenSegmentAllowance[n][i] = lpTokenAllowance
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

  withdraw = (i, amount, n) => {
    if (this.state.walletConnect == true) {
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      bavaMasterFarmer.methods.withdraw(i, amount).send({ from: this.state.account }).then(async (result) => {
        let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
        this.state.userSegmentInfo[n][i] = window.web3Ava.utils.fromWei(userInfo.amount, 'Ether')
        let lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
        let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
        let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
        this.state.lpTokenBalanceAccount[n][i] = window.web3Ava.utils.fromWei(lpTokenBalance, 'Ether')
        let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
        this.state.bavaTokenBalance = bavaTokenBalance
        let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
        this.state.pendingSegmentReward[n][i] = window.web3.utils.fromWei(pendingReward, 'ether')
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
    } else if (this.state.wallet == true) {
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      bavaMasterFarmer.methods.withdraw(i, amount).send({ from: this.state.account }).then(async (result) => {
        let userInfo = await this.state.bavaMasterFarmer.methods.userInfo(i, this.state.account).call()
        this.state.userSegmentInfo[n][i] = window.web3Ava.utils.fromWei(userInfo.amount, 'Ether')
        let lpTokenAddress = this.state.poolSegmentInfo[n][i].lpAddresses[this.state.farmNetworkId]
        let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, lpTokenAddress)
        let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
        this.state.lpTokenBalanceAccount[n][i] = window.web3Ava.utils.fromWei(lpTokenBalance, 'Ether')
        let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
        this.state.bavaTokenBalance = bavaTokenBalance
        let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
        this.state.pendingSegmentReward[n][i] = window.web3.utils.fromWei(pendingReward, 'ether')
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

  harvest = async (i, n) => {
    if (this.state.walletConnect == true) {
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      if (this.state.pendingSegmentReward[n][i] <= 0) {
        alert("No token to harvest! Please deposit LP to earn BAVA")
      } else {
        bavaMasterFarmer.methods.claimReward(i).send({ from: this.state.account }).then(async (result) => {
          let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
          this.state.bavaTokenBalance = bavaTokenBalance
          let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
          this.state.pendingSegmentReward[n][i] = window.web3.utils.fromWei(pendingReward, 'ether')
          this.setState({ loading: true })
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
    } else if (this.state.wallet == true) {
      const bavaMasterFarmeryData = BavaMasterFarmer.networks[this.state.networkId]
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, bavaMasterFarmeryData.address)
      if (this.state.pendingSegmentReward[n][i] <= 0) {
        alert("No token to harvest! Please deposit LP to earn BAVA")
      } else {
        bavaMasterFarmer.methods.claimReward(i).send({ from: this.state.account }).then(async (result) => {
          let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
          this.state.bavaTokenBalance = bavaTokenBalance
          let pendingReward = await this.state.bavaMasterFarmer.methods.pendingReward(i, this.state.account).call()
          this.state.pendingSegmentReward[n][i] = window.web3.utils.fromWei(pendingReward, 'ether')
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
    } else {
      alert("Wallet is not connected")
    }
  }


  setI = (platform, pair, boolean) => {
    this.state.farmOpen[platform][pair] = boolean
    this.setState({ n: platform })
    // this.setState({ i: pair })
  }

  // setTrigger = (state) => {
  //   this.setState({ buttonPopup: state })
  // }

  setWalletTrigger = async (state) => {
    if (state == false) {
      await this.setState({ wallet: state })

      let totalpendingReward = "0"
      let bavaTokenBalance = 0
      let userSegmentInfo = [[], []]
      let pendingSegmentReward = [[], []]

      this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
      this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
      this.setState({ userSegmentInfo })
      this.setState({ pendingSegmentReward })
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
      metamask: false,
      aprloading: false,
      walletConnect: false,
      farmOpen: [[], []],
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
      apyDaily: [[], []],
      totalrewardperblock: '0',
      totalpendingReward: '0',
      buttonPopup: false,
      networkName: "Loading",
      poolLength: '0',
      startBlk: '0',
      totalallocPoint: '0',
      accountLoading: false
    }
  }

  render() {
    let maincontent
    let menucontent
    let traderjoecontent
    // let comingSoon
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
      // comingSoon = <ComingSoon/>
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
        approve={this.approve}
        setI={this.setI}
        lpTokenSegmentAllowance={this.state.lpTokenSegmentAllowance}
        bavaContract={this.state.bavaContract}
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
        apr={this.state.apr}
        apyDaily={this.state.apyDaily}
        farmloading={this.state.farmloading}
        aprloading={this.state.aprloading}
        walletConnect={this.state.walletConnect}
        wallet={this.state.wallet}
        farmOpen={this.state.farmOpen}
        accountLoading={this.state.accountLoading}
      />
      traderjoecontent = <TraderJoe
        lpTokenBalance={this.state.lpTokenBalance}
        bavaTokenBalance={this.state.bavaTokenBalance}
        deposit={this.deposit}
        withdraw={this.withdraw}
        approve={this.approve}
        setI={this.setI}
        bavaContract={this.state.bavaContract}
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
        apr={this.state.apr}
        apyDaily={this.state.apyDaily}
        farmloading={this.state.farmloading}
        aprloading={this.state.aprloading}
        walletConnect={this.state.walletConnect}
        wallet={this.state.wallet}
        lpTokenSegmentAllowance={this.state.lpTokenSegmentAllowance}
        farmOpen={this.state.farmOpen}
        accountLoading={this.state.accountLoading}
      />
    }

    return (
      <Router>
        <div>
          {/* <div className="container-fluid mt-3" style={{ maxWidth: '1300px' }}>
            <div className="row">{comingSoon}</div></div> */}
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
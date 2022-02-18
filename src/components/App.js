import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WalletConnectProvider from "@walletconnect/web3-provider";

import LpToken from '../abis/Interface/LpToken.json'
import IPancakePair from '../abis/Interface/IPancakePair.json'
import BavaToken from '../abis/BavaToken.json'
import BavaMasterFarmer from '../abis/BavaMasterFarmerV2.json'
import BavaMasterFarmerV1 from '../abis/BavaMasterFarmerV1.json'
import BavaAirdrop from '../abis/BavaAirdrop.json'
import StakingRewards from '../abis/StakingRewards.json'
import BavaMasterFarmerV2_2 from '../abis/BavaMasterFarmerV2_2.json'

import Farm from './tokens_config/farm.json'
import FarmV1 from './tokens_config/farmV1.json'
import FarmV2_2 from './tokens_config/farmV2_2.json'
import AirdropList from './tokens_config/airdrop.json'

import Navb from './Navbar'
import Main from './Main'
import Menu from './Menu'
import Stake from './Stake'
import TraderJoe from './TraderJoe'
import Airdrop from './Airdrop'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadFarmData()
    await this.loadBlockchainData()
    this.loadTVLAPR()
    while ((this.state.wallet || this.state.walletConnect) == true) {
      await this.loadBlockchainUserData()
      await this.delay(5000);
    }
  }

  async loadFarmData() {
    const farm = Farm.farm
    this.setState({ farm })
    const farmBava = FarmV1.farm
    this.setState({ farmBava })
    const farmV2_2 = FarmV2_2.farm
    this.setState({ farmV2_2 })
    const airdropList = AirdropList
    this.setState({ airdropList })
  }

  async loadBlockchainData() {
    const web3Ava = window.web3Ava
    const networkId = process.env.REACT_APP_networkid
    this.setState({ networkId })
    const farmNetworkId = process.env.REACT_APP_farmnetworkid
    this.setState({ farmNetworkId })
    const farmNetwork = process.env.REACT_APP_farmnetwork
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

    // Load contract
    const bavaToken = new web3Ava.eth.Contract(BavaToken.abi, process.env.REACT_APP_bavatoken_address)
    const bavaMasterFarmer = new web3Ava.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
    const bavaMasterFarmerV1 = new web3Ava.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
    const bavaAirdrop = new web3Ava.eth.Contract(BavaAirdrop.abi, process.env.REACT_APP_airdrop_address)
    const bavaStake = new web3Ava.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    const bavaMasterFarmerV2_2 = new web3Ava.eth.Contract(BavaMasterFarmerV2_2.abi,process.env.REACT_APP_bavamasterfarmv2_2address)
    this.setState({ bavaToken })
    this.setState({ bavaMasterFarmer })
    this.setState({ bavaMasterFarmerV1 })
    this.setState({ bavaAirdrop })
    this.setState({ bavaStake })
    this.setState({ bavaMasterFarmerV2_2 })

    let response0 = this.loadPoolLength()
    let response1 = this.loadBavaPoolLength()
    let response2 = this.loadAirdropIteration()
    let response3 = this.loadAirdropAmount()
    let response5 = this.loadAirdropStart()
    let response6 = this.loadAirdropEnd()
    let response7 = this.loadTotalStake()
    let response8 = this.loadRewardRate()
    let response9 = this.loadPoolLengthV2_2()

    let poolLength = await response0
    let bavaPoolLength = await response1
    let airdropIteration = await response2
    let airdropAmount = await response3
    let airdropStart = await response5
    let airdropEnd = await response6
    let totalStake = await response7
    let rewardRate = await response8
    let poolLengthV2_2 = await response9

    this.setState({ poolLength })
    this.setState({ bavaPoolLength })
    this.setState({ airdropIteration })
    this.setState({ airdropAmount })
    this.setState({ totalStake })
    this.setState({ rewardRate })
    this.setState({ airdropStart })
    this.setState({ airdropEnd })
    this.setState({ poolLengthV2_2 })

    if (this.state.wallet == false && this.state.walletConnect == false) {

      let bavaPoolSegmentInfo = [[], []]
      let poolSegmentInfo = [[], []]
      let poolSegmentInfoV2_2 = [[], []]
      let returnRatio = [[], []]
      let bavaReturnRatio = [[], []]
      let returnRatioV2_2 = [[], []]
      let n = 0
      let b = 0
      let c = 0

      let bavaLpTokenPairsymbols = []
      let bavaLpTokenAddresses = []
      let lpTokenPairsymbols = []
      let lpTokenAddresses = []
      let lpTokenPairsymbolsV2_2 = []
      let lpTokenAddressesV2_2 = []

      let returnRatioArray = this.state.myJsonMongo["ReturnRatio"]

      // UserInfo
      let totalpendingReward = "0"
      let bavaTokenBalance = "0"
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

      for (let i = 0; i < this.state.poolLengthV2_2; i++) {
        let poolInfo = this.state.farmV2_2[i]
        let lpTokenAddress = poolInfo.lpAddresses[farmNetworkId]
        let lpTokenPairsymbol = poolInfo.lpTokenPairsymbol
        lpTokenPairsymbolsV2_2[i] = lpTokenPairsymbol
        lpTokenAddressesV2_2[i] = lpTokenAddress

        if (lpTokenPairsymbol == "PGL" || lpTokenPairsymbol == "PNG") {
          poolSegmentInfoV2_2[0][c] = poolInfo
          returnRatioV2_2[0][c] = returnRatioArray[c]["returnRatio"]
          c += 1
        } else {
          poolSegmentInfoV2_2[1][c] = poolInfo
          returnRatioV2_2[1][c] = returnRatioArray[c]["returnRatio"]
          c += 1
        }
      }

      this.setState({ poolSegmentInfo })
      this.setState({ poolSegmentInfoV2_2 })
      this.setState({ bavaPoolSegmentInfo })
      this.setState({ lpTokenPairsymbols })
      this.setState({ lpTokenPairsymbolsV2_2 })
      this.setState({ bavaLpTokenPairsymbols })
      this.setState({ lpTokenAddresses })
      this.setState({ lpTokenAddressesV2_2 })
      this.setState({ bavaLpTokenAddresses })
      this.setState({ returnRatio })
      this.setState({ returnRatioV2_2 })
      this.setState({ bavaReturnRatio })

      this.setState({ farmloading: true })
    }
  }
  // #########################################################################################################################

  async loadBlockchainUserData() {
    // Load bavaToken
    let userResponse0 = this.loadBavaTokenBalance()
    let userResponse1 = this.loadLockedBavaTokenBalance()
    let userResponse2 = this.loadBavaTokenAllowance()
    let userResponse3 = this.loadEarnedAmount()
    let userResponse4 = this.loadStakeAmount()

    let bavaTokenBalance = await userResponse0
    let lockedBavaTokenBalance = await userResponse1
    let bavaTokenAllowance = await userResponse2
    let earnedAmount = await userResponse3
    let stakeAmount = await userResponse4

    this.setState({ bavaTokenBalance: bavaTokenBalance.toString() })
    this.setState({ lockedBavaTokenBalance: lockedBavaTokenBalance.toString() })
    this.setState({ bavaTokenAllowance: bavaTokenAllowance.toString() })
    this.setState({ stakeAmount: stakeAmount.amount })
    this.setState({ earnedAmount })

    let poolSegmentInfo = [[], []]
    let poolSegmentInfoV2_2 = [[], []]
    let bavaPoolSegmentInfo = [[], []]
    let totalpendingReward = 0

    let userSegmentInfo = [[], []]
    let lpBalanceAccount = [[], []]
    let lpSegmentAllowance = [[], []]
    let pendingSegmentReward = [[], []]

    let userSegmentInfoV2_2 = [[], []]
    let lpBalanceAccountV2_2 = [[], []]
    let lpSegmentAllowanceV2_2 = [[], []]
    let pendingSegmentRewardV2_2 = [[], []]

    let bavaUserSegmentInfo = [[], []]
    let bavaLpBalanceAccount = [[], []]
    let bavaLpSegmentAllowance = [[], []]
    let bavaPendingSegmentReward = [[], []]

    let b = 0
    let n = 0
    let c = 0
    let i = 0

    let response0 = []
    let response1 = []
    let response2 = []
    let response3 = []
    let response0V2_2 = []
    let response1V2_2 = []
    let response2V2_2 = []
    let response3V2_2 = []
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

    for (i = 0; i < this.state.poolLengthV2_2; i++) {
      response0V2_2[i] = this.loadUserInfoV2_2(i)
      response1V2_2[i] = this.loadUserInfo1V2_2(i)
      response2V2_2[i] = this.loadUserInfo2V2_2(i)
      response3V2_2[i] = this.loadUserInfo3V2_2(i)
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

    for (i = 0; i < this.state.poolLengthV2_2; i++) {
      if (this.state.lpTokenPairsymbolsV2_2[i] == "PGL" || this.state.lpTokenPairsymbolsV2_2[i] == "PNG") {
        userSegmentInfoV2_2[0][c] = (await response0V2_2[i]).amount
        poolSegmentInfoV2_2[0][c] = this.state.farmV2_2[i]
        lpBalanceAccountV2_2[0][c] = await response1V2_2[i]
        lpSegmentAllowanceV2_2[0][c] = await response2V2_2[i]
        pendingSegmentRewardV2_2[0][c] = await response3V2_2[i]
        c += 1
      } else {
        userSegmentInfoV2_2[1][c] = (await response0V2_2[i]).amount
        poolSegmentInfoV2_2[1][c] = this.state.farmV2_2[i]
        lpBalanceAccountV2_2[1][c] = await response1V2_2[i]
        lpSegmentAllowanceV2_2[1][c] = await response2V2_2[i]
        pendingSegmentRewardV2_2[1][c] = await response3V2_2[i]
        n += 1
      }
      totalpendingReward += parseInt(await response3V2_2[i])
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
    this.setState({ userSegmentInfo })
    this.setState({ lpBalanceAccount })
    this.setState({ lpSegmentAllowance })
    this.setState({ pendingSegmentReward })

    this.setState({ poolSegmentInfoV2_2 })
    this.setState({ userSegmentInfoV2_2 })
    this.setState({ lpBalanceAccountV2_2 })
    this.setState({ lpSegmentAllowanceV2_2 })
    this.setState({ pendingSegmentRewardV2_2 })

    this.setState({ bavaPoolSegmentInfo })
    this.setState({ bavaUserSegmentInfo })
    this.setState({ bavaLpBalanceAccount })
    this.setState({ bavaLpSegmentAllowance })
    this.setState({ bavaPendingSegmentReward })

    this.setState({ totalpendingReward: totalpendingReward.toLocaleString('fullwide', { useGrouping: false }) })
    this.setState({ farmloading: true })
    this.setState({ accountLoading: true })
  }

  // *************************** User Info***********************************************************************************************
  // bavaToken
  async loadBavaTokenBalance() {
    let bavaTokenBalance = await this.state.bavaToken.methods.balanceOf(this.state.account).call()
    return bavaTokenBalance
  }

  async loadLockedBavaTokenBalance() {
    let lockedBavaTokenBalance = await this.state.bavaToken.methods.lockOf(this.state.account).call()
    return lockedBavaTokenBalance
  }

  async loadBavaTokenAllowance() {
    let bavaTokenAllowance = await this.state.bavaToken.methods.allowance(this.state.account, process.env.REACT_APP_staking_rewards_address).call()
    return bavaTokenAllowance
  }

  async loadEarnedAmount() {
    let earnedAmount = await this.state.bavaStake.methods.earned(this.state.account).call()
    return earnedAmount
  }

  async loadStakeAmount() {
    let stakeAmount = await this.state.bavaStake.methods.userInfo(this.state.account).call()
    return stakeAmount
  }

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

    // bavaMasterFarmerV2_2

    async loadUserInfoV2_2(i) {
      let userInfo = await this.state.bavaMasterFarmerV2_2.methods.userInfo(i, this.state.account).call()
      return userInfo
    }
  
    async loadUserInfo1V2_2(i) {
      let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.lpTokenAddressesV2_2[i])
      let lpTokenBalance = await lpTokenPair.methods.balanceOf(this.state.account).call()
      return lpTokenBalance
    }
  
    async loadUserInfo2V2_2(i) {
      let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.lpTokenAddressesV2_2[i])
      let lpTokenAllowance = await lpTokenPair.methods.allowance(this.state.account, this.state.bavaMasterFarmerV2_2._address).call()
      return lpTokenAllowance
    }
  
    async loadUserInfo3V2_2(i) {
      let pendingReward = await this.state.bavaMasterFarmerV2_2.methods.pendingReward(i, this.state.account).call()
      return pendingReward
    }

  // bavaMasterFarmerV2_2

  async loadPoolLengthV2_2() {
    let poolLengthV2_2 = await this.state.bavaMasterFarmerV2_2.methods.poolLength().call()
    return poolLengthV2_2
  }
  // bavaMasterFarmerV1 

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

  // ***************************************** Airdrop *************************************************************

  async loadPoolLength() {
    let poolLength = await this.state.bavaMasterFarmer.methods.poolLength().call()
    return poolLength
  }

  async loadBavaPoolLength() {
    let bavaPoolLength = await this.state.bavaMasterFarmerV1.methods.poolLength().call()
    return bavaPoolLength
  }

  async loadAirdropIteration() {
    let airdropIteration = await this.state.bavaAirdrop.methods.airdropIteration().call()
    return airdropIteration
  }

  async loadAirdropAmount() {
    let airdropAmount = await this.state.bavaAirdrop.methods.airdropAmount().call()
    return airdropAmount
  }

  async loadAirdropStart() {
    let airdropIteration = await this.state.bavaAirdrop.methods.airdropIteration().call()
    let airdropStart = await this.state.bavaAirdrop.methods.startAirdrop(airdropIteration).call()
    return airdropStart
  }

  async loadAirdropEnd() {
    let airdropIteration = await this.state.bavaAirdrop.methods.airdropIteration().call()
    let airdropEnd = await this.state.bavaAirdrop.methods.endAirdrop(airdropIteration).call()
    return airdropEnd
  }

  // ***************************************** BAVA Stake *************************************************************

  async loadTotalStake() {
    let totalStake = await this.state.bavaStake.methods.totalSupply().call()
    return totalStake
  }

  async loadRewardRate() {
    let rewardRate = await this.state.bavaStake.methods.rewardRate().call()
    return rewardRate
  }

  // ***************************TVL & APR***********************************************************************
  async loadTVLAPR() {

    let tvl = [[], []]
    let apr = [[], []]
    let apyDaily = [[], []]

    let bavatvl = [[], []]
    let bavaapr = [[], []]
    let bavaapyDaily = [[], []]

    let tvlV2_2 = [[], []]
    let aprV2_2 = [[], []]
    let apyDailyV2_2 = [[], []]

    let n = 0
    let b = 0
    let c = 0
    let totalTVL = 0

    let tvlArray = this.state.myJsonMongo["TVL"]
    let aprArray = this.state.myJsonMongo["APR"]
    let apyArray = this.state.myJsonMongo["APY"]
    let bavatvlArray = this.state.myJsonMongo["BAVATVL"]
    let bavaaprArray = this.state.myJsonMongo["BAVAAPR"]
    let bavaapyArray = this.state.myJsonMongo["BAVAAPY"]

    let responseV2_2 = await this.loadTVLAPRV2_2()
    let tvlArrayV2_2 =  responseV2_2["TVL"]
    let aprArrayV2_2 =  responseV2_2["APR"]
    let apyArrayV2_2 =  responseV2_2["APY"]

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

    for (let i = 0; i < this.state.poolLengthV2_2; i++) {
      totalTVL += parseInt(tvlArrayV2_2[c]["tvl"])
      if (this.state.lpTokenPairsymbolsV2_2[i] == "PGL" || this.state.lpTokenPairsymbolsV2_2[i] == "PNG") {
        tvlV2_2[0][c] = tvlArrayV2_2[c]["tvl"]
        aprV2_2[0][c] = aprArrayV2_2[c]["apr"]
        apyDailyV2_2[0][c] = apyArrayV2_2[c]["apyDaily"]
        c += 1
      } else {
        tvlV2_2[1][c] = tvlArrayV2_2[c]["tvl"]
        aprV2_2[1][c] = aprArrayV2_2[c]["apr"]
        apyDailyV2_2[1][c] = apyArrayV2_2[c]["apyDaily"]
        c += 1
      }
    }

    totalTVL += window.web3Ava.utils.fromWei(this.state.totalStake, 'Ether') * this.state.BAVAPrice

    this.setState({ totalTVL })
    this.setState({ tvl })
    this.setState({ apr })
    this.setState({ apyDaily })
    this.setState({ tvlV2_2 })
    this.setState({ aprV2_2 })
    this.setState({ apyDailyV2_2 })

    this.setState({ bavatvl })
    this.setState({ bavaapr })
    this.setState({ bavaapyDaily })
    this.setState({ aprloading: true })
  }

  // ************* load farmV2_2 tvl apr *************

  async loadTVLAPRV2_2(i) {

    let bavatvlArray = this.state.myJsonMongo["BAVATVL"]
    let lpTokenPair = new window.web3Ava.eth.Contract(IPancakePair.abi, this.state.lpTokenAddressesV2_2[0])
    let lpTokenBalance = await lpTokenPair.methods.balanceOf(process.env.REACT_APP_bavamasterfarmv1_address).call()
    let lpTokenValue = bavatvlArray[0]["tvl"] / window.web3Ava.utils.fromWei(lpTokenBalance, 'ether')

    let BAVAPrice = 0.038
    let lpTokenInContract = await this.state.bavaMasterFarmerV2_2.methods.poolInfo(0).call()
    let rewardPerBlock = await this.state.bavaMasterFarmerV2_2.methods.REWARD_PER_BLOCK().call()
    lpTokenInContract = window.web3Ava.utils.fromWei(lpTokenInContract["depositAmount"], 'ether')
    let tvl = lpTokenValue * lpTokenInContract
    let apr = ((28000 * 365 * 645 * window.web3Ava.utils.fromWei(rewardPerBlock, 'ether') * BAVAPrice ) / tvl) * 100
    let apyDaily = ((1 + apr/36500)**365 -1) * 100

    let array = {'TVL':[{'tvl':tvl}], 'APR':[{'apr':apr}], 'APY':[{'apyDaily':apyDaily}]}
    return array
  }

// ***********************************************************************************************************************************************

async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    window.web3Ava = new Web3(`https://api.avax.network/ext/bc/C/rpc`);
    // window.web3Ava = new Web3(`https://api.avax-test.network/ext/bc/C/rpc`);

    let responseMongo = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/bdl-uyejj/endpoint/tvl`);
    const myJsonMongo = await responseMongo.json();
    this.setState({ myJsonMongo })

    let bavaPrice = myJsonMongo["BAVAPrice"]["$numberDouble"]
    this.setState({ BAVAPrice: parseFloat(bavaPrice).toFixed(5) })

    this.setState({ loading: true })
  }


  connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async () => {
          await this.switchNetwork()
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId == process.env.REACT_APP_chainid) {
            // await this.WalletDisconnect()
            await this.setWalletTrigger(true)
            this.componentWillMount()
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


  mobileWalletConnect = async () => {
    window.provider = new WalletConnectProvider({
      rpc: {
        43114: "https://api.avax.network/ext/bc/C/rpc"
        // 56: `https://bsc-dataseed.binance.org/`
        // 1: "https://api.avax.network/ext/bc/C/rpc"
      },
      chainId: 43114,
      // chainId: 56,
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
    this.componentWillMount()

    // Subscribe to accounts change
    window.provider.on("accountsChanged", this.handleAccountsChanged);
    // Subscribe to session disconnection
    window.provider.on("disconnect", (code, reason) => {
      // console.log(code, reason);
      this.WalletDisconnect()
    });
    window.provider.on("chainChanged", async () => {
      this.WalletDisconnect()
      alert("You're connected to an unsupported network.")
    });
  }

  WalletDisconnect = async () => {
    if (window.provider.connected == true) {
      await window.provider.disconnect()
      this.setState({ walletConnect: false })
      this.setState({ accountLoading: false })
    }
    this.componentWillMount()
  }

  switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: process.env.REACT_APP_chainid }],
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


  handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      this.setWalletTrigger(false)
    } else if (accounts[0] !== this.state.account) {
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ airdropCheck: false })
      this.loadBlockchainData()
      // Do any other work!
    }
  }

  handleChainChanged = async () => {
    // We recommend reloading the page, unless you must do otherwise
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    this.setState({ chainId })
    if (chainId != process.env.REACT_APP_chainid) {
      this.setWalletTrigger(false)
    }
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

  delay = ms => new Promise(res => setTimeout(res, ms));

  timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var min = a.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var sec = a.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  deposit = async (i, amount, n, v) => {
    let bavaMasterFarmer
    if (this.state.walletConnect == true) {
      if (v == 1) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      } else if (v == 2) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      } else if (v == 3) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
      }
    } else if (this.state.wallet == true) {
      if (v == 1) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      } else if (v == 2) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      } else if (v == 3) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
      }
    }
    await bavaMasterFarmer.methods.deposit(i, amount).send({ from: this.state.account }).then(async (result) => {
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
    } else if (v == 3) {
      lpTokenAddress = this.state.poolSegmentInfoV2_2[n][i].lpAddresses[this.state.farmNetworkId]
      bavaMasterFarmerAddress = this.state.bavaMasterFarmerV2_2._address
    }
    if (this.state.walletConnect == true) {
      lpToken = new window.web3Con.eth.Contract(LpToken.abi, lpTokenAddress)
    } else if (this.state.wallet == true) {
      lpToken = new window.web3.eth.Contract(LpToken.abi, lpTokenAddress)
    }
    await lpToken.methods.approve(bavaMasterFarmerAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
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
      } else if (v == 3) {
        bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
      }
    } else if (this.state.wallet == true) {
      if (v == 1) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
      } else if (v == 2) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmer.abi, process.env.REACT_APP_bavamasterfarmv2_address)
      } else if (v == 3) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
      }
    }
    await bavaMasterFarmer.methods.withdraw(i, amount).send({ from: this.state.account }).then(async (result) => {
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
        } else if (v == 3) {
          bavaMasterFarmer = new window.web3Con.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
          if (this.state.pendingSegmentRewardV2_2[n][i] <= 0) {
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
        } else if (v == 3) {
          bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
          if (this.state.pendingSegmentRewardV2_2[n][i] <= 0) {
            alert("No token to harvest! Please deposit LP to earn BAVA")
            return
          }
        }
      }
      bavaMasterFarmer.methods.claimReward(i).send({ from: this.state.account }).then(async (result) => {
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

  checkAirdrop = async (address) => {
    let checksum = window.web3Ava.utils.toChecksumAddress(address)
    if (checksum in this.state.airdropList) {
      this.setState({ validAirdrop: true })
    } else {
      this.setState({ validAirdrop: false })
    }
    this.setState({ airdropCheck: true })
  }

  claimAirdrop = async () => {
    let bavaAirdrop
    if (this.state.walletConnect == true) {
      bavaAirdrop = new window.web3Con.eth.Contract(BavaAirdrop.abi, process.env.REACT_APP_airdrop_address)
    } else if (this.state.wallet == true) {
      bavaAirdrop = new window.web3.eth.Contract(BavaAirdrop.abi, process.env.REACT_APP_airdrop_address)
    }
    if ((Date.now() / 1000).toFixed(0) < this.state.airdropStart) {
      alert("Distribution not started yet")
    } else if ((Date.now() / 1000).toFixed(0) > this.state.airdropEnd) {
      alert("Distribution already end")
    } else {
      if ((this.state.account in this.state.airdropList) == true) {
        let processed = await bavaAirdrop.methods.processedAirdrops(this.state.account, this.state.airdropIteration).call()
        if (processed == false) {
          let hash = this.state.airdropList[this.state.account]
          await bavaAirdrop.methods.claimTokens(hash).send({ from: this.state.account }).then(async (result) => {
          }).catch((err) => {
            if (err.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
              alert("Something went wrong...Code: 4001 User rejected the request.")
            } else {
              console.error(err);
            }
          });
        } else {
          alert("Airdrop already claimed from this address")
        }
      }
    }
  }

  approveStake = async () => {
    let bavaToken
    if (this.state.walletConnect == true) {
      bavaToken = new window.web3Con.eth.Contract(BavaToken.abi, process.env.REACT_APP_bavatoken_address)
    } else if (this.state.wallet == true) {
      bavaToken = new window.web3.eth.Contract(BavaToken.abi, process.env.REACT_APP_bavatoken_address)
    }
    await bavaToken.methods.approve(process.env.REACT_APP_staking_rewards_address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
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

  stake = async (amount) => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.stake(amount).send({ from: this.state.account }).then((result) => {
      this.componentWillMount()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
      // this.componentWillMount()
    });
  }

  unstake = async (amount) => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.withdraw(amount).send({ from: this.state.account }).then(async (result) => {
      this.componentWillMount()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
      this.componentWillMount()
    });
  }

  getReward = async () => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.getReward().send({ from: this.state.account }).then(async (result) => {
      this.componentWillMount()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
      this.componentWillMount()
    });
  }

  exit = async (amount) => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.exit().send({ from: this.state.account }).then(async (result) => {
      this.componentWillMount()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
      this.componentWillMount()
    });
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
      poolSegmentInfoV2_2:[[], []],
      lpTokenSegmentInContract: [[], []],
      lpBalanceAccount: [[], []],
      lpTokenSegmentBsymbol: [[], []],
      pendingSegmentReward: [[], []],
      lpSegmentAllowance: [[], []],
      lpSegmentAllowanceV2_2: [[], []],
      bavaLpSegmentAllowance: [[], []],
      bavaLpBalanceAccount: [[], []],
      lpTokenValue: [[], []],
      tvl: [[], []],
      apr: [[], []],
      apyDaily: [[], []],
      tvlV2_2: [[], []],
      aprV2_2: [[], []],
      apyDailyV2_2: [[], []],
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
      accountLoading: false,
      totalAirdropAmount: '0',
      airdropAmount: '0',
      airdropStart: '0',
      airdropEnd: '0',
      validAirdrop: false,
      stakeAmount: '0',
      earnedAmount: '0',
      totalStake: '0',
      rewardRate: '0',
      bavaTokenAllowance: '0'
    }
  }

  render() {
    let maincontent
    let menucontent
    let traderjoecontent
    let airdropContent
    let stakeContent

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
        connectMetamask={this.connectMetamask}
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
        poolSegmentInfoV2_2={this.state.poolSegmentInfoV2_2}
        lpTokenPairsymbolsV2_2={this.state.lpTokenPairsymbolsV2_2}
        lpTokenAddressesV2_2={this.state.lpTokenAddressesV2_2}
        returnRatioV2_2={this.state.returnRatioV2_2}
        tvlV2_2={this.state.tvlV2_2}
        aprV2_2={this.state.aprV2_2}
        apyDailyV2_2={this.state.apyDailyV2_2} 
        userSegmentInfoV2_2={this.state.userSegmentInfoV2_2}
        lpBalanceAccountV2_2={this.state.lpBalanceAccountV2_2}
        lpSegmentAllowanceV2_2={this.state.lpSegmentAllowanceV2_2}
        pendingSegmentRewardV2_2={this.state.pendingSegmentRewardV2_2}
      />
      traderjoecontent = <TraderJoe
        lpTokenBalance={this.state.lpTokenBalance}
        bavaTokenBalance={this.state.bavaTokenBalance}
        deposit={this.deposit}
        withdraw={this.withdraw}
        approve={this.approve}
        setI={this.setI}
        connectMetamask={this.connectMetamask}
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
      airdropContent = <Airdrop
        wallet={this.state.wallet}
        connectMetamask={this.connectMetamask}
        claimAirdrop={this.claimAirdrop}
        checkAirdrop={this.checkAirdrop}
        timeConverter={this.timeConverter}
        checkClaimAmount={this.checkClaimAmount}
        claimDistributePurse={this.claimDistributePurse}
        account={this.state.account}
        rewardEndTime={this.state.rewardEndTime}
        rewardStartTime={this.state.rewardStartTime}
        distributedAmount={this.state.distributedAmount}
        distributedPercentage={this.state.distributedPercentage}
        rewardStartTimeDate={this.state.rewardStartTimeDate}
        rewardEndTimeDate={this.state.rewardEndTimeDate}
        claimAmount={this.state.claimAmount}
        totalTransferAmount={this.state.totalTransferAmount}
        purseTokenTotalSupply={this.state.purseTokenTotalSupply}
        airdropStart={this.state.airdropStart}
        airdropEnd={this.state.airdropEnd}
        totalAirdropAmount={this.state.totalAirdropAmount}
        airdropAmount={this.state.airdropAmount}
        validAirdrop={this.state.validAirdrop}
        airdropCheck={this.state.airdropCheck}
      />
      stakeContent = <Stake
        bavaTokenBalance={this.state.bavaTokenBalance}
        BAVAPrice={this.state.BAVAPrice}
        walletConnect={this.state.walletConnect}
        wallet={this.state.wallet}
        accountLoading={this.state.accountLoading}
        lockedBavaTokenBalance={this.state.lockedBavaTokenBalance}
        totalStake={this.state.totalStake}
        stakeAmount={this.state.stakeAmount}
        earnedAmount={this.state.earnedAmount}
        rewardRate={this.state.rewardRate}
        bavaTokenAllowance={this.state.bavaTokenAllowance}
        connectMetamask={this.connectMetamask}
        approveStake={this.approveStake}
        stake={this.stake}
        unstake={this.unstake}
        getReward={this.getReward}
        exit={this.exit}
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
            mobileWalletConnect={this.mobileWalletConnect}
            WalletDisconnect={this.WalletDisconnect}
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
                  <Route path="/claim/" exact > {airdropContent} </Route>
                  <Route path="/stake/" exact > {stakeContent} </Route>
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
// npx truffle migrate --reset --compile-all --network bscTestnet

// Pancake LP token Pair factory: https://testnet.bscscan.com/address/0xd9a601f3a434008b921f21185b814b55534eb243#readContract
// Pancake LP token Pair:
// 0xF52e1f503FffF3c212d72045839915B11478fAc6    PURSE-mUSDC
// 0x58A26F9100f77aa68E19359EffDBd7f7B97320C1    mBNB-PURSE
// 0x38da41759CF77FB897ef237D4116aa50aFb1F743    mWETH-PURSE
// 0xEa6D6CE32bF9595c8e1ab706f7e8b2e2d8453850    PURSE-mUSDT
// 0xF02D596b10297417e9F545DFDa8895F558a728A6    PURSE-mBTC

// ONEINCH LP token pair:
// 0x3A97a6084b10AA8d9Dd0DE753192E549f0D75bAe    mBTC-PURSE

// BavaToken: 9429901, 14429601
// BavaFarmRinkeby: bavaToken.address,"0x34846BF00C64A56A5FB10a9EE7717aBC7887FEdf","0xA2993e1171520ba0fD0AB39224e1B24BDa5c24a9","0x96C235003CEDd5E4C055aA0Ac624BF7CC787cF80","0x8CF7Fb0326C6a5B5A8dA62e3FE8c5eD8Cb041217","250000000000000000000","9429601","45361","75","9925",[0,"1","275","6601","19801","33001","90721",181441],[274,"6600","19800","33000","90720",181440],[75,"92","96","98","99","995","9975",9999],[25,"8","4","2","1","5","25",1]
// BavaFarmBSC: bavaToken.address,"0x34846BF00C64A56A5FB10a9EE7717aBC7887FEdf","0xA2993e1171520ba0fD0AB39224e1B24BDa5c24a9","0x96C235003CEDd5E4C055aA0Ac624BF7CC787cF80","0x8CF7Fb0326C6a5B5A8dA62e3FE8c5eD8Cb041217","250000000000000000000","13354717","200550","75","9925",[0,"1","275","6601","19801","33001","90721",181441],[274,"6600","19800","33000","90720",181440],[75,"92","96","98","99","995","9975",9999],[25,"8","4","2","1","5","25",1]


const BavaToken = artifacts.require("BavaToken");
const BavaMasterFarmer = artifacts.require("BavaMasterFarmer");
// const LpToken = artifacts.require("LpToken");


function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

// network is for network and accounts is to allow people to have access to all accounts
module.exports = async function (deployer, network, accounts) {

  // Avalanche Fuji Testnet (blk number calculation based on 14sec per blk)

  const bavafarmstartblk = 2523663     //update start blk
  const avalancheblkperyear = 2246400

  // Deploy BavaToken Fuji Testnet
  await deployer.deploy(BavaToken, bavafarmstartblk+avalancheblkperyear , bavafarmstartblk+avalancheblkperyear*4)
  const bavaToken = await BavaToken.deployed()

  await deployer.deploy(BavaMasterFarmer, bavaToken.address, "0x7bC1Eb6Ed4d3aB3BEd5EE8b7EeD01dB0714A1Bb1","0x355DFe12aF156Ba4C3B010AF973A43304Dd31f5D","0x9a6F4E35a8BF20F207EdAA0876D59e276EeedD3F","0x9D834dd94bEd11641d314f2bC7897E99Acd1768D" , "10","9990",["0","1","258","6172","18515","30858","86401","172801"],["257","6171","18514","30857","86400","172800"],["75","92","96","98","99","995","9975","9999"],["25","8","4","2","1","5","25","1"])   //avalanche mainnet
  const bavaMasterFarmer = await BavaMasterFarmer.deployed()
  await bavaMasterFarmer.initPool("232800000000000000", bavafarmstartblk ,"43200")    // 302400 for avalanche mainet(2sec/blk)
  console.log("bavafarm init") 

  // ****************************************************************************************************************

  // // Avalanche Mainnet (blk number calculation based on 2sec per blk)

  // const bavafarmstartblk = 6155708   //update start blk
  // const avalancheblkperyear = 15724800  

  // //Deploy BavaToken Mainnet
  // await deployer.deploy(BavaToken, bavafarmstartblk+avalancheblkperyear , bavafarmstartblk+avalancheblkperyear*4)
  // const bavaToken = await BavaToken.deployed()

  // await deployer.deploy(BavaMasterFarmer, bavaToken.address,"0x7bC1Eb6Ed4d3aB3BEd5EE8b7EeD01dB0714A1Bb1","0x355DFe12aF156Ba4C3B010AF973A43304Dd31f5D","0x9a6F4E35a8BF20F207EdAA0876D59e276EeedD3F","0x9D834dd94bEd11641d314f2bC7897E99Acd1768D" , "75","9925",["0","1","1801","43201","129601","216001","604801","1209601"],["1800","43200","129600","216000","604800","1209600"],["75","92","96","98","99","995","9975","9999"],["25","8","4","2","1","5","25","1"])   //avalanche mainnet
  // const bavaMasterFarmer = await BavaMasterFarmer.deployed()
  // await bavaMasterFarmer.initPool("33250000000000000", bavafarmstartblk ,"302400")    // 302400 for avalanche mainet(2sec/blk)
  // console.log("bavafarm init") 
  

  // ****************************************************************************************************************

  await bavaMasterFarmer.lockdevUpdate(53165)
  await bavaMasterFarmer.lockftUpdate(100)
  await bavaMasterFarmer.lockadrUpdate(345)
  await bavaMasterFarmer.lockfounderUpdate(53165)
  await bavaMasterFarmer.lockUpdate(95)
  console.log("bavafarm deployed")

  console.log(accounts[0])
  await bavaToken.addAuthorized(accounts[0])
  console.log("add Authorized")
  await bavaToken.manualMint("0xe57a7F50De2A71d8805C93786046e1a6B69161F0", "200000000000000000000000000") //Airdrop 20%
  console.log("manualMint1")
  await bavaToken.manualMint("0xc6c266D553b018aa4CB001FA18Bd0eceff2B5AF9", "180440000000000000000000000") //Liquidity 18.044%
  console.log("manualMint2")


  await bavaMasterFarmer.add(1000, "0x88D845D62f85b6227bEa6B37cc147449ac583846", false)
  console.log("add Farm1")
  await bavaMasterFarmer.add(1000, "0x430B6Fec06E83847aEB0D2E423f7a1E3B5C9811D", false)
  console.log("add Farm2")
  await bavaMasterFarmer.add(1000, "0xF889D569B631Fd079B0763172512F6a59c57cb38", false)
  console.log("add Farm3")
  await bavaMasterFarmer.add(1000, "0x94f2414eE834E78a3d83097507326cc044f4A60E", false)
  console.log("add Farm3")
  await bavaMasterFarmer.add(1000, "0x4C5c3189303e59FF9F727386418443F129E2f801", false)
  console.log("add Farm3")
  await bavaMasterFarmer.add(1000, "0x1A1a2057105C41103714288287C1a364F0454FFA", false)
  console.log("add Farm3")
  await bavaMasterFarmer.add(1000, "0x1B2dA256eD83352c8EE7E3E06C565Ea011444451", false)
  console.log("add Farm3")
  await bavaToken.transferOwnership(bavaMasterFarmer.address)
  console.log("transfer Ownership")
};

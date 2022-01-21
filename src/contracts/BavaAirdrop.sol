// // SPDX-License-Identifier: UNLICENSED

// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract BavaAirdrop {
//     event claimReward(address indexed owner, uint256 amount, uint256 indexed Iteration);
//     event addHolder(address indexed sender, uint256 iteration);
//     event updateHolder(address indexed sender, uint256 iteration);

//     string public name = "Bava Airdrop";
//     IERC20 public bavaToken;
//     address public owner;
//     uint256 public constant validDuration = 7 days;
//     uint256 public endDistribution;
//     bool public isClaimStart;

//     mapping(address => bool) public holder;   //address->index
//     mapping(uint256 => uint256) public numOfHolder;

//     modifier onlyOwner() {
//         require(msg.sender == owner, "not owner");
//         _;
//     }

//     constructor(IERC20 _bavaToken) {
//         bavaToken = _bavaToken;
//         owner = msg.sender;
//     }

//     function addHolderInfo(address[] calldata _holder, uint256 iteration) public onlyOwner {
//         uint256 i = 0;
//         require(_holder.length > 0, "No data");
//         for (i; i < _holder.length; i++) {
//             if (holder[_holder[i]] == false) {
//                 holder[_holder[i]] = true;
//                 numOfHolder[iteration] += 1;
//             }
//         }
//         emit addHolder(msg.sender, iteration);
//     }

//     // function updateHolderInfo(address[] calldata _holder, uint256[] calldata _amount , uint256 iteration) public onlyOwner {
//     //     uint256 i = 0;
//     //     require(_holder.length == _amount.length, "length difference");
//     //     for (i; i < _holder.length; i++) {
//     //         if (holder[_holder[i]][iteration].isRedeem == true) {
//     //             continue;
//     //         }
//     //         holder[_holder[i]][iteration] = holderInfo(true, false);
//     //     }
//     //     emit updateHolder(msg.sender, iteration);
//     // }

//     function startClaim(bool check, uint256 _startClaim) public onlyOwner {
//         if (check) {
//             endDistribution = _startClaim + validDuration;
//             isClaimStart = true;
//         } else {
//             isClaimStart = false;
//         }
//     }

//     function updateEndDistribution(uint256 _endDistribution) public onlyOwner {
//         endDistribution = _endDistribution;
//     }

//     function checkData(address[] calldata _holder, uint256 iteration) public view returns (uint256, bool) {
//         uint256 i = 0;
//         for (i; i < _holder.length; i++) {
//             if (holder[_holder[i]] != true) {
//                 return (i, false);
//             }
//         }
//         return (i, true);
//     }

//     // Notice Transfers tokens held by timelock to beneficiary.
//     function claim(uint256 iteration) public {
//         require (isClaimStart == true, "Claim is false");
//         require(block.timestamp < endDistribution, "Distribution window over");
//         require(holder[msg.sender][iteration] == false, 'Have been redeem');

//         holder[msg.sender][iteration].isRedeem = true;
//         uint256 claimAmount = holder[msg.sender][iteration].distributeAmount;
//         safeBavaTransfer(msg.sender, claimAmount);
//         emit claimReward(msg.sender, claimAmount, iteration);
//     }

//     function returnBavaToken(address _to) public onlyOwner {
//         require(_to != address(0), "send to the zero address");
//         uint256 remainingAmount = bavaToken.balanceOf(address(this));
//         safeBavaTransfer(_to, remainingAmount);
//     }

//     function returnAnyToken(address token, uint256 amount, address _to) public onlyOwner{
//         require(_to != address(0), "send to the zero address");
//         IERC20(token).transfer(_to, amount);
//     }

//     function updateOwner(address _owner) public onlyOwner{
//         require(_owner != address(0), "not valid address");
//         require(_owner != owner, "same owner address");
//         owner = _owner;
//     }

//     // Safe Bava transfer function, just in case if rounding error causes pool to not have enough Bavas.
//     function safeBavaTransfer(address _to, uint256 _amount) private {
//         uint256 BavaBal = bavaToken.balanceOf(address(this));
//         if (_amount > BavaBal) {
//             bavaToken.transfer(_to, BavaBal);
//         } else {
//             bavaToken.transfer(_to, _amount);
//         }
//     }
// }

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Airdrop {
    address public admin;
    mapping(address => bool) public processedAirdrops;
    IERC20 public token;
    uint256 public currentAirdropAmount;
    uint256 public maxAirdropAmount = 100000 * 10**18;

    event AirdropProcessed(address recipient, uint256 amount, uint256 date);

    constructor(address _token, address _admin) {
        admin = _admin;
        token = IERC20(_token);
    }

    function updateAdmin(address newAdmin) external {
        require(msg.sender == admin, "only admin");
        admin = newAdmin;
    }

    function claimTokens(
        address recipient,
        uint256 amount,
        bytes calldata signature
    ) external {
        bytes32 message = prefixed(
            keccak256(abi.encodePacked(recipient, amount))
        );
        require(recoverSigner(message, signature) == admin, "wrong signature");
        require(
            processedAirdrops[recipient] == false,
            "airdrop already processed"
        );
        require(
            currentAirdropAmount + amount <= maxAirdropAmount,
            "airdropped 100% of the tokens"
        );
        processedAirdrops[recipient] = true;
        currentAirdropAmount += amount;
        token.transfer(recipient, amount);
        emit AirdropProcessed(recipient, amount, block.timestamp);
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            uint8,
            bytes32,
            bytes32
        )
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }
}

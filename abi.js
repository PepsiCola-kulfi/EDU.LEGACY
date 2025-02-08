const CONTRACT_METADATA={
	"compiler": {
		"version": "0.8.26+commit.8a97fa7a"
	},
	"language": "Solidity",
	"output": {
		"abi": [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_platformWallet",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_platformFeePercentage",
						"type": "uint256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "DepositMade",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "beneficiary",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "MilestoneClaimed",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					}
				],
				"name": "MilestoneWillCreated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					}
				],
				"name": "Ping",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "newRecipient",
						"type": "address"
					}
				],
				"name": "RecipientUpdated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "originalOwner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "newOwner",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "UnclaimedWillDistributed",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "beneficiary",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "WillClaimed",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "beneficiary",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "description",
						"type": "string"
					}
				],
				"name": "WillCreated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "WillWithdrawn",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "willIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "releaseIndex",
						"type": "uint256"
					}
				],
				"name": "claimMilestoneWill",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_owner",
						"type": "address"
					}
				],
				"name": "claimNormalWill",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address[]",
						"name": "_beneficiaries",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "_releaseTimes",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "_releasePercentages",
						"type": "uint256[]"
					},
					{
						"internalType": "string[]",
						"name": "_descriptions",
						"type": "string[]"
					}
				],
				"name": "createMilestoneWill",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address payable",
						"name": "_beneficiary",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_description",
						"type": "string"
					}
				],
				"name": "createNormalWill",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "deposit",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_beneficiary",
						"type": "address"
					}
				],
				"name": "getMilestoneWillsAsBeneficiary",
				"outputs": [
					{
						"internalType": "address[]",
						"name": "owners",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "willIndexes",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "releaseIndexes",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "releaseAmounts",
						"type": "uint256[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_beneficiary",
						"type": "address"
					}
				],
				"name": "getNormalWillAsBeneficiary",
				"outputs": [
					{
						"internalType": "address[]",
						"name": "owners",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "amounts",
						"type": "uint256[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "hasNormalWill",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "milestoneWills",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "claimedAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isFullyClaimed",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "normalWills",
				"outputs": [
					{
						"internalType": "address",
						"name": "beneficiary",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastPingTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "creationTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isClaimed",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "ping",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "platformFeePercentage",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "platformWallet",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "newRecipient",
						"type": "address"
					}
				],
				"name": "updateRecipient",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "withdrawNormalWill",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		],
		"devdoc": {
			"kind": "dev",
			"methods": {},
			"version": 1
		},
		"userdoc": {
			"kind": "user",
			"methods": {},
			"version": 1
		}
	},
	"settings": {
		"compilationTarget": {
			"contracts/WillManager.sol": "WillManager"
		},
		"evmVersion": "cancun",
		"libraries": {},
		"metadata": {
			"bytecodeHash": "ipfs"
		},
		"optimizer": {
			"enabled": false,
			"runs": 200
		},
		"remappings": []
	},
	"sources": {
		"@openzeppelin/contracts/token/ERC20/IERC20.sol": {
			"keccak256": "0xc6a8ff0ea489379b61faa647490411b80102578440ab9d84e9a957cc12164e70",
			"license": "MIT",
			"urls": [
				"bzz-raw://0ea104e577e63faea3b69c415637e99e755dcbf64c5833d7140c35a714d6d90c",
				"dweb:/ipfs/Qmau6x4Ns9XdyynRCNNp3RhLqijJjFm7z5fyZazfYFGYdq"
			]
		},
		"contracts/WillManager.sol": {
			"keccak256": "0x810ca9395b9ecc7bb033ad565638dfa31ef013603b31d4f568607e23acf85fa1",
			"license": "MIT",
			"urls": [
				"bzz-raw://3d9600f82ed15f9e0c740ba87200f88bda2b92e4007b67cf8469e8af56ced66d",
				"dweb:/ipfs/QmWyVk1EykinjWPReripbR5H3vSL74mVHBeuxGYGBg5gQQ"
			]
		}
	},
	"version": 1
}
export default CONTRACT_METADATA.output.abi;

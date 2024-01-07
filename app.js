// Replace 'yourContractAddress' with the actual deployed contract address
const contractAddress = '0xa011b6D96b3860c8D2AF916fcdaC33EC5a05ea89';

// Replace 'yourGanacheAccountAddress' with the actual Ganache account address
const ganacheAccount = '0x8543918A451405809971C3917cC9E39Ab95f3149';

// Your contract ABI (replace with your provided ABI)
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getResult",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "candidatesCount",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
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
        "name": "voters",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Create a new web3 instance (replace with your web3 provider)
const web3 = new Web3('http://127.0.0.1:7545'); // Assuming Ganache is running on this address

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to handle the voting
function vote() {
    const selectedOption = document.getElementById('selectedOption').value;
    // Implement your voting logic using the contract.methods.vote function
    // Example:
    contract.methods.vote(selectedOption).send({ from: ganacheAccount })
        .on('transactionHash', (hash) => {
            console.log('Transaction Hash:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transaction Receipt:', receipt);
        })
        .on('error', (error) => {
            console.error('Error:', error);
        });
}

// Other functions or interactions with the smart contract can be added here

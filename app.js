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

// Function to get candidates from the smart contract
async function getCandidates() {
  const count = await contract.methods.candidatesCount().call();
  const candidates = [];

  for (let i = 1; i <= count; i++) {
    const candidate = await contract.methods.candidates(i).call();
    candidates.push(candidate);
  }

  return candidates;
}

// Function to display candidates in the HTML page
async function displayCandidates() {
  const candidates = await getCandidates();
  const optionsDiv = document.getElementById('votingOptions');
  const select = document.getElementById('selectedOption');

  candidates.forEach(candidate => {
    const option = document.createElement('div');
    option.textContent = candidate.name;
    optionsDiv.appendChild(option);

    const selectOption = document.createElement('option');
    selectOption.value = candidate.id;
    selectOption.text = candidate.name;
    select.appendChild(selectOption);
  });
}

// Display candidates when the page loads
displayCandidates();

// Example: Send a transaction to the smart contract using a Ganache account address
document.getElementById('voteButton').addEventListener('click', async () => {
  const selectedOption = document.getElementById('selectedOption').value;
  await contract.methods.vote(selectedOption).send({ from: ganacheAccount });
  displayCandidates(); // Refresh candidates after voting
});

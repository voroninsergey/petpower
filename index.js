require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Проверка загрузки переменных окружения
console.log("INFURA_PROJECT_ID:", process.env.INFURA_PROJECT_ID);
console.log("OWNER_ADDRESS:", process.env.OWNER_ADDRESS);
console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraProjectId}`);

// Загрузка ABI из файла
const contractABIPath = path.resolve(__dirname, 'build', 'contracts', 'PetPower.json');
const contractJSON = JSON.parse(fs.readFileSync(contractABIPath));
const contractABI = contractJSON.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

const petPower = new web3.eth.Contract(contractABI, contractAddress);

(async () => {
  try {
    // Проверить баланс аккаунта владельца
    const ownerAddress = process.env.OWNER_ADDRESS;
    const balance = await petPower.methods.balanceOf(ownerAddress).call();
    console.log("Owner Balance:", balance);

    // Проверить общую эмиссию токенов
    const totalSupply = await petPower.methods.totalSupply().call();
    console.log("Total Supply:", totalSupply);
  } catch (error) {
    console.error("Error:", error);
  }
})();

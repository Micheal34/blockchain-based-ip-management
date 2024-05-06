const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const Tx = require('ethereumjs-tx').Transaction;

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Địa chỉ và ABI của hợp đồng thông minh quản lý sở hữu trí tuệ
const contractABI = [/* ABI của hợp đồng sẽ được nhập ở đây */];
const contractAddress = '0xYourContractAddress';

const ipManagementContract = new web3.eth.Contract(contractABI, contractAddress);

// Hàm để đăng ký tài sản trí tuệ mới
async function registerIP(ownerAddress, ipDetails) {
  const ipData = web3.utils.asciiToHex(ipDetails); // Chuyển đổi chi tiết IP thành hex
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 3000000;

  const txCount = await web3.eth.getTransactionCount(ownerAddress);
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: contractAddress,
    value: '0x0',
    gasLimit: web3.utils.toHex(gasLimit),
    gasPrice: web3.utils.toHex(gasPrice),
    data: ipManagementContract.methods.registerNewIP(ipData).encodeABI()
  };

  // Tạo và ký giao dịch (thêm phần này dựa trên môi trường cụ thể)
  const tx = new Tx(txObject, { 'chain': 'ropsten' });
  // tx.sign(privateKeySender); // Ký giao dịch bằng khóa bí mật của người gửi

  const serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');

  const result = await web3.eth.sendSignedTransaction(raw);
  return result.transactionHash;
}

module.exports = { registerIP };

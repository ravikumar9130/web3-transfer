import { useState } from "react";
import { Box, Button, Heading, Card, CardBody, Input } from "@chakra-ui/react";
import Web3 from "web3";

const TransferToken = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const tokenAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; 
  const abi = JSON.parse(
    '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]'
  );
  
  const web3 = new Web3(window.ethereum);

const usdcContract = new web3.eth.Contract(abi, tokenAddress);

  async function transfer() {
    try {
      // Request user's permission to connect to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Get the selected account from MetaMask
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];
  
      // Convert transfer amount to Wei (USDC has 6 decimal places)
      const transferAmountWei = web3.utils.toWei((transferAmount * 10 ** 6).toString(), 'wei');
  
      console.log('Sender Address:', senderAddress);
      console.log('Receiver Address:', receiverAddress);
      console.log('Transfer Amount (Wei):', transferAmountWei);
  
      // Call the transfer function of the USDC contract
      const tx = await usdcContract.methods.transfer(receiverAddress, transferAmountWei).send({
        from: senderAddress
      });
  
      console.log('Transaction hash:', tx.transactionHash);
      console.log('Tokens transferred successfully!');
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  }
  
  // async function transfer() {
  //   try {
  //     if (window.ethereum) {
  //       await window.ethereum.enable();
  //       const web3 = new Web3(window.ethereum);
  //       const tokenContract = new web3.eth.Contract(abi, tokenAddress);
        
  //       if (!web3.utils.isAddress(receiverAddress)) {
  //         throw new Error('Invalid recipient address');
  //       }
  //       const valueInWei = web3.utils.toWei((transferAmount * 1e6).toString(), "wei");
  //       const value = web3.utils.fromWei(valueInWei, "wei");
    
  //       if (Number(value) <= 0) {
  //         throw new Error('Amount must be greater than 0');
  //       }
  //       const gasPrice = await web3.eth.getGasPrice();
  //       console.log("🚀🦋💯 ~ transfer ~ gasPrice:", gasPrice)
  
  //       const gasPriceWei = web3.utils.toWei((Number(gasPrice) * 1200).toString(), 'wei'); 
  //       console.log("🚀🦋💯 ~ transfer ~ gasPriceWei:", gasPriceWei)
  
    
  //       const transaction = await tokenContract.methods.transfer(receiverAddress, value).send({ from: walletAddress, gasPrice: gasPriceWei})
  //       console.log("🚀🦋💯 ~ transfer ~ transaction:", transaction)
  
  //       alert('Tokens transferred successfully');
  //     } else {
  //       console.error('MetaMask not detected. Please install MetaMask extension.');
  //     }
  //   } catch (error) {
  //     console.error("Transaction failed:", error.message);
  //     window.alert("Transaction failed. Please try again.");
  //   }
  // }
  
  return (
    <Box className="flex flex-col justify-center items-center mt-10">
      <Heading size="lg" mb={4}>
        Transfer ERC20 Tokens
      </Heading>
      <Card align="center" mb={8}>
        <CardBody className="bg-[#F4F6F8] min-w-[600px]">
          <Heading size="md" mb={4}>
            {"Recipient's Ethereum Address"}
          </Heading>
          <Input
            placeholder="Enter recipient's address"
            bg="white"
            mb={4}
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
          />
          <Heading size="md" mb={4}>
            Token Amount
          </Heading>
          <Input
            placeholder="Enter token amount"
            bg="white"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <Button
            bg="btnColor"
            color="white"
            _hover={{ bg: "btnColor" }}
            size="md"
            borderRadius="25"
            mt={4}
            px={6}
            py={2}
            onClick={transfer}
          >
            Submit
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
};

export default TransferToken;

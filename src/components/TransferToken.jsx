import { useState } from "react";
import { Box, Button, Heading, Card, CardBody, Input,useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Web3 from "web3";

const TransferToken = () => {
  const toast = useToast();
  const [receiverAddress, setReceiverAddress] = useState("");
  const [loading, setLoading] = useState(false); 
  const [transferAmount, setTransferAmount] = useState("");

  const tokenAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  const abi = JSON.parse(
    '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]'
  );

  const web3 = new Web3(window.ethereum);

  const isAddressValid = (address) => {
    return web3.utils.isAddress(address);
  };

  const isTokenValid = (amount) => {
    return amount > 0;
  };

  const handleTransfer = async () => {
    if (!receiverAddress || !transferAmount) {
      toast({
        title: "Error",
        description: "Recipient address and token amount are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!isAddressValid(receiverAddress)) {
      toast({
        title: "Error",
        description: "Invalid recipient address.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!isTokenValid(transferAmount)) {
      toast({
        title: "Error",
        description: "Token amount must be greater than 0.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      setLoading(true);

      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the selected account from MetaMask
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];
      const usdcContract = new web3.eth.Contract(abi, tokenAddress, {
        from: senderAddress,
        gasLimit: 300000,
      });
      // Convert transfer amount to Wei (USDC has 6 decimal places)
      const transferAmountWei = web3.utils.toWei(
        (transferAmount * 10 ** 6).toString(),
        "wei"
      );

      console.log("Sender Address:", senderAddress);
      console.log("Receiver Address:", receiverAddress);
      console.log("Transfer Amount (Wei):", transferAmountWei);

      const tx = await usdcContract.methods
        .transfer(receiverAddress, transferAmountWei)
        .send();

      console.log("Transaction hash:", tx.transactionHash);
      console.log("Tokens transferred successfully!");

      toast({
        title: "Success",
        description: "Tokens transferred successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

    } catch (error) {
      console.error("Error transferring tokens:", error);

      toast({
        title: "Error",
        description: error.message || "An error occurred while transferring tokens.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

    } finally {
      setLoading(false); 
    }

  };

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
            USDC Token Amount
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
            onClick={handleTransfer}
            disabled={!receiverAddress || !transferAmount || !isAddressValid(receiverAddress) || !isTokenValid(transferAmount)}
          >
            Submit
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={loading} onClose={() => setLoading(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Processing Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Please wait while the transaction is being processed...
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default TransferToken;
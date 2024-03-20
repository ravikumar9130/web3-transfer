import { useState } from "react";
import {
  Box,
  Text,
  Button,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Input,
} from "@chakra-ui/react";
import Web3 from "web3";
import ERC20Contract from "erc20-contract-js";

const TokenBalance = () => {
  const endpointUrl =
    "https://stylish-red-arm.quiknode.pro/5f7102dc0345bce0ece9e914e047bd45aa57e262/";
  const httpProvider = new Web3.providers.HttpProvider(endpointUrl);
  const web3Client = new Web3(httpProvider);
  const tokenAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  const ABI = JSON.parse(
    '[{"inputs":[{"internalType":"address","name":"implementationContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]'
  );
  const contract = new web3Client.eth.Contract(ABI, tokenAddress);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // -------------------------
  async function main() {
    // Create new instance of ERC20Contract
    const erc20Contract = new ERC20Contract(web3Client, tokenAddress);

    // Get balance of
    erc20Contract
      .balanceOf(walletAddress)
      .call()
      .then((balance) => console.log(`Balance: ${balance}`));
  }
  main();
  async function getBalance() {
    setLoading(true);
    const result = await contract.methods.balanceOf(walletAddress).call();
    const decimals = BigInt(6); // Convert regular number to BigInt
    const tokenAmount = result / BigInt(10) ** decimals; // Ensure both values are BigInt
    setTokenAmount(tokenAmount.toString()); // Convert BigInt to string for display
    setLoading(false);
    setShow(true);
  }

  return (
    <Box className="flex flex-col justify-center items-center mt-10 ">
      <Heading size="lg" mb={4} className="flex items-center justify-center">
        <img
          src="https://etherscan.io/token/images/weth_28.png"
          className="mr-4"
        />
        Wrapped Ether <span className="text-gray-500 mx-2">(WETH)</span>
        Balance
      </Heading>
      <Card align="center" mb={8}>
        <CardBody className="bg-[#F4F6F8] min-w-[600px]">
          <Heading size="md" mb={4}>
            Enter your wallet Address
          </Heading>
          <Input
            placeholder="Enter Ethereum Address"
            bg={"white"}
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
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
            onClick={getBalance}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </CardBody>
      </Card>
      {show && (
        <Card align="center">
          <CardHeader className="bg-[#F4F6F8] min-w-[600px] h-12"></CardHeader>
          <CardBody className="bg-white min-w-[600px] flex justify-between">
            <Text>Token Balance</Text>
            <Text fontWeight="bold">{tokenAmount}</Text>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default TokenBalance;

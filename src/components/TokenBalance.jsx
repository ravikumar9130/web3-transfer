import { useState } from "react";
import {
  Box,
  Text,
  Button,
  Heading,
  Card,
  CardBody,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Web3 from "web3";
import ERC20Contract from "erc20-contract-js";

const TokenBalance = () => {
  const endpointUrl =
    "https://goerli.infura.io/v3/201b91a4ba1244adbb9220b91f33cb95";
  const httpProvider = new Web3.providers.HttpProvider(endpointUrl);
  const web3Client = new Web3(httpProvider);
  const tokenAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

  const [walletAddress, setWalletAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  async function getBalance() {
    setLoading(true);
    try {
      const erc20Contract = new ERC20Contract(web3Client, tokenAddress);
      const result = await erc20Contract.balanceOf(walletAddress).call();

      const decimals = BigInt(6);
      const tokenAmount = result / BigInt(10) ** decimals;
      setTokenAmount(tokenAmount.toString());
      setLoading(false);
      setShow(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setLoading(false);
      setShow(false);
    }
  }

  return (
    <Box className="flex flex-col justify-center items-center mt-10 ">
      <Heading size="lg" mb={4} className="flex items-center justify-center">
        <img
          src="https://etherscan.io/token/images/weth_28.png"
          className="mr-4"
          alt="Token Logo"
        />
        USDC <span className="text-gray-500 mx-2">(WETH)</span>
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
            {loading ? <Spinner size="sm" color="white" /> : "Submit"}
          </Button>
        </CardBody>
      </Card>
      {show && (
        <Card align="center">
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

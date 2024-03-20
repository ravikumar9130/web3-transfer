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
  useToast,
  Fade,
  Skeleton,
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
  const [tokenAmount, setTokenAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const toast = useToast(); // Initialize the useToast hook

  const isAddressValid = (address) => {
    return web3Client.utils.isAddress(address);
  };

  const handleGetBalance = async () => {
    if (!isAddressValid(walletAddress)) {
      toast({
        title: "Error",
        description: "Invalid Ethereum address format.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      const erc20Contract = new ERC20Contract(web3Client, tokenAddress);
      const result = await erc20Contract.balanceOf(walletAddress).call();

      const decimals = BigInt(6);
      const tokenAmount = result / BigInt(10) ** decimals;
      setTokenAmount(tokenAmount.toString());
      setShowBalance(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast({
        title: "Error",
        description: "Failed to fetch token balance. Please try again.",
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
      <Heading size="lg" mb={4} className="flex items-center justify-center">
        <img
          src="https://etherscan.io/token/images/centre-usdc_28.png"
          className="mr-4"
          alt="Token Logo"
        />
        USDC <span className="text-gray-500 mx-2">(WETH)</span>
        Balance
      </Heading>
      <Card align="center" mb={8}>
        <CardBody className="bg-[#F4F6F8] min-w-[600px]">
          <Heading size="md" mb={4}>
            Enter your Ethereum Address
          </Heading>
          <Input
            placeholder="Enter Ethereum Address"
            bg={"white"}
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            isInvalid={!isAddressValid(walletAddress)}
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
            onClick={handleGetBalance}
            disabled={loading || !isAddressValid(walletAddress)}
          >
            {loading ? <Spinner size="sm" color="white" /> : "Submit"}
          </Button>
        </CardBody>
      </Card>
      <Fade in={showBalance}>
        <Skeleton isLoaded={!loading} width="100%" height="50px">
          <Card align="center" mt={8}>
            <CardBody className="bg-white min-w-[600px] flex justify-between">
              <Text fontWeight="bold">Token Balance:</Text>
              <Text>{tokenAmount}</Text>
            </CardBody>
          </Card>
        </Skeleton>
      </Fade>
    </Box>
  );
};

export default TokenBalance;

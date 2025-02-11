import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../assets/speraxLogo.svg";
import { useAtom } from "jotai";
import {WalletAddress} from "../global"
const Links = ["Home", "Demeter", "Gauge", "Stake", "Buyback", "Swap", "More"];

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
    as="a"
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address,setAddress]= useAtom(WalletAddress)

    async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        console.log(address)

        // const web3 = new Web3(window.ethereum );
        // const balanceInWei = await web3.eth.getBalance(accounts[0]);
        // const balanceInEther =
        //   balanceInWei && web3.utils.fromWei(balanceInWei, "ether");
        // setBalance(balanceInEther);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install MetaMask");
    }
  }

  return (
    <>
      <Box bg="white" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <img src={Logo} alt="" />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              width="100%"
              // justifyContent={"space-between"}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <div>
                <Button
                  bg="btnColor"
                  color="white"
                  _hover={{ bg: "btnColor" }}
                  size="md"
                  borderRadius="25"
                  mr={4}
                >
                  Buy SPA & USDs
                </Button>
                <Button
                  onClick={connect}
                  bg="btnColor"
                  color="white"
                  _hover={{ bg: "btnColor" }}
                  size="md"
                  borderRadius="25"
                >
                  {address? address.slice(0, 5) + "..." + address.slice(-4):"Connect wallet"}
                </Button>
              </div>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

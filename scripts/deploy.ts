import { ethers } from "hardhat";
import { addresses } from "../test/addresses";

async function main() {
  const [owner, user] = await ethers.getSigners();

  const quantity = addresses.length;
  const id = 1;
  const amount = 1;
  const ids = Array(quantity).fill(id);
  const amounts = Array(quantity).fill(amount);

  const NFTEasyDrop = await ethers.getContractFactory("NFTEasyDrop");
  const nfteasydrop = await NFTEasyDrop.deploy();
  await nfteasydrop.deployed();
  console.log("NFTEasyDrop contract has been deployed");

  const Mock721 = await ethers.getContractFactory("Mock721");
  const mock721 = await Mock721.deploy(quantity);
  await mock721.connect(user).deployed();
  const address721 = mock721.address;
  console.log(
    `Mock721 contract has been deployed to ${address721} address, ${quantity} tokens minted to ${user.address} address`
  );

  const Mock1155 = await ethers.getContractFactory("Mock1155");
  const mock1155 = await Mock1155.deploy(quantity, ids, amounts);
  await mock1155.connect(user).deployed();
  const address1155 = mock1155.address;
  console.log(
    `Mock1155 contract has been deployed to ${address1155} address, ${quantity} tokens with ID of ${id} has been minted to ${user.address} address`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

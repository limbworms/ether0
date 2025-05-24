const {expect} = require("chai");
// const ethers = require('ethers');
const hre = require("hardhat");
const {
  loadFixture,
  helpers
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe("NftSale contract", function () {
  it("Nft Should not be sold", async function () {
    const [headAddr, tailAddr] = await hre.ethers.getSigners();
    const NftSale = await hre.ethers.getContractFactory("NftSale");
    const nftsaleInstance = await NftSale.deploy();

    // console.dir(await nftsaleInstance.maxSales());
    expect(await nftsaleInstance.owner()).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

	});

  it("Nft should be buyable", async function () {
    const NftSale = await hre.ethers.getContractFactory("NftSale");
    const nftsaleInstance = await NftSale.deploy();
    expect(await nftsaleInstance.canBuy()).to.equal(true);
  });

  it("Nft should not be accessible", async function () {
    const NftSale = await hre.ethers.getContractFactory("NftSale");
    const nftsaleInstance = await NftSale.deploy();
    expect(await nftsaleInstance.hasAccess()).to.equal(false);
  });

  it("Nft should accept correct amount", async function () {
    const accounts = await ethers.getSigners()
    await accounts[1].sendTransaction({ to: accounts[0], value: ethers.parseEther('0.01'),});
    const account_balance = await ethers.provider.getBalance(accounts[0].address)
    // console.log(accounts[0].address, account_balance)

    const NftSale = await hre.ethers.getContractFactory("NftSale");
    const nftsaleInstance = await NftSale.deploy();
    expect(await nftsaleInstance.connect(accounts[0]).buy({value: ethers.parseEther("0.01")}))
  });


  it("Nft should revert bad amount", async function () {
  const accounts = await ethers.getSigners()
  await accounts[1].sendTransaction({ to: accounts[0], value: ethers.parseEther('0.01'),});
  const account_balance = await ethers.provider.getBalance(accounts[0].address)
  // console.log(accounts[0].address, account_balance)

  const NftSale = await hre.ethers.getContractFactory("NftSale");
  const nftsaleInstance = await NftSale.deploy();
  await expect(nftsaleInstance.connect(accounts[0]).buy({value: ethers.parseEther("0.001")})).to.be.revertedWith("Bad amount");
});

});

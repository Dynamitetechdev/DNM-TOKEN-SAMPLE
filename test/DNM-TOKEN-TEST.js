const { expect, assert } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");

describe("ercToken", () => {
  let DNM_token_contract, deployer, spender;
  const token = ethers.utils.parseEther("2");
  const amountToSpent = ethers.utils.parseEther("0.5");
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    spender = (await getNamedAccounts()).spender;
    await deployments.fixture(["all"]);
    DNM_token_contract = await ethers.getContract("DNM");
  });

  describe("approve", () => {
    it("should give approve some token for spender", async () => {
      await DNM_token_contract.approve(spender, token);
      const allowance = await DNM_token_contract.allowance(deployer, spender);
      console.log(allowance.toString());
      console.log(spender);
      expect(token.toString()).to.equal(allowance.toString());
    });
  });

  describe("transfer", () => {
    it("should transfer value to `to` address", async () => {
      const transferTX = await DNM_token_contract.transfer(spender, token);
      const txReceipt = await transferTX.wait(1);
      const { _from, _to, _value } = await txReceipt.events[0].args;
      assert(!spender == "0x0");
      assert(_from == deployer);
      assert(_to == spender);
      assert(_value.toString() == token.toString());
      expect(transferTX).to.emit(DNM_token_contract, "Transfer");
    });
  });

  //   describe("transferForm", () => {
  //     it.only("should approve token for spender, spender can send, and amt spent should be - from spenders allowance", async () => {
  //       await DNM_token_contract.approve(spender, token);
  //       const startingAllowance = DNM_token_contract.allowance(deployer, spender);

  //       const transferFrom = await DNM_token_contract.transferFrom(
  //         deployer,
  //         spender,
  //         amountToSpent
  //       );
  //       const endingAllowance = DNM_token_contract.allowance(deployer, spender);

  //       console.log(`Starting Allowance: ${startingAllowance.toString()}`);
  //       console.log(`Ending Allowance: ${endingAllowance.toString()}`);

  //       //   assert(endingAllowance < startingAllowance);

  //       expect(transferFrom).to.emit(DNM_token_contract, "Transfer");
  //     });
  //   });
});

const Migrations = artifacts.require("Migrations");
const GraphToken = artifacts.require("GraphToken");

module.exports = async function (deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(GraphToken);
  const token = await GraphToken.at(GraphToken.address);
  // console.log(token);
  // Mint 1k Graph Tokens to the deployer
  await token._mint("0xd131546B0A72Cbaf971A04Bc1D90A5FAef98F2e9","1000000000000000000000");
};

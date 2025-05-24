const hre = require("hardhat");
const fs = require('fs');

async function main() {
    // Initialize an empty object to store deployed contract addresses
    let deployedContracts = {};

    // Check if the 'deployed-contracts.json' file exists
//    if (fs.existsSync('deployed-contracts.json')) {

			  // If the file exists, read its contents and parse the JSON data
        //const data = fs.readFileSync('deployed-contracts.json', 'utf8');

        //deployedContracts = JSON.parse(data);

        // Get the factory of the 'InheritanceSubmission' contract
        // InheritanceSubmission = await ethers.getContractFactory("InheritanceSubmission");
//		} else {
        const NftSale = await hre.ethers.getContractFactory("NftSale");
        const nftsaleInstance = await NftSale.deploy();
        await nftsaleInstance.waitForDeployment();

        console.log("Contract deployed to:", nftsaleInstance.target);

        console.dir(nftsaleInstance);
        Nft = await nftsaleInstance.target;

        deployedContracts = {
        	nft: Nft
        }

	        // Write the 'deployedContracts' object to 'deployed-contracts.json' file
          fs.writeFileSync('deployed-contracts.json', JSON.stringify(deployedContracts, null, 2));
//		}
    //const inheritanceSubmissionContractFactory = await ethers.getContractFactory("InheritanceSubmission");
		//const inheritanceSubmissionContract = await inheritanceSubmissionContractFactory.deploy(deployedContracts.nft);
    //console.log("InheritanceSubmission contract has been deployed at", await inheritanceSubmissionContract.getAddress());
}

	main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

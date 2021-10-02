const main = async () => {
  const monkeContractFactory = await hre.ethers.getContractFactory(
    'ReturnToMonke'
  );
  const monkeContract = await monkeContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await monkeContract.deployed();

  console.log('Contract addy:', monkeContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    monkeContract.address
  );
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let eatBananaTxn = await monkeContract.eatBanana("I love 'nanas");
  await eatBananaTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(monkeContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  eatBananaTxn = await monkeContract.eatBanana('Green bananas suck!!');
  await eatBananaTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(monkeContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  const [_, randoPerson] = await ethers.getSigners();
  eatBananaTxn = await monkeContract
    .connect(randoPerson)
    .eatBanana('Mmmm Potassium!');
  await eatBananaTxn.wait(); // Wait for the transaction to be mined

  contractBalance = await hre.ethers.provider.getBalance(monkeContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let totalBananasEaten = await monkeContract.getTotalBananasEaten();

  let allWoops = await monkeContract.getAllWoops();
  console.log(allWoops);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

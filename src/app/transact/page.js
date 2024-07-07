


const EthereumTransactionPage = () => {
    useEffect(() => {
        const web3 = new Web3('https://rinkeby.infura.io/xxxxxxxxxxxxxxxxxx');
        const account1 = '0xf2b6xxxxxxxxxxxxxxxxxxx83e9d52d934e5c';
        const privateKey1 = Buffer.from('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'hex');

        web3.eth.getTransactionCount(account1, (err, txCount) => {
            // smart contract data
            const data = 'your data here';

            // create transaction object
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(1000000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                data: data
            };

            // sign the transaction
            const tx = new Tx(txObject);
            tx.sign(privateKey1);
            const serializedTx = tx.serialize();
            const raw = '0x' + serializedTx.toString('hex');

            // broadcast the transaction
            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                console.log('err : ', err, 'txHash : ', txHash);
                // use this hash to find smart contract on etherscan
            }).on('receipt', console.log);
        });
    }, []); // useEffect will run once when the component mounts

    return (
        <div>
            <h1>Ethereum Transaction Page</h1>
        </div>
    );
};

export default EthereumTransactionPage;
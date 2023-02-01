const bip39     = require('bip39');
const hdkey     = require('hdkey');
const bitcoin   = require('bitcoinjs-lib');
const fs        = require("fs");

function generateInfo(mnemonicPhrase, userAdress) {
    const seed = bip39.mnemonicToSeedSync(mnemonicPhrase);
    const root = hdkey.fromMasterSeed(seed);
    const masterNode = root.derive("m/44'/0'/0'/0/0");
    const address = bitcoin.payments.p2pkh({ pubkey: masterNode.publicKey }).address;
    console.log("====================================================================================");
    console.log(`[-] - Mnemonic: ${mnemonicPhrase}\n[-] - ${address}`);
    try {
        if(userAdress == address){
            console.log("====================================================================================");
            console.log("Your wallet has been successfully recovered!");
            fs.appendFileSync("recovered.txt", `[-] - Mnemonic: ${mnemonicPhrase}\n[-] - ${address}` + "\n\n");

            process.exit();
        }
    } catch (err) {
        console.log(err);
        process.exit();
    }
}

module.exports = generateInfo;

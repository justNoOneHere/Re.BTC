const crypto    = require('crypto');
const bs58      = require('bs58');
const ec        = require('elliptic').ec('secp256k1');
const fs        = require("fs");

async function infoGenerator(passphrase, userAdress, argv) {
    try{
        console.log("====================================================================================");
        let hash;
        let privateKey;
        if (argv.hasOwnProperty('Brainwallet')){
            hash = crypto.createHash('sha256').update(passphrase).digest();
            privateKey = hash.toString('hex');
            while (privateKey.length < 64) {
                privateKey = "0" + privateKey;
            }
            console.log(`[A] - Passphrase: ` + passphrase);
            console.log(`[+] - Private key: ` + privateKey);
        } else if (argv.hasOwnProperty('Directory')) {
            privateKey = passphrase;
            console.log(`[+] - Private key: ` + privateKey);
        }

        let keyPair = crypto.createECDH('secp256k1');
        keyPair.setPrivateKey(Buffer.from(privateKey, 'hex'));
        let publicKey = keyPair.getPublicKey();
        let pubKeyHash = crypto.createHash('sha256').update(publicKey).digest();
        pubKeyHash = crypto.createHash('ripemd160').update(pubKeyHash).digest();
        let addy = Buffer.alloc(21);
        addy.writeUInt8(0x00, 0);
        pubKeyHash.copy(addy, 1);
        let checksum = crypto.createHash('sha256').update(crypto.createHash('sha256').update(addy).digest()).digest();
        addy = Buffer.concat([addy, checksum.slice(0, 4)]);
        let bitcoinAddress = bs58.encode(addy);
        console.log("[-] - Bitcoin Address (Uncompressed): \t" + bitcoinAddress);
        try {
            if(userAdress == bitcoinAddress){
                console.log("====================================================================================");
                console.log("Your wallet has been successfully recovered!");
                if (argv.hasOwnProperty('Brainwallet')){
                    fs.appendFileSync("recovered.txt", `[A] - Passphrase: ` + passphrase + "\n" + `[+] - Private key: ` + privateKey + "\n" + `[+] - Address: ` + bitcoinAddress + "\n\n");
                } else if (argv.hasOwnProperty('Directory')) {
                    fs.appendFileSync("recovered.txt", `[+] - Private key: ` + privateKey + "\n" + `[+] - Address: ` + bitcoinAddress + "\n\n");
                }
                process.exit();
            }
        } catch (err) {
            console.log(err);
            process.exit();
        }
        

        keyPair = ec.keyFromPrivate(privateKey, 'hex');
        let x = keyPair.getPublic().x.toBuffer();
        let y = keyPair.getPublic().y.toBuffer();
        let prefix = y[y.length - 1] % 2 === 0 ? 0x02 : 0x03;
        publicKey = Buffer.concat([Buffer.from([prefix]), x]);
        pubKeyHash = crypto.createHash('sha256').update(publicKey).digest();
        pubKeyHash = crypto.createHash('ripemd160').update(pubKeyHash).digest();
        addy = Buffer.alloc(21);
        addy.writeUInt8(0x00, 0);
        pubKeyHash.copy(addy, 1);
        checksum = crypto.createHash('sha256').update(crypto.createHash('sha256').update(addy).digest()).digest();
        addy = Buffer.concat([addy, checksum.slice(0, 4)]);
        bitcoinAddress = bs58.encode(addy);
        console.log("[-] - Bitcoin Address (Compressed) : \t" + bitcoinAddress);
        try {
            if(userAdress == bitcoinAddress){
                console.log("====================================================================================");
                console.log("Your wallet has been successfully recovered!");
                if (argv.hasOwnProperty('Brainwallet')){
                    fs.appendFileSync("recovered.txt", `[A] - Passphrase: ` + passphrase + "\n" + `[+] - Private key: ` + privateKey + "\n" + `[+] - Address: ` + bitcoinAddress + "\n\n");
                } else if (argv.hasOwnProperty('Directory')) {
                    fs.appendFileSync("recovered.txt", `[+] - Private key: ` + privateKey + "\n" + `[+] - Address: ` + bitcoinAddress + "\n\n");
                }
                process.exit();
            }
        } catch (err) {
            console.log(err);
            process.exit();
        }
        
    } catch (error) {
        console.log(error);
    }
    
  }
module.exports = infoGenerator;

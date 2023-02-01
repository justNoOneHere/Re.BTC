const argv      = require('minimist')(process.argv.slice(2));
const BigNumber = require("bignumber.js");
const bip39     = require('bip39');
const generateCombinations  = require('./func/BTC_generateCombinations');
const infoGenerator         = require('./func/BTC_infoGenerator');
const mnemonic              = require('./func/BTC_mnemonic');

let numChars;
let privateKey;
let userMnemonics;
let userAdress;

function main() {
    if(argv.hasOwnProperty('Brainwallet') && argv.hasOwnProperty('numChars') && argv.hasOwnProperty('userAdress')) {
        numChars = argv.numChars;
        userAdress = argv.userAdress;
        generateCombinations('', numChars, userAdress, argv);
    } 
    else if (argv.hasOwnProperty('Directory') && argv.hasOwnProperty('privateKey') && argv.hasOwnProperty('userAdress')){
        privateKey = argv.privateKey;
        userAdress = argv.userAdress;
        let bigInt = new BigNumber(privateKey, 16);
        let max = new BigNumber("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140", 16);
        for (let i = bigInt; i.isLessThanOrEqualTo(max); i = i.plus(1)) {
            let privateKey = i.toString(16);
            while (privateKey.length < 64) {
                privateKey = "0" + privateKey;
            }
            infoGenerator(privateKey, userAdress, argv);
            
        } 
    }
    else if (argv.hasOwnProperty('Mnemonic') && argv.hasOwnProperty("Bip39") && argv.hasOwnProperty('userAdress')) {
        userMnemonics = String(argv.Bip39).split(' ');
        userAdress = argv.userAdress;
        let validMnemonics = userMnemonics.filter(word => bip39.wordlists.english.indexOf(word) !== -1);
        mnemonic(validMnemonics, userAdress);
        }
    else {
        console.log(
            `
+---------------------------------------------------+---------------------------------------------+
|                      Re.BTC                       |                    Usage                    |
+===================================================+=============================================+
| - Generating combinations based on a brainwallet  | --numChars [] --userAdress [] --Brainwallet |
| and a number of characters.                       |                                             |
| - Generating information about addresses and      | --privateKey [] --userAdress [] --Directory |
| private keys using a directory and a private key. |                                             |
| - Generating information using mnemonics and      | --Bip39 [] --userAdress [] --Mnemonic       |
| bip39 and a user's address.                       |                                             |
+---------------------------------------------------+---------------------------------------------+
[+] - Usage :
    - Brainwallet   : node index.js --numChars 5 --userAdress "1JRW4d8vHZseMEtYbgJ7MwPG1TasHUUVNq" --Brainwallet
    - Private Key   : node index.js --privateKey "0000000000000000000000000000000000000000000000000000000000000001" 
                        --userAdress "1JRW4d8vHZseMEtYbgJ7MwPG1TasHUUVNq" --Directory
    - Mnemonic      : node index.js --Bip39 "fury crime input spirit" --userAdress "1JRW4d8vHZseMEtYbgJ7MwPG1TasHUUVNq" 
                        --Mnemonic
[+] - For more options on how to use the script, visit https://github.com/justNoOneHere/Re.BTC
    ` 
        );
    }
}
console.clear();
console.log(
    `                                  
                        ██▀███  ▓█████       ▄▄▄▄   ▄▄▄█████▓ ▄████▄  
                        ▓██ ▒ ██▒▓█   ▀      ▓█████▄ ▓  ██▒ ▓▒▒██▀ ▀█  
                        ▓██ ░▄█ ▒▒███        ▒██▒ ▄██▒ ▓██░ ▒░▒▓█    ▄ 
                        ▒██▀▀█▄  ▒▓█  ▄      ▒██░█▀  ░ ▓██▓ ░ ▒▓▓▄ ▄██▒
                        ░██▓ ▒██▒░▒████▒ ██▓ ░▓█  ▀█▓  ▒██▒ ░ ▒ ▓███▀ ░
                        ░ ▒▓ ░▒▓░░░ ▒░ ░ ▒▓▒ ░▒▓███▀▒  ▒ ░░   ░ ░▒ ▒  ░
    `
)    
main();

            
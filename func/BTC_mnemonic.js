const bip39     = require('bip39');
const crypto    = require('crypto');
const itertools = require('itertools');

const generateInfo = require('./BTC_generateInfo');


function mnemonic(validMnemonics, userAdress){
    if(validMnemonics .length === 12) {
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        let shuffledMnemonics = shuffle(validMnemonics);
        for (let permutation of itertools.permutations(shuffledMnemonics, 12)) {
            let mnemonicPhrase = permutation.join(" ");
            if (bip39.validateMnemonic(mnemonicPhrase)) {
                generateInfo(mnemonicPhrase, userAdress);
            }
        }
    } else {
            for(let i = 0; i < 2048; i++) {
                const entropy = Buffer.alloc(16);
                crypto.randomFillSync(entropy);
                const mnemonic = bip39.entropyToMnemonic(entropy, bip39.wordlists.english);
                let mnemonics = mnemonic.split(" ");
                mnemonics = mnemonics.concat(validMnemonics);
                for (let permutation of itertools.permutations(mnemonics, 12)) {
                    let mnemonicPhrase = permutation.join(" ");
                    if (bip39.validateMnemonic(mnemonicPhrase)) {
                        generateInfo(mnemonicPhrase, userAdress);
                    }
                }
            }
    }
}

module.exports = mnemonic;

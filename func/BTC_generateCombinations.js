const infoGenerator = require('./BTC_infoGenerator');

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:\'",.<>?/\\| ';

function generateCombinations(current, numChars, userAdress, argv) {
    if (current.length === numChars) {
        infoGenerator(current, userAdress, argv);
    } else {
        for (let i = 0; i < characters.length; i++) {
            generateCombinations(current + characters[i], numChars, userAdress, argv);
        }
    }
}


module.exports = generateCombinations;

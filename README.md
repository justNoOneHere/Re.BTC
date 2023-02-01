# Re.BTC - Bitcoin Wallet Recovery Script

<pre align="center">
╦═╗┌─┐ ╔╗╔╦╗╔═╗       ╔╗ ┬┌┬┐┌─┐┌─┐┬┌┐┌  ╦ ╦┌─┐┬  ┬  ┌─┐┌┬┐  ╦═╗┌─┐┌─┐┌─┐┬  ┬┌─┐┬─┐┬ ┬  ╔═╗┌─┐┬─┐┬┌─┐┌┬┐
╠╦╝├┤  ╠╩╗║ ║    ───  ╠╩╗│ │ │  │ │││││  ║║║├─┤│  │  ├┤  │   ╠╦╝├┤ │  │ │└┐┌┘├┤ ├┬┘└┬┘  ╚═╗│  ├┬┘│├─┘ │ 
╩╚═└─┘o╚═╝╩ ╚═╝       ╚═╝┴ ┴ └─┘└─┘┴┘└┘  ╚╩╝┴ ┴┴─┘┴─┘└─┘ ┴   ╩╚═└─┘└─┘└─┘ └┘ └─┘┴└─ ┴   ╚═╝└─┘┴└─┴┴   ┴o
</pre>

Re.BTC is a tool that generates combinations to recover lost Bitcoin wallets by using a brainwallet, number of characters, user's address, directory, private key and mnemonic recovery methods.

## Usage

To use Re.BTC, you will need to have Node.js installed on your system.

### Brainwallet

```
node index.js --numChars 4 --userAdress "13nV3LZQSY9A7jHhuz6Ry3wPmcmHwJL1V6" --Brainwallet
```

### Private Key
 
```
node index.js --privateKey "9db9914380a4bd8d9e30e8ec89aeb4b524ae8612700d5c4e77bf3338af560000" --userAdress "1PmmQa1ydY5ae5T9inmtaYUVocqwnxmdew" --Directory
```
 
### Mnemonic
 
```
node index.js --Bip39 "diet saddle term remain auto inject gym odor endless" --userAdress "1FZstPewtA2pRS8qUXJciExDq5MWY9X2Lr" --Mnemonic
```
 
## Tutorial

<div align="center">
<a href="https://www.youtube.com/watch?v=YPlGtHfDWSE" target="_blank">
 <img src="http://img.youtube.com/vi/YPlGtHfDWSE/hqdefault.jpg" alt="Watch the video" width="full" height="full" border="10" />
</a>

<a href="https://youtu.be/YPlGtHfDWSE">Watch On Youtube</a>
</div>


## Contributions
 
If you find a bug or have an idea for a new feature, feel free to open a pull request or an issue. Your contributions are always welcome!

 
## Disclaimer
 
Please use this script at your own risk. We are not responsible for any loss or damage caused by using this script. It is important to always keep your private keys and mnemonics safe and secure.

**This repository provides code for educational and research purposes only, without any guarantees or warranties. Use of the code is at your own risk and I do not accept any responsibility or liability for its use. By accessing the files in this repository, you acknowledge that you understand the potential risks and will use it only for lawful and ethical purposes.**

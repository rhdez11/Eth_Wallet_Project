# Eth_Wallet_Project

En este projecto se desarrollo una Wallet de un Token generado por mi usando SmartContracts.

## Tecnologias Utilizadas

Frontend: React.js, HTML, CSS

Blockchain: Solidty, web3.js, Truffle, Ganache

herramientas y otras librerias utilizadas: Node.js, Metamask, openzeppelin

## Funcionalidades alcanzadas

Usando Solidity y la libreria de Open Zeppelin se creo un Smart Contract para poder generar un token ERC20. En este caso el nombre e imagen de GraphToken solo se uso por motivos de vista. Este Smart Contract fue compilado y migrado con Truffle.

![Eth_Wallet_Project](/imgs/5.PNG)

Usando React, Node y web3 se programo la interfaz y la logica del las transacciones en la Wallet. Se puede mandar y recibir* GRT* tokens. Ademas se puede visualizar las transacciones de el usuario que este en la vista.

![Eth_Wallet_Project](/imgs/1.PNG)

![Eth_Wallet_Project](/imgs/6.PNG)

![Eth_Wallet_Project](/imgs/3.PNG)

Usando Ganache pude usar cuentas que por default tenian 100 ETH cada una para poder probarlas en el programa. Un par de estas cuentas se importaron a Metamask para poder comprobar las transacciones. Tambien usando Ganache se pueden ver y comprobar los bloques asociados.

![Eth_Wallet_Project](/imgs/4.PNG)

## Lo que falta por terminar

Por el momento me hizo falta la interfaz del cambio e importe de cuentas, ya que usando web3 se puede usar el metodo create() que genera una cuenta nueva con una llave privada en el espacio de Blockchain.

![Eth_Wallet_Project](/imgs/7.PNG)





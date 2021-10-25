import React, { Component } from 'react';
import grtlogo from '../grt-logo.png';
import './App.css';
import Web3 from 'web3';
import GraphToken from '../abis/GraphToken.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockChainData(); //23:30
  }

  // 22:28
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-Ethereum browser detected.')
    }
  }

  async loadBlockChainData(){
    const web3 = window.web3;
    // Se define la cuenta activa de Metamasks
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]})
    // Direccion de Smart Contract para el Token creado
    const graphTokenAddress =  "0xF0C84dE8B83a367C8217e9d9D5BCB4AaB6c794cc";
    const graphToken = web3.eth.Contract(GraphToken.abi, graphTokenAddress);
    this.setState({ graphToken: graphToken });
    // Se llama el balance de la cuenta
    const balance = await graphToken.methods.balanceOf(this.state.account).call();
    this.setState({balance : window.web3.utils.fromWei( balance.toString(), 'Ether')});
    const transactions = await graphToken.getPastEvents('Transfer', {fromBlock:0, toBlock:'latest', filter:{from:this.state.account}});
    this.setState({transactions : transactions});
    console.log(transactions);
  }

  transfer(recipient, amount){
    this.state.graphToken.methods.transfer(recipient, amount).send({from: this.state.account});
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      graphToken: null,
      balance: 0,
      transactions:[]
    }

    this.transfer = this.transfer.bind(this);
  }

  render() {
    return (
      <div className = "all">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Graph Token Test Wallet</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Cuentas</a>
            </li>
          </ul>
        </div>
      </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  className = ""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={grtlogo} className="App-logo" alt="logo" />
                </a>
                <h1>{ this.state.balance} GRT</h1>
                <form onSubmit = {(event) => {
                  event.preventDefault();
                  const recipient = this.recipient.value;
                  const amount = window.web3.utils.toWei(this.amount.value, 'Ether');
                  this.transfer(recipient, amount);
                }}>
                  <div className="form-group mr-sm-2">
                    <input 
                      type="text"
                      id= "recipient"
                      ref = {(input) => {this.recipient = input}}
                      className="form-control"
                      placeholder="Direccion del Destinatario"
                      required />  
                  </div>
                  <div className="form-group mr-sm-2">
                    <input 
                      type="text"
                      id= "amount"
                      ref = {(input) => {this.amount = input}}
                      className="form-control"
                      placeholder="Monto"
                      required />  
                  </div>

                  <button type="submit" className = "submitButton btn btn-primary btn-block">Send</button>
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Destinatarios</th>
                      <th className="monto-col" scope="col">Monto (GRT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.transactions.map((tx, index) => {
                      return(
                        <tr key={index}>
                          <th scope="row">{index+1}</th>
                          <td>{tx.returnValues.to}</td>
                          <td>{window.web3.utils.fromWei(tx.returnValues.value.toString(),'Ether')}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

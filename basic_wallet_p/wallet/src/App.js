import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    chain: [],
    length: 0
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/chain')
      .then(res => {
        console.log('successfully retrieved', res)
        this.setState({
          chain: res.data.chain,
          length: res.data.length
        })
      })
      .catch(err => {
        console.log(err.response)
      });
  };

  render(){
    return (
      <div className="App">
        <h1>Welcome to the Wallet!</h1>
        <h3>Length: {this.state.length}</h3>
        {this.state.chain.map(item =>
          <div>
            <h2>Each Block!!</h2>
            <p>Block Index: {item.index}</p>
            <p>Previous Hash: {item.previous_hash}</p>
            <p>Proof: {item.proof}</p>
            <h2>Transactions!!</h2>
            {item.transactions.map(transaction =>
              <div> 
                <p>Amount: {transaction.amount}</p>
                <p>Sender: {transaction.sender}</p>
                <p>recipient: {transaction.recipient}</p>
              </div>
            )}
          </div>
        )}
        {console.log(this.state)}
      </div>
    );
  };
};

export default App;
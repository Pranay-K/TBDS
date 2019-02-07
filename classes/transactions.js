const crypto       = require('sha256');
const config 		= require('./../config.json');
const fs         = require('fs');
const Chain		= require('./chain.js');
var pool = [];
var currentTransaction = 0;
class Transaction{
    constructor(){
    }
	
	submitTransaction(){
	}
	
	createTransaction(data){
		// Take transaction data
		// Get Previous transaction Hash
		// Create Transaction data
		let transaction = {
			'channelName' : config.channel,
			'data': data,
			'timestamp': new Date()
			//'previousTransaction' : pool.length > 0 ? pool[pool.length - 1].transactionHeader : config.genesis_transaction
		}
		
		let transactionHeader = crypto(JSON.stringify(transaction));

		transaction.transactionHeader = transactionHeader;
		pool.push(transaction);
		//console.log(pool);
		if(pool.length == config.max_transaction){
			let chain = new Chain();
			chain.createBlock(pool);
			this.clearPool();
		}
		
		/*fs.writeFile('./data/'+transactionHeader, JSON.stringify(transaction), function (err) {
		  if (err) throw err;
		  console.log('Saved!');
		});*/
	}

    clearPool(){
		pool = [];
	}
	
	createBlock(){
	}
}

module.exports = Transaction;
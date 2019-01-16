var crypto       = require('sha256');
class Transaction{
	
	let pool = [];
    constructor(){
    }
	
	submitTransaction(){
	}
	
	createTransaction(data){
		// Take transaction data
		// Get Previous transaction Hash
		// Create Transaction data
		let transaction = {
			'channelName' : 'default_channel',
			'data': data,
			'timestamp': new Date(),
			'previousTransaction' : pool[pool.length - 1].transactionHeader
		}
		
		let transactionHeader = crypto(transaction);
		transaction.transactionHeader = transactionHeader;
		pool.push(transaction);
	}

    
	
	clearPool(){
	}
}

module.exports = Transaction;
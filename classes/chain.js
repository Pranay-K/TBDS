const crypto       = require('sha256');
const config 		= require('./../config.json');
const fs         = require('fs');
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFileSync)
let currentBlock = "0";
class Chain{
    constructor(){
		
	}
	
	async getCurrentBlock(){
		try{
			let data = await readFile('./data/'+crypto(config.channel) );
			let str = data.toString();
			let cap = ((str.length / 64 ) - 1)*64;
			let cb = str.substr( cap, 64);
			return cb;
		}
		catch(e){
			throw e;
		}
	}
	
	async createBlock(pool){
		try{
			let data = await readFile('./data/'+crypto(config.channel) );
			let str = data.toString();
			let cap = ((str.length / 64 ) - 1)*64;
			currentBlock = str.substr( cap, 64);
		}
		catch(e){
			//throw e;
			console.log("No ledger info found!!");
		}


		//currentBlock = this.getCurrentBlock();
		let block = {
			'channelName' : config.channel,
			'transactions': pool,
			'timestamp': new Date(),
			'previousBlock' : currentBlock //pool.length > 0 ? pool[pool.length - 1].transactionHeader : config.genesis_transaction
		}
		currentBlock = this.getBlockHash(pool);
		fs.writeFileSync('./data/_ledger/'+currentBlock, JSON.stringify(block), function (err) {
		  if (err) throw err;
		  console.log('Saved! A Block'); 
		});

		fs.appendFileSync('./data/'+crypto(config.channel), currentBlock, function (err) {
			if (err) throw err;
			console.log('Current Updated'); 
		});
	}
	
	getBlockHash(pool){
		let poolData = pool.map( (o) => o.transactionHeader );
		let avgLength = poolData.length;
		do{
			let newPool = [];
			let runCount = Math.round(avgLength / 2);
			for( let i = 0; i < avgLength; i+=2 ){
				let hash = poolData[i+1] ? crypto( poolData[i]+poolData[i+1]) : crypto( poolData[i]);
				newPool.push(hash);
			}
			poolData = newPool;
			avgLength = poolData.length;
		}
		while(avgLength > 1);
		return poolData[0];
	}

	getCrypto(){
	}
}

module.exports = Chain;
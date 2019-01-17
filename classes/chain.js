const crypto       = require('sha256');
const config 		= require('./../config.json');
const fs         = require('fs');
let currentBlock = "0";
class Chain{
    constructor(){
    }
	
	async createBlock(pool){
		
		let block = {
			'channelName' : config.channel,
			'transactions': pool,
			'timestamp': new Date(),
			'previousBlock' : currentBlock //pool.length > 0 ? pool[pool.length - 1].transactionHeader : config.genesis_transaction
		}
		currentBlock = this.getBlockHash(pool);
		
		return true;
		/*try{
			console.log(pool);
			await fs.writeFile('./data/'+currentBlock, JSON.stringify(block) );
		}
		catch(e){
			throw e;
		}
		fs.writeFile('./data/'+currentBlock, JSON.stringify(block), function (err) {
		  if (err) throw err;
		  console.log('Saved! A Block'); 
		});*/
	}
	
	getBlockHash(pool){
		let poolData = pool.map( (o) => o.transactionHeader );
		let avgLength = poolData.length;
		do{
			let newPool = [];
			let runCount = (avgLength / 2) + (avgLength % 2);
			for( let i = 0; i < runCount; i+2){
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
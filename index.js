const express    = require('express');
const app        = express();
//var cors         = require('cors');
const fs         = require('fs');
var crypto       = require('sha256');
const port = 4000;
/*const appSecret = "wqXZF/I+LU[2l/=31DeA,%LX<nKkz@z!#2bkm,l<!FyvMk#Q:H,H3pDqDCsQ6md~";
const MW_VER = '1.0.0';
const MW_ENV = 'DEV';*/
var Transaction  	 = require('./classes/transactions');




// Currently this API only gives access to Singup
/**/
app.post('/submitTransaction', async function (req, res) {
	let trans = new Transaction();
	trans.createTransaction(5);
	res.json({ success: true });
});




app.listen(port);
console.log('REST api running on port'+port);


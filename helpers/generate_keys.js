const crypto = require('crypto');

// secret keys
const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');

/*
 Generate access token and refresh token secrets 
 in case there is misuse or security issues 
 */

console.log({ key1, key2 });


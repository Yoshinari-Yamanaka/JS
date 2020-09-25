const crypto = require('crypto');
// console.log(crypto.randomBytes(32).toString('base64'));

const cryptoConfig = {
    PASSWORD : "l+/MraaOI1yT3F1l15fJMcEKGiG3iWn7nOTmUS4fWk0=",
    SALT : "kr3dJJ1mPcIKisMOR4RO6w=="
}

// 暗号化メソッド
function encrypt(password, salt, data) {
    const key = crypto.pbkdf2Sync(password,salt,100000, 512,'sha512').slice(0,32);
    // const key = crypto.scryptSync(password, salt, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    return {iv, encryptedData}
}


// 復号メソッド
function decrypt(password, salt, iv, encryptedData) {
    const key = crypto.pbkdf2Sync(password,salt,100000, 512,'sha512').slice(0,32);
    // const key = crypto.scryptSync(password, salt, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // encryptedData を復号
    let decryptedData = decipher.update(encryptedData);
    decryptedData =  Buffer.concat([decryptedData, decipher.final()]);

    return decryptedData
}

// 平文
const plainText = "今から暗号化のテストを始めます。Got it , I'm in!  大家好，很好，有意思"
console.log('plainText:', plainText);

// 平文を Buffer に変換
const data = Buffer.from(plainText);

// 暗号化
let {iv, encryptedData} = encrypt(cryptoConfig.PASSWORD, cryptoConfig.SALT, data);

// 復号
let decryptedData = decrypt(cryptoConfig.PASSWORD, cryptoConfig.SALT, iv, encryptedData);
console.log('decryptedData(utf8):', decryptedData.toString('utf-8'));
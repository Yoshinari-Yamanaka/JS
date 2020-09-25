const crypto = require('crypto');

let strData = "あ";
// str -> bytes
let encoded = Buffer.from(strData); //<Buffer e3 81 82>
// bytes -> hex
let hexStr = encoded.toString("hex"); //"e38182"
// hex -> bytes
encoded = Buffer.from(hexStr,"hex"); //<Buffer e3 81 82>
// bytes -> base64
let base64Str = Buffer.from("あ").toString("base64"); //'44GC'
// base64 -> bytes
encoded = Buffer.from(base64Str,"base64") //<Buffer e3 81 82>
// bytes -> str
strData = Buffer.from(encoded).toString(); //"あ"
// str -> urlencode
urlencoded = encodeURIComponent(strData) //'%E3%81%82'
// urlencode -> str
strData = decodeURIComponent(urlencoded); //"あ"

// str -> int
let unicode = strData.codePointAt(0); //12354
// int -> hex
hexStr = unicode.toString(16); //'3042'
// hex -> int
unicode = parseInt(hexStr,16); //12354
// int -> binary
let binary = unicode.toString(2); //'11000001000010'
// binary -> int
unicode = parseInt(binary,2) //12354
// int -> octal
let octStr = unicode.toString(8); //'30102'
// octal -> int
unicode = parseInt(octStr,8) //12354
// int -> str
strData = String.fromCodePoint(unicode); //"あ"

// normal Hash
const plainText = 'password';
md5 = crypto.createHash('md5').update(plainText).digest('hex');
sha256 = crypto.createHash('sha256').update(plainText).digest('hex');
sha512 = crypto.createHash('sha512').update(plainText).digest('hex');

// HMAC Hash
const secretKey = 'secret key';
const payload = 'Hello World!';
hmac = crypto.createHmac('sha256', secretKey).update(payload).digest("hex");

a = 'new Date();'
console.log(eval(a));
//made by ts7u
var osc = require('./omgosc.js');
var sender = new osc.UdpSender('127.0.0.1', 9000);
var receiver = new osc.UdpReceiver(9001);
//set up variables
var LWF = 0;
var LWFU = 0;
var RWF = 0;
var RWFU = 0;
//supress the Buffer() warning
const warning = process.emitWarning;
process.emitWarning = (...args) => {
    if (args[2] !== 'DEP0005') {
        return warning.apply(process, args);
    }
}
///////////////////////////////
receiver.on('', function(e) {
if(e.path.includes("W")){
  //console.log(e);
if(e.path.includes("LWFU") && JSON.stringify(e.params) == "[true]"){
console.log("Left Wing Upper");
LWFU = 1;
setTimeout(function(){
    LWFU = 0;
}, 1000);

}
if(LWFU){
if(e.path.includes("LWF") && JSON.stringify(e.params) == "[true]"){
console.log("Left Wing Lower");
LWF = 1;
setTimeout(function(){
    LWF = 0;
}, 1000);
}}
if(e.path.includes("RWFU") && JSON.stringify(e.params) == "[true]"){
console.log("Right Wing Upper");
RWFU = 1;
setTimeout(function(){
    RWFU = 0;
}, 1000);

}
if(RWFU){
if(e.path.includes("RWF") && JSON.stringify(e.params) == "[true]"){
console.log("Right Wing Lower");
RWF = 1;
setTimeout(function(){
    RWF = 0;
}, 1000);
}}
//jump and reset variables
if(LWF == 1 && LWFU == 1 && RWF == 1 && RWFU == 1){
sender.send("/input/Jump","T",[true]);
RWF = 0;
LWF = 0;
LWFU = 0;
RWFU = 0;
}
//Unpress the jump button once one is false
if(e.path.includes("W") && JSON.stringify(e.params) == "[false]"){
sender.send("/input/Jump","F",[false]);
}
}
});
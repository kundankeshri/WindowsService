var exec = require("child_process").exec;
const fs = require('fs');
const json2csv = require('json2csv').parse;
exports.runningService = async(req, res) =>{
exec("sc query state= all", function(err, stdout) {
var lines = stdout.toString().split("\r\n")
.filter(function (line) {
    return  line;
   
})
// console.log(lines)
// console.log(lines.length)
var objList = [];
for(let i=0; i<lines.length; i++){
  if(((i+1)<lines.length) && ((i+2) <lines.length) && ((i+3) <lines.length)){
  let obj = {'serviceName' : '','displayName' :'','type':'','state':''}
  if(lines[i].indexOf('SERVICE_NAME') > -1){
  if(lines[i].indexOf('SERVICE_NAME') > -1){
    let data = lines[i].substring(lines[i].indexOf(':')+1,)
   obj.serviceName = data.trim();
   i = i+1;
  }
  if(lines[i].indexOf('DISPLAY_NAME') > -1){
    let data = lines[i].substring(lines[i].indexOf(':')+1,)
    obj.displayName = data.trim();
    i = i+1;
  }
  if(lines[i].indexOf('TYPE') > -1){
    let data = lines[i].substring(lines[i].indexOf(':')+1,)
    data = data.trim();
    data = data.substring(3,)
    obj.type = data.trim();
    i = i+1;
  }
  if(lines[i].indexOf('STATE') > -1){
    let data = lines[i].substring(lines[i].indexOf(':')+1,)
    if(data.indexOf('RUNNING')> -1){
      data = data.trim();
      data = data.substring(3,)
      obj.state = data.trim();
      objList.push(obj);
    }
   
   i = i+1;
  }
  
}else{
  continue;
}

}
}
let fields = ['serviceName', 'displayName', 'type','state'];
const csv = json2csv(objList,{fields} );

console.log(objList.length);
 fs.writeFile("running.csv", csv,(err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully");
        }
        });

//res.send((objList));


// console.log(objList[0].serviceName);
res.render("startedService",{
  "objList" : (objList)
});
});
}
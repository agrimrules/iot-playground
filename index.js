const config = require('config');
const tv = require("lgtv2")({
  url: config.get("tv.ws")
})
const wol = require('wakeonlan');
const _ = require('lodash');
let apps = {};
wol(config.get("tv.mac")).then((x)=>{
  console.log("woke AF fam");
  console.log(x);
  tv.on('connect',()=>{
    console.log('connected');
    tv.request('ssap://system.notifications/createToast',{message: "Hello from node!"});
    tv.request('ssap://webos.applicationManager/listLaunchPoints',(err, res)=>{
      apps = res.launchPoints;
    });
    var ps4 = _.find(apps,(x)=>(o.title == "PS4"));
  })
}).catch( (err) =>
  {
  console.error(err);
  process.exit(1);
});

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    tv.request('ssap://system/turnOff', (err, res)=>{
      if(!err){
        console.log("Shut Down TV");
        process.exit(0);
      }
      console.error(err);
        process.exit(-1);
    })
});

// tv.on('connect',()=>{
//   console.log('connected');
// })

// tv.on('disconnect',()=>{
//   console.log('disconnected');
// });

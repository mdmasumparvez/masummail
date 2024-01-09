const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
dotenv.config();
const SENDMAIL = require("./sendMail");

//console.log(process.env.APPNAME)
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

const valid = (req)=>{ return (req.hostname === "mealkhatamasum.web.app") || (req.hostname === "localhost");}
const aler = 'Your are not valied user!';

app.get('/', (req, res) => {
    console.log(req.body);
    res.send("listening post");
});

app.post('/post', (req, res) => {//{{}}
    let opt = req.body;
    if (valid(req)) {
      SENDMAIL(opt , (d)=>{
        console.log('sent');
        res.send(d);
      });
    }
    else{
      res.send(aler)
    }
});
app.post('/postarray', (req, res) => { // {data:[{},{}]}
    if (valid(req)) {
      let t = req.body?.data;
      if (t.length) {
        for (let x = 0; x < t.length; x++) {
          const e = t[x];
          SENDMAIL(e , (d)=>{
            console.log('sent');
            res.send(d);
          });
        }
      }

    }
    else{
      res.send(aler);
    }
});
app.post('/postarraysame', (req, res) => { // {array:[emails], data:{}}
    let opt = req.body;
    if (valid(req)) {
     // console.log(req.body);
      let t = req.body?.array;
      if (t) {
        for (let x = 0; x < t.length; x++) {
          const e = t[x];
          let r = {...opt?.data};
          r.to = e;
          //console.log(r);
          SENDMAIL(r , (d)=>{
            console.log('sent');
            res.send(d);
          });
        }
      }

    }
    else{
      res.send(aler);
    }
});

app.listen(5000, () => {
    console.log('Listening');
});
/**
 *  from: "driveoneforcad@gmail.com", // sender address
    to: "masum.helpline@gmail.com", // receiver email
    subject: "Masum Milon", // Subject line
    text: 'kasdflkjas laksdjf sajdflkjsd ',
    html: 'hi I am Masum',
 */
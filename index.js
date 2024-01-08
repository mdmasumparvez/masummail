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




app.get('/', (req, res) => {
    console.log(req.body);
    res.send("listening post");
});

app.post('/', (req, res) => {
    let opt = req.body;
    console.log(req.body);
    SENDMAIL(opt , (d)=>{
      res.send(d);
      console.log(d)
    });
    
});

app.listen(5000, () => {
    console.log('Listening');
});

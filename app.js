const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

let ejs = require('ejs');
app.set('view engine', 'ejs');

const port = 3000

var number;

app.use(express.static('public'))













app.get('/', (req, res) => {
  res.render('./index',{ ejs: number })
})

app.listen(process.env.PORT || port, () => {
  console.log("Server running on 3000")
})

app.post('/',(req,res) => {
  if(Object.keys(req.body)[0] === "add"){
    updateNumber(1);


  }else{
    updateNumber(-1);


  }
  res.render('./index',{ ejs: number })
  
})


const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://robkenhow77:yiw4qxgMMp8BwNZo@cluster0.6skkmuz.mongodb.net/number-counter");

const numberSchema = new mongoose.Schema({
  number: Number
});

const numberModel = mongoose.model('number', numberSchema);

async function read (){
    docs = await numberModel.find();
    console.log("db number: " + docs[0].number)
    number = docs[0].number;
}
read();

async function updateNumber(change){
  if(number<=1000 && number>=-1000){
    number = number+change;
    const doc = await numberModel.findOneAndUpdate({  }, { number: number },{new:true} );
    read();
  }

  
  
}

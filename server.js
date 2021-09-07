const express =require('express');
const axios = require ('axios');
const cors = require('cors');
require('dotenv').config();
const server = express();
const ModuleSchema=require('./module/ModuleSchema')

const PORT = process.env.PORT;
server.use(cors());
server.use(express.json());

server.get('/API-DATA',renderDataHandler)
server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})

async function renderDataHandler(req,res){
    let allChocolateData=await axios.get('https://ltuc-asac-api.herokuapp.com/allChocolateData');

    let dataRead=allChocolateData.data.map(value=>{
        return new Chocolate(value)
    })

    res.send(dataRead)


    console.log('inside the render data handler')
}

server.post('/addtofav',addToFavFunction)
function addToFavFunction(req,res){
    console.log(req.body);
    let body=req.body;
    const favchoco=new ModuleSchema({
        id:body.id,
        title:body.title,
        imageUrl:body.imageUrl,
        email:body.email
 

    })
    favchoco.save();

    let favdata=ModuleSchema.find({email:body.email},(error,data)=>{
        if(error){console.log(error)}
        else{
          res.send(data);   
        }
    })


   

}

server.post('/getfav',getFavHandler)

function getFavHandler(req,res){
    body=req.body;
    ModuleSchema.find({email:body.email},(error,data)=>{
        if(error){console.log(error)}
        else{
          res.send(data);   
        }
    })



}




class Chocolate {
    constructor(item){
        this.id=item.id;
        this.title=item.title;
        this.imageUrl=item.imageUrl;
        this.email='';
        
    }
}
 
//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from "pusher"
import cors from 'cors' 

//app config
  //created the application instance
const app = express()
const port = process.env.PORT || 9000


const pusher = new Pusher({
    appId: "1131469",
    key: "ba29f2365465ed273534",
    secret: "0ec49ff969836d01d158",
    cluster: "us2",
    useTLS: true
  });
  

//middleware
app.use(express.json());
app.use(cors());


//db config
const connection_url = 
' ';

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true}
    );

   const db = mongoose.connection
   db.once('open', () => {
       console.log("db is connected");
       const msgCollection = db.collection('messagecontents')
       const changeStream = msgCollection.watch(); 
       changeStream.on('change', (change) => {
           console.log(change);
           if(change.operationType === 'insert'){
               const messageDetails = change.fullDocument;
               pusher.trigger('messages', 'inserted', {
                   name: messageDetails.name,
                   message: messageDetails.message,
                   timestamp: messageDetails.timestamp,
                   received: messageDetails.received
               });
           }
           else {
               console.log('Error Triggering pusher');
           }
       })
   });
   
app.get('/', (req,res) => res.status(200).send("hello world"));

app.get('/messages/sync' , (req, res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})


//posting message
app.post('/messages/new' , (req,res)  => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
      if(err){
          res.status(500).send(err)
      }
      else {
          res.status(201).send(data) 
      }
    })
})

//listener
app.listen(port,() => console.log(`Listening on localhost: ${port}`))

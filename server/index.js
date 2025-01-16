const http= require("http");

const myserver=http.createServer((req,res)=>
{
  console.log("Request Received");
  res.end("Hi from Server");
});


myserver.listen(8000,()=> console.log("Server started"));





const express = require("express");

const app= express();

app.get('/', (req,res)=>
{
  return res.send("Hello from Homepage");
})

app.get('/about', (req,res)=>
  {
    return res.send("Hello from AboutPage"+"developer"+ req.query.name);
  })

// function myHandler(req,res){
//   const log = `${Date.now()} : ${req.url} : ${req.method} New Request Received\n`;

//   const myUrl = new URL(req.url, `http://${req.headers.host}`);
//   console.log(myUrl);
//   fs.appendFile("log.txt", log, (err) => {
//     if (err) {
//       res.statusCode = 500;
//       res.end("Internal Server Error");
//       return;
//     }
//   });

//   switch (myUrl.pathname) {
//     case "/":
//       res.end("Homepage");
//       break;
//     case "/about":
//       const username = myUrl.searchParams.get("myname");
//       res.end(username ? `Hi ${username}` : "Hi, Guest");
//       break;
//     case "/signup":
//       if(req.method==GET) res.end("This is a sign up form");
//       else if(req.method==POST) res.end("Success");
//       break;

//     default:
//       res.statusCode = 404;
//       res.end("Page Not Found");
//   }
// }

app.listen(8000, ()=>{
  console.log("Server has started");
})

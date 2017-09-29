const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

var app=express();
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now= new Date().toString();
  var log= `${now}: ${req.method} ${req.url}}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('unable to append');
    }
  });
  next();
});

app.use((req,res,next)=>{
  req.get='/';
  res.render('maintenance.hbs',{

  });
  next();
});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  //res.send('hello express');
  res.render('index.hbs',{
    pageTitle:'Home Page page',
    welcomeUser:'hello you'
  });
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    request:'this is a bad request'
  });
});
app.listen(port,()=>{
  console.log(`server is on port:${port}`);
});

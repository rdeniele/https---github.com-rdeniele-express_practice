import express, { response } from 'express';

const app=express();

const port=process.env.PORT || 3000;

app.get('/', (request, response)=>{
    response.status(201).send({msg:"Hello, world"});
});

app.get('/api/users', (request, response)=>{
    response.send(
        [
            {id:1, username: "John", displayname: "Doe"},
            {id:2, username: "Johnny", displayname: "Bravo"},
            {id:3, username: "Johnny", displayname: "Yes Papa"}
        ]
    );
});

//MDAS
app.get('/api/mdas', (request, response)=>{
    const { num1, num2, operation } = request.query;

    if(!num1 || !num2 || !operation){
        return response.status(400).send({msg: "Invalid request"});
        return;
    }

    if(operation==='add'){
        response.send({result:parseFloat(num1)+parseFloat(num2)})
    }
    else if (operation==='subtract'){
        response.send({result:parseFloat(num1)-parseFloat(num2)})
    }
    else if(operation==='multiply'){
        response.send({result:parseFloat(num1)*parseFloat(num2)})
    }
    else if (operation==='divide'){
        if(parseFloat(num1)===0){
        return response.status(400).send({msg: "Cannot divide by zero"});
        return;
        }
        response.send({result:parseFloat(num1)/parseFloat(num2)})
    }else{
        response.status(400).send({msg: "Invalid operation"});  
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
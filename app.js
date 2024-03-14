//importing
const express=require("express");
const morgan=require("morgan");

//initialize
const app=express();
app.use(morgan('dev'));
app.use(express.json());

//in memory storage for task
let tasks=[];
//route to get all task
app.get('/',(req,res)=>{
    res.json(tasks);
})
//route to create a new task
app.post('/tasks',(req,res)=>{
    const task=req.body
    tasks.push(task);
    res.send({message:"task added",tasks});
})
//route to get task by id
app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task =tasks.find(task=>task.id===id);
    if(!task){
        res.send("task not found");
    }
    else{
        res.json(task);
    }
})

//update by id
app.put('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const updatedTask=req.body;
    const index=tasks.findIndex((task)=>task.id===id);
    if (index===-1){
        res.send("task not found");
    }
    else{
        tasks.splice(index,1,updatedTask);
        //tasks[index]=updatedTask
        res.json(tasks);
    }
})

//delete by id
app.delete('/tasks/:id',(req,res)=>{ 
    const id=req.params.id;
    const index=tasks.findIndex((task)=>task.id===id);
    if (index===-1){
        res.send("task not found");
    }
    else{
        tasks.splice(index,1);
        //tasks[index]=updatedTask
        res.json(tasks);
    } 
})

app.listen(6000,(req,res)=>{
    console.log("server is running on port 6000")
});

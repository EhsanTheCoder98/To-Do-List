const input = document.querySelector(".input");
const button = document.querySelector(".button");
const ul = document.querySelector(".todo-list");

button.addEventListener("click",consoleShow)

function consoleShow(e){
    e.preventDefault()
    let value = input.value;
    if(value!==""){
        console.log(value);
        const divToDo = document.createElement("div");
        divToDo.classList.add("contain")
        
        const li = document.createElement("li");
        li.innerHTML=value;

        const checkButton = document.createElement("button");
        checkButton.innerHTML="<i class='fas fa-check'></i>";
        checkButton.classList.add("check")

        const trashButton = document.createElement("button");
        trashButton.innerHTML="<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash");

        saveToLocal(value);

        li.addEventListener("click",function(){
            checkButton.classList.toggle("bol");
            trashButton.classList.toggle("bol");
        });

        checkButton.addEventListener("click",(e)=>{
            e.preventDefault();
            li.classList.toggle("lined");
        })

        trashButton.addEventListener("click",(e)=>{
            e.preventDefault();
            divToDo.remove();
            deleteLocal();
        })

        divToDo.appendChild(li);
        divToDo.appendChild(checkButton);
        divToDo.appendChild(trashButton);
        ul.appendChild(divToDo);
        input.value = "";
    }
}

function saveToLocal(todo){
    let todos;
    if(localStorage.getItem("tasks") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("tasks"));
    }
    todos.push(todo);
    localStorage.setItem("tasks",JSON.stringify(todos));
}

function deleteLocal(todo){
    let todos;
    if(localStorage.getItem("tasks") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("tasks"));
    }
    todos.splice(todo,1);
    localStorage.setItem("tasks",JSON.stringify(todos));
}
    

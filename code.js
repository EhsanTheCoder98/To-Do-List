const input = document.querySelector(".input");
const button = document.querySelector(".button");
const ul = document.querySelector(".todo-list");

button.addEventListener("click",consoleShow)

function consoleShow(e){
    e.preventDefault()
    let value = input.value;
    if(value!==""){
        console.log(value);
        const li = document.createElement("li");
        li.innerHTML=value;
        ul.appendChild(li);
        input.value = "";
    }
}
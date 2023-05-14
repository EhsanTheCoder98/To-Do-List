const input = document.querySelector(".input");
const button = document.querySelector(".button");

button.addEventListener("click",consoleShow)

function consoleShow(e){
    e.preventDefault()
    let value = input.value;
    if(value!==""){
        console.log(value)
        input.value = "";
    }
}
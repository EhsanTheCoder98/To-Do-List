const input = document.querySelector(".input");
const button = document.querySelector(".button");
const ul = document.querySelector(".todo-list");

button.addEventListener("click", consoleShow);
document.addEventListener("DOMContentLoaded", getTheTasks);

function consoleShow(e) {
  e.preventDefault();
  let value = input.value;
  if (value !== "") {
    console.log(value);
    const divToDo = document.createElement("div");
    divToDo.classList.add("contain");

    const li = document.createElement("li");
    li.innerHTML = value;

    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("check");

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash");

    li.addEventListener("click", function () {
      checkButton.classList.toggle("bol");
      trashButton.classList.toggle("bol");
    });

    checkButton.addEventListener("click", (e) => {
      e.preventDefault();
      li.classList.toggle("lined");
      let todos = getLocalTasks();
      const index = todos.findIndex((task) => task.title === value);
      if (index !== -1) {
        todos[index].completed = li.classList.contains("lined");
        saveToLocal(todos);
      }
    });

    trashButton.addEventListener("click", (e) => {
      e.preventDefault();
      divToDo.remove();
      let todos = getLocalTasks();
      const index = todos.findIndex((task) => task.title === value);
      if (index !== -1) {
        todos.splice(index, 1);
        saveToLocal(todos);
      }
    });

    divToDo.appendChild(li);
    divToDo.appendChild(checkButton);
    divToDo.appendChild(trashButton);
    ul.appendChild(divToDo);
    input.value = "";

    let todos = getLocalTasks();
    todos.push({ title: value, completed: false });
    saveToLocal(todos);
  }
}

function saveToLocal(todos) {
  localStorage.setItem("tasks", JSON.stringify(todos));
}

function deleteLocal(index) {
  let todos = getLocalTasks();
  todos.splice(index, 1);
  saveToLocal(todos);
}

function getLocalTasks() {
  let todos;
  if (localStorage.getItem("tasks") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("tasks"));
  }
  return todos;
}

function getTheTasks() {
  let todos = getLocalTasks();

  todos.forEach((task) => {
    const divToDo = document.createElement("div");
    divToDo.classList.add("contain");

    const li = document.createElement("li");
    li.innerHTML = task.title;
    if (task.completed) {
      li.classList.add("lined");
    }

    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("check");

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash");

    li.addEventListener("click", function () {
      checkButton.classList.toggle("bol");
      trashButton.classList.toggle("bol");
    });

    checkButton.addEventListener("click", (e) => {
      e.preventDefault();
      li.classList.toggle("lined");
      task.completed = li.classList.contains("lined");
      saveToLocal(todos);
    });

    trashButton.addEventListener("click", (e) => {
      e.preventDefault();
      divToDo.remove();
      const index = todos.findIndex((t) => t.title === task.title);
      if (index !== -1) {
        deleteLocal(index);
      }
    });
    divToDo.appendChild(li);
    divToDo.appendChild(checkButton);
    divToDo.appendChild(trashButton);
    ul.appendChild(divToDo);
    input.value = "";
  });
}
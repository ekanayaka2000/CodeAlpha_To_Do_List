var listElement = document.querySelector("#app ul");
var taskInputElement = document.querySelector("#taskInput");
var dateInputElement = document.querySelector("#dateInput");
var buttonElement = document.querySelector("#app button");

var todos = JSON.parse(localStorage.getItem("list_todos")) || [];
var editIndex = null;

function renderTodos() {
  listElement.innerHTML = "";

  todos.forEach((todo, pos) => {
    var todoElement = document.createElement("li");
    var todoText = document.createTextNode(todo.task + " - " + todo.date);

    var deleteLinkElement = document.createElement("a");
    deleteLinkElement.setAttribute("href", "#");
    deleteLinkElement.setAttribute("onclick", "deleteTodo(" + pos + ")");
    var deleteLinkText = document.createTextNode("Delete");

    deleteLinkElement.appendChild(deleteLinkText);

    var editLinkElement = document.createElement("a");
    editLinkElement.setAttribute("href", "#");
    editLinkElement.setAttribute("onclick", "editTodo(" + pos + ")");
    var editLinkText = document.createTextNode("Edit");

    editLinkElement.appendChild(editLinkText);

    todoElement.appendChild(todoText);
    todoElement.appendChild(editLinkElement);
    todoElement.appendChild(deleteLinkElement);
    listElement.appendChild(todoElement);
  });
}

renderTodos();

function addOrUpdateTodo() {
  var taskText = taskInputElement.value;
  var dateText = dateInputElement.value;

  if (taskText !== "" && dateText !== "") {
    if (editIndex === null) {
      todos.push({ task: taskText, date: dateText });
    } else {
      todos[editIndex] = { task: taskText, date: dateText };
      editIndex = null;
      buttonElement.textContent = "Add";
    }
    taskInputElement.value = "";
    dateInputElement.value = "";
    renderTodos();
    saveToStorage();
  }
}

buttonElement.onclick = addOrUpdateTodo;

function deleteTodo(pos) {
  todos.splice(pos, 1);
  renderTodos();
  saveToStorage();
}

function editTodo(pos) {
  taskInputElement.value = todos[pos].task;
  dateInputElement.value = todos[pos].date;
  editIndex = pos;
  buttonElement.textContent = "Update";
}

function saveToStorage() {
  localStorage.setItem("list_todos", JSON.stringify(todos));
}

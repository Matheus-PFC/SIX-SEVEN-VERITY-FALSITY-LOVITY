let arrTasks = []

const itemInput = document.getElementById("item-input")
const addItem = document.getElementById("add-item")
const todoList = document.getElementById("todo-list")
const toDoItems = toDoList.getElementsByTagName("li")

addItem.addEventListener("submit", function(e){
    event.preventDefault()
    if (itemInput.value) {
        addTask(itemInput.value)
        itemInput.value = ""
        itemInput.focus()
        
    }


})

todoList.addEventListener("click", function(event){
    let action = event.target.getAttribute("action")
    let task = event.target
    while(task.nodeName !== "LI") {
        task = task.parentElement
    }
    let taskIndex = [...toDoItems].indexOf(task)
    let editContainer = document.querySelector(".editContainer")
    let containerEditButton = editContainer.querySelector("editButton")
    let containerCancelButton = editContainer.querySelector("cancelButton")
    const actions = {
        checkButton: function(){

        },
        editButton: function(){

        },
        deleteButton: function(){

        },
        containerEditButton: function(){

        },
        containerCancelButton: function(){
            
        }
    }
}

)

function addTask(taskName) {
    console.log(taskName)
}
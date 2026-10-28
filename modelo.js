;(function() {

    let arrTasks = getSavedData()

    function getSavedData() {
        let tasksData = localStorage.getItem("tasks")
        tasksData = JSON.parse(tasksData)

        if(tasksData) {
            return tasksData
        } else {
            return [
                {
                    name: "Add Task",
                    createdAt: Date.now(),
                    completed: false,
                },
               
            ]
        }
    }

    function setNewData() {
        localStorage.setItem("tasks", JSON.stringify(arrTasks))
    }

    setNewData()

    const itemInput = document.getElementById("item-input")
    const toDoAddItem = document.getElementById("todo-add")
    const toDoList = document.getElementById("todo-list")
    const toDoItems = toDoList.getElementsByTagName("li")
    
    toDoAddItem.addEventListener("submit", function(e) {
        e.preventDefault()
        if(itemInput.value) {
            addTask(itemInput.value)
            itemInput.value = ""
            itemInput.focus()
        }
    })

    toDoList.addEventListener("click", function(e) {
        let action = e.target.getAttribute("action")
        if(!action) return
        let task = e.target
        while(task.nodeName !== "LI") {
            task = task.parentElement
        }
        let taskIndex = [...toDoItems].indexOf(task)
        let editContainer = task.querySelector(".editContainer")
        let containerEditInput = editContainer.querySelector(".editInput")
        let containerEditButton = editContainer.querySelector(".editButton")
        const actions = {
            checkButton: function() {
                arrTasks[taskIndex].completed = !arrTasks[taskIndex].completed
                renderTasks()
            },
            editButton: function() {
                [...toDoList.querySelectorAll(".editContainer")].forEach(function(editContainer) {
                    editContainer.style.display = "none"
                })
                editContainer.style.display = "flex"
                containerEditInput.value = arrTasks[taskIndex].name
                containerEditInput.focus()

                function acessibility(e) {
                    switch(e.key) {
                        case "Enter":
                            actions.containerEditButton()
                            editContainer.removeEventListener("keydown", acessibility)
                        case "Escape":
                            actions.containerCancelButton()
                            editContainer.removeEventListener("keydown", acessibility)
                    }
                }
                editContainer.addEventListener("keydown", acessibility)
            },
            deleteButton: function() {
                arrTasks.splice(taskIndex, 1)
                renderTasks()
                setNewData()
            },
            containerEditButton: function() {
                arrTasks[taskIndex].name = containerEditInput.value
                renderTasks()
                setNewData()
            },
            containerCancelButton: function() {
                editContainer.style.display = "none"
            }
        }

        if(actions[action]) {
            actions[action]()
        }
    })

    function addTask(taskName) {
        arrTasks.push({
            name: taskName,
            createdAt: Date.now(),
            completed: false
        })
        renderTasks()
        setNewData()
    }

    function taskBuilder(taskObject) {
        let task = document.createElement("li")
        task.className = "todo-item"
        task.innerHTML = `
            <button class="button-check" action="checkButton">
                <i class="fas fa-check ${taskObject.completed ? "" : "displayNone"}" action="checkButton"></i>
            </button>
            <p class="task-name">${taskObject.name}</p>
            <i class="fas fa-edit" action="editButton"></i>
            <div class="editContainer">
                <input class="editInput" type="text">
                <button class="editButton" action="containerEditButton">Edit</button>
                <button class="cancelButton" action="containerCancelButton">Cancel</button>
            </div>
            <i class="fas fa-trash-alt" action="deleteButton"></i>
        `
        return task
    }

    function renderTasks() {
        toDoList.innerHTML = ""
        arrTasks.forEach(function(taskObject) {
            toDoList.append(taskBuilder(taskObject))
        })
    }

    renderTasks()
})()  
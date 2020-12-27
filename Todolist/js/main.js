var todoService = new TodoService;
var isLoading = false;

function getEle(id) {
    return document.getElementById(id)
}

// Function loading
function checkLoading() {
    let result;
    return result = isLoading === true ?
        getEle("isloader").innerHTML = `<div id = "loader"></div> ` : getEle("loader").style.display = "none";
}
// Function Render tasklist
function renderTaskList() {
    isLoading = true;
    checkLoading()
    todoService
        .getListTask()
        .then(function(e) {
            isLoading = false;
            checkLoading()
            var t = "",
                n = "";
            getEle("todo").innerHTML = "",
                getEle("completed").innerHTML = "",
                e.data && e.data.length > 0 && e.data.forEach(function(e) {
                    "todo" === e.status ? (t += renderListLiHtml(e), getEle("todo").innerHTML = t) :
                        "completed" === e.status && (n += renderListLiHtml(e), getEle("completed").innerHTML = n)
                })
        })
        .catch(function(e) {
            console.log(e)
        })
}
// Function display html
function renderListLiHtml(e) {
    return `<li>    
                <span>${e.textTask}</span>   
                <div class="buttons">     
                    <button class="remove" onclick="deleteToDo(${e.id})" >     
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="changeStatus(${e.id})" > 
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>`
}
// Function Delete
function deleteToDo(e) {
    isLoading = true;
    checkLoading()
    todoService
        .deleteTask(e)
        .then(function() {
            alert("Delete Success!")
            renderTaskList()
            isLoading = false;
            checkLoading()
        })
        .catch(function(e) {
            isLoading = false;
            checkLoading()
            console.log(e)
        })
    isLoading = true;
}
// Function changestatus
function changeStatus(e) {
    isLoading = true;
    checkLoading()
    todoService
        .getTaskById(e)
        .then(function(e) {
            var t = e.data;
            return t.status = "todo" === t.status ? "completed" : "todo",
                todoService.updateTask(t)
        })
        .then(function() {
            alert("Change Status Success!")
            renderTaskList()
            isLoading = false;
            checkLoading()
        })
}
renderTaskList()
    // Event add task
getEle("addItem").addEventListener("click", function() {
    var e = getEle("newTask").value;
    if ("" !== e) {
        var t = new Task(e, "todo");
        isLoading = true;
        checkLoading()
        todoService
            .addTask(t)
            .then(function() {
                alert("Add Success!")
                renderTaskList()
                isLoading = false
                checkLoading()
                getEle("newTask").value = ""
            })
            .catch(function(e) {
                isLoading = false;
                checkLoading()
                console.log(e)
            })
    } else {
        alert("Task empty!")
    }
});

let activeCount = 0
function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        setActiveCount(items)
        generateItems(items);
    })
}

function generateItems(items){
    let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="assets/icon-check.svg">';
        checkMark.addEventListener("click", function(){
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
        }
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem)
    })
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}



function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
    activeCount -= 1
}

function filterItem(type, id) {
    addRemoveActiveClass(id)
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = []
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        setActiveCount(items)
        generateItems(items.filter(item => type ==='' || item.status === type))
    })
}

function addRemoveActiveClass(id) {
    const items = document.getElementsByClassName('item-status')
    for(let i=0; i<items.length; i++) {
        document.getElementsByClassName('item-status')[i].classList.remove('active')
    }
    if(id) {
        document.getElementById(id).classList.add('active')
    }
}
function setActiveCount(items) {
    activeCount = items.filter(item => item.status === 'active').length
    document.getElementById('items-left-id').innerHTML = activeCount > 1 ? `${activeCount} items left` : `${activeCount} item left`
}

getItems();

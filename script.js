let listMas  = [];

function AddOdj(title,value){
    this.title = title;
    this.value = value;
}


function addToHtml (title,value){
    document.getElementById("luToDO").insertAdjacentHTML("beforeend",`
    <li id="${title}" class="todo-list">
        <div class="view">
            <input class="toggle" type="checkbox">
            <label>${value}</label>
            <button class="destroy" onClick="deleteFromHtml(this)">X</button>
        </div>
    </li>`);
}

function deleteFromHtml (but) {
    deleteFromList(but.parentNode.parentNode.id);
    but.parentNode.parentNode.parentNode.removeChild(but.parentNode.parentNode);

}

function deleteFromList (title){
    console.log (title);
    

}

function addToList() {
    if (!document.getElementById("inputToDo").value) return;
    
    let title = Date.now();
    let value = document.getElementById("inputToDo").value;
    
    listMas.push(new AddOdj (title,value));

    addToHtml(title,value);

    document.getElementById("inputToDo").value = "";
    console.log (" ");
    console.log (listMas);
}

document.getElementById("butNewToDo").onclick = addToList;

document.addEventListener ('keyup', function (keys){
    if (keys.key === 'Enter'){
        addToList();
    }    
});

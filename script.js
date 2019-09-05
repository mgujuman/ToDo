let listMas  = [];

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

function deleteFromList (delTitle){
    console.log (`delete from ${delTitle}`);
     
    for (i = 0; i < listMas.length; i++){
        if (listMas[i].title == delTitle){
            listMas.splice(i,1);
            break;
        }

    }   
    console.log (listMas);
}

function addToList() {
    if (!document.getElementById("inputToDo").value) return;
    
    let title = Date.now();
    let value = document.getElementById("inputToDo").value;
    
    listMas.push({title : `${title}` , value : value , color: 'white'});

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

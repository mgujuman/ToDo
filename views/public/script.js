let colorMas = ["#ef6e69","#f077a2","#8f6dcb","#5eb3f6","#67d7e5","#ffe083"];

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function toHex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function addToHtml (title,value,color){
    document.getElementById("luToDO").insertAdjacentHTML("beforeend",`
    <li id="${title}" class="todo-list">
        <div class="view">
            <label class="checkbox">
                <input type="checkbox" />
                <div class="checkbox__text">${value}</div>
            </label>
            <span class="close" onclick="deleteFromHtml(this)"></span>
        </div>
    </li>`);
document.getElementById(title).style.backgroundColor = color;
}



function deleteFromHtml (button) {
    let id = JSON.stringify({id : button.parentNode.parentNode.id});
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/deleteList', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(id);
    
    button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
    
}

function addToList() {
    if (!document.getElementById("inputToDo").value) return;
    
    let xhr = new XMLHttpRequest();

    let id = Date.now()
    let value = document.getElementById("inputToDo").value
    let color = colorMas[randomInteger(0,colorMas.length-1)]
    let json = JSON.stringify({id , value , color});

    xhr.open("POST", '/api/addList', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);  

    addToHtml (id,value,color);

    document.getElementById("inputToDo").value = "";

}

function editColor(elem){
    luChild = document.getElementById('luToDO').querySelectorAll('.todo-list li');
    let masCheck = [];
   
    for (let i = 0; i < luChild.length; i++){
        if (document.getElementById(luChild[i].id).querySelector('.checkbox input').checked){
            let color = toHex(getComputedStyle(elem).backgroundColor)
            document.getElementById(luChild[i].id).style.backgroundColor = color;
            masCheck.push({id : luChild[i].id, color});
            document.getElementById(luChild[i].id).querySelector('.checkbox input').checked = false;
        }
    };

    if (masCheck.length == 0) return;

    let xhr = new XMLHttpRequest();
    let json = JSON.stringify(masCheck);
    xhr.open("POST", '/api/editList', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);  
       
}

document.getElementById("butNewToDo").onclick = addToList;

document.addEventListener ('keyup', function (keys){
    if (keys.key === 'Enter'){
        addToList();
    } 
});

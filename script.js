let listMas  = [];
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
            <input class="toggle" type="checkbox">
            <label>${value}</label>
            <button class="destroy" onClick="deleteFromHtml(this)">X</button>
        </div>
    </li>`);
    document.getElementById(title).style.backgroundColor = color;
}

function deleteFromHtml (button) {
    deleteFromList(button.parentNode.parentNode.id);
    button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
}

function deleteFromList (delTitle){
    let keys = Object.keys(localStorage);
    for (i = 0; i < keys.length; i++){
        if (keys[i] == delTitle){
            localStorage.removeItem(keys[i]);
            break;
        }

    }   
    
}

function addToList() {
    if (!document.getElementById("inputToDo").value) return;
    let masObj = localStorage.getItem('masTitle');
    let title = Date.now();
    let value = document.getElementById("inputToDo").value;
    let colorRnd = colorMas[randomInteger(0,colorMas.length-1)];

    localStorage.setItem([title], JSON.stringify({title : `${title}` , value : value , color: `${colorRnd}`}));
    addToHtml(title,value,colorRnd);

    document.getElementById("inputToDo").value = "";
}

function editColor(elem){
    let keys = Object.keys(localStorage);
    for (i = 0; i < keys.length; i++){
        checkBox = document.getElementById(keys[i]).querySelector('.toggle')
        if (checkBox.checked){
            document.getElementById(keys[i]).style.backgroundColor = getComputedStyle(elem).backgroundColor;
            let id = keys[i];
            let obj = JSON.parse(localStorage[id]);
            console.log (obj);
            obj.color = toHex(getComputedStyle(elem).backgroundColor);
            console.log (obj);
            localStorage.setItem([id], JSON.stringify(obj));
            console.log (localStorage[id]);
            checkBox.checked = false;

        }
    }
}

function loadSession(){
    if (localStorage.getItem('masTitle') != null){
        let keys = Object.keys(localStorage);
        for (i = 0; i < keys.length; i++){
            let id = keys[i];
            let obj = JSON.parse(localStorage[id]);
            addToHtml(obj.title,obj.value,obj.color);
        }
    } else{
        localStorage.setItem('masItem','');
    }
}


document.getElementById("butNewToDo").onclick = addToList;

document.addEventListener ('keyup', function (keys){
    if (keys.key === 'Enter'){
        addToList();
    }    
});

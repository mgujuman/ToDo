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
    let colorRnd = colorMas[randomInteger(0,colorMas.length-1)];

    listMas.push({title : `${title}` , value : value , color: `${colorRnd}`});

    addToHtml(title,value,colorRnd);

    document.getElementById("inputToDo").value = "";
    console.log (" ");
    console.log (listMas);
}

function editColor(elem){
    for (i = 0; i < listMas.length; i++){
        let titleId = listMas[i].title;
        checkBox = document.getElementById(titleId).querySelector('.toggle')
        if (checkBox.checked){
            document.getElementById(titleId).style.backgroundColor = getComputedStyle(elem).backgroundColor;
            listMas[i].color = toHex(getComputedStyle(elem).backgroundColor);
            checkBox.checked = false;

        }
    }
    console.log(listMas);
}

document.getElementById("butNewToDo").onclick = addToList;

document.addEventListener ('keyup', function (keys){
    if (keys.key === 'Enter'){
        addToList();
    }    
});

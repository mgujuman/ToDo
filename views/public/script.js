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
    deleteFromList(button.parentNode.parentNode.id);
    button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
}

function deleteFromList (delTitle){
    let masObj = JSON.parse(localStorage.getItem('masTitle'));  
    for (i = 0; i < masObj.length; i++){
        if (masObj[i].title == delTitle){
            masObj.splice(i,1);
            localStorage.setItem('masTitle',JSON.stringify(masObj));
            break;
        }

    }   
    
}

function addToList() {
    if (!document.getElementById("inputToDo").value) return;

    let xhr = new XMLHttpRequest();

    let json = JSON.stringify({title:Date.now(),value: document.getElementById("inputToDo").value, 
    color:colorMas[randomInteger(0,colorMas.length-1)]});
    console.log (json);
    xhr.open("POST", '/api/add', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);

    
    
    
    let masObj = JSON.parse(localStorage.getItem("masTitle"));
    
    masObj.push({title:Date.now(),value: document.getElementById("inputToDo").value, 
        color:colorMas[randomInteger(0,colorMas.length-1)]});
   
    addToHtml(masObj[masObj.length-1].title, masObj[masObj.length-1].value, 
        masObj[masObj.length-1].color);
    
    localStorage.setItem("masTitle",JSON.stringify(masObj));
    document.getElementById("inputToDo").value = "";
}

function editColor(elem){
    let masObj = JSON.parse(localStorage.getItem("masTitle"));
    for (i = 0; i < masObj.length; i++){
        if (document.getElementById(masObj[i].title).querySelector('.checkbox input').checked){

            document.getElementById(masObj[i].title).style.backgroundColor = getComputedStyle(elem).backgroundColor;
            masObj[i].color = toHex(getComputedStyle(elem).backgroundColor)
            document.getElementById(masObj[i].title).querySelector('.checkbox input').checked = false;

        }
    }
    localStorage.setItem("masTitle",JSON.stringify(masObj));
}

function loadSession(){
        
    if (localStorage.getItem('masTitle') != null){
            let masObj = JSON.parse(localStorage.getItem('masTitle'))
            for (i = 0; i < masObj.length; i++){
                addToHtml(masObj[i].title, masObj[i].value, masObj[i].color);
            }
            
    } else{
        let masObj = [];
        localStorage.setItem('masTitle',JSON.stringify(masObj));

    }
}

document.getElementById("butNewToDo").onclick = addToList;

document.addEventListener ('keyup', function (keys){
    if (keys.key === 'Enter'){
        addToList();
    } 
});

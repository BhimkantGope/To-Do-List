const inp = document.querySelector("input");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");

let editingItem = null;

function addTask() {
    const taskText = inp.value.trim();

    if(taskText === ''){
        alert("You must write something!");
    }
    else {
        if(editingItem) {
            editingItem.firstChild.textContent = taskText;
            editingItem = null;
            inp.value = ""; 
            saveData();
            return;
        }

        const li = document.createElement("li");
        li.appendChild(document.createTextNode(taskText));
        ul.appendChild(li);

        let edit = document.createElement("span");
        edit.innerHTML = "\u270E";
        edit.classList.add("edit-icon");
        li.appendChild(edit);

        let dlt = document.createElement("span");
        dlt.innerHTML = "\u00d7";
        dlt.classList.add("delete-icon");
        li.appendChild(dlt);   
    }
    inp.value = "";
    saveData();
}
inp.addEventListener("keypress", function(event) {
    if(event.code == "Enter") {
        addTask();
    }
});
btn.addEventListener("click", addTask);

ul.addEventListener("click", function(event) {
    console.log(event.target);
    const listItem = event.target.parentElement;

    if(event.target.tagName == "LI") {
        event.target.classList.toggle("checked");
        saveData();
    }
    else if(event.target.classList.contains("delete-icon")) {
        if(listItem === editingItem) {
            let response = prompt("Do you want to delete this task? Please enter Yes or No.");

            const answer = response?.trim().toLowerCase();
            if(answer == "yes") {
                editingItem = null;
                inp.value = "";
                listItem.remove();
            } else if(answer == "no") {
                inp.focus();
            }
            saveData();
        } else {
            listItem.remove();
            saveData();
        }
    } 
    else if (event.target.classList.contains("edit-icon")) {
        editingItem = listItem;
        inp.value = listItem.firstChild.textContent.trim();
        inp.focus();
        saveData();
    }
}, false);

let scrollBtn = document.querySelector(".scroll-down");
let scrollIcon = document.querySelector(".scroll-down span");

scrollIcon.innerHTML = "\u2193"; // shuru me down arrow

window.addEventListener("scroll", function() {
    if (window.scrollY > 10) {
        scrollIcon.innerHTML = "\u2191"; // upar scroll ho gaya, ab up arrow dikhao
    } else {
        scrollIcon.innerHTML = "\u2193"; // upar hi hai, down arrow dikhao
    }
});

scrollBtn.addEventListener("click", function() {
    if (window.scrollY > 10) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // top pe le jao
    } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // bottom pe le jao
    }
});


function saveData(){
    localStorage.setItem("data", ul.innerHTML);
}

function showTask(){
    ul.innerHTML = localStorage.getItem("data");
}
showTask();

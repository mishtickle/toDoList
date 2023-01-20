let projects = []
let inputs = ""
var theProject = "Home"
const projectToDoList = document.querySelector(".to-do-list");
const toDoList = document.querySelector(".to-dos")
const theNewObject = []

// parse the localstorage and create a new projects array
let json = JSON.parse(localStorage.getItem('projects'))
function newArray(json){
    for (let i = 0; i < json.length; i++){
        let text = new newValues(json[i].inputs);
        theNewObject.push(text);
        theNewObject[i].checked = json[i].checked
        for (let j = 0; j < json[i].listItems.length; j++){
            theNewObject[i].getListItems().push(json[i].listItems[j]);
        }
    }
    return theNewObject;
}

if (json != null){
    projects = newArray(json);
    myProjectList();
    populateProjects(null, theProject);
}



function newValues(inputs){
    return {
        inputs: inputs,
        listItems: [],
        checked: false,
        getValues() {
        return this.inputs;
        },
        getListItems() {
        return this.listItems;
        }
    }
}

let list = document.querySelector(".projects-list")

let button = document.querySelector(".toDoButton");
button.addEventListener('click', function(){
    myProjectList();
})

function myProjectList(){
    var input = document.querySelector(".projects");
    let inputValues = new newValues(input.value);
    if (inputValues.inputs != ""){
        projects.push(inputValues);
    };
    let list = document.querySelector(".projects-list")
    while (list.firstChild){
        list.removeChild(list.firstChild);
    }
    
    for (let i = 0; i < projects.length; i++){
        const node = document.createElement("li");
        list.appendChild(node).textContent=`${projects[i].getValues()}`;
        const checkBox = document.createElement("input");
        checkBox.type = 'checkBox';
        checkBox.checked = projects[i].checked;
        checkBox.addEventListener('change', (event) => {
            projects[i].checked = event.target.checked;
            localStorage.setItem('projects', JSON.stringify(projects));
            
        })
        node.appendChild(checkBox);
    }
}

function addHomeProject(){
    if (json == null){
        let text = "Home";
        let inputValue = new newValues(text);
        projects.push(inputValue);
        projects.checked = false;
        let item = document.createElement("li");
        list.appendChild(item).textContent = text;
        populateProjects(text, text);
    }
    
}
addHomeProject();

// select project and populate to do list - if project item is checked then delete the project
var projectsList = document.querySelector(".projects-list");
projectsList.onclick = (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
        var theProject = e.target.innerText;
        for (let i = 0; i < projects.length; i++){
            if (projects[i].checked == true){
                projects.splice(i, 1)
                localStorage.setItem('projects', JSON.stringify(projects));
            }   
        }
        populateProjects(e, theProject);    
    }
}

function populateProjects(e, theProject){
    while (toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
    }
    
    const node = document.createElement("h1");
    node.classList.add("theProject");
    const toDoNode = document.createElement("h2");
    
    
    toDoList.appendChild(node).textContent= theProject;
    
    const inputNode = document.createElement("input");
    inputNode.classList.add("projectsInput")
    toDoList.appendChild(toDoNode).textContent="To Do:"
    toDoList.appendChild(inputNode);
    
    const inputButton = document.createElement("button");
    inputButton.classList.add("projectsButton");
    inputButton.textContent = "Submit";
    toDoList.appendChild(inputButton);

    let index = 0;
    index = findIndex(index, theProject); 
    removeProjectToDoList();
    populateProjectToDoList(index);

    let button2 = document.querySelector(".projectsButton");
    button2.addEventListener('click', function(){
        theProjectsInput(theProject);
    })
}

// push list items to project, and populate the to do list
function theProjectsInput(theProject){
    const projectsInput = document.querySelector(".projectsInput");
    let text = projectsInput.value;
    let index = 0;
    index = findIndex(index, theProject);
    if (text != ""){
        projects[index].getListItems().push(text);
    }
    localStorage.setItem('projects', JSON.stringify(projects));
    removeProjectToDoList();
    populateProjectToDoList(index);
}

function removeProjectToDoList(){
    while(projectToDoList.firstChild){
        projectToDoList.removeChild(projectToDoList.firstChild);
    }
}

function populateProjectToDoList(index){ 
    for (let j = 0; j < projects[index].listItems.length; j++){
        node = document.createElement("li")
        let text = projects[index].listItems[j]
        projectToDoList.appendChild(node).textContent = text;
    }
    
}

function findIndex(index, theProject){
    for (index; index < projects.length; index++){
        if(projects[index].inputs==theProject){
            break;
        }
    }
    return index;
}

// delete a to do once it's clicked on
let toDoListItems = document.querySelector(".to-do-list");
toDoListItems.onclick = (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
        let theToDo = e.target.innerText;
        let newIndex = 0;
        
        // find the project index
        const projectList = document.querySelector(".theProject");
        theProject = projectList.textContent;
        newIndex = findIndex(newIndex, theProject);
        
        //find the list item index and delete the item, repopulate the todolists
        listItemIndex = findIndexOfListItem(newIndex, theToDo);
        deleteListItem(newIndex, listItemIndex);
        removeProjectToDoList();
        populateProjectToDoList(newIndex);
    }
}

function findIndexOfListItem(index, toDo){
    for (let i = 0; i < projects[index].listItems.length; i++){
        if (projects[index].listItems[i] == toDo){
            return i;
        }
    }
}

function deleteListItem(projectIndex, listItemIndex){
    projects[projectIndex].listItems.splice(listItemIndex, 1);
}

const inputValue = document.getElementById('todoInput');
const showNotDoneButton = document.getElementById('showNotDone');
const prioritySelect = document.getElementById('prioritySelect');
const highPriorityButton = document.getElementById('highPriorityButton');
const saveState = window.localStorage;

let todoList = [];

function start() {
    let state =  JSON.parse(saveState.getItem('savedState'));
    if(state === null || !Array.isArray(state) || state.length === 0) {
        console.log('no previous saved state, todoList is empty');
    } 
    else {
        console.log('previous saved state detected. Setting todoList');
        todoList = state;
        console.log(state);
    }
    displayList(todoList);
}

let addItem = () => {
    let todoValue = inputValue.value;//gets input from input bar
    if(todoValue==='') 
        return ;
    let toDoObject = {
        text: todoValue,
        isDone: false,
        priority: prioritySelect.value
    }
    todoList.push(toDoObject);
    displayList(todoList);
    inputValue.value = ''; 
    updateState();
}
let removeItem = (index) => {
    let howMany = 1;
    todoList.splice(index, howMany);
    displayList(todoList);
    updateState();
}
/*When checked/true, only show tasks that are done. When
not checked/false show all todo items */
let showNotDone = () => {
    updateCheckBoxes(showNotDoneButton);

    if(showNotDoneButton.checked===true) {
        //create a list/array with only tasks that are done
        let array = todoList.filter(obj => {
            if(obj.isDone)
                return true;
        });
        displayList(array);
    } else {
        displayList(todoList);
    }
}


/*When checked/true, only show tasks that are done. When
not checked/false show all todo items */
let showHighPriority = () => {
    updateCheckBoxes(highPriorityButton);
    if(highPriorityButton.checked===true) {
        //create a list/array with only tasks that are done
        //sort changes referenced array, so use slice() to create array copy first
        let array = todoList.slice().sort( (obj1, obj2) => {
            return -1*(obj1.priority-obj2.priority);
        });
        displayList(array);
    } else {
        displayList(todoList);
    }
}
//mark a task item as done/not done
let toggleDone = (index) => {
    todoList[index].isDone = !todoList[index].isDone;
    displayList(todoList);
    updateState();
}
let updateCheckBoxes = (button) => {
    let original = button.checked; 
    highPriorityButton.checked = false;
    showNotDoneButton.checked = false;
    button.checked = original;
}

let displayList = (inputArray) => {
    let htmlTodoArray = inputArray.map((item, index) => {
        let toggleText = '', li_class='';
        inputArray[index].isDone ? toggleText='mark not done' : toggleText='marked done';
        inputArray[index].isDone ? li_class='strikethrough' : li_class='';
        return `<li class="${li_class}">${item.text} ${item.priority} ${item.isDone}
            <a onClick="removeItem(${index})">X</a>
            <a onClick="toggleDone(${index})">${toggleText}</a>
            </li>`;
    }).join('');
    document.getElementById('resultArea').innerHTML = htmlTodoArray;
}
let updateState = () => {
    saveState.setItem('savedState', JSON.stringify(todoList));
    console.log(saveState.getItem('savedState'));
    // console.log(JSON.parse(saveState.getItem('savedState'))[0]);
}
start();

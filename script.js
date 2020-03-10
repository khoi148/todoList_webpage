const inputValue = document.getElementById('todoInput');
const showNotDoneButton = document.getElementById('showNotDone');
const prioritySelect = document.getElementById('prioritySelect');
const highPriorityButton = document.getElementById('highPriorityButton');
const saveState = window.localStorage;

let todoList = [];

//[0] is low priority, [1] is medium, [2] is high
let priorityColorsArray = ["data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170c3d13eae%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170c3d13eae%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.265625%22%20y%3D%2218.3484375%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170c3d13eb1%20text%20%7B%20fill%3A%236f42c1%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170c3d13eb1%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%236f42c1%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.265625%22%20y%3D%2218.3484375%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170c3d13eb0%20text%20%7B%20fill%3A%23e83e8c%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170c3d13eb0%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23e83e8c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.265625%22%20y%3D%2218.3484375%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"];


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
    console.log(inputValue.value);
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
        let toggleText = '', li_class='', isDoneClass='border';
        inputArray[index].isDone ? toggleText='mark not done' : toggleText='marked done';
        inputArray[index].isDone ? li_class='strikethrough' : li_class='';

        inputArray[index].isDone ? isDoneClass='border bg-warning' : isDoneClass='border';
        inputArray[index].isDone ? li_class='strikethrough' : li_class='';
        console.log(item.priority);
        let colorPriority=0;
        if(item.priority === 1)
        colorPriority = priorityColorsArray[0];
        if(item.priority === 2)
        colorPriority = priorityColorsArray[1];
        if(item.priority === 3)
        colorPriority = priorityColorsArray[2];

        // return `<li class="${li_class}">${item.text} ${item.priority} ${item.isDone}
        //     <a onClick="removeItem(${index})">X</a>
        //     <a onClick="toggleDone(${index})">${toggleText}</a>
        //     </li>`
            return `<div class="${isDoneClass}">
            <div class="media text-muted pt-3">
              <img
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170c3d13eae%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170c3d13eae%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.265625%22%20y%3D%2218.3484375%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                alt=""
                class="mr-2 rounded"
              />
              <div
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
              >
                <div
                  class="d-flex justify-content-between align-items-center w-100"
                >
                  <strong class="text-gray-dark">${item.text} ${item.priority}</strong>
                  <div class="">
                    <a href="#" class="mr-2" onClick="removeItem(${index})">Remove</a>
                    <a href="#" onClick="toggleDone(${index})">Marked Done</a>
                  </div>
                </div>
                <span class="d-block">@not done</span>
              </div>
            </div>
          </div>`;
    }).join('');
    /*
    <div class="bg-warning border">
          <div class="media text-muted pt-3">
            <img
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170c3d13eae%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170c3d13eae%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.265625%22%20y%3D%2218.3484375%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              alt=""
              class="mr-2 rounded"
            />
            <div
              class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
            >
              <div
                class="d-flex justify-content-between align-items-center w-100"
              >
                <strong class="text-gray-dark">To Do Text</strong>
                <div class="">
                  <a href="#" class="mr-2">Remove</a>
                  <a href="#">Marked Done</a>
                </div>
              </div>
              <span class="d-block">@not done</span>
            </div>
          </div>
        </div>
    */
    // document.getElementById('resultArea').innerHTML = htmlTodoArray;
    document.getElementById('list_section').innerHTML = htmlTodoArray;
}
let updateState = () => {
    saveState.setItem('savedState', JSON.stringify(todoList));
    console.log(saveState.getItem('savedState'));
    // console.log(JSON.parse(saveState.getItem('savedState'))[0]);
}
start();

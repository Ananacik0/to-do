const ESC = 'Escape';
const ENTER = 'Enter';
const DELETE = 'Delete';

const titleInput = document.querySelector( '#title__input' );
const push = document.querySelector( '#push' );
const listTask = document.querySelector( '#tasks' );
const pages = document.querySelector( '#pages' );
const all = document.querySelector( '#all' );
const active = document.querySelector( '#active' );
const complated = document.querySelector( '#complated' );
const checkboxAll = document.querySelector( '#all__check' );
const deleteCheck = document.querySelector( '.checkbox__all' );


let arrayTasks = [];
let pageNumber = 1;
let filterType = 'all';

const clickPush = () => {
  switch (true) {
    case titleInput.value !== '':
      let titleInputText = titleInput.value;
      let task = {
        text: titleInputText,
        id: Date.now(),
        isCheck: false,
      };
      let arrayTasksLength = arrayTasks.push( task );
      titleInput.value = '';
      break;
      default:
        console.log('task is not defined')
      };
  render();
};

const pressKeyboard = ( event ) => {
  switch(true) {
    case event.code === ESC:
      console.log(event.code)
      break;
    case event.code === ENTER:
      clickPush();
      break;
    case event.code === DELETE:
      console.log(event.code)
      break;
    default:
  };
};

const clickTaskelement = ( event ) => {
  switch(true) {
    case event.target.className === 'task__text':
      if(event.detail === 2) {
        console.log(event)
        let textTask = event.target.textContent;
        event.target.nextElementSibling.value = textTask;
        event.target.nextElementSibling.hidden = false;
        event.target.hidden = true;
      };
      break;
    case event.target.className === 'task__checkbox':
      console.log(event)
      break;
    case event.target.className === 'task__delete':
      console.log(event)
    default:
  }
}

const render = () => {
  let newTask = '';
  arrayTasks.forEach( element => {
    newTask += `
    <li class="task" id="${element.id}">
      <span class="task__text">${element.text}</span>
      <input class="task__input" type="text" value="${element.text}" hidden>
      <div class="task__button">
        <input class="task__checkbox" type="checkbox" ${element.isCheck ? 'checked' : ''}>
        <button class="task__delete">&#10006;</button>
      </div>
    </li>
    `;
    listTask.innerHTML = newTask;
  });
}


const debug = ( event ) => {
  // console.log(event)
}

// const listenTitleInput = titleInput.addEventListener( 'click' );
const listenButtonPush = push.addEventListener( 'click', clickPush );
// const listenListTask = listTask.addEventListener( 'click' );
// const listenListPages = pages.addEventListener( 'click' );
// const listenButtonAll = all.addEventListener( 'click' );
// const listenButtonActive = active.addEventListener( 'click' );
// const listenButtonComplated = complated.addEventListener( 'click' );
// const listenButtonDelete = deleteCheck.addEventListener( 'click' );
// const listenCheckboxAll = checkboxAll.addEventListener( 'click' ); 
const listenTask = listTask.addEventListener( 'click', clickTaskelement )
const listenPressEsc = document.addEventListener( 'keydown', pressKeyboard );
const listenPressEnter = document.addEventListener( 'keydown', pressKeyboard );
const listenPressDelete = document.addEventListener( 'keydown', pressKeyboard );
const debufListen = document.addEventListener( 'click', debug )

const ESC = 'Escape';
const ENTER = 'Enter';
const DELETE = 'Delete';

const titleInput = document.querySelector( '#title__input' );
const push = document.querySelector( '#push' );
const listTask = document.querySelector( '#tasks' );
const pages = document.querySelector( '#pages' );
const all = document.querySelector( '#all' );
const active = document.querySelector( '#active' );
const completed = document.querySelector( '#completed' );
const checkboxAll = document.querySelector( '#all__check' );
const deleteCheck = document.querySelector( '#delete' );


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

const clickTaskElement = ( event ) => {
  switch(true) {
    case event.target.className === 'task__text':
      if(event.detail === 2) {
        let textTask = event.target.textContent;
        event.target.nextElementSibling.value = textTask;
        event.target.nextElementSibling.hidden = false;
        event.target.hidden = true;
        event.target.nextElementSibling.focus()
      };
      break;
    case event.target.className === 'task__checkbox':
      arrayTasks.forEach( element => {
        if(element.id === Number(event.target.parentElement.parentNode.id)) {
          element.isCheck = !element.isCheck ? true : false;
          render()
        }
      });
      break;
    case event.target.className === 'task__delete':
      arrayTasks = arrayTasks.filter( element => element.id !== Number(event.target.parentElement.parentNode.id))
      render()      
      break
    default:
      console.log('default case')
  }
}

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

const saveTitle = ( event ) => {
  switch(true) {
    case event.code === ENTER:
      arrayTasks.forEach( element => {
        if(element.id === Number(event.target.parentElement.id)) {
          if(event.target.value !== '') {
            element.text = event.target.value
          }
        }
      })
    }
}

const checkAllTask = ( event ) => {
  console.log(event)
  event.target.checked === true ? arrayTasks.forEach( element => element.isCheck = true) : arrayTasks.forEach( element => element.isCheck = false)
  render()
};

const checkAllCheckbox = () => {
  checkboxAll.checked = arrayTasks.length > 0 ? arrayTasks.every( element => element.isCheck) : false;
}

const deleteCheckTask = () => {
  arrayTasks = arrayTasks.filter( element => !element.isCheck)
  render()
}

const statusTask = ( event ) => {
  switch(true) {
    case event.target.id === 'all':
      filterType = 'all'
      event.target.style.cssText += `
        box-shadow: 0px 0px 15px #fff;
      `;
      active.style.cssText = ''
      completed.style.cssText = ''
      console.log(event)
      break;
    case event.target.id === 'active':
      filterType = 'active'
      event.target.style.cssText += `
        box-shadow: 0px 0px 15px #fff;
      `;
      all.style.cssText = ''
      completed.style.cssText = ''
      break;
    case event.target.id === 'completed':
      filterType = 'completed'
      event.target.style.cssText += `
        box-shadow: 0px 0px 15px #fff;
      `;
      all.style.cssText = ''
      active.style.cssText = ''
      break;
    default:
      console.log('none')
  }
  render()
}

const filterTask = () => {
  switch(true) {
    case filterType === 'all':
      return arrayTasks;
    case filterType === 'active':
      let activeTask = arrayTasks.filter( element => !element.isCheck)
      return activeTask;
    case filterType === 'completed':
      let completedTask = arrayTasks.filter( element => element.isCheck)
      return completedTask
    default:
      console.log('default filter case')
  }
};

const sortTasks = () => {
  let allLength = arrayTasks.length;
  all.innerText = `All task (${allLength})`
  let activeLength = arrayTasks.filter( element => !element.isCheck)
  active.innerText = `Active task (${activeLength.length})`
  let completedLength = arrayTasks.filter( element => element.isCheck)
  completed.innerText = `Completed task (${completedLength.length})`
};

const render = () => {
  let newTask = '';
  let filterArrayTask = filterTask();
  console.log(filterArrayTask)
  console.log(filterType)
  // filterArrayTask.forEach( element => {
  //   return element
  // })
  if(filterArrayTask.length !== 0) {
    filterArrayTask.forEach( element => {
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
  } else listTask.innerHTML = `
      <div class="list__task--default">
        <img src="./add__task.svg" alt="default">
        <p class="default__list">Add new tasks in this list...</p>
      </div>
  `;
  checkAllCheckbox()
  sortTasks()
  // console.log(arrayTasks)
}


const debug = ( event ) => {
  // console.log(event)
}

// const listenTitleInput = titleInput.addEventListener( 'click' );
const listenButtonPush = push.addEventListener( 'click', clickPush );
// const listenListTask = listTask.addEventListener( 'click' );
// const listenListPages = pages.addEventListener( 'click' );
const listenButtonAll = all.addEventListener( 'click', statusTask );
const listenButtonActive = active.addEventListener( 'click', statusTask );
const listenButtonComplated = completed.addEventListener( 'click', statusTask );
const listenButtonDelete = deleteCheck.addEventListener( 'click', deleteCheckTask );
const listenCheckboxAll = checkboxAll.addEventListener( 'click', checkAllTask ); 
const listenTask = listTask.addEventListener( 'click', clickTaskElement );
const saveTitleTask = listTask.addEventListener( 'keydown', saveTitle );
// const blurTaskText = listTask.addEventListener( 'blur', blurText, true );
const listenPressEsc = document.addEventListener( 'keydown', pressKeyboard );
const listenPressEnter = document.addEventListener( 'keydown', pressKeyboard );
const listenPressDelete = document.addEventListener( 'keydown', pressKeyboard );
const debufListen = document.addEventListener( 'click', debug )


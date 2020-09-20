//Initilization
let allWorks=[];
let completedWorks=[];
let remainingWorks=[];
if(localStorage.getItem("toDoList")){
  allWorks =JSON.parse(localStorage.getItem("toDoList"));
}
if(localStorage.getItem("completedWorks")){
  completedWorks = JSON.parse(localStorage.getItem("completedWorks"));
}
if(localStorage.getItem("remainingWorks")){
  remainingWorks =JSON.parse(localStorage.getItem("remainingWorks")) ;
}
// SELECTORS
const inputBox = document.querySelector("input");
const submitButton = document.querySelector(".arrow-down");
const taskList = document.querySelector(".task-list");
const taskListNew = $(".task-list");
const check = document.querySelector(".check");
const ban = document.querySelector(".ban");
const trash = document.querySelector(".trash");



if(allWorks.length!==0){
  for(let i=0;i<allWorks.length;i++){
    setTimeout(()=>{
      let taskText = allWorks[i];
      let taskContainer = document.createElement("li");
      taskContainer.classList.add("each-task");
      if(completedWorks.includes(taskText)){
        taskContainer.innerHTML = `<p class="task check-strike">${taskText}</p>
        <span class="check"> <i class="fa fa-check-circle-o " aria-hidden="true"></i> </span>
        <span class="ban"><i class="fa fa-ban " aria-hidden="true"></i>  </span>
        <span class="trash"><i class="fa fa-trash " aria-hidden="true"></i>   </span>`
      }
      else if(remainingWorks.includes(taskText)){
        taskContainer.innerHTML = `<p class="task ban-red">${taskText}</p>
        <span class="check"> <i class="fa fa-check-circle-o " aria-hidden="true"></i> </span>
        <span class="ban"><i class="fa fa-ban " aria-hidden="true"></i>  </span>
        <span class="trash"><i class="fa fa-trash " aria-hidden="true"></i>   </span>`
      }
      else{
        taskContainer.innerHTML = `<p class="task">${taskText}</p>
        <span class="check"> <i class="fa fa-check-circle-o " aria-hidden="true"></i> </span>
        <span class="ban"><i class="fa fa-ban " aria-hidden="true"></i>  </span>
        <span class="trash"><i class="fa fa-trash " aria-hidden="true"></i>   </span>`

      }
      taskList.appendChild(taskContainer);
},400*i);

  }
}




// EVENT LISTENER
submitButton.addEventListener("click", addTask);
document.addEventListener("keypress",addTaskNew)
taskListNew.on("click", ".check", completed)
taskListNew.on("click", ".ban", missed)
taskListNew.on("click", ".trash", removeItem)


//functions
function addTask() {
  if (inputBox.value !== "") {
    let myAudio=new Audio("add.mp3");
    myAudio.play();
    let taskText = inputBox.value;
    allWorks.push(taskText)
    localStorage.setItem("toDoList",JSON.stringify(allWorks));
    let taskContainer = document.createElement("li");
    taskContainer.classList.add("each-task");
    taskContainer.innerHTML = `<p class="task">${taskText}</p>
    <span class="check"> <i class="fa fa-check-circle-o " aria-hidden="true"></i> </span>
    <span class="ban"><i class="fa fa-ban " aria-hidden="true"></i>  </span>
    <span class="trash"><i class="fa fa-trash " aria-hidden="true"></i>   </span>`
    taskList.appendChild(taskContainer);
    inputBox.value = "";
  } else {
    alert("Your field is empty")
  }
}
function addTaskNew(e) {
  if(e.key==="Enter"){
    let myAudio=new Audio("add.mp3");
    myAudio.play();
    e.preventDefault();
    if (inputBox.value !== "") {
    let taskText = inputBox.value;
    allWorks.push(taskText)
    localStorage.setItem("toDoList",JSON.stringify(allWorks));
    let taskContainer = document.createElement("li");
    taskContainer.classList.add("each-task");
    taskContainer.innerHTML = `<p class="task">${taskText}</p>
    <span class="check"> <i class="fa fa-check-circle-o " aria-hidden="true"></i> </span>
    <span class="ban"><i class="fa fa-ban " aria-hidden="true"></i>  </span>
    <span class="trash"><i class="fa fa-trash " aria-hidden="true"></i>   </span>`
    taskList.appendChild(taskContainer);
    inputBox.value = "";
  } else {
    alert("Your field is empty")
  }}

}


function completed(e) {
  let myAudio=new Audio("completed.mp3");
  myAudio.play();

  let task = e.currentTarget.parentElement.firstElementChild;
  if (task.classList.contains("ban-red")) {
    task.classList.remove("ban-red");
    task.classList.toggle("check-strike");
    console.log(task.classList)
  } else {
    task.classList.toggle("check-strike");
  }
  if(completedWorks.includes(task.innerText)){
    a=completedWorks.indexOf(task.innerText);
    completedWorks.splice(a,1);
  }
  else{
    if(remainingWorks.includes(task.innerText)){
      let a=remainingWorks.indexOf(task.innerText);
      remainingWorks.splice(a,1);
    }
    completedWorks.push(task.innerText)
  }
  localStorage.setItem("completedWorks",JSON.stringify(completedWorks));
  localStorage.setItem("remainingWorks",JSON.stringify(remainingWorks));
}


function missed(e) {
  let myAudio=new Audio("lost.mp3");
  myAudio.play();
  let task = e.currentTarget.parentElement.firstElementChild;
  if (task.classList.contains("check-strike")) {
    task.classList.remove("check-strike");
    task.classList.toggle("ban-red");
  } else {
    task.classList.toggle("ban-red");
  }
 if(remainingWorks.includes(task.innerText)){
   a=remainingWorks.indexOf(task.innerText);
   remainingWorks.splice(a,1);
 }
 else{
   if(completedWorks.includes(task.innerText)){
    let a=completedWorks.indexOf(task.innerText);
    completedWorks.splice(a,1);
 }
   remainingWorks.push(task.innerText);

 }
 localStorage.setItem("completedWorks",JSON.stringify(completedWorks));
 localStorage.setItem("remainingWorks",JSON.stringify(remainingWorks));
}

function removeItem(e) {
  let myAudio=new Audio("delete.mp3");
  myAudio.play();
  let task = e.currentTarget.parentElement.firstElementChild;
  let deleted=e.currentTarget.parentElement;
  deleted.classList.add("disappear");
  setTimeout(()=>{
    deleted.remove();
  },900);
  let a=allWorks.indexOf(task.innerText);
  allWorks.splice(a,1);
  if(completedWorks.includes(task.innerText)){
    let a=completedWorks.indexOf(task.innerText);
    completedWorks.splice(a,1);
  }
  if(remainingWorks.includes(task.innerText)){
    let a=remainingWorks.indexOf(task.innerText);
    remainingWorks.splice(a,1);
  }
  localStorage.setItem("toDoList",JSON.stringify(allWorks));
  localStorage.setItem("completedWorks",JSON.stringify(completedWorks));
  localStorage.setItem("remainingWorks",JSON.stringify(remainingWorks));
}

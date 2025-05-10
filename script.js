const inputBox = document.getElementById("taskInput");
const taskBox = document.getElementById("listOfTasks");

function addTask(){
    if(inputBox.value === ''){
    alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        taskBox.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();

}
  
taskBox.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("done");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", taskBox.innerHTML);
}

function showData(){
    taskBox.innerHTML = localStorage.getItem("data");
}

showData();
document.querySelectorAll('.set-reminder').forEach(button => {
    button.addEventListener('click', function() {
      const timeInput = this.previousElementSibling;
      const taskText = this.parentElement.textContent.split('Set Reminder')[0].trim();
      const reminderTime = timeInput.value;
  
      if (!reminderTime) {
        alert("Please select a time!");
        return;
      }
  
      // Calculate time until reminder
      const now = new Date();
      const [hours, minutes] = reminderTime.split(':');
      const reminderDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );
  
      const timeUntilAlert = reminderDate - now;
  
      if (timeUntilAlert < 0) {
        alert("Please choose a future time!");
        return;
      }
  
      // Set timeout for the reminder
      setTimeout(() => {
        alert(`REMINDER: ${taskText}`);
        // Optional: Browser notification (requires permission)
        if (Notification.permission === "granted") {
          new Notification("TO-DO Reminder", { body: taskText });
        }
      }, timeUntilAlert);
  
      alert(`Reminder set for ${reminderTime}!`);
    });
  });
  
  // Request notification permission (optional)
  if (window.Notification) {
    Notification.requestPermission();
  }
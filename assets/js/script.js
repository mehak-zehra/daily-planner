//global variables 
var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
console.log(today);

var plannerArr = [
    {
        time: '9:00 AM' , 
        description: '' ,
    },
    {
        time: '10:00 AM' , 
        description: '' ,
    },
    {
        time: '11:00 AM' , 
        description: '' ,
    },
    {
        time: '12:00 PM' , 
        description: '' ,
    },
    {
        time: '1:00 PM' , 
        description: '' ,
    },
    {
        time: '2:00 PM' , 
        description: '' ,
    },
    {
        time: '3:00 PM' , 
        description: '' ,
    },
    {
        time: '4:00 PM' , 
        description: '' ,
    },
    {
        time: '5:00 PM' , 
        description: '' ,
    },
];

var loadPlanner = function() {
    //get an array from local storage
    var localStorageArray = JSON.parse(localStorage.getItem("planner"));
    console.log(localStorageArray);
    if(localStorageArray){ 
        displayCalendar(localStorageArray)
        
    }
    else {
        displayCalendar(plannerArr);
        console.log(plannerArr);
    }
    

}

var displayCalendar = function(workDayArr) {
    var containerEl = document.querySelector(".container");
    // In this function we are creating elements to display calendar
    for(var i = 0; i < workDayArr.length; i++) {
        
        var inputGroupEl= document.createElement('div');
        inputGroupEl.className = "input-group mb-3";

        var labelDivEl = document.createElement('div');
        labelDivEl.className = "input-group-prepend";

        var labelSpanEl = document.createElement('span');
        labelSpanEl.className = "input-group-text"
        labelSpanEl.textContent = workDayArr[i].time;

        labelDivEl.appendChild(labelSpanEl);

        var descriptionEl = document.createElement('input');
        descriptionEl.className = "form-control description";
        descriptionEl.value = workDayArr[i].description;
        descriptionEl.id = "description-" + i;

        var saveBtnDivEl = document.createElement('div');
        saveBtnDivEl.className = "input-group-append";

        var saveBtnEl = document.createElement('button');
        saveBtnEl.className = "save-btn ";
        saveBtnEl.textContent = "Save";
        saveBtnEl.setAttribute("index", i);

        saveBtnDivEl.appendChild(saveBtnEl);

        inputGroupEl.appendChild(labelDivEl);
        inputGroupEl.appendChild(descriptionEl);
        inputGroupEl.appendChild(saveBtnDivEl);

        containerEl.appendChild(inputGroupEl);
    }  

}

loadPlanner();
// When save button is clicked
$(".save-btn").on("click", function() {
    var clickedIndex = this.getAttribute("index");
    var inputEl = document.getElementById("description-" + clickedIndex);
    console.log(inputEl.value);

    plannerArr[clickedIndex].description = inputEl.value;
    localStorage.setItem("planner", JSON.stringify(plannerArr));
})



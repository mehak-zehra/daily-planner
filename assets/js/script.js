//global variables 
var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

var emptyPlannerArr = [
    {
        time: '9:00 AM',
        description: '',
        hour: 9
    },
    {
        time: '10:00 AM',
        description: '',
        hour: 10
    },
    {
        time: '11:00 AM',
        description: '',
        hour: 11
    },
    {
        time: '12:00 PM',
        description: '',
        hour: 12
    },
    {
        time: '1:00 PM',
        description: '',
        hour: 13
    },
    {
        time: '2:00 PM',
        description: '',
        hour: 14
    },
    {
        time: '3:00 PM',
        description: '',
        hour: 15
    },
    {
        time: '4:00 PM',
        description: '',
        hour: 16
    },
    {
        time: '5:00 PM',
        description: '',
        hour: 17
    },
];

var loadPlanner = function () {


    //get an array from local storage
    var localStorageArray = JSON.parse(localStorage.getItem("planner"));
    // console.log(localStorageArray);
    if (localStorageArray) {
        displayCalendar(localStorageArray)
    }
    else {
        localStorage.setItem("planner",JSON.stringify(emptyPlannerArr)); 
        displayCalendar(emptyPlannerArr);
    }
    setInterval(function () {

        updateFields();

    }, 1000);
}

var displayCalendar = function (workDayArr) {
    var containerEl = document.querySelector(".container");
    // In this function we are creating elements to display calendar
    for (var i = 0; i < workDayArr.length; i++) {

        var inputGroupEl = document.createElement('div');
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
        descriptionEl.setAttribute("workHour", workDayArr[i].hour);

        var saveBtnDivEl = document.createElement('div');
        saveBtnDivEl.className = "input-group-append";

        var saveBtnEl = document.createElement('button');
        saveBtnEl.className = "save-btn  btn btn-success btn-lg";
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
$(".save-btn").on("click", function () {
    var clickedIndex = this.getAttribute("index");
    var inputEl = document.getElementById("description-" + clickedIndex);
    var localStorageArr = JSON.parse(localStorage.getItem("planner"));
    localStorageArr[clickedIndex].description = inputEl.value;
    localStorage.setItem("planner", JSON.stringify(localStorageArr));
})

// this function should 
var updateFields = function () {

    // get current hour from momemt
    var currentHour = moment().hour();

    // get all inputs from the DOM
    var inputsArr = document.querySelectorAll(".description");
    // for each fieild
    for (var i = 0; i < inputsArr.length; i++) {
        var workHour = parseInt(inputsArr[i].getAttribute("workHour"));
        if (workHour < currentHour) {
            inputsArr[i].setAttribute("readonly", true);
            inputsArr[i].classList.remove("active-description");
        }
        else if (workHour === currentHour) {
            inputsArr[i].classList.add("active-description");
        }
        else {
            inputsArr[i].removeAttribute("readonly");
            inputsArr[i].classList.remove("active-description");
        }
    }
}





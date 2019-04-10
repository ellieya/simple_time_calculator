
//Time constructor
class Time {
    constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
    }
}

function extractTimeValues(timeStringValue) {
    var hour = "", minute = "";
    var i = 0;
    
    while (timeStringValue[i] != ':') {
        hour += timeStringValue[i];
        i++;
    }
    
    //Increment i to avoid taking ':'
    i++;
    
    while (i < timeStringValue.length) {
        minute += timeStringValue[i];
        i++;
    }
    
    hour = parseInt(hour);
    minute = parseInt(minute);
    
    var extractedTime = new Time(hour, minute);
    return extractedTime;
}

function buttonOperation() {
    try {
        primaryButtonOperation();
    } catch (e) {
        alert(e);
    }
}

//Prepares data for actual calculation
function primaryButtonOperation() {
    var times = [];
    
    //Fetch time1 and time2 <- put this in a loop later to clean up code
    times[0] = document.getElementsByClassName("time-field")[0].value;
    times[1] = document.getElementsByClassName("time-field")[1].value;
    
    //Input validation <- put this in a loop later to clean up code
    if (times[0] == "" || times[1] == "") {
        throw 'Time should not be empty';
    }
    
    //Change to time type <- put this in a loop later to clean up code
    times[0] = extractTimeValues(times[0]);
    console.log(times[0]);
    times[1] = extractTimeValues(times[1]);
    console.log(times[1]);
    
    //Fix times based on today/tomorrow
    for (var i = 0; i < 2; i++) {
        if (document.getElementsByClassName("time-selects")[i].value == "tomorrow") {
            console.log("Pre: " + times[i].hour)
            times[i].hour += 24;
            console.log("Post: " + times[i].hour)
            }
        }
    
    //Convert to minutes-only value
    for (var i = 0; i < 2; i++) {
        times[i] = (times[i].hour * 60) + times[i].minute;
        console.log("Post-process: " + times[i]);
    }
    
    
    //Data validation again
    if (times[0] > times[1]) {
        throw 'Start time cannot be after end time';
    }
    
    //Calculation if passed
    var result = calculateResult(times[0], times[1]);
    
    alert("The difference between the two times is " + result.hour + " hours and " + result.minute + " minutes.");
    
}

//Actual calculation
function calculateResult(time1, time2) {
    resultHolder = time2 - time1;
    resultHour = parseInt(resultHolder / 60);
    resultMinute = resultHolder % 60;
    
    result = new Time(resultHour, resultMinute);
    return result;
    
}

function putCurrentTime(e) {
    
    var target = document.getElementsByClassName("time-field")[0];
    
    //Input current time
    var d = new Date();
    var hours = d.getHours();
    var min = d.getMinutes();
    
    //Fix time to conform to input type requirements
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (min < 10) {
        min = "0" + min;
    }
    
    target.value= hours + ":" + min;
    
    //Disable input
    target.disabled = true;
    
    //Hide current time button and replace with put custom time
    e.target.classList.remove("visible");
    e.target.classList.add("invisible");
    document.getElementById("custom-time-button").classList.remove("invisible");
    document.getElementById("custom-time-button").classList.add("visible");
    
}

function putCustomTime(e) {
    
    var target = document.getElementsByClassName("time-field")[0];
    
    //Clean input
    target.value="";
    
    //Enable input
    target.disabled = false;
    
    //Hide custom time button and replace with put current time
    e.target.classList.remove("visible");
    e.target.classList.add("invisible");
    document.getElementById("cur-time-button").classList.remove("invisible");
    document.getElementById("cur-time-button").classList.add("visible");
}

document.getElementById("calculate").addEventListener("click", buttonOperation);

document.getElementById("cur-time-button").addEventListener("click", putCurrentTime);

document.getElementById("custom-time-button").addEventListener("click", putCustomTime);
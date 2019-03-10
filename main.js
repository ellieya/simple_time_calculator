var button;

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
    var time1, time2;
    
    //Fetch time1 and time2
    time1 = document.getElementsByClassName("time-field")[0].value;
    time2 = document.getElementsByClassName("time-field")[1].value;
    
    //Input validation
    if (time1 == "" || time2 == "") {
        throw 'Time should not be empty';
    }
    
    //Change to time type
    time1 = extractTimeValues(time1);
    console.log(time1);
    time2 = extractTimeValues(time2);
    console.log(time2);
    
    //Calculation if passed
    //calculateResult();
    
}

//Actual calculation
function calculateResult(time1, time2) {
}


document.getElementById("calculate").addEventListener("click", buttonOperation);

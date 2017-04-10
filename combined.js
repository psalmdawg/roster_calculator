var date = new Date();
var today = date.getDate();
var day = date.getDay();
var dayDate = date.getUTCDate()
var month = date.getMonth();
var year = date.getFullYear();
var startDate = 13;
var leapYear;
var startDate;
var numberOfDays;
var multipleSwing = false;

//days on days off (days on / days work)
var dO = 6;
var dW = 8;
var dO2 = 2;
var dW2 = 8;
var combined = dO + dW;
var combined2 = dO + dW + dO2 + dW2;

//calculates the total amount of rotations for the roster
var totalLength = Math.round(1825 / combined); //(days in five years / roster length)
var totalLength2 = Math.round(1825 / combined2);
var startDayNumber = 0; //start date of the roster

var iDiv = document.createElement('div');
//get user start date form
var start_date_user = document.querySelector('.start_date_entry');
var rstr_btn = document.querySelector('.roster_entry_btn');
var rosterStartDate;
var rosterStartDay;
var rosterStartYear;
var rosterStartMonth;
var daysBetweenStartAndFinish;
var rosterArray = [];
var monthsLengths = [30,28,30,31,30,31,30,30,31,30,31,31];
var newMonth;
var newYear;
var previousMonth; // for finding its length for removing node elements
var startDay = 0; // updated in getMonth fn
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day_letter;

//run this on a timer to show a clock ticking
function showClock(){
  var clock = document.querySelector('.clock')
  var timer = new Date();
  var hours = timer.getHours();
  var minutes = timer.getMinutes();
  var seconds = timer.getSeconds();
  clock.innerHTML = hours + ":" + minutes + "." + seconds;
}
// setInterval(showClock, 100)

$('.calender_nav_button').click(function (){
  var x  = $(this).val()
  buttonValues[x]();
})

var buttonValues = {
  nm : function(){
          changeCalenderMonthUp()
        },
  ny : function(){
          changeCalenderYearUp()
        },
  pm : function(){
          changeCalenderMonthDown()
        },
  py : function(){
          changeCalenderYearDown()
        }
};

// showDate();

howManyDaysInMonth(months[month]);

function showDate(){

  if(today === 1 || today === 21 || today === 31) {
    day_letter = "st";
  } else if (today === 2 ||  today === 22) {
    day_letter = "nd";
  } else if (today === 3 || today ===  23) {
    day_letter = "rd";
  } else {
    day_letter = "th";
  }

  var todays_date =  days[day] + " " + today + day_letter + " " + months[month] + ' ' + year + '</p>'
  var showTheWorld = document.querySelector('.date')
  showTheWorld.innerHTML = todays_date;
}

// to determine leap year. from here http://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
function leapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};


function howManyDaysInMonth(month){
  // console.log('run')
  if(month === "April" || month === "June" || month === "September" || month === "November") {

    numberOfDays = 30;

  } else if(month === "January" || month === "March" || month === "May" || month === "July" || month ===  "August" || month ===  "October" || month ===  "December") {

      numberOfDays = 31

  } else {

    if(leapYear(year)){

      numberOfDays = 29

    } else {

      numberOfDays = 28

    }
  };
  // console.log(numberOfDays)
  // console.log("date " + months[month] + " " + year + " number of days in month " + numberOfDays)
};


function clearCtr(){
  var blocks = document.getElementsByClassName('block');
  var breaks = document.getElementsByTagName('br');

  if(document.querySelector('.block')){
    for(i = blocks.length; i > 0; i--){
      var el = document.querySelector('.block');
      el.parentNode.removeChild(el)
    }
    for(i=0; i < breaks.length + 4; i++){
      var br = document.querySelector('br')
      br.parentNode.removeChild(br)
    }
  }
};
  // console.log(startDay)


//creates main CALENDER
function creator(days){
  clearCtr()

  for(i=1;i<=days+startDay;i++){

    var iDiv = document.createElement('div');
    var newLine = document.createElement('br');
    iDiv.className = 'block';
    if(i <= startDay){
      iDiv.innerHTML = "";
    } else {
      iDiv.innerHTML = i - startDay;
      $('iDiv').addClass('calDate');
    }
    $('.calender-ctr').append(iDiv);

    if(i % 7 === 0 ){
      $('.calender-ctr').append(newLine)
    }

  }

  var monthDiv = document.querySelector('.month');
  monthDiv.innerHTML = months[month] + " " + "<span>"+year+"</span>";
}

creator(numberOfDays)


function findTodayOnCalender(day){
  $('.calender-ctr').find( ":contains('" + day + "')" ).css({"background":"yellow", "border-radius":"8px"})
}

findTodayOnCalender(today)

function changeCalenderMonthUp (){
  month++;
  if(month > 11){
    month = 0;
    year ++
  }

  howManyDaysInMonth(months[month]);
  getNewMonth(year, month);
  creator(numberOfDays);
  getTimeFromStartDate();
}

function changeCalenderMonthDown(){
  month--;
  if(month < 0){
    month = 11 ;
    year--
  }
  howManyDaysInMonth(months[month]);
  getNewMonth(year, month);
  creator(numberOfDays);
  getTimeFromStartDate();
}

function changeCalenderYearUp(){
  year++;
  howManyDaysInMonth(months[month]);
  getNewMonth(year, month);
  creator(numberOfDays);
  getTimeFromStartDate();
}

function changeCalenderYearDown(){
  howManyDaysInMonth(months[month]);
  year--;
  getNewMonth(year, month);
  creator(numberOfDays);
  getTimeFromStartDate();
}


//for finding a specific month and year.
function getNewMonth(yearIn, monthIn){
  var newDate = new Date(yearIn, monthIn)
  var dateToString = newDate.toDateString()
  var firstDayOfMonth = dateToString.substring(0, 3);
  newMonth = newDate.getMonth();
  newYear = newDate.getFullYear();

  switch (firstDayOfMonth) {
        case "Sun":
          startDay = 0;
          break;
        case "Mon":
          startDay = 1;
          break;
        case "Tue":
          startDay = 2;
          break;
        case "Wed":
          startDay = 3;
          break;
        case "Thu":
          startDay = 4;
          break;
        case "Fri":
          startDay = 5;
          break;
        case "Sat":
          startDay = 6;
          break;
      default:
          return("")
  }

  return newDate;

}



howManyDaysInMonth(months[month])

var dayXXX;
var monthXXX;
var yearXXX;
rstr_btn.addEventListener("click", function(){
  // start_date_user.value()
  event.preventDefault()
  dW = document.querySelector('.days_on_entry').value;
  dO = document.querySelector('.days_off_entry').value;

  if(multipleSwing){
    dW2 = document.querySelector('.days_on_entry2').value;
    dO2 = document.querySelector('.days_off_entry2').value;
  }

  rosterStartDate = start_date_user.value;
  rosterStartYear = rosterStartDate.substring(0, 4);
  rosterStartMonth = rosterStartDate.substring(5, 7);
  rosterStartDay = rosterStartDate.substring(8, 10);

  dayXXX = parseInt(rosterStartDay);
  // console.log(dayXXX + " " + days[dayXXX])
  monthXXX = parseInt(rosterStartMonth) - 1;
  yearXXX = parseInt(rosterStartYear);
  getDateDifference(dayXXX, monthXXX, yearXXX);
  getTimeFromStartDate()

  if(multipleSwing){
    $('.roster_output').html(dW + " / " + dO + " : " + dW2 + " / " + dO2 )
  } else {
     $('.roster_output').html(dW + " / " + dO )
  }

  $('.roster-entry-ctr').css({"display":"none"})
  $('.navigationButtons').css({"display":"block"})
  $('.inner-calender-ctr').css({"display":"block"})
  $('h1').css({"display":"none"})
  $('.reset_ctr').css({"margin-top":"100px"})
  $('.block-guide').css({"display":"inline-block"})



});

function getTimeFromStartDate(){
  // difference in days between roster start date and the first day of the currently displayed month.

  var theStartOfTheRoster = Date.UTC(yearXXX, monthXXX, dayXXX)
  var firstDayOfDisplayedMonth = Date.UTC(year, month)
  var rosterDayDifferences = theStartOfTheRoster - firstDayOfDisplayedMonth
  var a = rosterDayDifferences / 1000
  var b = a / 60
  var c = b / 60
  var d = c / 24
  var posD = d + 1;
  generateRoster()

    // the roster should start at day posD)
  var rosterXXX =  (numberOfDays - posD) + 1;

  var counter = 0;
  for(i=posD;i<=numberOfDays;i++){

    if(rosterArray[i-posD] === "on"){
       $('.calender-ctr').find( ":contains('" + i + "')" ).css({"background":"red", "border-radius":"8px"})
    } else if (rosterArray[i-posD] === "off") {
      $('.calender-ctr').find( ":contains('" + i + "')" ).css({"background":"#c0ff3e", "border-radius":"8px"})
    }
    counter ++

  }

}

// date difference start to finish
function getDateDifference(day, month, year){

  var startDate = new Date(year, month, day)
  var endYear = year + 5;
  // console.log(endYear)
  var endDate = new Date(endYear, month, day)
  var time_between_dates = endDate.getTime() - startDate.getTime();
  var time_between_dates_seconds = time_between_dates / 1000 //milliseconds to seconds
  var yearInSeconds = 31536000;
  var dayInSeconds = 86400;
  var years = time_between_dates_seconds / yearInSeconds
  daysBetweenStartAndFinish = years * 365;

}

function generateRoster(){
    rosterArray = [];
 if(!multipleSwing){
   for(i = startDayNumber; i < totalLength; i ++){

      for(y=0;y<dW;y++){
        rosterArray.push('on')
      }

      for(x=0;x<dO;x++){
        rosterArray.push('off')
      }

    };

  } else {

    for(i = startDayNumber; i <totalLength; i ++){

      for(y=0;y<dW;y++){
        rosterArray.push('on')
      }

      for(x=0;x<dO;x++){
        rosterArray.push('off')
      }

      for(y=0;y<dW2;y++){
        rosterArray.push('on')
      }

      for(x=0;x<dO2;x++){
        rosterArray.push('off')
      }

    }

  }

  // console.log(rosterArray)
  // console.log(rosterArray.length)
  // console.log(totalLength)

};



$('.single_rotation_button').click(function(){
  $('.selector').css({"display":"block"})
  $('.rotation_selector_container').css({"display":"none"});
  $('.reset_btn').css({"display":"block"})
  console.log("multi swing: " + multipleSwing)

  $('.reset_ctr').css({"display":"none"});
})

$('.double_rotation_button').click(function(){
  multipleSwing = true;
  $('.selector').css({"display":"block"});
  $('.reset_btn').css({"display":"block"});

  $('.selector2').css({"display":"block"});
  $('.rotation_selector_container').css({"display":"none"});

  console.log("multi swing: " + multipleSwing)
  $('.reset_ctr').css({"display":"none"});
});


$('.reset-img').click(function(){
  location.reload();
})


var calSwipe = document.querySelector('.inner-calender-ctr');
var hammertime = new Hammer(calSwipe);
hammertime.on('swiperight', function(ev) {
  changeCalenderMonthDown();
});
hammertime.on('swipeleft', function(ev) {
	changeCalenderMonthUp();
});

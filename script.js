var provinceGlobal;
// remember the '.' in front of the class when referencing
// creates the ICS file for user consumption
function buttonClick(){
    // $('.list').append("<li>Another item " + $('#daysPriorCD').val() + "</li>")
    // $('.event1').append("<p>Your event is " + $('#daysPriorCD').val() + " days before the court date.</p>");

    // //checks court date value
    // console.log("what is courtdate.val");
    // console.log($('#courtDate').val());

    // var court_date = new Date($('#courtDate').val());
    var court_date = new Date($('#courtDate').val());
    console.log("original court date:");
    console.log(court_date);
 



    // var newdate = new Date(date);
    // date.setDate(date.getDate() - $('#daysPriorCD').val());
    // console.log(date);

    // $('.event1').append("<p>" + $('#courtDate').val() + "</p>");
    // $('.event1').append("<p>" + date + "</p>");

    // Get the event details
    // var eventName = $("#fileNo").val() + " - " + $("#matterName").val() + " - " + $("#eventName").val();
    // var eventStart = date.toISOString().replace(/-/g, "").replace(/:/g,"").split('.')[0];
    // var eventEnd = date.toISOString().replace(/-/g, "").replace(/:/g,"").split('.')[0];
    // var eventLocation = "Online";

    //array for event names
    var event_names_arr = [];
    $('.eventName').each(function( index ) {
        event_names_arr.push($( this ).val());
    });


    //array for # daysPriodCD
    var event_days_arr = [];
    $('.daysPriorCD').each(function( index ) {
        event_days_arr.push($( this ).val());
    });



    // Create the ICS file
    var icsFile = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Your Company//NONSGML v1.0//EN\r\n";
   
    for ( var i = 0; i < event_names_arr.length; i++ ) {
        ics_event_name = $("#fileNo").val() + " - " + $("#matterName").val() + " - " + event_names_arr[i];
        // important - need to set this to a date object
        input_date = new Date(court_date);
        console.log("check ics date start");
        console.log(input_date);
        // console.log("check court_date subtract 3 days");
        // console.log(court_date.toString(court_date.setDate(court_date.getDate()-3)));

        //converts the time to the correct time zone and therefore the correct date, rather than court_date - X hours due to TZ offset
        // April 4, 2024: change *60*1000 to *60*4000
        input_date.setTime( input_date.getTime() + input_date.getTimezoneOffset()*60*4000 );
        console.log("get timezone offset");
        console.log(input_date);

        // var testtimezone = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
        // console.log("test timezone");
        // console.log(testtimezone);
    

        // court_date subtraction formula - prior to Jan 19, 2024 -- issue with wrong year
        //ics_date_start.setDate(court_date.getDate() - event_days_arr[i]);

        //proposed new court_date subtraction formula - on Jan 19, 2024
        // ics_date_start.setDate(court_date.toString(court_date.setDate(court_date.getDate()) - event_days_arr[i]));
         //ics_date_start.setDate(court_date);
         //copied_court_date = new Date(court_date);

        // calculates pretrial reminder date BEFORE going thru holiday and weekend check
        testing_date = new Date(input_date);
        testing_date.setDate(input_date.getDate() - event_days_arr[i]);
        console.log("after subtracting # days prior - testing date");
        console.log(testing_date);
        // ics_date_start.setDate(court_date.setDate(court_date.getDate()) - event_days_arr[i]);

        // row below takes the calculated date after subtraction and determines 'businessDayPrior'
        // console.log("sets ics_date_start to right time zone EST:");
        // console.log(ics_date_start);
        ics_date = new Date(businessDayPriorNew(testing_date));
        // another copy of ics date to branch off into ics_date_start time and ics_date_end time
        console.log("ics_date");
        console.log(ics_date);

        // Jan 25, 2024: ics date end should = ics date start; initialized with ics date start
        ics_date_end = new Date(ics_date);
        // date end is equal to date start
        console.log("equating ics_date_end = ics_date_start");
        console.log(ics_date_end);

        // ensures start time of reminder starts at top of the hour at 9am
        //ics_date_start.setHours(9-(ics_date_start.getTimezoneOffset()/60));
        ics_date_start = new Date(ics_date);
        ics_date_start.setHours(9);
        //ics_date_start.setHours(9-(ics_date.getTimezoneOffset()/60));
        ics_date_start.setMinutes(0);
        ics_date_start.setSeconds(0,0);

        // console.log("check ics_date_start subtract 3 days");
        // console.log(ics_date_start.toLocaleString(ics_date_start.setDate(ics_date_start.getDate()-3)));

        //ics_date_end = ics_date_start.setDate(ics_date_start.getDate() - event_days_arr[i]);

        // ics_date_end after adjusting timezone offset
        // ics_date_end.setTime( ics_date_end.getTime() + ics_date_end.getTimezoneOffset()*60*1000 );
        // console.log("get ics_date_end timezone offset");
        // console.log(ics_date_end);

        ics_date_end = new Date(ics_date);
        //ics_date_end.setDate(court_date.getDate() - event_days_arr[i]);
        ics_date_end.setHours(9);
        //ics_date_end.setHours(9-(ics_date_start.getTimezoneOffset()/60));
        ics_date_end.setMinutes(30);
        ics_date_end.setSeconds(0,0);
        
        // console.log(court_date.getDate());
        // console.log(ics_event_name);
        console.log("ics_date_start");
        console.log(ics_date_start);
        console.log("ics_date_end");
        console.log(ics_date_end);

        // construct dtstamp dtstart dtend for ics file from pre-toISOString function
        var eventStart2 = ics_date_start.getFullYear()+""+convertMonthFormat(ics_date_start.getMonth())+""+convertDateFormat(ics_date_start.getDate())+"T090000";
        console.log("eventStart2: " + eventStart2);
        var eventEnd2 = ics_date_start.getFullYear()+""+convertMonthFormat(ics_date_start.getMonth())+""+convertDateFormat(ics_date_start.getDate())+"T093000";
        console.log("eventEnd2: " + eventEnd2);

        var eventStart = ics_date_start.toISOString().replace(/-/g, "").replace(/:/g,"").split('.')[0];
        var eventEnd = ics_date_end.toISOString().replace(/-/g, "").replace(/:/g,"").split('.')[0];
        var eventLocation = "Online";
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        console.log(eventStart);
        console.log(eventEnd);

        icsFile += "BEGIN:VEVENT\r\n";
        icsFile += "UID:" + ics_event_name + "\r\n";
        icsFile += "DTSTAMP:" + eventStart2 + "\r\n";
        icsFile += "DTSTART;TZID=" + timezone + ":" + eventStart2 + "\r\n";
        icsFile += "DTEND;TZID=" + timezone + ":" + eventEnd2 + "\r\n";
        icsFile += "LOCATION:" + eventLocation + "\r\n";
        icsFile += "SUMMARY:" + ics_event_name + "\r\n";
        icsFile += "END:VEVENT\r\n";

    
    }

    // icsFile += "BEGIN:VEVENT\r\n";
    // icsFile += "UID:" + eventName + "\r\n";
    // icsFile += "DTSTAMP:" + eventStart + "\r\n";
    // icsFile += "DTSTART:" + eventStart + "\r\n";
    // icsFile += "DTEND:" + eventEnd + "\r\n";
    // icsFile += "LOCATION:" + eventLocation + "\r\n";
    // icsFile += "SUMMARY:" + eventName + "\r\n";
    // icsFile += "END:VEVENT\r\n";


    icsFile += "END:VCALENDAR\r\n";
    // need to update eventName
    var eventName = "test";
    // Save the ICS file
    var blob = new Blob([icsFile], {type: "text/calendar"});
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = eventName + ".ics";
    link.click();

}

// when page initially loads, runs this 'function'
$(function(){
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

    // check Alberta holidays and Quebec holidays
    //var Holidays = require('date-holidays')
    // const holidaytest = new Holidays.default
    // holidaytest.init('CA', 'QC');
    // console.log(holidaytest.getHolidays(2024));
    
    

    // listens for click
    // $('.dropdown-item').click(function(){
    //     var dropdown_text = $(this).text();
    //     // $(this).val(dropdown_text);
    //     console.log(dropdown_text);
    //     $(this).parent().parent().siblings('.eventName').val(dropdown_text);
    //     console.log($(this).parent().parent().attr('class'));
    // });

    // choosing province

    $('.prov-drop').click(function(){
        provinceGlobal = $(this).text().split(':')[0];
        console.log("chosen province: "+provinceGlobal);

        // troubleshoot ispublicholiday for alberta on dec 25, 2024 (xmas)
        // console.log ("check if dec 25, 2024 is holiday in albert: " + isPublicHoliday('2024-12-25 00:00:00'));

    });


    
    listenAdd();
});


function listenAdd(){
    $('.dropdown-item').click(function(){
        var dropdown_text = $(this).text();
        // $(this).val(dropdown_text);
        console.log(dropdown_text);
        $(this).parent().parent().siblings('.dropdown_text_display').val(dropdown_text);
        console.log($(this).parent().parent().attr('class'));
    });
}

// function listenAdd(){
//     $('.dropdown-item').click(function(){
//         var dropdown_text = $(this).text();
//         // $(this).val(dropdown_text);
//         console.log(dropdown_text);
//         $(this).parent().parent().siblings('#eventName').val(dropdown_text);
//         console.log($(this).parent().parent().attr('class'));
//     });
// }


var number_of_events = 1;
function buttonAdd(){
    
    // how to create new event using same form
    number_of_events++;
    //creating unique variable to store individual event's name and dayspriorCD 
    var unique_event = "new event" + number_of_events;
    // takes everything from eventFields element into event_fields
    var event_fields = $('.eventFields');
    $('.event1').append(event_fields.html());
    
    listenAdd();
    // if (number_of_events ==2){
        // $('.event1').append("<li>new event "+number_of_events + "</li>")
        // $('.event1').append("<li>" + unique_event + "</li>")
    // }else{
    //     // $('.event1').append("<li>new event "+number_of_events + "</li>")
    //     $('.event1').append("<li>" + unique_event + "</li>")
    // }

}

function convertMonthFormat(monthNum){
    monthNum++;
    if (monthNum <10){
        return "0"+monthNum;
    }
    return monthNum;
}

function convertDateFormat(dateNum){
    if (dateNum <10){
        return "0"+dateNum;
    }
    return dateNum;

}

// TEST: return Canadian holidays
// function holidaysCAN(){
//     //var Holidays = require("date-holidays");
//     const hd = new Holidays.default('CA','ON');

//     myDate = new Date('2027-01-01 00:00:00');
//     // console.log(isPublicHoliday(myDate));
//     var dayOfWeek = myDate.getDay();
//     var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunday
//     // console.log(isWeekend);

//     // testing with businessDayPrior vs businessDayPriorNew
//     console.log("here0");
//     console.log(businessDayPriorNew(myDate));
// }

function isPublicHoliday(date){
    // const hd = "2023-01-01";
    
    //const hd = new Holidays.default('CA','ON');
    const hd = new Holidays.default('CA', provinceGlobal);
    // console.log("when we call ispublicholiday, the province is:"+provinceGlobal);
    isHoliday = hd.isHoliday(date);
    // console.log(isHoliday);
    if (isHoliday){
        if (isHoliday[0]['type'] == "public")
            return true;
    } 
    else{
        return false;
    }
}

function isWeekend(date){
    var dayOfWeek = date.getDay();
    return ((dayOfWeek === 6) || (dayOfWeek  === 0)); // 6 = Saturday, 0 = Sunday
}


//check if previous day is Sunday && Holiday
function isMondayAfterSunHoliday(date){
    var PrevDay = new Date(date.getTime());
    PrevDay.setDate(date.getDate()-1);
    console.log("ismondayaftersunholiday");
    //console.log(date.getDate()-1);
    return ((PrevDay.getDay() === 0) && (isPublicHoliday(PrevDay)));
}

//check if 2 days prior is Saturday && Holiday
function isMondayAfterSatHoliday(date){
    var dateFromTwoDaysAgo = new Date(date.getTime());
    dateFromTwoDaysAgo.setDate(date.getDate()-2);
    console.log("ismondayaftersatholiday");
    // console.log(date.getDate()-2);
    // var TwoDaysPrior = date.getDay()-2;
    // return (TwoDaysPrior === -1 && isPublicHoliday(dateFromTwoDaysAgo);
    return ((dateFromTwoDaysAgo.getDay() === 6) && (isPublicHoliday(dateFromTwoDaysAgo)));
}

//special case - check if prior weekend (Fri-Sun) contains two consecutive holidays (ie. xmas + boxing day) when Tuesday is date picked, check if both saturday and sunday are holidays(xmas + boxing); when Monday is date picked check if both friday and saturday are holidays (xmas + boxing)
function isPriorWeekendTwoHolidays(date){
    // var previousDate = date;
    //     previousDate.setDate(previousDate.getDate() - 1);
    var twoDaysPrior = new Date(date.getTime());
    twoDaysPrior.setDate(date.getDate()-2);
    //console.log(twoDaysPrior);
    //var threeDaysPrior = new Date(date.getTime());
    var threeDaysPrior = new Date(date.getTime());
    threeDaysPrior.setDate(date.getDate()-3);
    //console.log(threeDaysPrior);
    // return ((twoDaysPrior.getDay() === 0) && (threeDaysPrior.getDay() === 6));
    return (((twoDaysPrior.getDay() === 0 && isPublicHoliday(twoDaysPrior)) && (threeDaysPrior.getDay() === 6 && isPublicHoliday(threeDaysPrior)))||((twoDaysPrior.getDay() === 6 && isPublicHoliday(twoDaysPrior)) && (threeDaysPrior.getDay() === 5 && isPublicHoliday(threeDaysPrior))));
}

//old businessDayPrior; not used
function businessDayPrior(date){
    var previousDate = new Date(date.getTime());
    previousDate.setDate(date.getDate());
    while (isPublicHoliday(previousDate)||isWeekend(previousDate)){
        console.log("businessDayPrior while loop: " + previousDate);
        previousDate.setDate(previousDate.getDate() - 1);
    }
    console.log("exits businessDayPrior While loop and gives reminder date: " + previousDate);
    return (previousDate);   
}

// spits out the business day (can be current day or prior) that is not an observed holiday, a holiday, or a weekend date
function businessDayPriorNew(date){
    var previousDate = new Date(date.getTime());
    console.log("enters business dayPriorNew function");
    // what if we call businessDayPrior?
    if (isPublicHoliday(previousDate)||isWeekend(previousDate)){
        console.log("here1");
        return businessDayPrior(previousDate);    
        // previousDate.setDate(previousDate.getDate() - 1);
    }
    
    // need to check if both weekend and holiday
    // REFINE THIS; Refined
    else if (isPriorWeekendTwoHolidays(previousDate)){
        console.log("here2");
        var daybefore = previousDate;
        daybefore.setDate(previousDate.getDate()-4);
        console.log(daybefore);
        //previousDate.setDate(previousDate.getDate()-4);
        return (daybefore);
    }
    // this won't work if xmas on friday and boxing day on saturday
    else if (isMondayAfterSunHoliday(previousDate)||isMondayAfterSatHoliday(previousDate)){
        console.log("here3");
        console.log(previousDate);
        var fridayBefore = previousDate;
        fridayBefore.setDate(previousDate.getDate()-3);
        // console.log(fridayBefore);
        //previousDate.setDate(previousDate.getDate()-3);
        return (fridayBefore);
    }
    else{
        console.log("here4");
        return (date);
    }

}
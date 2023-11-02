// remember the '.' in front of the class when referencing
function buttonClick(){
    // $('.list').append("<li>Another item " + $('#daysPriorCD').val() + "</li>")
    // $('.event1').append("<p>Your event is " + $('#daysPriorCD').val() + " days before the court date.</p>");
    var court_date = new Date($('#courtDate').val());
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
        ics_date_start = new Date();
        ics_date_start.setDate(court_date.getDate() - event_days_arr[i]);
        ics_date_start.setHours(9-(ics_date_start.getTimezoneOffset()/60));
        ics_date_start.setMinutes(0);
        ics_date_start.setSeconds(0,0);

        ics_date_end = new Date();
        ics_date_end.setDate(court_date.getDate() - event_days_arr[i]);
        //ics_date_end.setHours(9);
        ics_date_end.setHours(9-(ics_date_start.getTimezoneOffset()/60))
        ics_date_end.setMinutes(30);
        ics_date_end.setSeconds(0,0);
        
        // console.log(court_date.getDate());
        // console.log(ics_event_name);
        console.log(ics_date_start);
        console.log(ics_date_end);

        var eventStart = ics_date_start.toISOString().replace(/-/g, "").replace(/:/g,"").split('.')[0];
        var eventEnd = ics_date_end.toISOString().replace(/-/g, "").replace(/:/g,"").split('.')[0];
        var eventLocation = "Online";
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        console.log(eventStart);
        console.log(eventEnd);

        icsFile += "BEGIN:VEVENT\r\n";
        icsFile += "UID:" + ics_event_name + "\r\n";
        icsFile += "DTSTAMP:" + eventStart + "\r\n";
        icsFile += "DTSTART;TZID=" + timezone + ":" + eventStart + "\r\n";
        icsFile += "DTEND;TZID=" + timezone + ":" + eventEnd + "\r\n";
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
    // listens for click
    // $('.dropdown-item').click(function(){
    //     var dropdown_text = $(this).text();
    //     // $(this).val(dropdown_text);
    //     console.log(dropdown_text);
    //     $(this).parent().parent().siblings('.eventName').val(dropdown_text);
    //     console.log($(this).parent().parent().attr('class'));
    // });
    listenAdd();
});

function listenAdd(){
    $('.dropdown-item').click(function(){
        var dropdown_text = $(this).text();
        // $(this).val(dropdown_text);
        console.log(dropdown_text);
        $(this).parent().parent().siblings('.eventName').val(dropdown_text);
        console.log($(this).parent().parent().attr('class'));
    });
}


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
console.log( 'genero sourced' );

var eventsArray = [];

$( document ).ready( function(){
  console.log( 'JQ' );

  // test get function
  var getData = function(){
    console.log( 'in getData' );
    $.ajax({
      type: 'GET',
      url: '/testGet',
      success: function( response ){
        console.log( 'back from get call:', response );
        $('#getOutput').html(response.field0);
      },
      error: function(){
        console.log( 'error with ajax call...');
      }
    });
  }; // end getData

  // test get function
  var postData = function(eventName, athleteName, award){
    console.log( 'in postData' );
    // assemble object to send
    var objectToSend={
      eventName: eventName,
      athleteName: athleteName,
      award: award
    }; // end object to send
    $.ajax({
      type: 'POST',
      url: '/testPost',
      data: objectToSend,
      success: function( response ){
        var events = response.field0;
        var newEvent = events[events.length-1];
        console.log('parsed response', newEvent);
        console.log( 'back from post call:', response );
        //push each new event into events array
        eventsArray.push(newEvent);
        //append events to DOM
        var eventsOutput = $('#eventsOutput');
        eventsOutput.addClass('row');
        eventsOutput.addClass('text-center');

        eventsOutput.append('<div class="col-sm-4"></div>');
        var $el = eventsOutput.children().last();
        $el.append('<div class="event"></div>');
        $eventDiv = $el.find('.event');

        $eventDiv.append('<p>Event Name: '+newEvent.eventName+'</p>');
        $eventDiv.append('<p>Athlete Name: '+newEvent.athleteName+'</p>');
        $eventDiv.append('<p>Award: '+newEvent.award+'</p>');

      },
      error: function(){
        console.log( 'error with ajax call...');
      }
    });
  }; // end getData

  /// - buttons to test - ///
  $( '#testGetButton' ).on( 'click', function(){
    console.log( 'in testGetButton on click' );
    getData();
  }); // end testGetButton
  $( '#testPostButton' ).on( 'click', function(){
    console.log( 'in testPostButton on click' );
    var eventName = $('#eventName').val();
    var athleteName = $('#athleteName').val();
    var award = $('#award').val();
    console.log('EventName:', eventName +' Athlete Name:', athleteName +' Award: ', award);
    postData(eventName, athleteName, award);
    $('input').val('');
  }); // end testGetButton
  $('#sortButton').on('click', function() {
    console.log('sort button clicked');
    eventsArray.sort(function(a, b){
      return a.eventName > b.eventName;
    }); // end sort eventsArray
    console.log('after sorting',eventsArray);

    $('#eventsOutput').html('');
    for (var i = 0; i < eventsArray.length; i++) {
      var eventsOutput = $('#eventsOutput');
      eventsOutput.addClass('row');
      eventsOutput.addClass('text-center');

      eventsOutput.append('<div class="col-sm-4"></div>');
      var $el = eventsOutput.children().last();
      $el.append('<div class="event"></div>');
      $eventDiv = $el.find('.event');

      $eventDiv.append('<p>Event Name: '+eventsArray[i].eventName+'</p>');
      $eventDiv.append('<p>Athlete Name: '+eventsArray[i].athleteName+'</p>');
      $eventDiv.append('<p>Award: '+eventsArray[i].award+'</p>');

    }
  }); // end sortButton

}); //end doc ready

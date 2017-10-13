$(document).ready(function(){ //variables used in this script is protected from gloable

// //hide action buttons initially | show once book's selected
// $('#actions').hide();

    //jquery UI library to make list selectable
$( "#selectable" ).selectable();

// //add button handler
// //To add selected books in an array and tempt to save to google doc via API
// $('#add').on('click', function(e){
// var selected = [];

// for(var i = 0; i < $('.liChk').length; i++){
//     if ($('#checkbox'+i).is(':checked')) {
//       selected.push($('#checkbox'+i).parent()[0].innerText);
//     }
// }

// //display selected books in console
// for( var a = 0; a < selected.length; a++){
//   console.log(selected[a]);
// }
// });//end of #add


// //clear button handler 
// $('#clear').on('click', function(){

//   console.log("clear btn clicked");
//   for(var i = 0; i < $('.liChk').length; i++)
//       $('#checkbox'+i).attr('checked', false);

//   // //display selected books in console
//   // for( var a = 0; a < selected.length; a++){
//   //   console.log(selected[a]);
//   // }

// });


  $('#form').on('submit', function(e) {
    var input = $('#inputText').val();
    $.ajax({
      type: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + input + '&maxResults=40',
      dataType: "html",
      success: function (results){
       var data = JSON.parse(results);
       if (Array.isArray(data.items)) {
        console.log(data.items);
        parseData(data);
      } else {
        console.log('single object: ');
    // console.log(data);
        }
      }
    });//end of ajax
    e.preventDefault();
  });//end of form
    


    $( document ).tooltip({
      items: "img, [data-geo], [title]",
      content: function() {
        var element = $( this );
        if ( element.is( "[data-geo]" ) ) {
          var text = element.text();
          return "<img class='map' alt='" + text +
            "' src='http://maps.google.com/maps/api/staticmap?" +
            "zoom=11&size=350x350&maptype=terrain&sensor=false&center=" +
            text + "'>";
        }
        if ( element.is( "[title]" ) ) {
          return element.attr( "title" );
        }
        if ( element.is( "img" ) ) {
          return element.attr( "alt" );
        }
      }
    }); 




  function parseData(arr) {   
      //clears out the old resultss, and change the font color
      $('#selectable').empty();
      $('#selectable').css('height', '40em');
      $('#selectable').css('overflow', 'auto');
      $('#selectable').css('color', 'white');

      

    //display data
      for( var x=0; x < arr.items.length; x++){

        
        try {
        $('#selectable').append("<li id=li" + x +">" + "<img id=img" +x
          + " src=" + arr.items[x].volumeInfo.imageLinks.thumbnail + "/>"
          + "<p id=title" + x +">" + (x+1) + ". "+ arr.items[x].volumeInfo.title + "</p>" + "<p id=author" + x +">" 
          + arr.items[x].volumeInfo.authors + "</p></li>");

        } catch (e if e instanceof TypeError) {
          // statements to handle TypeError exceptions
          console.log("image" + x + " TypeError?");            
        }
        

          //add link to the image
          $('#img'+x).wrap("<a href='" + arr.items[x].volumeInfo.previewLink +"'/>");
          // $('#test').append("<img src=" + arr.items[x].volumeInfo.imageLinks.thumbnail + "/>");
          //arr.items[x].volumeInfo.imageLinks.thumbnail
//+ "<img id=img" + x + " " + "src=" + arr.items[x].volumeInfo.imageLinks.thumbnail + "/>" 

          //add checkbox to all li tags
          // $('#li'+x).prepend("<input id=checkbox" + x +" type=" + "checkbox" + " class=" + "liChk" + " />");

          //style author names
          $('#author'+x).css('color','#f9f494');
          $('#author'+x).css('font-size','0.8em');

          //hover effect to enlarg thumbnails
          $('#img'+x).hover(function(){
            console.log("hover in");
            $(this).css("width", "150px");
          }, function(){
            console.log("hover out");
            $(this).css("width", "30px");
            }
          );//end of img hover


          // //checking checkbox status
          // $('li #checkbox'+x).on('change', function (){

          //   if ($(this).is(':checked')) {
          //     $("#actions").css({'width':($("#form").width()+'px')});
          //     $("#actions").css('margin-top','2em');
             
          //     $('#actions').show();
          //   }

          // });

      }//end of display data


  }//end of parse data


});//end of site.js

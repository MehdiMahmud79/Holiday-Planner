// var registerBtn=document.getElementById('register');

var planSubmit = $("#planSubmit");
var plansSaved = $(".plansSaved");
var cityName = $("#cityName");
var dayPlan = $("#dayPlan");
const googleAPIKey="AIzaSyBHRetLZb66zqKQV5qB7uAf94HYGIVRrLE"

$( function() {
  $('#datepicker').datepicker();
} );

$( function() {
  $( "#dialog" ).dialog();
} );


var planArray = []

var Users=[]
$("#register").on("click", registerUser)
function registerUser(event){
    event.preventDefault(); 
    var Users=[]
var userEmail=$("#userEmail").val().trim();
var userPassword=$("#userpassword").val().trim();
userEmail=encrypte(userEmail)
encrypte(userPassword)
    // console.log(encrypte(userEmail),userpassword.length );
Users.push({userEmail,userPassword})
Users.push({userEmail,userPassword})
Users.push({userEmail,userPassword})
localStorage.setItem("users",Users)
console.log(localStorage.getItem("users")[0])

//       if(i%2==0){
//     document.body.classList.add('bg-red-700');
//     document.body.classList.remove('bg-blue-700');

//     i++
//    }else{
//       console.log("even", i);

//    i++
//     document.body.classList.remove('bg-red-700');
//     document.body.classList.add('bg-blue-700');
//   }
}

function encrypte (a) {
    var a = a.split("");
  var   n= a.length;
  b=[];
    for(var i = 0; i <n; i++) {
        var ch = a[i];
        var index = 0;
        var m = ch.charCodeAt(index)+1;
        b.push(String.fromCharCode(m));
    }
   console.log(b.join("")) 	
    b=b.join(""); 
    // decrypt(b);
return b;
  }
  function decrypt (a) {
    var a = a.split("");
  var   n= a.length;
  b=[];
    for(var i = 0; i <n; i++) {
        var ch = a[i];
        var index = 0;
        var m = ch.charCodeAt(index)-1;
        b.push(String.fromCharCode(m));
    }
   console.log(b.join("")) 	
    b=b.join(""); 
return b;
  }

planSubmit.on("submit",  function(event){
  event.preventDefault();

  if ($('#datepicker').val() == ""){
      var modalBox = $("<div></div>");
      modalBox.dialog(
      {
        modal: true,
        title: "Error!",
        open: function() {
          var markup = 'Please enter a Date';
          $(this).html(markup);
        },
        buttons: {
          Ok: function () {
              $(this).dialog("close");
          }
        }
      }
    )

  
    return;
  } else if(cityName.val() == ""){
    // var modalBox = $("<div></div>");
    //   modalBox.dialog(
    //   {
    //     modal: true,
    //     title: "Error!",
    //     open: function() {
    //       var markup = 'Please enter a City';
    //       $(this).html(markup);
    //     },
    //     buttons: {
    //       Ok: function () {
    //           $(this).dialog("close");
    //       }
    //     }
    //   }
    // )

  }

  var planDiv = $('<div>');
  planDiv.addClass($('#datepicker').val() + "bg-blue-800 m-6 text-center rounded border"); 

  var dateLabel = $("<div>");
  dateLabel.addClass("dateLabel bg-blue-600 text-xl m-2 text-center rounded border");
  dateLabel.text("Date of Visit: ")
  planDiv.append(dateLabel);

  var date = $('<div>');
  date.addClass("date bg-blue-200 rounded text-center m-3 border");
  date.text($('#datepicker').val());
  planDiv.append(date);

  var cityLabel = $("<div>");
  cityLabel.addClass("cityLabel bg-blue-600 m-2 text-center rounded border")
  cityLabel.text("City Visiting: ")
  planDiv.append(cityLabel);


  var city = $('<div>');
  city.addClass('city bg-blue-200 rounded m-3 text-center border');
  // var nameCity = cityName.val();
  // console.log(nameCity);
  city.text(cityName.val());
  planDiv.append(city);

  

  var planLabel = $("<div>");
  planLabel.addClass("planLabel bg-blue-600 text-center m-2 rounded border")
  planLabel.text("Plan: ")
  planDiv.append(planLabel);

  var plan = $("<div>");
  plan.addClass("plan bg-blue-200 rounded text-center m-3 border");
  plan.text(dayPlan.val());
  planDiv.append(plan);


  plansSaved
  plansSaved.append(planDiv);

  
  cityName.text("");
  dayPlan.text("");
  $('#datepicker').text("");



});

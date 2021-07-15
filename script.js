// var registerBtn=document.getElementById('register');
var planSubmit = $("#planSubmit");
var plansSaved = $(".plansSaved");
var cityName = $("#cityName");
var dayPlan = $("#dayPlan");

$( function() {
  $('#datepicker').datepicker();
} );





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

  var planDiv = $('<div>');
  planDiv.addClass($('#datepicker').val());

  var city = $('<div>');
  city.addClass('city');
  // var nameCity = cityName.val();
  // console.log(nameCity);
  city.text(cityName.val());
  planDiv.append(city);

  var cityLabel = $("<div>");
  cityLabel.addClass("cityLabel")


  var date = $('<div>');
  date.addClass("date");
  date.text($('#datepicker').val());
  planDiv.append(date);

  var plan = $("<div>");
  plan.addClass("plan");
  plan.text(dayPlan.val());
  planDiv.append(plan);

  plansSaved
  plansSaved.append(planDiv);

  
  cityName.text("");
  dayPlan.text("");
  $('#datepicker').text("");



});

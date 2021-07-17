// var registerBtn=document.getElementById('register');
// users{
//   user:{
  // userEmail:
//    userPassword: 1234 , 
//   userPlans: [
//   {
//   cityName:  london   ,
//   cityLon: 1234 ,
//   cityLan:  34232 ,
//   planeDate; 3/5/2021  ,
//   planDescription:  ewrwrwqr   ,
//   Temp:    ,
//   Icon:    ,
//   weatherDescription:
//   },
//   …
//   ]
//        }


function getWeather(nameOfCity){
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&units=metric&appid=${WeatherAPIKey}`

  fetch(requestUrl)
  .then(function (response) {
    return response.json(); //converts response to object
  })
  .then(function (data){
    console.log(data);

    plan= new object();

    plan.cityName=cityName;
    plan.cityTemp=data.main.temp;
    plan.cityWeather=data.weather[0].description;
    plan.cityLon = data.coord.lon;
    plan.cityLat =  data.coord.lat;
    plan.weatheIcon = `./icons/${data.weather[0].icon}.png`;

    return plan;

  }).then{


    
  };


}



 
function setPlans(index){

userPlans= getfromLocal();

  $(".allplansContainer").empty();
  planDiv= $("<div>")
  weatherDiv= $("<div>")


    planDiv.append(`<p class="plans "> ${userPlans[index]}.["cityName"]</p>`);
    planDiv.append(`<p class="plans "> ${userPlans[index]}.["planDate"]</p>`);
    planDiv.append(`<p class="plans ">${userPlans[index]}.["planDesc"]</p>`);
 
    weatherDiv.append(`<im class="plans "> ${userPlans[index]}.["icon"]`);
    weatherDiv.append(`<p class="plans "> ${userPlans[index]}.["temp"]</p>`);
    weatherDiv.append(`<p class="plans "> ${userPlans[index]}.["weatherDesc"]</p>`);

  $(".allplansContainer").append(planDiv);
  $(".allplansContainer").append(weatherDiv);



};


// var users = [
//   { 
//   userEmail: 'KevinRyner',
//   userPassword: '1234',
//   userPlans: [
//       {
//        cityName: null,
//        cityLon: null,
//        cityLat: null, 
//         planDate: null,
//         planDesc: null,
//         temp: null,
//         icon: null,
//         weatherDesc: null,
//       }, 

//     ]
// }, 
// ];


var planSubmit = $("#planSubmit");
var plansSaved = $(".plansSaved");
var cityName = $("#cityName");
var dayPlan = $("#dayPlan");
var  user={};
var userEmail;
var index=0;
var userPassword;

const googleAPIKey="AIzaSyBHRetLZb66zqKQV5qB7uAf94HYGIVRrLE"

var WeatherAPIKey = "3e317835aa99c5522639a26e16f09c51";

var LOCAL_STORAGE_KEY = "savedUsers";
 
var users=getPreviousUsers();
  
function getPreviousUsers() {
   savedPlans = localStorage.getItem(LOCAL_STORAGE_KEY);
console.log("local Data", savedPlans)
  if (savedPlans) {
    $("#register").text("Login")
     $("#LoginForm").removeClass("hidden"); 
  
//  we have to hide everything here
    return JSON.parse(savedPlans);

  } else {
    $("#LoginForm h1").text("SignUp")
    $("#register").text("SignUp")
    $("#LoginForm").removeClass("hidden"); 
//  we have to hide everything here
return [];
  }
}





$( function() {
  $('#datepicker').datepicker();
} );

$( function() {
  $( "#dialog" ).dialog();
} );


var plans = []
$("#loginBtn").on("click", loadLogin)

$("#register").on("click", registerUser)
$("#addPlan").on("click", addPlan)


function loadLogin(event){
    event.preventDefault(); 
$("#LoginForm").removeClass("hidden"); 

}

// Register  a new user or login an existing user
function registerUser(event){
  event.preventDefault(); 
 user={};
user.userPlans=[];
console.log("register user")

 userEmail=$("#userEmail").val().trim();

 userPassword=$("#userPassword").val().trim();

$("#register").text("SignUp")

for(var i in users){
  console.log("i", i)
if (userEmail===users[i].userEmail){

  user.userPlans=users[i].userPlans;
$("#register").text("Login")
}

}
// user.userEmail=encrypte(userEmail)
// user.userPassword=encrypte(userPassword)
user.userEmail=userEmail;
user.userPassword=userPassword;


$("#LoginForm").addClass("hidden"); 
$("#userName").text(`${userEmail} plans: `)
}

// save plans to the local storage
function setPreviousUsers() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));

}

// Add a plan to the page
function addPlan(event){
  event.preventDefault(); 
  console.log("adding a plan and save it locally")
// var user={};
 user.userPlans=[];

user.userEmail=userEmail;
user.userPassword=userPassword;

//  get weathe rinformation
getWeather(cityName);


setPlans(index)
index++;
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

  var nameOfCity = cityName.val();

  var planDiv = $('<div>');
  planDiv.addClass($('#datepicker').val() + "bg-blue-800 m-6 text-center rounded border");


  getWeather(nameOfCity, planDiv);

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
  city.text(nameOfCity);
  planDiv.append(city);

  

  var planLabel = $("<div>");
  planLabel.addClass("planLabel bg-blue-600 text-center m-2 rounded border")
  planLabel.text("Plan: ")
  planDiv.append(planLabel);

  var plan = $("<div>");
  plan.addClass("plan bg-blue-200 rounded text-center m-3 border");
  plan.text(dayPlan.val());
  planDiv.append(plan);

  
  plansSaved.append(planDiv);


  users[0].userPlans.push({
    cityName: nameOfCity,
    cityLon: null,
    cityLat: null, 
    planDate: null,
    planDesc: null,
    temp: null,
    icon: null,
    weatherDesc: null,
  })
  
  cityName.text("");
  dayPlan.text("");
  $('#datepicker').text("");



});

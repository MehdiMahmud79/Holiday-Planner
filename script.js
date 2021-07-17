var planSubmit = $("#planSubmit");
var plansSaved = $(".plansSaved");
var cityName;
var dayPlan = $("#dayPlan");
var  user={};
var userEmail;
var index=0;
var userPassword;

const googleAPIKey="AIzaSyBHRetLZb66zqKQV5qB7uAf94HYGIVRrLE"

const apiKey="65b50ac0fd144e1fbd69be8c79bf2491"

var weather = {};
weather.temperature = {
  unit : "celsius", 
  temp : 0
}
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
  console.log("adding a plan and save it locally");

  weather = {};
  weather.temperature = {
    unit : "celsius", 
    temp : 0
}
cityName = $("#cityName").val();
// var user={};
 user.userPlans=[];

user.userEmail=userEmail;
user.userPassword=userPassword;

//  get weathe rinformation
getWeather(cityName);


// setPlans(index)
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

  }else{

    getWeather(cityName)
  }


 
  
});

function getWeather(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  console.log("city api", apiUrl)
  fetch(apiUrl)
      .then(function(response){
          let data = response.json();
          return data;
      })
      .then(function(data){
          weather.temperature.temp = Math.floor(data.main.temp);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          // weather.windSpeed = data.wind.speed;
          weather.city=data.name;
          // weather.humidity = data.main.humidity
          weather.country = data.sys.country;
          weather.lat=data.coord.lat 
          weather.lon=data.coord.lon
    
      })
      
      .then(function(){
        displayWeather();
        $(".city-weather.hide").removeClass("hide");

      })
    
              // Render an error message if the city isn't found
              .catch((error) => {
                $("header .notification h2").text("City Not Found !");

              });
          
};
function displayWeather(){
    $(".todayHeading .description").text(`${weather.description}`);
    $(".todayTime span").text(`  ${weather.city} `);
    $(".weatherIcon").attr("src", `./icons/${weather.iconId}.png`);
    $(".todayHeading .Temprature span").text(`°${weather.temperature.temp}C`);
}
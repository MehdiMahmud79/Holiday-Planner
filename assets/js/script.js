
var planSubmit = $("#planSubmit");
var plansSaved = $(".plansSaved");
var cityName;
var cityDate;
var cityPlan;
var dayPlan = $("#dayPlan");
var user = {};
var userEmail;
var index = 0;
var userPassword;
var markers=[];
var cityList=[];
var unserIndex=0;
var userIndex;
var users={}

var userObj = {}
userObj.userCities=[];
var userPlans={};


var SignUpLoginSwitch = $("#SignUpLoginSwitch");
var planContainer = $(".planContainer");



const googleAPIKey = "AIzaSyBHRetLZb66zqKQV5qB7uAf94HYGIVRrLE";

const apiKey = "65b50ac0fd144e1fbd69be8c79bf2491";

var weather = {};
weather.temperature = {
  unit: "celsius",
  temp: 0,
};
weather.lat = 52.489471;
weather.lng = -1.898575;

var LOCAL_STORAGE_KEY = "savedUsers";

// save plans to the local storage
function setPreviousUsers() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
}

function getPreviousUsers() {
  savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  console.log("local Data", savedUsers);

  if (savedUsers) {

    return JSON.parse(savedUsers);
  } else {
       return [];
  }
}

function createModal(message){
  var modalBox = $("<div></div>");
  modalBox.dialog({
    modal: true,
    title: "Error!",
    open: function () {
      var markup = message;
      $(this).html(markup);
    },
    buttons: {
      Ok: function () {
        $(this).dialog("close");

      }
    }
  })
}


($("#menuLoginBtn").on("click",function(){

  $(".LoginContainer").removeClass("hidden");
  $(".addPlan").addClass("hidden");
  $(".GoogleMap").addClass("hidden");

}))

$("#Sign_Up_Button").on("click", function(){
  // event.preventDefault();

  $("#Sign_Up_Button").removeClass("bg-gray-500 hover:bg-gray-400 ");
  $("#Log_In_Button").removeClass("bg-green-500 hover:bg-green-400 ");
  $("#Sign_Up_Button").addClass("bg-green-500 hover:bg-green-400");
  $("#Log_In_Button").addClass("bg-gray-500 hover:bg-gray-400");
  $(".logInForm").addClass("hidden");
  $(".signUpForm").removeClass("hidden");
  // userObj.userEmail = $("#userEmailSignUp").val().trim();
  // userObj.userPassword = $("#userPasswordSignUp").val();

});

$("#Log_In_Button").on("click", function(){
  $("#Log_In_Button").removeClass("bg-gray-500 hover:bg-gray-400");
  $("#Sign_Up_Button").removeClass("bg-green-500 hover:bg-green-400");    
  $("#Log_In_Button").addClass("bg-green-500 hover:bg-green-400");
  $("#Sign_Up_Button").addClass("bg-gray-500 hover:bg-gray-400");  
  $(".signUpForm").addClass("hidden");
  $(".logInForm").removeClass("hidden");
  // userObj.userEmail = $("#userEmailLogIn").val().trim();
  // userObj.userPassword = $("#userPasswordLogIn").val();
});

$("#signUpBtn").on("click", function(event){
  event.preventDefault();
  users = getPreviousUsers();
console.log(users)

    userObj.userName = $("#userName").val().trim();

    var repeatedPassword = $("#userPasswordRepeat").val();
    userObj.userEmail = $("#userEmailSignUp").val().trim();

    userObj.userPassword = $("#userPasswordSignUp").val();
    userObj.userCities=[];
 
    if (userObj.userName =="" ){
      createModal("inpur the User Name and try again !");
      return;
    }

    if (userObj.userEmail == "" ){
      createModal("input your E-mail and try again!");
      return;
    }

    if (userObj.userPassword !=repeatedPassword ){
      createModal("passwords dont match!");
      return;
    }
    
    if (userObj.userPassword =="" || repeatedPassword ===""){
      createModal("input the password and try again !");
      return;
    }
  test=false;

    if(users){
      for (var i in users) {
        console.log("i", i);
        if (userObj.userEmail === users[i].userEmail) {
            console.log(" The user exists");
            test=true;
            }
        }

        if(test){
      createModal("the user Email already registered. Please Log in or try a different Email!");
          return
        }
        else{
          // register the current user
          users.push(userObj);
          userIndex=users.length-1;
          setPreviousUsers()
          console.log("registered user is", userObj)
          $(".LoginContainer").addClass("hidden");
          $(".addPlan").removeClass("hidden");
         

        }
      }
    
} )

$("#logInBtn").on("click", function(event){
    event.preventDefault();
    users = getPreviousUsers();

    userObj.userEmail= $("#userEmailLogIn").val().trim();

    userObj.userPassword = $("#userPasswordLogIn").val();
 

    if (userObj.userEmail == "" ){
      createModal("input your ermail to Log In and try again!");
      return;
    }

    if (userObj.userPassword =="" ){
      createModal("inpur the password and try again !");
      return;
    } 
    

  test=false;
    if(users){
      for (var i=0;i<users.length;i++) {
        if (userObj.userEmail === users[i].userEmail) {

            console.log(" The user exists");
            test=true;
            unserIndex=i;
        }
      }
             console.log("user index is", unserIndex);
     
        if(test){

          if(userObj.userPassword == users[unserIndex].userPassword){
            
            userObj.userCities=users[unserIndex].userCities;
            userObj.userName=users[unserIndex].userName;

            $(".LoginContainer").addClass("hidden");
            $(".addPlan").removeClass("hidden");
            $("#userNameHeader").text(userObj.userName)
            $(".userHeader").removeClass("hidden");
            $(".userHeader").addClass("flex");
            
            for (var k=0;k<userObj.userCities;k++){
              getWeather(userObj.userCities[k].cityName);
            }

            return;
          } else{
            createModal("your email/Password is wrong. Please try again!");
            return;
          };
        }
        else{
          
      createModal("the user Email is not registered. Please Try again or Signup!");
          
        }
      }
    }
    )






$(function () {
  $("#datepicker").datepicker({ dateFormat: "dd-mm-yy" });
});

$(function () {
  $("#dialog").dialog();
});

var plans = [];

$("#loginBtn").on("click", loadLogin);

$("#register").on("click", loginSingnUp);

function loadLogin(event) {
  event.preventDefault();
  $("#LoginForm").removeClass("hidden");
}

// Register  a new user or login an existing user
function loginSingnUp(event) {
  event.preventDefault();
  user = {};
  user.userPlans = [];
  console.log("register user");



  userObj.userName = $("#userName").val().trim();
  userObj.userEmail = $("#userEmail").val().trim();
  userObj.userPassword = $("#userPassword").val().trim();
  

  $("#register").text("SignUp");

if(users){
    for (var i in users) {
      console.log("i", i);
      if (userObj.userEmail === users[i].userEmail && userObj.userPassword === users[i].userPassword) {
          console.log(" The user exists")
          userIndex=i;
          loadPlans(userIndex);
          }
          else{
            var modalBox = $("<div></div>");
            modalBox.dialog({
              modal: true,
              title: "Error!",
              open: function () {
                var markup = "User name/ Password incorrect!";
                $(this).html(markup);
              },
              buttons: {
                Ok: function () {
                  $(this).dialog("close");
                },
              },
            });     
            return;
          }
        user.userPlans = users[i].userPlans;
        $("#register").text("Login");
      }
    }
  
  // user.userEmail=encrypte(userEmail)
  // user.userPassword=encrypte(userPassword)
  user.userEmail = userEmail;
  user.userPassword = userPassword;

  $("#LoginForm").addClass("hidden");
  $("#userName").text(`${userEmail} plans: `);
}



function encrypte(a) {
  var a = a.split("");
  var n = a.length;
  b = [];
  for (var i = 0; i < n; i++) {
    var ch = a[i];
    var index = 0;
    var m = ch.charCodeAt(index) + 1;
    b.push(String.fromCharCode(m));
  }
  console.log(b.join(""));
  b = b.join("");
  // decrypt(b);
  return b;
}
function decrypt(a) {
  var a = a.split("");
  var n = a.length;
  b = [];
  for (var i = 0; i < n; i++) {
    var ch = a[i];
    var index = 0;
    var m = ch.charCodeAt(index) - 1;
    b.push(String.fromCharCode(m));
  }
  console.log(b.join(""));
  b = b.join("");
  return b;
}

// planSubmit.on("submit",  function(event){
//   event.preventDefault();
// );

function getWeather(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  console.log("city api", apiUrl);
  fetch(apiUrl)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.temp = Math.floor(data.main.temp);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      // weather.windSpeed = data.wind.speed;
      weather.city = data.name;
      // weather.humidity = data.main.humidity
      weather.country = data.sys.country;
      weather.lat = data.coord.lat;
      weather.lng = data.coord.lon;
    })

    .then(function () {
      creatPlanList();
      // findPlaces(-weather.lat, weather.lng );
      
      initMap()
      $("#GoogleMap").removeClass("hidden")
    })

    // Render an error message if the city isn't found
    .catch((error) => {
      $("header .notification h2").text("City Not Found !");
    });
}


// var userCities=users[index].userCities;
function addPlan(event) {
  event.preventDefault();
  weather = {};
  weather.temperature = {
    unit: "celsius",
    temp: 0,
  };
  cityName = $("#cityName").val();
  cityDate = $("#datepicker").val();
  cityPlan = $("#cityPlan").val();

  if (cityName == "") {
    createModal("Please input the city Name!");
    return;
  }
    if (cityDate == "") {
    createModal("Please input the date!");
    return;
  }
      if (cityPlan == "") {
    createModal("Please input the day plan!");
    return;
  }

  userPlans.cityName=cityName;
  userPlans.cityDate=cityDate;
  userPlans.cityPlan=cityPlan;
  userObj.userCities.push(userPlans)

  users[unserIndex].userCities=userObj.userCities;
  setPreviousUsers()
  getWeather(cityName);

  index++;
  cityList.push(cityName);
}

$("#planSubmit").on("submit", addPlan);


function creatPlanList() {
  var w40 = $(`<div class="block w-40">`);
  var w20 = $(`<div class="w-20">`);

  var wfull = $(`<div class="flex flex-row w-full"> `);
  var mainCont = $(`<div class="flex shadow-sm rounded-l p-3 bg-gray-300">`);
  var submittedPlan = $(`<div id="submittedPlan" class=" block" >`);
  var mb2 = $(`<div id="${index}" class="  main-container flex  mb-2">`);

  w40.append(
    `<h2 class="todayDate"><i class="fa fa-calendar m-2" aria-hidden="true"></i><span class="m-2">${cityDate} </span></h2>`
  );
  w40.append(
    `<h2 class="cityName uppercase m-2 text-2xl"><i class="fa fa-map-marker local" aria-hidden="true"></i><span class="uppercase text-red-900">${weather.city}</span></h2>`
  );
  w40.append(
    `<p class="Temprature m-2 text-2xl"><span class="relative text-lg text-blue-800 -top-2">°${weather.temperature.temp}C</span> </p>`
  );

  w20.append(
    `<img class="weatherIcon " src= "./icons/${weather.iconId}.png" alt="weather image desc.">`
  );
  w20.append(
    `<h3 class="description text-xl text-gray-700 pt-3">${weather.description}</h3>`
  );

  wfull.append(
    `<textarea disabled id="cityPlann" name="text" id="dayPlan" class=" bg-white mx-auto p-3 mr-3 resize-none w-full">${cityPlan}</textarea>`
  );
  // wfull.append(`<button id="removePlan" class="bg-red-200 hover:bg-red-400 text-white text-2xl  p-2  rounded-r "><i class="fa fa-remove" style="font-size:48px;color:red"></i></button>`);

  wfull.append(
    `<i class="delete-plan-btn fa fa-remove relative -pl-10 text-red-100 hover:text-red-400 cursor-pointer" ></i>`
  );

  mainCont.append(w40);
  mainCont.append(w20);

  submittedPlan.append(mainCont);

  mb2.append(submittedPlan);
  mb2.append(wfull);

  planContainer.append(mb2);
  planContainer.removeClass("hidden");
  $(".delete-plan-btn").on("click", handleRemoveItem);
}

function handleRemoveItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  console.log(btnClicked, btnClicked.parent());

  // get the parent `<li>` element from the button we pressed and remove it

  var k=parseInt(btnClicked.parent().parent().attr("id"));
  console.log("k",k)

  for (var i=0;i<cityList.length;i++){

    if(cityList[i]===k){
      cityList.splice(i,1);
    }
  }
   console.log("cityList", cityList);

   btnClicked.parent().parent().remove(); 
   var usercities=userObj.userCities;
   for (var j=0;j<usercities.length;j++){
     
   }
}


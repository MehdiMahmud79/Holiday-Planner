const googleAPIKey = "AIzaSyBHRetLZb66zqKQV5qB7uAf94HYGIVRrLE";
const apiKey = "65b50ac0fd144e1fbd69be8c79bf2491";

var planSubmit = $("#planSubmit");
var plansSaved = $(".plansSaved");
var dayPlan = $("#dayPlan");
var SignUpLoginSwitch = $("#SignUpLoginSwitch");
var planContainer = $(".planContainer");

var LOCAL_STORAGE_KEY = "savedUsers";

var cityName;
var cityDate;
var cityPlan;
var user = {};
var userEmail;
var index = 0;

var markers=[]; // city markers for the goole map
var cityList=[];

var userIndex=0; //index for the logged in user from the local storage svaed users
var users={}

var userObj = {}
userObj.userCities=[];

var weather = {};
weather.temperature = {
  unit: "celsius",
  temp: 0,
};
weather.lat = 52.489471;
weather.lng = -1.898575;

getPreviousUsers()
//  Load previous users from the Local Storage
function getPreviousUsers() {
  
    users=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    console.log("local Data saved users ", users);

    if (users) {
          // var saveduser=[];

          for(var i=0;i<users.length;i++){

            users[i].userName=decrypt(users[i].userName);
            users[i].userPassword=decrypt(users[i].userPassword);
            users[i].userEmail=decrypt(users[i].userEmail);          
      
          }
          return users;
        } else {
            return [];
    }

}

// save plans and users to the local storage
function setPreviousUsers() {

    for(var i=0;i<users.length;i++){
          users[i].userName=encrypt(users[i].userName);
          users[i].userPassword=encrypt(users[i].userPassword);
          users[i].userEmail=encrypt(users[i].userEmail);  
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));

}

//  a functio to creat a modal error message
$(function () {
  $("#dialog").dialog();
});

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


//  add eventlistner to the login and logout buttons
$("#logOutBtn").on("click",function(){
  login();
  Sign_Up_Button();
})
$("#menuLoginBtn").on("click",login)

function login(){

    $(".LoginContainer").removeClass("hidden");
    $(".addPlan").addClass("hidden");
    $(".GoogleMap").addClass("hidden");
    $(".planContainer").addClass("hidden");
    $("#GoogleMap").addClass("hidden");
    $(".userHeader").addClass("hidden");
    $(".userHeader").removeClass("flex");
      $(".logInForm").removeClass("hidden");

}

// eventListner to the signup button in the LoginContainer  

$("#Sign_Up_Button").on("click", Sign_Up_Button);

 function Sign_Up_Button(){

      $("#Sign_Up_Button").removeClass("bg-gray-500 hover:bg-gray-400 ");
      $("#Log_In_Button").removeClass("bg-green-500 hover:bg-green-400 ");
      $("#Sign_Up_Button").addClass("bg-green-500 hover:bg-green-400");
      $("#Log_In_Button").addClass("bg-gray-500 hover:bg-gray-400");
      $(".logInForm").addClass("hidden");
      $(".signUpForm").removeClass("hidden");

};

// eventListner to the log in button in the LoginContainer 

$("#Log_In_Button").on("click", function(){
      $("#Log_In_Button").removeClass("bg-gray-500 hover:bg-gray-400");
      $("#Sign_Up_Button").removeClass("bg-green-500 hover:bg-green-400");    
      $("#Log_In_Button").addClass("bg-green-500 hover:bg-green-400");
      $("#Sign_Up_Button").addClass("bg-gray-500 hover:bg-gray-400");  
      $(".signUpForm").addClass("hidden");
      $(".logInForm").removeClass("hidden");

});


// eventListner to the SignUp button which is Get Started button in the Signup form

$("#signUpBtn").on("click", function(event){
    event.preventDefault();

    users = getPreviousUsers();
    userObj = {}
    userObj.userCities=[];

    userObj.userName = $("#userName").val().trim();
    userObj.userPassword = $("#userPasswordSignUp").val();
    userObj.userCities=[];
    var repeatedPassword = $("#userPasswordRepeat").val();

    userObj.userEmail = $("#userEmailSignUp").val().trim();
    if (userObj.userEmail == "" ){
      createModal("input your E-mail and try again!");
      return;
    }
    test=false;

    if(users){
      for (var i=0;i<users.length;i++) {

          if (userObj.userEmail === users[i].userEmail) {
              userIndex=i;
              console.log(" The user exists");
              test=true;
          }
        }

        if(test){
                createModal("the user Email already registered. Please Log in or try a different Email!");
                return
        }
        else{
          // register the input user detail
            if (userObj.userName =="" ){
              createModal("inpur the User Name and try again !");
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

          users.push(userObj);
          // userIndex=users.length;
          setPreviousUsers()
          getPreviousUsers();
          console.log("registered user is", users)

          $(".LoginContainer").addClass("hidden");
          $(".addPlan").removeClass("hidden");
          $("#userNameHeader").text(userObj.userName)
          $(".userHeader").removeClass("hidden");
          $(".userHeader").addClass("flex");

          // $("#Log_In_Button").removeClass("bg-gray-500 hover:bg-gray-400");
          // $("#Sign_Up_Button").removeClass("bg-green-500 hover:bg-green-400");    
          // $("#Log_In_Button").addClass("bg-green-500 hover:bg-green-400");
          // $("#Sign_Up_Button").addClass("bg-gray-500 hover:bg-gray-400");  
          $(".signUpForm").addClass("hidden");
          $(".logInForm").addClass("hidden");
         

        }
      }
} )

// eventListner to the login button which is Get Started button in the login form

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
            userIndex=i;
          }
      }
     
        if(test){

          if(userObj.userPassword == users[userIndex].userPassword){
            
            console.log(" The user exists with the same email and password");
            
            userObj.userCities=users[userIndex].userCities;
            userObj.userName=users[userIndex].userName;

            $(".LoginContainer").addClass("hidden");
            $(".addPlan").removeClass("hidden");
            $("#userNameHeader").text(userObj.userName)
            $(".userHeader").removeClass("hidden");
            $(".planContainer").removeClass("hidden");
            $(".userHeader").addClass("flex");

            // $("#Log_In_Button").removeClass("bg-gray-500 hover:bg-gray-400");
            // $("#Sign_Up_Button").removeClass("bg-green-500 hover:bg-green-400");    
            // $("#Log_In_Button").addClass("bg-green-500 hover:bg-green-400");
            // $("#Sign_Up_Button").addClass("bg-gray-500 hover:bg-gray-400");  
            $(".signUpForm").addClass("hidden");
            $(".logInForm").addClass("hidden");

               console.log("before for");
           
            for (var k=0;k<users[userIndex].userCities.length;k++){
              console.log("loading and creating user plans for the existing user");

              console.log("the city name is ", users[userIndex].userCities[k].cityName)
              getWeather(users[userIndex].userCities[k].cityName);
            }


          } else{
            createModal("your email-Password is wrong. Please try again!");
            return;
          };
        } else{
           createModal("the user Email is not registered. Please Try again or Signup!");
        }
      }
    }
    )

// get date from datepicker
$(function () {
  $("#datepicker").datepicker({ dateFormat: "dd-mm-yy" });
});




// $("#loginBtn").on("click", loadLogin);

// // $("#register").on("click", loginSingnUp);

// function loadLogin(event) {
//   event.preventDefault();
//   $("#LoginForm").removeClass("hidden");
// }

// a function to encrypt our data before saving them into the local storage
function encrypt(a) {
  var a = a.split("");
  var n = a.length;
  b = [];
  for (var i = 0; i < n; i++) {
    var ch = a[i];
    var m = ch.charCodeAt() + 1;
    b.push(String.fromCharCode(m));
  }
  b = b.join("");
  // decrypt(b);
  return b;
}

// a function to decrypt our data before loading them from the local storage

function decrypt(a) {
  var a = a.split("");
  var n = a.length;
  b = [];
  for (var i = 0; i < n; i++) {
    var ch = a[i];
    var m = ch.charCodeAt() - 1;
    b.push(String.fromCharCode(m));
  }
  b = b.join("");
  return b;
}


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

// a function to creat the city plans for a current user
function addPlan(event) {
          event.preventDefault();
          // userObj = {}
          // userObj.userCities=[];
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

          var userPlans={};
          userPlans.cityName=cityName;
          userPlans.cityDate=cityDate;
          userPlans.cityPlan=cityPlan;
          console.log("userIndex is", userIndex, users[userIndex].userCities);
          
          users[userIndex].userCities.push(userPlans)
          console.log("userIndex is", userIndex, users[userIndex].userCities);

          // users[userIndex].userCities.push(userObj.userCities);

          setPreviousUsers();
          getPreviousUsers();

          getWeather(cityName);

          index++;
          cityList.push(cityName);
}

$("#planSubmit").on("submit", addPlan);
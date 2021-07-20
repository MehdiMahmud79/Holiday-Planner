
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


// function getWeather(nameOfCity, planDiv){
//   var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&units=metric&appid=${WeatherAPIKey}`

//   fetch(requestUrl)
//   .then(function (response) {
//     return response.json(); //converts response to object
//   })
//   .then(function (data){
//     console.log(data);

//     var cityLon = data.coord.lon;
//     var cityLat = data.coord.lat;

//     var weatherNow = document.createElement("div"); //creates a new card
    
//     //creates multuple line break objects for spacing
//     var [lb2, lb3, lb5] = [document.createElement("br"), document.createElement("br"), document.createElement("br"), document.createElement("br")];


//     //creates an img element and updates the src as the weather icon URL, before appending to card
//     var weatherNowIconCont = document.createElement("img");
//     weatherNowIconCont.setAttribute("class", "Icon city bg-blue-200 rounded m-3 text-center border");
//     var Icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//     weatherNowIconCont.setAttribute("src", Icon);
//     weatherNow.appendChild(weatherNowIconCont);

//     weatherNow.appendChild(lb2);

//     //creates div to hold forecast tenperature, updates then appends to card
//     var weatherNowTemp = document.createElement("div");
//     weatherNowTemp.setAttribute("class", "Temp city bg-blue-200 rounded m-3 text-center border ");
//     weatherNowTemp.textContent = `Temperature: ${data.main.temp}°C`;
//     weatherNow.appendChild(weatherNowTemp);

//     weatherNow.appendChild(lb3);
    
//     //crates element to hold humidity, updates content then appends to card
//     var weatherNowDesc = document.createElement("div");
//     weatherNowDesc.setAttribute("class", " WeatherDesc city bg-blue-200 rounded m-3 text-center border");
//     weatherNowDesc.textContent = `${data.weather[0].description}`;
//     weatherNow.appendChild(weatherNowDesc);

//     weatherNow.appendChild(lb5);

//     weatherNow.setAttribute("class", "flex-col items-center bg-blue-300 border rounded cityDiv");
//     planDiv.append(weatherNow);
  
//     return {weatherNow, ;

//   });


// }



  
var users = [{ 
  user: 'KevinRyner',
  userPassword: '1234',
  userPlans: [
      {
       cityName: null,
       cityLon: null,
       cityLat: null, 
        planDate: null,
        planDesc: null,
        temp: null,
        icon: null,
        weatherDesc: null,
      }
    ]
}];



var planSubmit = $("#planSubmit");
var plansSaved = $(".plansSaved");
var cityName;
var cityDate;
var cityPlan;
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


  var nameOfCity = cityName.val();
  var dateOfPlan = $('#datepicker').val();
  var planOnDay = dayPlan.val();


  // var planDiv = $('<div>');
  // planDiv.addClass(dateOfPlan+ "bg-blue-800 m-6 text-center rounded border");


  // getWeather(nameOfCity, planDiv);

  // var dateLabel = $("<div>");
  // dateLabel.addClass("dateLabel bg-blue-600 text-xl m-2 text-center rounded border");
  // dateLabel.text("Date of Visit: ")
  // planDiv.append(dateLabel);

  // var date = $('<div>');
  // date.addClass("date bg-blue-200 rounded text-center m-3 border");
  // date.text(dateOfPlan);
  // planDiv.append(date);

  // var cityLabel = $("<div>");
  // cityLabel.addClass("cityLabel bg-blue-600 m-2 text-center rounded border")
  // cityLabel.text("City Visiting: ")
  // planDiv.append(cityLabel);


  // var city = $('<div>');
  // city.addClass('city bg-blue-200 rounded m-3 text-center border');
  // // var nameCity = cityName.val();
  // // console.log(nameCity);
  // city.text(nameOfCity);
  // planDiv.append(city);

  

  // var planLabel = $("<div>");
  // planLabel.addClass("planLabel bg-blue-600 text-center m-2 rounded border")
  // planLabel.text("Plan: ")
  // planDiv.append(planLabel);

  // var plan = $("<div>");
  // plan.addClass("plan bg-blue-200 rounded flex text-center m-3 border");
  // plan.text(planOnDay);
  // planDiv.append(plan);


 
 
});

  plansSaved.append(planDiv);


  users[0].userPlans.push({
    cityName: nameOfCity,
    cityLon: null,
    cityLat: null, 
    planDate: dateOfPlan,
    planDesc: planOnDay,
    temp: null,
    icon: null,
    weatherDesc: null,
  })
  
  JSON.stringify( users[0].userPlans);
  localStorage.setItem("user[0]Plans", users[0].userPlans);



  cityName.text("");
  dayPlan.text("");
  $('#datepicker').text("");



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
        creatPlanList();
        console.log(" im here")
        $(".cityName span").text(`${weather.city} `);
        $(".weatherIcon").attr("src", `./icons/${weather.iconId}.png`);
        $(".description").text(`${weather.description}`);
        $(".Temprature span").text(`°${weather.temperature.temp}C`);
        $(".todayDate span").text(cityDate);
        $("#cityPlann").text(cityPlan);
        

      })
    
              // Render an error message if the city isn't found
              .catch((error) => {
                $("header .notification h2").text("City Not Found !");

              });
          
};




// Add a plan to the page
// function addPlan(event){
//   event.preventDefault(); 
//   console.log("adding a plan and save it locally");

//   weather = {};
//   weather.temperature = {
//     unit : "celsius", 
//     temp : 0
// }
// cityName = $("#cityName").val();
// // var user={};
//  user.userPlans=[];

// user.userEmail=userEmail;
// user.userPassword=userPassword;

// //  get weathe rinformation
// getWeather(cityName);


// // setPlans(index)
// index++;
// }


function addPlan(event){
  event.preventDefault();

  console.log("adding a plan and save it locally");

  weather = {};
  weather.temperature = {
    unit : "celsius", 
    temp : 0
}
cityName = $("#cityName").val();
cityDate=$('#datepicker').val();
cityPlan=$('#cityPlan').val();
// var user={};
 user.userPlans=[];

user.userEmail=userEmail;
user.userPassword=userPassword;
  if (cityDate == ""){
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

} else if(cityName== ""){
  var modalBox = $("<div></div>");
    modalBox.dialog(
    {
      modal: true,
      title: "Error!",
      open: function() {
        var markup = 'Please enter a City';
        $(this).html(markup);
      },
      buttons: {
        Ok: function () {
            $(this).dialog("close");
        }
      }
    }
  )

}else{

  getWeather(cityName);


}


// setPlans(index)
index++;
}

$("#planSubmit").on("submit", addPlan)

var planContainer=$("#planContainer");

function creatPlanList(){ 
  // event.preventDefault();





var  w40=$(`<div class="block w-40">`);
var w20=$(`<div class="w-20">`)

var wfull=$(`<div class="flex flex-row w-full"> `)
var mainCont=$(`<div class="flex shadow-sm rounded-l p-3 bg-gray-300">`)
var submittedPlan=$(`<div id="submittedPlan" class=" block" >`)
var mb2=$(`<div class=" flex  mb-2">`)


w40.append(`<h2 class="todayDate"><i class="fa fa-calendar m-2" aria-hidden="true"></i><span class="m-2"> Date </span></h2>`);
w40.append(`<h2 class="cityName uppercase m-2 text-2xl"><i class="fa fa-map-marker local" aria-hidden="true"></i><span class="uppercase text-red-900"></span></h2>`);
w40.append(`<p class="Temprature m-2 text-2xl"><span class="relative text-lg text-blue-800 -top-2">--</span> </p>`);

w20.append(`<img class="weatherIcon " src="icons/unknown.png" alt="weather image desc.">`);
w20.append(`<h3 class="description text-xl text-gray-700 pt-3"></h3>`);

wfull.append(`<textarea id="cityPlann" name="text" id="dayPlan" class="mx-auto p-3 resize-none w-full"></textarea>`);
wfull.append(`<button id="removePlan" class="bg-red-200 hover:bg-red-400 text-white text-2xl  p-2  rounded-r "><i class="fa fa-remove" style="font-size:48px;color:red"></i>
</button>`);

mainCont.append(w40);
mainCont.append(w20);
// mainCont.append(wfull);


submittedPlan.append(mainCont);


mb2.append(submittedPlan);
mb2.append(wfull);

planContainer.append(mb2);


}

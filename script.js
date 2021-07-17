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


function getWeather(nameOfCity, planDiv){
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&units=metric&appid=${WeatherAPIKey}`

  fetch(requestUrl)
  .then(function (response) {
    return response.json(); //converts response to object
  })
  .then(function (data){
    console.log(data);

    var cityLon = data.coord.lon;
    var cityLat = data.coord.lat;

    var weatherNow = document.createElement("div"); //creates a new card
    
    //creates multuple line break objects for spacing
    var [lb2, lb3, lb5] = [document.createElement("br"), document.createElement("br"), document.createElement("br"), document.createElement("br")];


    //creates an img element and updates the src as the weather icon URL, before appending to card
    var weatherNowIconCont = document.createElement("img");
    weatherNowIconCont.setAttribute("class", "Icon ");
    var Icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherNowIconCont.setAttribute("src", Icon);
    weatherNow.appendChild(weatherNowIconCont);

    weatherNow.appendChild(lb2);

    //creates div to hold forecast tenperature, updates then appends to card
    var weatherNowTemp = document.createElement("div");
    weatherNowTemp.setAttribute("class", "Temp ");
    weatherNowTemp.textContent = `Temperature: ${data.main.temp}°C`;
    weatherNow.appendChild(weatherNowTemp);

    weatherNow.appendChild(lb3);
    
    //crates element to hold humidity, updates content then appends to card
    var weatherNowDesc = document.createElement("div");
    weatherNowDesc.setAttribute("class", " WeatherDesc ");
    weatherNowDesc.textContent = `${data.weather[0].description}`;
    weatherNow.appendChild(weatherNowDesc);

    weatherNow.appendChild(lb5);



    

    
    weatherNow.setAttribute("class", "flex-col bg-blue-600 border rounded cityDiv");
    planDiv.append(weatherNow);









  
    return weatherNow;

  });


}



  
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
var cityName = $("#cityName");
var dayPlan = $("#dayPlan");

const googleAPIKey="AIzaSyBHRetLZb66zqKQV5qB7uAf94HYGIVRrLE";

var WeatherAPIKey = "3e317835aa99c5522639a26e16f09c51";

$( function() {
  $('#datepicker').datepicker();
} );

$( function() {
  $( "#dialog" ).dialog();
} );


var plans = []


$("#register").on("click", registerUser)
function registerUser(event){
    event.preventDefault(); 
 var user={}
 var userEmail=$("#userEmail").trim().val();
var userPassword=$("#userpassword").val().trim();
user.userEmail=encrypte(userEmail)
user.userPassword=encrypte(userPassword)
user.userPlans.push(plans.text())
console.log(JSON.stringify(users))

    // console.log(encrypte(userEmail),userpassword.length );
// Users.push({userEmail,userPassword})
// Users.push({userEmail,userPassword})
// Users.push({userEmail,userPassword})
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

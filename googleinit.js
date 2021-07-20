
function initMap(){

    // Map options
    var options = {
      zoom:8,
      center:{lat:weather.lat,lng:weather.lng }
    }
    // New map
    var map = new google.maps.Map(document.getElementById('GoogleMap'), options);

        // Add marker
     var markerObj={
      coords:{lat:weather.lat,lng:weather.lng}, // get this from the city name lan lon
      map:map,
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content:cityPlan

    }
     markers.push(markerObj);
  
        // Loop through markers
    for(var i = 1;i < markers.length;i++){
      // Add marker
      addMarker(markers[i]); 
      console.log(markers[i])  

    }

    // Add Marker Function
    

function addMarker(props){

      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        icon:props.iconImage,
      });

            // Check for customicon
            if(props.iconImage){
              // Set icon image
              marker.setIcon(props.iconImage);
            }
      
            // Check content
            if(props.content){
              var infoWindow = new google.maps.InfoWindow({
                content:props.content
              });
      
              marker.addListener('click', function(){
                infoWindow.open(map, marker);
              });
            }
    }
  }
// function initMap(){
//     // Map options
//     var options = {
//       zoom:2,
//       center:{lat:52.489471,lng:-1.898575}
//     }

//     // New map
//     var map = new google.maps.Map(document.getElementById('GoogleMap'), options);

//     // Listen for click on map
//     google.maps.event.addListener(map, 'click', function(event){
//       // Add marker
//       addMarker({coords:event.latLng});
//     });

   
//     // Add marker
//     var marker = new google.maps.Marker({
//       position:{lat:52.489471,lng:-1.898575}, // get this from the city name lan lon
//       map:map,
//       icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
//     });


//     // add info to th emarker
//     var infoWindow = new google.maps.InfoWindow({
//       content:'<h1>get the text from the city description or wekipedia</h1>'
//     });

//     marker.addListener('mouseover', function(){
//       infoWindow.open(map, marker);
//     });
    

//     // Array of markers
//     var markers = [
//       {
//         coords:{lat:42.4668,lng:-70.9495},
//         iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
//         content:'<h1>Lynn MA</h1>'
//       },
//       {
//         coords:{lat:42.8584,lng:-70.9300},
//         content:'<h1>Amesbury MA</h1>'
//       },
//       {
//         coords:{lat:42.7762,lng:-71.0773}
//       }
//     ];

//     // Loop through markers
//     for(var i = 0;i < markers.length;i++){
//       // Add marker
//       addMarker(markers[i]);
//     }

    // Add Marker Function
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        //icon:props.iconImage
      });

      // Check for customicon
      if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
      }

      // Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
//   }
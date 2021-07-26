
let map;
let service;
let infowindow;

function initMap(){
  console.log("in init map")
    // Map options
    var options = {
      zoom:8,
      center:{lat:weather.lat,lng:weather.lng }
    }
    // New map
    var map = new google.maps.Map(document.getElementById('GoogleMap'), options);
     map.setMapTypeId('roadmap');

        // Add marker
     var markerObj={
      coords:{lat:weather.lat,lng:weather.lng}, // get this from the city name lan lon
      map:map,
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content:cityPlan

    }
     markers.push(markerObj);
     console.log("going to update markers" )

    updateMarkers()
  


  function updateMarkers(){
    console.log("in update markers", markers.length )

        // Loop through markers
    for(var i = 1;i < markers.length;i++){
      // Add marker
      addMarker(markers[i]); 
      console.log(markers[i]);  

    }
}
    // Add Marker Function
    

function addMarker(props){
  console.log("in add markers")
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
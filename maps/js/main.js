var map;
var marker;
var mapElem = document.querySelector("#map");

var searchForm = document.querySelector('#search');
searchForm.addEventListener('submit', function(event){
    event.preventDefault();

    var query = document.querySelector('input[name="search"]').value;

        var url = 'https://maps.googleapis.com/maps/api/geocode/json?'
        url += 'address=' + query;
        url += '&key=AIzaSyBMoWJv2wT0g5keBiLwDWDbrMh2QrX0sJ4';


        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status == 'OK') {
                    var firstResult = response.results[0];
                    var location = firstResult.geometry.location;

                   marker = new google.maps.Marker( {
                       position: location,
                       map: map,
                       title: query
                   });

                   map.setCenter(location);
                } else {
                    alert('No Country Found');
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();



    alert(query);
});

function initMap() {
    var options = {
        center: { lat: 40.53, lng: -74 },
        zoom: 8
    };
    map = new google.maps.Map(document.querySelector('#map'), options);
    map.addListener('click', function (event) {
        var pos = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        var url = 'https://maps.googleapis.com/maps/api/geocode/json?'
        url += 'latlng=' + pos.lat + ',' + pos.lng;
        url += '&key=AIzaSyBMoWJv2wT0g5keBiLwDWDbrMh2QrX0sJ4';

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status == 'OK') {
                    var firstResult = response.results[0];
                    var addressComps = firstResult.address_components;
                    for (var i=0; i<addressComps.length; i++) {
                        if (addressComps[i].types.indexOf('country') != -1){
                            alert(addressComps[i].long_name);
                            break;
                        }
                    }
                } else {
                    alert('No Country Found');
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    })
}
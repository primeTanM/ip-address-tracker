const searchButton = document.querySelector('.search-btn');
var ipSearch = document.querySelector('.search-box');
const ipDisplay = document.getElementById('ip-display');
const locationDisplay = document.getElementById('location-display');
const timezoneDisplay = document.getElementById('timezone-display');
const ispDisplay = document.getElementById('isp-display');
var ipSearch = document.querySelector('.search-box');

// function getLocation() {
//     if(navigator.geolocation {
//         navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
//         } 
//     else {
//         alert("Geolocation is not supported by this browser.");
//         }
// }

// function geoSuccess(position) {
//     var lat = position.coords.latitude;
//     var lng = position.coords.longitude;
// }


// function geoError() {
//     alert("Geocoder failed.");
// }


var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGFucGVyMzIiLCJhIjoiY2tzM3QyNzd1MWtlejJ2cGptbm5ha2w1NyJ9.BImNwmtfgvBh3KKqANhfkQ'
}).addTo(mymap);

window.onload = () => {
    searchButton.click();
}

var marker = L.marker([51.5, -0.09]).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(marker);
}

// mymap.on('click', onMapClick);

// getIp();

function getIp(ip){
    var siteUrl = 'https://geo.ipify.org/api/v1?apiKey=at_6GBH4QHIDHp5ruVxRTJxwBPEVG7rL&ipAddress=' + ip; 


    fetch(siteUrl)
        .then((res) => res.json())
        .then((data) => {
            //SetIPdata
            console.log(data);
            ipDisplay.innerText = data.ip;
            locationDisplay.innerText = data.location.city + ',' + data.location.region + ' ' + data.location.postalCode;
            timezoneDisplay.innerText = 'UTC' + data.location.timezone;
            ispDisplay.innerText = data.as.name;

            //SetMapData
            mymap.setView([data.location.lat, data.location.lng], 13);
            marker.setLatLng([data.location.lat, data.location.lng]);
            marker  
            .bindPopup('You are currently at:' + '<br>' +data.location.lat + ', ' + data.location.lng)
            .openPopup();
        })
}


searchButton.addEventListener('click', () => {
    var ipSearch = document.querySelector('.search-box').value;
    getIp(ipSearch);
    
});
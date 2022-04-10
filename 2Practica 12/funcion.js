var coords = {
    lat : 29.099358,
    lng : -110.956896
};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idioma = urlParams.get("idioma");
var script = document.createElement("script"); 
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCMrQgga-C5zCuZLTVk2MPVzX7naqKZXZU&callback=iniciaMapa&language=${idioma}`;
document.head.appendChild(script);
var iniciaMapa = () => {
    var map = new google.maps.Map( 
        document.getElementById('map'),
        {
            center : coords,
            zoom: 3
        }
    );
}
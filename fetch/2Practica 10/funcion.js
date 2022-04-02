var coordenadas = {
    lat: 0,
    lng: 0
};

var proopiedades = {
    center: coordenadas,
    zoom: 2
};

function iniciaMapa() {
    fetch('paises.json')
    .then(function(response) {
        response.json().then(function(datos) {
            const map = new google.maps.Map(document.getElementById('map'), proopiedades);
            datos.forEach(marcador => {
                console.log(marcador);
                var informacion = "<strong>País:</strong>"+marcador.CountryName;
                var infowindow = new google.maps.InfoWindow({
                    content: informacion
                });
                let marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(marcador.CapitalLatitude, marcador.CapitalLongitude),
                    title: marcador.CountryName
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        })
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch: ' + error.message);
        });
    })
}
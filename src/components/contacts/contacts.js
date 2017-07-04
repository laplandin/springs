function initMap() {
    var coordinates = {lat: 47.226517, lng: 39.731621899999936};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 17
    });

    var markerImg = '../img/map-marker.png';

    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: markerImg
    });
}


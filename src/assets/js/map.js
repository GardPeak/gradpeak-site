/**
 * Map
 *
 * Using the google maps api version 3 we create a map on the contact page
 * marking the location of the office.
 *
 * jshint ignore initialize which is only used in the script src for the
 * callback specifically for async loading.
 */

/* global google */

(function() {

    window.initialize = function() { // jshint ignore:line
        // set your google maps parameters
        // use latitude and longitude to center map for multiple locations
        var latitude = 56.3109778,
            longitude = -3.0078024,
            map_zoom = 12,
            locations = [
                ['Office', 56.3075331, -2.9444967],
                ['Yard', 56.295597, -3.0576701]
            ];

        // google map custom marker icon - .png fallback for IE11
        var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
        var marker_url = ( is_internetExplorer11 ) ? '../assets/images/map/icon-location.png' : '../assets/images/map/icon-location.svg';

        // define the basic color of your map, plus a value for saturation and brightness
        var main_color = '#000000',
            saturation_value = -100,
            brightness_value = 5;

        // we define here the style of the map
        var style= [
            {
                // set saturation for the labels on the map
                elementType: "labels",
                stylers: [
                    {saturation: saturation_value}
                ]
            },
            {
                // poi stands for point of interest - don't show these lables on the map
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                // don't show highways lables on the map
                featureType: 'road.highway',
                elementType: 'labels',
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                // don't show local road lables on the map
                featureType: "road.local",
                elementType: "labels.icon",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                // don't show arterial road lables on the map
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                // don't show road lables on the map
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                // style different elements on the map
                featureType: "transit",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.government",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.sport_complex",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.attraction",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "poi.business",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "transit",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "transit.station",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "landscape",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    { hue: main_color },
                    { visibility: "on" },
                    { lightness: brightness_value },
                    { saturation: saturation_value }
                ]
            }
        ];

        // set google map options
        var map_options = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style
        };

        // inizialize the map
        var map = new google.maps.Map(document.getElementById('map-canvas'), map_options);

        var i = 0;
        for (; i < locations.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                visible: true,
                icon: marker_url
            });

            // To add the marker to the map, call setMap();
            marker.setMap(map);
        }

        // add custom buttons for the zoom-in/zoom-out on the map
        function CustomZoomControl(controlDiv, map) {
            // grap the zoom elements from the DOM and insert them in the map
            var controlUIzoomIn = document.getElementById('map-zoom-in'),
                controlUIzoomOut = document.getElementById('map-zoom-out');
            controlDiv.appendChild(controlUIzoomIn);
            controlDiv.appendChild(controlUIzoomOut);

            // Setup the click event listeners and zoom-in or out according to the clicked element
            google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
                map.setZoom(map.getZoom()+1);
            });
            google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
                map.setZoom(map.getZoom()-1);
            });
        }

        var zoomControlDiv;
        var zoomControl;

        zoomControlDiv = document.createElement('div');
        zoomControl = new CustomZoomControl(zoomControlDiv, map);

        // insert the zoom div on the top right of the map
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(zoomControlDiv);
    };

    // load the googlemaps api version 3 script
    function loadScript() {

        var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
                '&sensor=false' +
                '&callback=initialize';
        document.body.appendChild(script);
    }

    // check there is a map element before loading
    if (document.getElementById('map-canvas')) {
        window.onload = loadScript;
    }

})();

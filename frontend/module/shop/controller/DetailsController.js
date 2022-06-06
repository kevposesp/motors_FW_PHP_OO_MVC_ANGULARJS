app.controller('detailsController', ($scope, car, moreReleated) => {
    $scope.car = car.data[0]
    $scope.images = car.imgs

    $scope.imgAct = 'frontend/view/images' + car.imgs[0]
    $scope.changeImg = function() {
        $scope.imgAct = 'frontend/view/images' + this.image
    }
    $scope.returnShop = function() {
        location.href = "#/shop";
    }

    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        speed: 400,
        loop: true,
        slideToClickedSlide: true,
        loopedSlides: 10,
        slidesPerView: 4,
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 2500
        },
    })

    setTimeout(() => {
        swiper
    }, 0);

    var map;
    function loadMap() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2cG9zZXNwIiwiYSI6ImNsMDVudjJwNDA1M3AzY3FycjR0NjlpNDkifQ.u8CnLtnO5cFuMkC-hHs8Jg';
        map = new mapboxgl.Map({
            container: 'map-det', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-0.6063114551242474, 38.82434863048071], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        console.log(car);
        var element = {
            id: car.data[0].id_car,
            img: 'frontend/view/images' + car.imgs[0],
            text: car.data[0].name_mark + ' ' + car.data[0].name_model,
            price: car.data[0].price_car,
            coord: [car.data[0].lng, car.data[0].lat]
        }
        var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<img src="` + element.img + `"/><h3>` + element.text + `</h3><p>` + element.price + ` €</p>`
        );
        var mark = new mapboxgl.Marker()
            .setLngLat(element.coord)
            .setPopup(popup)
            .addTo(map);

    }
    loadMap()
    
    $scope.moreReleated = moreReleated
    $scope.loadDetails = function() {
        // console.log(this.car);
        location.href = "#/shop/car/" + this.car.id_car;
    }
})
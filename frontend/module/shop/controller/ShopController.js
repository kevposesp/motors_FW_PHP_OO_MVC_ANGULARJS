app.controller('shopController', ($scope, $rootScope, $location, shopService, servicesLS, filters, cars) => {
    var items_page = 4, total_prod = cars.count, actpage = 1

    $scope.changePagination = function (id = 'pag') {
        if (id == 'pag') {
            actpage = this.key + 1;
        } else {
            if (id == 'an' && actpage > 1) {
                actpage--
            } else if (id == 'po' && actpage < Math.ceil(total_prod / items_page)) {
                actpage++
            }
        }
        loadCars()
    }

    function load_pagination() {
        if (total_prod >= items_page) {
            return Math.ceil(total_prod / items_page)
        } else {
            return 1
        }
    }

    $scope.total_pages = load_pagination(cars.count)
    $scope.getNumber = function (num) {
        $scope.actpage = actpage
        return new Array(num);
    }

    $scope.changeFiltersClick = async function () {
        if (servicesLS.getLS('filters')) {
            var filtersActive = servicesLS.getLS('filters').split(',')
            filtclick = this.$parent.key + ":" + this.op.id + ":" + true + ":" + this.op.name
            if (filtersActive.includes(filtclick)) {
                newFilts = filtersActive.filter((item) => item !== filtclick)
                servicesLS.setLS('filters', newFilts)
            } else {
                filtersActive.push(filtclick)
                servicesLS.setLS('filters', filtersActive)
            }
        } else {
            filtclick = this.$parent.key + ":" + this.op.id + ":" + true + ":" + this.op.name
            // filtersActive.push(filtclick)
            servicesLS.setLS('filters', filtclick)
        }
        actpage = 1
        loadCars()
    }
    var currentMarkers = [];
    var markers = []
    async function loadCars() {
        var newCars;
        await shopService.getCars(items_page, (actpage - 1) * items_page, servicesLS.getLS('filters')).then((data) => {
            newCars = data
            console.log(newCars);
            $scope.cars = newCars.data
            total_prod = newCars.count
            $scope.total_pages = load_pagination()
            loadMarkers()
        })
        loadMap()
    }

    var newFilters = {}
    function modifyFilters() {
        if (servicesLS.getLS('filters')) {
            var filtersActive = servicesLS.getLS('filters').split(',')
            filts = []
            filtersActive.forEach(filter => {
                fff = filter.split(':')
                if (!Array.isArray(filts[fff[0]])) {
                    filts[fff[0]] = []
                }
                filts[fff[0]].push(fff[1])
            });
            for (filter in filters) { // cada tipo de filtro
                if (!Array.isArray(newFilters[filter])) { // compruebo si existe el array, si no lo creo
                    newFilters[filter] = []
                }
                filters[filter].forEach(filt => { // cada filtro de cada tipo
                    if (filts[filter] && filts[filter].includes(filt.id)) {
                        newFilters[filter].push({
                            "id": filt.id,
                            "name": filt.name,
                            "select": true
                        })
                    } else {
                        newFilters[filter].push({
                            "id": filt.id,
                            "name": filt.name,
                            "select": false
                        })
                    }
                })
            }
            return newFilters
        } else {
            return filters
        }
    }
    $scope.filters = modifyFilters()

    $scope.cars = cars.data

    $scope.loadDetails = function () {
        // console.log(this.car);
        location.href = "#/shop/car/" + this.car['data'].id_car;
    }
    // Map
    var map;
    function loadMap() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2cG9zZXNwIiwiYSI6ImNsMDVudjJwNDA1M3AzY3FycjR0NjlpNDkifQ.u8CnLtnO5cFuMkC-hHs8Jg';
        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-0.6063114551242474, 38.82434863048071], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        markers = []
        currentMarkers = []
        loadMarkers()
    }
    function loadMarkers() {
        if (total_prod > 0) {
            $scope.cars.forEach((car) => {
                // console.log(car);
                markers.push({
                    id: car.data.id_car,
                    img: 'frontend/view/images' + car.imgs[0],
                    text: car.data.name_mark + ' ' + car.data.name_model,
                    price: car.data.price_car,
                    coord: [car.data.lng, car.data.lat]
                })
            })
            setMarks(markers)
        }
    }
    // function emptyMap() {
    //     if (currentMarkers !== null) {
    //         for (var i = currentMarkers.length - 1; i >= 0; i--) {
    //             currentMarkers[i].remove();
    //         }
    //     }
    // }
    function setMarks(params) {
        // emptyMap()
        // console.log(currentMarkers);
        params.forEach(element => {
            var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<img src="` + element.img + `"/><a href='#/shop/details/` + element.id + `'><h3>` + element.text + `</h3></a><p>` + element.price + ` €</p>`
            );
            var mark = new mapboxgl.Marker()
                .setLngLat(element.coord)
                .setPopup(popup)
                .addTo(map);
            currentMarkers.push(mark);
        });
    }
    loadMap()
    loadMarkers()

    $scope.likeDislike = function () {
        if (servicesLS.getLS('token')) {
            if (this.car['data'].liked != null) {
                this.car['data'].liked = null
            } else {
                this.car['data'].liked = this.car['data'].id_car
            }
            shopService.setUnsetLike(this.car['data'].id_car)
                .then((data) => {
                    console.log(data);
                })
        } else {
            $location.path('/auth')
        }

    }

    $scope.emptyFilters = function () {
        servicesLS.removeFilters()
        // loadCars()
        // $location.path('/shop')
        window.location.reload()
    }
})
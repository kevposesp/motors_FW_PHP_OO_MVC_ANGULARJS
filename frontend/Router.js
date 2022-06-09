var app = angular.module('motors_FW_PHP_OO_MVC_ANGULARJS', ['ngRoute', 'toastr']);

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "homeController",
            resolve: {
                marks: (services) => {
                    return services.get('home', 'list_marks');
                },
                categories: (services) => {
                    return services.post('home', 'list_categories', { limit: 3 });
                },
                type_fuels: (services) => {
                    return services.post('home', 'list_type_fuels', { limit: 4 });
                },
                attributes: (services) => {
                    return services.get('home', 'list_attributes');
                },
                news: (services) => {
                    return services.getST('https://newsapi.org/v2/everything?' +
                        'q=car&' +
                        'language=es&' +
                        // 'from=2022-04-11&' +
                        'sortBy=popularity&' +
                        'apiKey=f2d9196570914e7da8f09b7648782c9b');
                }
            }
        })
        .when("/shop", {
            templateUrl: "frontend/module/shop/view/shop.html",
            controller: "shopController",
            resolve: {
                filters: (services) => {
                    return services.get('shop', 'getFilters');
                },
                cars: (services, servicesLS) => {
                    return services.post('shop', 'list_cars_with_names', { filters: servicesLS.getLS('filters'), items_page: 4, total_prod: 0 });
                }
            }
        })
        .when("/shop/car/:id", {
            templateUrl: "frontend/module/shop/view/details.html",
            controller: "detailsController",
            resolve: {
                car: (services, $route) => {
                    return services.post('shop', 'read_car', { id: $route.current.params.id });
                },
                moreReleated: (services, $route) => {
                    return services.post('shop', 'read_releated_by_mark', { id_car: $route.current.params.id });
                }
            }
        })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "contactController",
        })
        .when("/auth", {
            templateUrl: "frontend/module/auth/view/auth.html",
            controller: "authController"
        })
        .when("/auth/:type/:id", {
            templateUrl: "frontend/module/auth/view/auth.html",
            controller: "authController"
        })
        .otherwise({
            redirectTo: "/home"
        })
}])

app.run(($rootScope, services, $location, searchServices, servicesLS) => {
    function loadInf() {
        if (servicesLS.getLS('token')) {
            function inf() {
                return services.post('auth', 'infBut').then((response) => {
                    return response;
                }, (err) => {
                    console.log(err);
                })
            }
            inf()
                .then(function (data) {
                    $rootScope.usr_data = true
                    $rootScope.img_usr = data.img_user
                    $rootScope.username = data.username
                })
        } else {
            $rootScope.usr_data = false
            $rootScope.img_usr = 'frontend/view/images/user.png'
            $rootScope.username = 'Iniciar / Registrar'
        }
    }
    loadInf()
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        // handle route changes  
        loadInf()
        var loc = $location.path().split('/')
        $rootScope.menuActive = loc[1]
        $rootScope.search = loc[1] == 'home' || loca[1] == 'auth' ? false : true
    });
    $rootScope.menu_but = false

    $rootScope.controlMenuInf = function () {
        if ($rootScope.usr_data) {
            $rootScope.menu_but = !$rootScope.menu_but
        } else {
            window.location.href = '#/auth';
        }
    }

    window.onscroll = function () { myFunction() };

    function myFunction() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var box = document.querySelector('.header-text').offsetHeight;
        var header = document.querySelector('header').offsetHeight;

        if (scrollTop >= (box - header) && scrollTop != 0) {
            document.getElementById("myP").classList.add("background-header");
        } else {
            document.getElementById("myP").classList.remove("background-header");
        }
    }

    $rootScope.logout = function () {
        function logout() {
            return services.post('auth', 'logout').then((response) => {
                return response;
            }, (err) => {
                console.log(err);
            })
        }
        logout()
            .then(function () {
                servicesLS.logout();
                window.location.reload();
            })
    }

    $rootScope.searchParams = {
        city: "",
        attribute: "",
        brand: "",
        order: ""
    }

    var filtsSearch = {
        attribute: {
            id: "",
            name: ""
        },
        brand: {
            id: "",
            name: ""
        },
    }
    searchServices.searchOptionAtt()
    searchServices.searchOptionBrand()
    searchServices.searchOptionCity()

    $rootScope.actAtt = function (att) {
        att = JSON.parse(att)
        $rootScope.searchParams.attribute = att.id_attribute
        filtsSearch.attribute.id = att.id_attribute
        filtsSearch.attribute.name = att.name_attribute
        searchServices.searchOptionBrand()
        searchServices.searchOptionCity()
    }

    $rootScope.actBrand = function (brand) {
        brand = JSON.parse(brand)
        $rootScope.searchParams.brand = brand.id_mark
        filtsSearch.brand.id = brand.id_mark
        filtsSearch.brand.name = brand.name_mark
        searchServices.searchOptionAtt()
        searchServices.searchOptionCity()
    }

    $rootScope.key_autocomplete = function () {
        $rootScope.searchParams.city = this.autocomplete
        searchServices.searchOptionAtt()
        searchServices.searchOptionBrand()
        searchServices.searchOptionCity()
    }

    $rootScope.actOrder = function (order) {
        $rootScope.searchParams.order = order
    }

    $rootScope.autoShow = false
    // ng-focus="autoShow = true"

    function ccas() {
        $rootScope.autoShow = !$rootScope.autoShow
    }
    $rootScope.changeAutoShow = function () {
        ccas()
    }

    $rootScope.setCity = function () {
        ccas()
        $rootScope.searchParams.city = this.city.city_car
        $rootScope.autocomplete = this.city.city_car
    }

    $rootScope.setFiltersSearch = function () {
        filts = []
        if (filtsSearch.attribute.id != "") {
            filts.push("attributes:" + filtsSearch.attribute.id + ":" + true + ":" + filtsSearch.attribute.name)
        }
        if (filtsSearch.brand.id != "") {
            filts.push("marks:" + filtsSearch.brand.id + ":" + true + ":" + filtsSearch.brand.name)
        }
        if ($rootScope.searchParams.city != "") {
            filts.push("city:" + $rootScope.searchParams.city + ":" + true + ":a")
        }
        if ($rootScope.searchParams.order != "") {
            filts.push("order:" + $rootScope.searchParams.order + ":" + true + ":a")
        }
        servicesLS.setLS('filters', filts)
        if ($rootScope.menuActive == 'shop') {
            window.location.reload()
        } else {
            $location.path('/shop')
        }
        
    }
})
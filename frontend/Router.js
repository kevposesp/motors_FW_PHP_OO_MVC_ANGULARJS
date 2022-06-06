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
                    return services.post('shop', 'list_cars_with_names', { filters: servicesLS.getLS('filters'), items_page: 4, total_prod: 0});
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

app.run(($rootScope, services, $location, searchServices) => {
    // toastr.success('hola mundo')
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        // handle route changes  
        var loc = $location.path().split('/')
        $rootScope.menuActive = loc[1]
    });


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

    console.log($rootScope.attSelected);
})
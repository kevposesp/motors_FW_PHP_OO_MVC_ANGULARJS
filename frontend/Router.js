var app = angular.module('motors_FW_PHP_OO_MVC_ANGULARJS', ['ngRoute']);

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "homeController",
            resolve: {
                carousel: (services) => {
                    return services.get('home', 'carousel');
                },
                category: (services) => {
                    return services.get('home', 'category');
                },
                type: (services) => {
                    return services.get('home', 'types');
                }
            }
        })
        // .when('/shop', {
        //     templateUrl: "frontend/module/shop/view/Shop.html",
        //     css: ['frontend/view/css/filtersDiv.css', 'frontend/view/css/listAll.css', 'frontend/view/css/shopList.css'],
        //     controller: "shopController",
        //     resolve: {
        //         list: (services) => {
        //             return services.get('shop', 'allCars');
        //         },
        //         filters: (services) => {
        //             return services.get('shop', 'cars');
        //         }
        //     }
        // })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "contactController",
        })
        .otherwise({
            redirectTo: "/home"
        })
}])

app.run(($rootScope, services, $location) => {
    var loc = $location.path().split('/')
    $rootScope.menuActive = loc[1]

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
})
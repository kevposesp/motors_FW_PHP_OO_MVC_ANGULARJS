var app = angular.module('motors_FW_PHP_OO_MVC_ANGULARJS', ['ngRoute']);

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
                news: (servicesST) => {
                    return servicesST.get('https://newsapi.org/v2/everything?' +
                    'q=car&' +
                    'language=es&' +
                    // 'from=2022-04-11&' +
                    'sortBy=popularity&' +
                    'apiKey=f2d9196570914e7da8f09b7648782c9b');
                }
            }
        })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "contactController",
        })
        .otherwise({
            redirectTo: "/home"
        })
}])

app.run(($rootScope, services, $location) => {
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
})
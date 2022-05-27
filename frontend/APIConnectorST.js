app.factory('servicesST', ['$http', '$q', ($http, $q) => {
    let servicesBase = '/motors_FW_PHP_OO_MVC_ANGULARJS/backend/index.php?page=';
    let obj = {};

    delete $http.defaults.headers.common.token

    obj.get = (to) => {
        let defered = $q.defer();
        let promise = defered.promise;

        $http({
            method: 'GET',
            url: to
        }).success((data, status, headers, config) => {
            console.log(data);
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise;
    }

    return obj;
}])
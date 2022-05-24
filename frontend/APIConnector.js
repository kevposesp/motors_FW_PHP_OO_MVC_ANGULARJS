app.factory('services', ['$http', '$q', ($http, $q) => {
    let servicesBase = '/motors_FW_PHP_OO_MVC_ANGULARJS/backend/index.php?page=';
    let obj = {};
    $http.defaults.headers.common.token = localStorage.getItem('token') || false;
    obj.get = (module, funct) => {
        let defered = $q.defer();
        let promise = defered.promise;

        $http({
            method: 'GET',
            url: servicesBase + module + '&op=' + funct
        }).success((data, status, headers, config) => {
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise;
    }

    obj.post = (module, option, data = undefined) => {
        let defered = $q.defer();
        let promise = defered.promise;

        console.log(data);
        $http({
            method: 'POST',
            url: servicesBase + module + "&op=" + option,
            data: data
        }).success((data, status, headers, config) => {
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise
    }

    return obj;
}])
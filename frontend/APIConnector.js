app.factory('services', ['$http', '$q', ($http, $q) => {
    let servicesBase = conf.url_back + 'index.php?page=';
    let obj = {};

    // $http.defaults.headers.common.token = localStorage.getItem('token') || false;
    obj.getST = (to) => {
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

    obj.get = (module, funct) => {
        let defered = $q.defer();
        let promise = defered.promise;

        $http({
            method: 'GET',
            url: servicesBase + module + '&op=' + funct
        }).success((data, status, headers, config) => {
            console.log(data);
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise;
    }

    obj.post = (module, option, data = undefined) => {
        let defered = $q.defer();
        let promise = defered.promise;
        $http({
            method: 'POST',
            url: servicesBase + module + "&op=" + option,
            data: data,
            headers: {
                token: localStorage.getItem('token') || false
            }
        }).success((data, status, headers, config) => {
            console.log(data);
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise
    }

    return obj;
}])
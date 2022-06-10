app.factory('secureService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { actividad, refreshid, refreshtoken };
    return service;

    function actividad() {
        return services.post('auth', 'actividad').then((response) => {
            // console.log("actividad: " + response);
            return response;
        }, (err) => {
            console.log(err);
        })
    }

    function refreshid() {
        return services.post('auth', 'refreshsesion').then((response) => {
            // console.log("refreshid: " + response);
            return response;
        }, (err) => {
            console.log(err);
        })
    }

    function refreshtoken() {
        return services.post('auth', 'refreshsesion').then((response) => {
            // console.log("refreshsesion: " + response);
            return response;
        }, (err) => {
            console.log(err);
        })
    }

}])
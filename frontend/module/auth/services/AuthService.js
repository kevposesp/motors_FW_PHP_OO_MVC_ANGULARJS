app.factory('authService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { login, recover, setPass };
    return service;

    function login(data) {
        return services.post('auth', 'login', data).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }

    function recover(data) {
        return services.post('auth', 'recover', data).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }

    function setPass(data) {
        return services.post('auth', 'setNewPass', data).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }
}])
app.factory('authService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { login, recover, setPass, register, verify };
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
    
    function register(data) {
        return services.post('auth', 'register', data).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }

    function verify(data) {
        return services.post('auth', 'verify', data).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }
}])
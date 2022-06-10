app.factory('authService', ['services', '$rootScope', '$location', 'toastr', (services, $rootScope, $location, toastr) => {
    let service = { login, recover, setPass, register, verify, social_login, check_info_register };
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

    function social_login(type) {
        $rootScope.webAuth.authorize({
            connection: type
        })
        localStorage.setItem('SocialUser', type);
    }

    function signin(data) {
        // console.log(data);
        services.post('auth', 'signin', data).then((response) => {
            if (response['data']) {
                localStorage.setItem('token', response['data'])
                if (localStorage.getItem('ll')) {
                    $location.path(localStorage.getItem('ll'))
                    localStorage.removeItem('ll')
                } else {
                    window.location.reload()
                }
                setTimeout(() => {
                   toastr.success('Social login', 'Has iniciado session')
                }, 3000);
            }
        }, (err) => {
            console.log(err);
        })
    }

    function regSocialUser(profile) {
        var userInfo
        switch (localStorage.getItem("SocialUser")) {
            case "github":
                userInfo = {
                    uuid: profile.sub,
                    user: profile.nickname,
                    email: "https://github.com/" + profile.nickname,
                    avatar: profile.picture,
                    entity: "github"
                }
                break;
            case "google-oauth2":
                userInfo = {
                    uuid: profile.sub,
                    user: profile.nickname,
                    email: profile.email,
                    avatar: profile.picture,
                    entity: "google-oauth2"
                }
                break;
        }

        signin(userInfo)

    }

    function check_info_register() {
        $rootScope.webAuth.parseHash(function (err, authResult) {
            // console.log(authResult);
            if (authResult) {
                $rootScope.webAuth.client.userInfo(authResult.accessToken, function (err, profile) {
                    regSocialUser(profile)
                });
            } else if (err) {
                alert('Error: ' + err.error + '. Check the console for further details.');
            }
        });
    }
}])
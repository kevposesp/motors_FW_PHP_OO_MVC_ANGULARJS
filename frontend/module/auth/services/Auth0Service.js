app.factory('service_auth0', function ($rootScope) {
    let service = { auth_logg };
    return service;

    function auth_logg() {
        var webAuth = new auth0.WebAuth({
            domain: 'dev-a5e26dgt.us.auth0.com',
            clientID: '7siB8zXIkTvnDKvy03QAAL26NHUWaqui',
            redirectUri: 'http://localhost/motors_FW_PHP_OO_MVC_ANGULARJS/#/auth/',
            audience: 'https://' + 'dev-a5e26dgt.us.auth0.com' + '/userinfo',
            responseType: 'token id_token',
            scope: 'openid profile email user user:email',
            leeway: 60
        });
        $rootScope.webAuth = webAuth
    }
})
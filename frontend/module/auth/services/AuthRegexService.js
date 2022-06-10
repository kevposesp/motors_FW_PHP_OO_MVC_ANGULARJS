app.factory('serviceRegex', function ($rootScope, toastr) {
    let service = { regex_register, regex_login };
    return service;

    function myRegex(text, regex) {
        var result = false;
        if (text.length > 0) {
            result = regex.test(text);
        }
        return result;
    }

    function regex_register() {

        var res = []
        var username = $rootScope.usr
        var password = $rootScope.password
        var email = $rootScope.email

        // console.log(!myRegex(username, /^[a-zA-Z0-9\_]{1,}$/));
        if (!myRegex(username, /^[a-zA-Z0-9\_]{1,}$/)) {
            if (username.length == 0) {
                res['username'] = 'err_empty'
            } else {
                res['username'] = 'err_regex'
            }
        }

        // email
        if (!myRegex(email, /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/)) {
            if (email.length == 0) {
                res['email'] = 'err_empty'
            } else {
                res['email'] = 'err_regex'
            }
        }

        // password
        if (!myRegex(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            if (password.length == 0) {
                res['password'] = 'err_empty'
            } else {
                res['password'] = 'err_regex'
            }
        }

        return res

    }

    function regex_login() {
        var res = []
        var username = $rootScope.usr
        var password = $rootScope.password

        // console.log(!myRegex(username, /^[a-zA-Z0-9\_]{1,}$/));
        if (!myRegex(username, /^[a-zA-Z0-9\_]{1,}$/)) {
            if (username.length == 0) {
                res['username'] = 'err_empty'
            } else {
                res['username'] = 'err_regex'
            }
        }

        // password
        if (!myRegex(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            if (password.length == 0) {
                res['password'] = 'err_empty'
            } else {
                res['password'] = 'err_regex'
            }
        }

        return res
    }
});
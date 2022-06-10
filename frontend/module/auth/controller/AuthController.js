app.controller('authController', ($scope, $route, $rootScope, authService, service_auth0, serviceRegex, servicesLS, toastr) => {
    $scope.rpa = false
    $scope.changeMenu = function () {
        $scope.rpa = !$scope.rpa
    }

    $scope.login = function (usr = undefined, password = undefined) {
        $rootScope.usr = usr
        $rootScope.password = password
        var errs = []
        errs = serviceRegex.regex_login()
        // console.log(errs);
        if (!errs['username'] && !errs['password'] && !errs['email']) {
            authService.login({ usr, password })
                .then(function (data) {
                    if (data['status']) {
                        toastr.success('Login', 'Has iniciado correctamente')
                        servicesLS.setLS('token', data['data'])
                        setTimeout(() => {
                            window.location.href = '#/home';
                        }, 3000);
                    } else if (!data['status'] && data['msg'] == 'err_verify') {
                        toastr.error('Login', 'No se ha verificado la cuenta')
                    } else {
                        toastr.error('Login', 'Error al iniciar')
                    }
                })
        } else {
            if (errs['username']) {
                toastr.error('Regex', 'Error en el usuario')
            }
            if (errs['password']) {
                toastr.error('Regex', 'Error en la constraseña')
            }
            toastr.error('Regex', 'Error al validar formulario')
        }
    }

    var forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgotPassword'))
    var recoverPasswordModal = new bootstrap.Modal(document.getElementById('recoverPassword'))

    $scope.fgpassword = function (usr = undefined) {
        authService.recover({ usr })
            .then(function (data) {
                // console.log(data);
                if (data == 'true') {
                    toastr.success('Correo de recuperacion', 'Se ha enviado el correo')
                    setTimeout(() => {
                        forgotPasswordModal.hide()
                    }, 1500);
                } else {
                    toastr.error('Correo de recuperacion', 'Error al enviar')
                }
            })
    }

    type = $route.current.params.type
    token = $route.current.params.id
    if (type == 'recover') {
        recoverPasswordModal.show()
    } else if (type == 'verify') {
        authService.verify({ token: token })
            .then(function (data) {
                if (data == true || data == 'true') {
                    toastr.success('Verify', 'Se ha verificado el correo')
                } else if (!data['status'] && data['msg'] == 'err_verified') {
                    toastr.error('Verify', 'Ya esta verificado')
                    setTimeout(() => {
                        window.location.href = '#/auth';
                    }, 3000);
                } else if (!data['status'] && data['msg'] == 'err_exist') {
                    toastr.error('Verify', 'No existe')
                } else if (!data['status'] && data['msg'] == 'err_updating') {
                    toastr.error('Verify', 'Error actualizando')
                }
                setTimeout(() => {
                    window.location.href = '#/auth';
                }, 3000);
            })
    }

    $scope.recover = function (new_password, new_password2) {
        authService.setPass({ pass: new_password, token_verify: token })
            .then(function (data) {
                if (data == true || data == 'true') {
                    toastr.success('Cambio de contraseña', 'Se ha actualizado la contraseña')
                    setTimeout(() => {
                        recoverPasswordModal.hide()
                    }, 1500);
                    setTimeout(() => {
                        window.location.href = '#/auth';
                    }, 3000);
                } else if (!data.status && data.err_msg == "err_token_ex") {
                    toastr.error('Correo de recuperacion', 'Error en el token proporcionado')
                } else {
                    toastr.error('Correo de recuperacion', 'Error')
                }
            })
    }


    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'kevposesp',
        uploadPreset: 'jwahxckx'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            $rootScope.img = result.info.url
        }
    }
    )

    $scope.upImg = function () {
        myWidget.open();
    }

    $rootScope.usr = ""
    $rootScope.email = ""
    $rootScope.password = ""
    $scope.register = function (username, email, password) {
        $rootScope.usr = username
        $rootScope.email = email
        $rootScope.password = password
        img = $rootScope.img || ""
        var errs = []
        errs = serviceRegex.regex_register()
        // console.log(errs);
        if (!errs['username'] && !errs['password'] && !errs['email']) {
            authService.register({ username, email, password, img })
                .then(function (data) {
                    if (data['status'] || data === true || data == 'true') {
                        $scope.rpa = false
                        toastr.success('Registro', 'Se ha registrado correctamente')
                        toastr.success('Verificacion', 'Se ha enviado un correo de verificacion')
                    } else {
                        // console.log(data);
                        if (data.msg == "exs_username") {
                            toastr.error('Registro', 'El nombre de usuario ya existe')
                        } else if (data.msg == "exs_email") {
                            toastr.error('Registro', 'El email ya existe')
                        } else {
                            toastr.error('Registro', 'Error al registrar')
                        }
                    }
                })
            // toastr.success('Registro', 'Se ha registrado correctamente')
        } else {
            if (errs['username']) {
                toastr.error('Regex', 'Error en el usuario')
            }
            if (errs['password']) {
                toastr.error('Regex', 'Error en la constraseña')
            }
            if (errs['email']) {
                toastr.error('Regex', 'Error en el email')
            }
            toastr.error('Regex', 'Error al validar formulario')
        }

    }

    $rootScope.socialLogin = function (type) {
        authService.social_login(type)
    }

});
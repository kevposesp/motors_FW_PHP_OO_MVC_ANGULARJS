app.controller('authController', ($scope, $route, authService, servicesLS, toastr) => {
    $scope.rpa = false
    $scope.changeMenu = function () {
        $scope.rpa = !$scope.rpa
    }

    $scope.login = function (usr = undefined, password = undefined) {
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
    }

    var forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgotPassword'))
    var recoverPasswordModal = new bootstrap.Modal(document.getElementById('recoverPassword'))

    $scope.fgpassword = function (usr = undefined) {
        authService.recover({ usr })
            .then(function (data) {
                if (data) {
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
                } else if (!data.status && data.err_msg == "err_token_ex") {
                    toastr.error('Correo de recuperacion', 'Error en el token proporcionado')
                } else {
                    toastr.error('Correo de recuperacion', 'Error')
                }
            })
    }

    var img = ""
    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'kevposesp',
        uploadPreset: 'jwahxckx'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            img = result.info.url
        }
    }
    )

    $scope.upImg = function () {
        myWidget.open();
    }

    $scope.register = function (username, email, password) {
        authService.register({ username, email, password, img })
            .then(function (data) {
                if (data['status'] || data === true || data == 'true') {
                    $scope.rpa = false
                    toastr.success('Registro', 'Se ha registrado correctamente')
                    toastr.success('Verificacion', 'Se ha enviado un correo de verificacion')
                } else {
                    console.log(data);
                    if (data.msg == "exs_username") {
                        toastr.error('Registro', 'El nombre de usuario ya existe')
                    } else if (data.msg == "exs_email") {
                        toastr.error('Registro', 'El email ya existe')
                    } else {
                        toastr.error('Registro', 'Error al registrar')
                    }
                }
            })
    }

});
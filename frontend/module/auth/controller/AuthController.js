app.controller('authController', ($scope, $route, authService, servicesLS, toastr) => {
    $scope.rpa = false
    $scope.changeMenu = function () {
        $scope.rpa = !$scope.rpa
    }

    // toastr.options = {
    //     "closeButton": false,
    //     "debug": false,
    //     "newestOnTop": false,
    //     "progressBar": false,
    //     "positionClass": "toast-bottom-right",
    //     "preventDuplicates": false,
    //     "onclick": null,
    //     "showDuration": "300",
    //     "hideDuration": "1000",
    //     "timeOut": "5000",
    //     "extendedTimeOut": "1000",
    //     "showEasing": "swing",
    //     "hideEasing": "linear",
    //     "showMethod": "fadeIn",
    //     "hideMethod": "fadeOut"
    // }

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

    $scope.fgpassword = function(usr = undefined) {
        authService.recover({usr})
        .then(function(data) {
            console.log(data);
        })
    }

    type = $route.current.params.type
    token = $route.current.params.id
    if(type == 'recover') {
        var myModal = new bootstrap.Modal(document.getElementById('recoverPassword'))
        myModal.show()
    } else if(type == 'verify') {
        console.log('verify');
    }

    $scope.recover = function(new_password, new_password2) {
        authService.setPass({pass:new_password, token_verify: token})
        .then(function(data) {
            console.log(data);
        })
    }

});
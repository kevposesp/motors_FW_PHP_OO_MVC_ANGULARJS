app.controller('contactController', ($scope, contactServices, toastr) => {
    $scope.send = () => {
        contactServices.send($scope.name, $scope.surname, $scope.email, $scope.message)
        .then(function(data) {
            if (data == 'true' || data == true) {
                toastr.success('Contacto', 'Mendaje enviado')
            } else {
                toastr.error('Contacto', 'Error en el mensaje')
            }
        })
    }
});
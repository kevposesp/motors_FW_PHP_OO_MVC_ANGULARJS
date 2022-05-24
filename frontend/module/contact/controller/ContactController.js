app.controller('contactController', ($scope, contactServices) => {
    $scope.send = () => {
        contactServices.send($scope.name, $scope.surname, $scope.email, $scope.message);
    }
});
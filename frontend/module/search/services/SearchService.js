app.factory('searchServices', ['services', '$rootScope', (services, $rootScope) => {

    let service = { searchOptionAtt };
    return service;

    function searchOptionAtt() {
        // console.log($rootScope.params);
        return services.post('search', 'getSearchAttributes', $rootScope.params).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }
}])
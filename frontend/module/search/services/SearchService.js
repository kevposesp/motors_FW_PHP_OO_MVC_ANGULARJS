app.factory('searchServices', ['services', '$rootScope', (services, $rootScope) => {

    let service = { searchOptionAtt, searchOptionBrand, searchOptionCity };
    return service;

    function searchOptionAtt() {
        return services.post('search', 'getSearchAttributes', $rootScope.searchParams).then((response) => {
            $rootScope.attributes = response;
        }, (err) => {
            console.log(err);
        })
    }

    function searchOptionBrand() {
        return services.post('search', 'getSearchBrands', $rootScope.searchParams).then((response) => {
            $rootScope.brands = response;
        }, (err) => {
            console.log(err);
        })
    }
    
    function searchOptionCity() {
        return services.post('search', 'getSearchCity', $rootScope.searchParams).then((response) => {
            $rootScope.cities = response;
        }, (err) => {
            console.log(err);
        })
    }
}])
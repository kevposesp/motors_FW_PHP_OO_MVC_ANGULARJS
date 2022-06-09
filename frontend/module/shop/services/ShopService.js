app.factory('shopService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { getCars, setUnsetLike };
    return service;

    function getCars(items_page = 4, total_prod = 0, filters) {
        return services.post('shop', 'list_cars_with_names', {
            filters: filters,
            items_page: items_page,
            total_prod: total_prod
        }).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }

    function setUnsetLike(id) {
        return services.post('shop', 'setUnsetLike', {
            id
        }).then((response) => {
            return response;
        }, (err) => {
            console.log(err);
        })
    }
}])
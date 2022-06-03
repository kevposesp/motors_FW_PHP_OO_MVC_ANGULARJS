app.factory('servicesLS', ['services', '$rootScope', (services, $rootScope) => {
    let service = {getLS, setLS};
    return service;
    
    function getLS(nm) {
        if(localStorage.getItem(nm)) {
            console.log(localStorage.getItem(nm));
            return localStorage.getItem(nm)
        } else {
            return false;
        }
    }

    function setLS(nm, data) {
        localStorage.setItem(nm, data)
    }
}])
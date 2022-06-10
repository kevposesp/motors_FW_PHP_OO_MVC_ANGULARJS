app.factory('contactServices', ['services', '$rootScope', (services, $rootScope) => {
    let service = { send };
    return service;

    function send(name, surname, email, message) {
        return services.post('contact', 'send', {
            name,
            surname,
            email,
            message
        }).then((response) => {
            return response
            // location.href = "#/home"
            // window.location.reload()
            // return;
        }, (err) => {
            console.log(err);
        })
    }
}])
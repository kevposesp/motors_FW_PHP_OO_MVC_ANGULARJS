app.factory('contactServices', ['services', '$rootScope', (services, $rootScope, alertify) => {
    let service = { send };
    return service;

    function send(name, surname, email, message) {
        services.post('contact', 'send', {
            name,
            surname,
            email,
            message
        }).then((response) => {
            console.log(response);
            // location.href = "#/home"
            // window.location.reload()
            // return;
        }, (err) => {
            console.log(err);
        })
    }
}])
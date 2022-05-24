function sendEmailContact() {
    var conf = {}

    let name = $("#name").val()
    let surname = $("#surname").val()
    let email = $("#email").val()
    let message = $("#message").val()

    conf.params = {
        name,
        surname,
        email,
        message
    }
    conf.url = friendlyURL("?page=contact&op=send")
    ajaxPromise(conf.url, 'POST', 'json', conf.params)
        .then(function (data) {
            console.log(data);
            if(data) {
                alertify.success('Enviado correctamente', 3)
            } else {
                alertify.error('Error al enviar', 3)
            }
            $("#contact")[0].reset();
        }).catch(function (e) {
            console.log("error" + e);
        })
}

function key_send() {
    $("#contact").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            sendEmailContact();
        }
    });
}

function button_send() {
    $('#form-contact-submit').on('click', function (e) {
        e.preventDefault()
        sendEmailContact()
    });
}

$(document).ready(function () {
    key_send()
    button_send()
    // $('#form-contact-submit').on('click', function() {
    //     sendEmailContact()
    // }) 
});
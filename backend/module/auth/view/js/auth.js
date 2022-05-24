function loadAuth() {
    const signUpButton = $('#signUp');
    const signInButton = $('#signIn');
    const container = $('#container-auth');

    signUpButton.on('click', () => {
        container.addClass("right-panel-active");
    });

    signInButton.on('click', () => {
        container.removeClass("right-panel-active");
    });
}

// {
function myRegex(text, regex) {
    var result = false;
    if (text.length > 0) {
        result = regex.test(text);
    }
    return result;
}

function validate_register() {

    let username = $("#username").val()
    let email = $("#email").val()
    let password = $("#password").val()
    let check = true

    // username
    if (!myRegex(username, /^[a-zA-Z0-9\_]{1,}$/)) {
        if (username.length == 0) {
            document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
        } else {
            document.getElementById('error_username').innerHTML = "Error en los carácteres";
        }
        check = false
    } else {
        document.getElementById('error_username').innerHTML = "";
    }

    // email
    if (!myRegex(email, /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/)) {
        if (email.length == 0) {
            document.getElementById('error_email').innerHTML = "Tienes que escribir el email";
        } else {
            document.getElementById('error_email').innerHTML = "Error en los carácteres";
        }
        check = false
    } else {
        document.getElementById('error_email').innerHTML = "";
    }

    // password
    if (!myRegex(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        if (password.length == 0) {
            document.getElementById('error_password').innerHTML = "Tienes que escribir el password";
        } else {
            document.getElementById('error_password').innerHTML = "Error en los carácteres";
        }
        check = false
    } else {
        document.getElementById('error_password').innerHTML = "";
    }

    return check
}

function validate_login() {

    let usr = $("#usr").val()
    let password = $("#pssw").val()
    let check = true

    // usr
    let usernameVar = myRegex(usr, /^[a-zA-Z0-9\_]{1,}$/)
    let emailVar = myRegex(usr, /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/)

    if (!usernameVar && !emailVar) {
        if (usr.length == 0) {
            document.getElementById('error_usr').innerHTML = "Tienes que escribir el usuario";
        } else {
            document.getElementById('error_usr').innerHTML = "Error en los carácteres";
        }
        check = false
    } else {
        document.getElementById('error_usr').innerHTML = "";
    }

    // password
    if (!myRegex(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        if (password.length == 0) {
            document.getElementById('error_pssw').innerHTML = "Tienes que escribir el password";
        } else {
            document.getElementById('error_pssw').innerHTML = "Error en los carácteres";
        }
        check = false
    } else {
        document.getElementById('error_pssw').innerHTML = "";
    }

    return check
}

function validate_recover() {

    let usr = $("#usr_rpass_email").val()
    let check = true

    // usr
    let usernameVar = myRegex(usr, /^[a-zA-Z0-9\_]{1,}$/)
    let emailVar = myRegex(usr, /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/)

    if (!usernameVar && !emailVar) {
        if (usr.length == 0) {
            document.getElementById('error_usr').innerHTML = "Tienes que escribir el usuario";
        } else {
            document.getElementById('error_usr').innerHTML = "Error en los carácteres";
        }
        check = false
    } else {
        document.getElementById('error_usr').innerHTML = "";
    }

    return check
}

function validate_pass() {

    let password = $("#new_password").val()
    let password2 = $("#new_password2").val()
    let check = true

    // password
    if (password == password2) {
        if (!myRegex(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            if (password.length == 0) {
                document.getElementById('error_pssw_r').innerHTML = "Tienes que escribir el password";
            } else {
                document.getElementById('error_pssw_r').innerHTML = "Error en los carácteres";
            }
            check = false
        }
    } else {
        document.getElementById('error_pssw_r').innerHTML = "No coinciden las contraseñas";
        check = false
    }


    return check
}
// }

function register() {
    if (validate_register()) {
        var data = $('#register_form').serialize();
        var conf = {
            params: data
        }
        // conf.url = "module/auth/controller/controller_auth.php?op=register"
        conf.url = friendlyURL("?page=auth&op=register")
        ajaxPromise(conf.url, 'POST', 'json', conf.params)
            .then(function (data) {
                console.log(data);
                // if (data['check']) {
                //     $('#container-auth').removeClass('right-panel-active')
                //     $('#usr').val($("#username").val())
                //     $("#username").val('')
                //     $("#email").val('')
                //     $('#pssw').val($("#password").val())
                //     $("#password").val('')
                //     alertify.success('Registrado correctamente', 3)
                // } else {
                //     if (data['username']) {
                //         $("#error_username").append(data['username'])
                //     } else {
                //         $("#error_username").empty()
                //     }
                //     if (data['email']) {
                //         $("#error_email").append(data['email'])
                //     } else {
                //         $("#error_email").empty()
                //     }
                //     if (data['password']) {
                //         $("#error_password").append(data['password'])
                //     } else {
                //         $("#error_password").empty()
                //     }
                //     alertify.error('Error al registrar', 3)
                // }
                if (data['status'] || data === true) {
                    $('#container-auth').removeClass('right-panel-active')
                    $('#usr').val($("#username").val())
                    $("#username").val('')
                    $("#email").val('')
                    $('#pssw').val($("#password").val())
                    $("#password").val('')
                    alertify.success('Registrado correctamente', 3)
                } else {
                    alertify.error('Error al registrar', 3)
                }
            }).catch(function (e) {
                console.log("error" + e);
            })
    }
}

function key_register() {
    $("#register_form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#registro').on('click', function (e) {
        e.preventDefault()
        register()
    });
}

function login() {
    if (validate_login()) {
        var data = $('#login_form').serialize();
        var conf = {}
        conf.url = friendlyURL("?page=auth&op=login")
        // conf.url = "module/auth/controller/controller_auth.php?op=login"
        conf.params = data
        ajaxPromise(conf.url, 'POST', 'json', conf.params)
            .then(function (data) {
                console.log(data);
                if (data['status']) {
                    alertify.success('Has iniciado session', 3)
                    localStorage.setItem('token', data['data'])
                    setTimeout(() => {
                        window.location.href = friendlyURL("?page=home");
                    }, 3000);
                } else if (!data['status'] && data['msg'] == 'err_verify') {
                    alertify.error('No esta verificada la cuenta', 3)
                } else {
                    alertify.error('Error al iniciar', 3)
                }
            }).catch(function (e) {
                console.log("error" + e);
            })
    }
}

function key_login() {
    $("#login_form").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login').on('click', function (e) {
        e.preventDefault()
        login()
    });
}

// Recover
function recoverPass() {
    if (validate_recover()) {
        let usr = $("#usr_rpass_email").val()
        var conf = {}
        conf.url = friendlyURL("?page=auth&op=recover")
        conf.params = {
            usr
        }
        ajaxPromise(conf.url, 'POST', 'json', conf.params)
            .then(function (data) {
                console.log(data);
            }).catch(function (e) {
                console.log("error" + e);
            })
    }
}

function key_recover() {
    $("#usr_rpass_email").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            recoverPass();
        }
    });
}

function button_recover() {
    $('#sendEmailRecover').on('click', function (e) {
        e.preventDefault()
        recoverPass()
    });
}

function setPass() {
    if (validate_pass()) {
        let pass = $("#new_password").val()
        let path = window.location.pathname.split('/');

        var conf = {}
        conf.url = friendlyURL("?page=auth&op=setNewPass")
        conf.params = {
            pass,
            token_verify: path[5]
        }
        ajaxPromise(conf.url, 'POST', 'json', conf.params)
            .then(function (data) {
                console.log(data);
            }).catch(function (e) {
                console.log("error" + e);
            })
    }
}

function key_recover_pass() {
    $("#new_password, #new_password2").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            setPass();
        }
    });
}

function button_recover_pass() {
    $('#sendRecoverPass').on('click', function (e) {
        e.preventDefault()
        setPass()
    });
}
// Recover

function protecturl() {
    var conf = {}
    // conf.url = "module/auth/controller/controller_auth.php?op=controluser"
    conf.url = friendlyURL("?page=auth&op=controluser")
    ajaxPromise(conf.url, 'POST', 'json')
        .then(function (data) {
            console.log(data)
        }).catch(function (e) {
            console.log("error" + e);
        })
}

function showUploadWidget() {
    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'kevposesp',
        uploadPreset: 'jwahxckx'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            $("#img_input").val(result.info.url)
        }
    }
    )
    $("#upload_widget").on("click", () => {
        myWidget.open();
    })
}

function verify_email(token) {
    var conf = {}
    conf.params = {
        token
    }
    conf.url = friendlyURL("?page=auth&op=verify")
    ajaxPromise(conf.url, 'POST', 'json', conf.params)
        .then(function (data) {
            if (data == true) {
                alertify.success('Se ha verificado el correo', 3)
            } else if (!data['status'] && data['msg'] == 'err_verified') {
                alertify.error('Ya esta verificado', 3)
            } else if (!data['status'] && data['msg'] == 'err_exist') {
                alertify.error('No existe', 3)
            } else if (!data['status'] && data['msg'] == 'err_updating') {
                alertify.error('Error actualizando', 3)
            }
            setTimeout(() => {
                window.location.href = friendlyURL("?page=auth&op=view");
            }, 3000);
        }).catch(function (e) {
            console.log("error" + e);
        })
}

function socialSignIn() {
    var webAuth = new auth0.WebAuth({
        domain: 'dev-a5e26dgt.us.auth0.com',
        clientID: '7siB8zXIkTvnDKvy03QAAL26NHUWaqui',
        redirectUri: 'http://localhost/motors_FW_PHP_OO_MVC_JQUERY/auth/',
        audience: 'https://' + 'dev-a5e26dgt.us.auth0.com' + '/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile email user user:email',
        leeway: 60
    });

    $('#github, #github2').click(function (e) {
        e.preventDefault();
        localStorage.setItem("SocialUser", "github")
        webAuth.authorize({ connection: 'github' });
    });

    $('#google, #google2').click(function (e) {
        e.preventDefault();
        localStorage.setItem("SocialUser", "google-oauth2")
        webAuth.authorize({ connection: 'google-oauth2' });
    });

    function regSocialUser(profile) {
        var userInfo
        switch (localStorage.getItem("SocialUser")) {
            case "github":
                userInfo = {
                    uuid: profile.sub,
                    user: profile.nickname,
                    email: "https://github.com/" + profile.nickname,
                    avatar: profile.picture,
                    entity: "github"
                }
                break;
            case "google-oauth2":
                userInfo = {
                    uuid: profile.sub,
                    user: profile.nickname,
                    email: profile.email,
                    avatar: profile.picture,
                    entity: "google-oauth2"
                }
                break;
        }
        
        ajaxPromise(friendlyURL("?page=auth&op=signin"), 'POST', 'json', userInfo)
            .then(function (data) {
                console.log(data);
                if (data['data']) {
                    alertify.success('Has iniciado session', 3)
                    localStorage.setItem('token', data['data'])
                    setTimeout(() => {
                        window.location.href = friendlyURL("?page=home");
                    }, 3000);
                }
            }).catch(function () {
                console.log("Error Login")
            });

    }

    function handleAuthentication() {
        webAuth.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                webAuth.client.userInfo(authResult.accessToken, function (err, profile) {
                    regSocialUser(profile)
                    // console.log(profile);
                });
            }
        });
    }

    handleAuthentication();
}

$(document).ready(function () {
    let path = window.location.pathname.split('/');
    console.log(path);
    switch (path[4]) {
        case "verify":
            verify_email(path[5])
            break;
        case "recover":
            $('#recoverPassword').modal('show');
            break;
        default:
        // code block
    }
    loadAuth()
    key_register()
    button_register()
    key_login()
    button_login()

    key_recover()
    button_recover()

    key_recover_pass()
    button_recover_pass()

    // Social
    socialSignIn()

    protecturl()
    // ajaxPromise("module/auth/controller/controller_auth.php?op=pruebaheaders", 'POST', 'json')
    //     .then(function (data) {
    //         console.log(data);
    //     }).catch(function (e) {
    //         console.log("error" + e);
    //     })
    showUploadWidget()
});
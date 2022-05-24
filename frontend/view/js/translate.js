function changeLang(lang) {
    
    lang = lang || localStorage.getItem('app-lang') || 'es';
    localStorage.setItem('app-lang', lang);
    var elmnts = document.querySelectorAll('[data-tr]');

    $.ajax({
        url: 'http://localhost/motors_FW_PHP_OO_MVC_JQUERY/view/lang/' + lang + '.json',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            for (var i = 0; i < elmnts.length; i++) {
                elmnts[i].innerHTML = data.hasOwnProperty(lang) ? data[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr;
            }
        }
    })
}

$(document).ready(function () {
    
    lang = localStorage.getItem('app-lang') || 'es'
    if(lang == 'es') {
        $("#btn-es").attr('selected','selected')
    } else if(lang == 'en') {
        $("#btn-en").attr('selected','selected')
    } else if(lang == 'val') {
        $("#btn-val").attr('selected','selected')
    }

    changeLang();
    $("select")
        .change(function () {
            $("#btn-es:selected").each(function () {
                changeLang('es')
            });

            $("#btn-en:selected").each(function () {
                changeLang('en')
            });

            $("#btn-val:selected").each(function () {
                changeLang('val')
            });
        })
        .trigger("change");
});

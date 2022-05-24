var attribute = null
var brand = null
var city = null
function searchOptionAtt() {
    var conf = {
        // url : "module/search/controller/controller_search.php?op=getSearchAttributes",
        // url : friendlyURL("?page=search&op=getSearchAttributes"),
        method: "POST",
        params: {
            attribute: null,
            brand: null,
            city: null
        }
    }
    if (brand != null) {
        conf.params.brand = brand
    }
    if (city != null) {
        conf.params.city = city
    }
    ajaxPromise(friendlyURL("?page=search&op=getSearchAttributes"), conf.method, 'json', conf.params)
        .then((data) => {
            // console.log(Array.isArray(data));
            console.log(data);
            $("#col-att-select").empty()
            if (Array.isArray(data)) {
                var count = 0
                data.forEach((att) => {
                    console.log(attribute);
                    if (count == 0 && attribute == null) {
                        $('<option>Select attribute</option>').attr({ 'selected': true }).appendTo('#col-att-select')
                    }
                    if (attribute == att.id_attribute) {
                        $('<option></option>').attr({ 'id': att.id_attribute, 'value': att.id_attribute + ":true:" + att.name_attribute, 'selected': true }).appendTo('#col-att-select')
                    } else {
                        $('<option></option>').attr({ 'id': att.id_attribute, 'value': att.id_attribute + ":true:" + att.name_attribute }).appendTo('#col-att-select')
                    }
                    $('#' + att.id_attribute).append(att.name_attribute)
                    count++
                })
            } else {
                $('<option>No hay atributos</option>').attr({ 'selected': true }).appendTo('#col-att-select')
            }
            
        })
        .catch((err)=> {
            console.log(err);
        })
}

function searchOptionBrand() {
    var conf = {
        // url : "module/search/controller/controller_search.php?op=getSearchBrands",
        url : friendlyURL("?page=search&op=getSearchBrands"),
        method: "POST",
        params: {
            attribute: null,
            brand: null,
            city: null
        }
    }
    if (attribute != null) {
        conf.params.attribute = attribute
    }
    if (city != null) {
        conf.params.city = city
    }
    ajaxPromise(conf.url, conf.method, 'json', conf.params)
        .then((data) => {
            $("#col-brand-select").empty()
            var count = 0
            data.forEach((mark) => {
                if (count == 0 && brand == null) {
                    $('<option>Select brand</option>').attr({ 'selected': true , 'value': '0'}).appendTo('#col-brand-select')
                }
                if (brand == mark.id_mark) {
                    $('<option></option>').attr({ 'id': mark.id_mark, 'value': mark.id_mark, 'selected': true }).appendTo('#col-brand-select')
                } else {
                    $('<option></option>').attr({ 'id': mark.id_mark, 'value': mark.id_mark }).appendTo('#col-brand-select')
                }
                $('#' + mark.id_mark).append(mark.name_mark)
                count++
            })
        })
}

function searchOptionCity() {
    var conf = {
        // url : "module/search/controller/controller_search.php?op=getSearchCity",
        url : friendlyURL("?page=search&op=getSearchCity"),
        method: "POST",
        params: {
            attribute: null,
            brand: null,
            city: null
        }
    }
    if (attribute != null) {
        conf.params.attribute = attribute
    }
    if (brand != null) {
        conf.params.brand = brand
    }
    if (city != null) {
        conf.params.city = city
    }
    ajaxPromise(conf.url, conf.method, 'json', conf.params)
        .then((data) => {
            // console.log(data);
            $("#search-auto-complete-cont").empty()
            var count = 0
            data.forEach((city) => {
                $('<div></div>').attr({ 'id': 'city-' + count,'city': city.city_car}).addClass("cityAuto").appendTo('#search-auto-complete-cont')
                $('#city-' + count).append(city.city_car)
                count++
            })
            $('.cityAuto').on("click", function() {
                // console.log(this.getAttribute("city"))
                $("#col-input-text-search").val(this.getAttribute("city"))
            })
        })
}

function searchFun() {
    $('#main-button').on('click', function() {

        var city2 = $('#col-input-text-search').val()
        var ord = $('#col-order-select').val()
        var localS = null

        if(attribute != null && localS == null) {
            localS = 'attributes:' + attribute + ':true:a'
        }

        if(brand != null && localS != null) {
            localS += ',marks:' + brand + ':true:a'
        } else if(brand != null && localS == null) {
            localS = 'marks:' + brand + ':true:a'
        }

        if(city2 != "" && localS != null) {
            localS += ',city:' + city2 + ':true:a'
        } else if(city2 != "" && localS == null) {
            localS = 'city:' + city2 + ':true:a'
        }

        if(localS != null) {
            localS += ',order:' + ord + ':true:order'
        } else {
            localS = 'order:' + ord + ':true:order'
        }

        localStorage.setItem('filters', localS)
        window.location.href = 'shop';

    })
}

function loadSearchHome() {
    var URLsearch = window.location.pathname;
    var UrlSep = URLsearch.split("/")
    var contSearch = "#cont_search_homent"
    if(UrlSep[2] == 'home' || UrlSep[2] == '') {
        contSearch = "#cont_search_home"
    }
    // console.log(UrlSep[2] == '');
    // console.log(contSearch);

    $(contSearch).empty()
    $('<form></form>').attr({ 'id': 'search-form' }).appendTo(contSearch)
    $('<div></div>').attr({ 'id': 'search-row' }).addClass("row").appendTo('#search-form')

    $('<div></div>').attr({ 'id': 'search-row-col-att' }).addClass("col-lg-3 align-self-center").appendTo('#search-row')
    $('<fieldset></fieldset>').attr({ 'id': 'col-att-fieldset' }).appendTo('#search-row-col-att')
    $('<select></select>').attr({ 'id': 'col-att-select' }).addClass("form-select").appendTo('#col-att-fieldset')
    // $('<option>Select attribute</option>').attr({ 'selected': true }).appendTo('#col-att-select')

    $('<div></div>').attr({ 'id': 'search-row-col-brand' }).addClass("col-lg-2 align-self-center").appendTo('#search-row')
    $('<fieldset></fieldset>').attr({ 'id': 'col-brand-fieldset' }).appendTo('#search-row-col-brand')
    $('<select></select>').attr({ 'id': 'col-brand-select' }).addClass("form-select").appendTo('#col-brand-fieldset')
    // $('<option>Select brand</option>').attr({ 'selected': true , 'value': '0'}).appendTo('#col-brand-select')

    $('<div></div>').attr({ 'id': 'search-row-col-text' }).addClass("col-lg-2 align-self-center").appendTo('#search-row')
    $('<fieldset></fieldset>').attr({ 'id': 'col-text-fieldset' }).appendTo('#search-row-col-text')
    $('<input></input>').attr({'id': 'col-input-text-search', 'type': 'text', 'placeholder': 'Enter a city' }).addClass("searchText").appendTo('#col-text-fieldset')
    $('<div></div>').attr({ 'id': 'search-auto-complete-cont'}).addClass("auto-complete-cont").appendTo('#col-text-fieldset')

    $('<div></div>').attr({ 'id': 'search-row-col-order' }).addClass("col-lg-2 align-self-center").appendTo('#search-row')
    $('<fieldset></fieldset>').attr({ 'id': 'col-order-fieldset' }).appendTo('#search-row-col-order')
    $('<select></select>').attr({ 'id': 'col-order-select' }).addClass("form-select").appendTo('#col-order-fieldset')
    $('<option>Km</option>').attr({ 'selected': true , 'value': 'km'}).appendTo('#col-order-select')
    $('<option>Price</option>').attr({ 'value': 'price'}).appendTo('#col-order-select')

    $('<div></div>').attr({ 'id': 'search-row-col-button' }).addClass("col-lg-3").appendTo('#search-row')
    $('<fieldset></fieldset>').attr({ 'id': 'col-button-fieldset' }).appendTo('#search-row-col-button')
    $('<button type="button"></button>').attr({ 'id': 'main-button'}).addClass("main-button").appendTo('#col-button-fieldset')
    $('<i></i>').addClass("fa fa-search").appendTo('#main-button')
    $('#main-button').append(' Search now')
}

function loadByAtt() {
    $("#col-att-select").on("change", function() {
        attribute = $('#col-att-select').children(":selected").attr('id')
        brand = $('#col-brand-select').children(":selected").attr('id')
        city = $('#col-input-text-search').val()
        searchOptionBrand()
        searchOptionCity()
    })
    $("#col-brand-select").on("change", function() {
        attribute = $('#col-att-select').children(":selected").attr('id')
        brand = $('#col-brand-select').children(":selected").attr('id')
        city = $('#col-input-text-search').val()
        searchOptionAtt()
        searchOptionCity()
    })
}

$(document).ready(function () {
    loadSearchHome()
    searchOptionAtt()
    searchOptionBrand()
    searchOptionCity()
    loadByAtt()
    searchFun()

    $(".searchText").focus(function() {
        $(this).addClass("active")
    }).blur(function() {
        setTimeout(() => {
            $(this).removeClass("active")
        }, 100);
    })

    $('#col-input-text-search').on("keypress", function() {
        console.log(this.value);
        // var pro = new Promise ((resolve, reject) =>{
            city = this.value
        //     // console.log(city);
        //     resolve(city = this.value)
        // })

        // pro.then(() => {
        //     console.log(city);
            searchOptionCity()
        // })
    })
});
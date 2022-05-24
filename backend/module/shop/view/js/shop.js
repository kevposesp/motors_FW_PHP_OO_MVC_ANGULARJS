var currentMarkers = [];
var map;
function loadMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2cG9zZXNwIiwiYSI6ImNsMDVudjJwNDA1M3AzY3FycjR0NjlpNDkifQ.u8CnLtnO5cFuMkC-hHs8Jg';
    map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-0.6063114551242474, 38.82434863048071], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
}

function setMarks(params) {

    params.forEach(element => {

        var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<img src="` + element.img + `"/><h3>` + element.text + `</h3><p>` + element.price + ` €</p>`
        );

        var mark = new mapboxgl.Marker()
            .setLngLat(element.coord)
            .setPopup(popup)
            .addTo(map);
        currentMarkers.push(mark);
    });


}
var actpage = 1
function load_pagination(total_prod = 0) {
    var total_pages = 0
    var items_page = 4
    if (total_prod >= items_page) {
        total_pages = Math.ceil(total_prod / items_page)
    } else {
        total_pages = 1
    }
    console.log(total_pages)
    var count = 0
    $('<div><</div>').attr({ 'id': 'btn-pag-me' }).addClass('an btn-pag').appendTo('#pagination .cont')
    for (let index = 0; index < total_pages; index++) {
        count++
        if (count == actpage) {
            $('<div>' + count + '</div>').attr({ 'id': 'btn-pag-' + count }).addClass('it btn-pag act').appendTo('#pagination .cont')
        } else {
            $('<div>' + count + '</div>').attr({ 'id': 'btn-pag-' + count }).addClass('it btn-pag').appendTo('#pagination .cont')
        }
    }
    $('<div>></div>').attr({ 'id': 'btn-pag-ma' }).addClass('po btn-pag').appendTo('#pagination .cont')

    $('.btn-pag').on('click', function () {
        var thh = this.getAttribute('id').split('-')
        console.log(thh);
        $('.btn-pag').removeClass('act')
        if (thh[2] != 'me' && thh[2] != 'ma') {
            actpage = thh[2]
        } else {
            if (thh[2] == 'me') {
                if (actpage > 1) {
                    actpage--
                }
            }
            if (thh[2] == 'ma') {
                if (actpage < count) {
                    actpage++
                }
            }
        }
        loadCars(4, (actpage - 1) * 4)
    })
}

function loadCars(items_page = 4, total_prod = 0) {
    // function loadCars(filters, items_page = 2, total_prod = 0) {
    // filters = Array.isArray(filters) && filters.length != 0 ? filters : false
    // filters = Array.isArray(filters) && filters.length != 0 ? filters : false || localStorage.getItem('filters') || false
    // if(!filters) {
    var filters = localStorage.getItem('filters') || false
    // }
    console.log(filters);
    var conf = {}
    // conf.method = "GET"
    conf.params = null
    // if (filters) {
    conf.method = "POST"
    // conf.params = "filters=" + filters
    if (filters) {
        conf.filters = filters
    }
    conf.items_page = items_page
    conf.total_prod = total_prod
    // }
    $(".menuk").removeClass("d-none")
    ajaxPromise(friendlyURL("?page=shop&op=list_cars_with_names"), conf.method, 'json', conf)
    // ajaxPromise('module/shop/controller/controller_shop.php?op=list_cars_with_names', conf.method, 'json', conf)
        .then(function (data) {
            $('#pagination .cont').empty()
            console.log(data);
            // remove markers 
            if (currentMarkers !== null) {
                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                    currentMarkers[i].remove();
                }
            }
            $('#row_shop_car').empty();
            var count = 0
            var markers = []

            if (data['count'] > 0) {
                data['data'].forEach(car => {
                    $('<div></div>').attr({ 'id': 'col-ck-' + count, 'data-id': car['data'].id_car, 'data-type': "card" }).addClass('col-lg-12 cardk').appendTo('#row_shop_car')

                    $('<div></div>').attr({ 'id': 'listing-it-ck-' + count }).addClass('listing-item').appendTo('#col-ck-' + count)

                    $('<div></div>').attr('id', 'left-img-ck-' + count).addClass('left-image').appendTo('#listing-it-ck-' + count)

                    $('<a></a>').attr('id', 'a-ck-' + count).appendTo('#left-img-ck-' + count)
                    $('<img></img>').attr('src', 'view/images' + car['imgs'][0]).addClass('img-prin').appendTo('#a-ck-' + count)

                    $('<div></div>').attr({ 'id': 'hov-ck-' + count, 'data-id': car['data'].id_car }).addClass('hover-content').appendTo('#left-img-ck-' + count)
                    $('<div></div>').attr('id', 'butt-ck-' + count).addClass('main-white-button clk-btn').appendTo('#hov-ck-' + count)
                    $('<a></a>').attr('id', 'a2-ck-' + count).appendTo('#butt-ck-' + count)
                    $('#a2-ck-' + count).html('<i class="fa fa-eye"></i> Contact Now')

                    // Like
                    $('<div></div>').attr({ 'id': 'hov-ckl-' + count, 'data-id': car['data'].id_car }).addClass('hover-content like-cont').appendTo('#left-img-ck-' + count)
                    $('<div></div>').attr('id', 'butt-ckl-' + count).addClass('main-white-button clk-btn lll-' + car['data'].id_car).appendTo('#hov-ckl-' + count)
                    if (car['data'].liked) {
                        $('#butt-ckl-' + count).html('<i class="fa fa-heart"></i>')
                    } else {
                        $('#butt-ckl-' + count).html('<i class="fa-regular fa-heart"></i>')
                    }


                    $('<div></div>').attr('id', 'right-cont-ck-' + count).addClass('right-content align-self-center').appendTo('#listing-it-ck-' + count)
                    $('<a></a>').attr('id', 'a3-ck-' + count).appendTo('#right-cont-ck-' + count)
                    $('#a3-ck-' + count).html('<h4>' + car['data'].name_mark + ' ' + car['data'].name_model + '</h4>')
                    $('<h6></h6>').attr('id', 'h6-ck-' + count).appendTo('#right-cont-ck-' + count)
                    $('#h6-ck-' + count).html('by: Real ESTATE Agent')


                    $('<span></span>').attr('id', 'price-ck-' + count).addClass('price').appendTo('#right-cont-ck-' + count)
                    $('<div></div>').attr('id', 'icon-ck-' + count).addClass('icon').appendTo('#price-ck-' + count)
                    $('<img></img>').attr('src', 'view/images/listing-icon-01.png').appendTo('#icon-ck-' + count)
                    $('#price-ck-' + count).append(car['data'].price_car + ' €')

                    $('<span></span>').attr('id', 'details-ck-' + count).addClass('details').appendTo('#right-cont-ck-' + count)
                    // $('#details-ck-' + count).append('Km: <em> 860 sq ft </em>')
                    $('#details-ck-' + count).append('Km: <em> ' + car['data'].km_car + ' </em>')

                    $('<span></span>').attr('id', 'info-ck-' + count).addClass('info').appendTo('#right-cont-ck-' + count)
                    // $('<img></img>').attr('src', 'view/images/door.png').appendTo('#info-ck-' + count)

                    $('#info-ck-' + count).append(car['data'].doors_car + ' Doors')
                    $('#info-ck-' + count).append('<br>')
                    // $('#info-ck-' + count).append('<img src="view/images/listing-icon-03.png" alt="">')
                    $('#info-ck-' + count).append(car['data'].name_category)

                    markers.push({
                        id: car['data'].id_car,
                        img: 'view/images' + car['imgs'][0],
                        text: car['data'].name_mark + ' ' + car['data'].name_model,
                        price: car['data'].price_car,
                        coord: [car['data'].lng, car['data'].lat]
                    })
                    count++
                })
                load_pagination(data['count'])
            } else {
                $('<div>No hay coches disponibles</div>').addClass('msg-empty').appendTo('#row_shop_car')
            }
            setMarks(markers)
            // loadModalCar()
            controllerClickCard()
        }).catch(function (e) {
            console.log(e);
        })
}

// modal
function loadModalCar(id) {
    var conf = {
        id
    }
    conf.method = "POST"
    ajaxPromise(friendlyURL("?page=shop&op=read_car"), conf.method, 'json', conf)

    // ajaxPromise('module/shop/controller/controller_shop.php?op=read_car&id=' + id, 'GET', 'json')
        .then(function (data) {
            console.log(data);
            $('#modalShow').empty();
            $('#modalShow').addClass('car-modal');
            $('<div></div>').attr('id', 'modal-content-show').addClass('modal-content').appendTo('#modalShow');
            $('<div></div>').attr('id', 'modal-header-show').addClass('modal-header success').appendTo('#modal-content-show');
            $('<h2>Vista del coche</h2>').appendTo('#modal-header-show');
            $('<span>&times;</span>').attr('id', 'modalClose').addClass('close').appendTo('#modal-header-show');
            $('<div></div>').addClass('linebr').appendTo('#modal-content-show');
            $('<div></div>').attr('id', 'rowk').addClass('rowk').appendTo('#modal-content-show');
            $('<div></div>').attr('id', 'img').addClass('img').appendTo('#rowk');
            $('<img>').attr('src', 'view/images' + data['imgs'][0]).appendTo('#img');
            $('<div></div>').attr('id', 'modalshowbody').addClass('modal-body').appendTo('#rowk');
            $('<div></div>').attr('id', 'modal-footer').addClass('modal-footer success').appendTo('#modal-content-show');
            $('#modalshowbody').html(function () {
                var content = "";

                content += '<p class="title">' + data['data'][0].name_mark + ' ' + data['data'][0].name_model + '</p>'
                content += '<p class="date">' + data['data'][0].manufacturingdate_car + '</p>'
                content += '<p class="typefuel">' + data['data'][0].name_type_fuel + '</p>'
                content += '<p class="cv">' + data['data'][0].cv_car + ' cv</p>'
                content += '<p class="categ">' + data['data'][0].name_category + '</p>'

                return content;
            });
            $('#modal-footer').html(data['data'][0].overview_car)
            $("#modalShow").addClass("active");
            closeModalShow();
        }).catch(function (e) {
            console.log("error" + e);
        })
}
function closeModalShow() {
    $("#modalClose").on("click", function () {
        $("#modalShow").removeClass("active");
    })
}
// /modal
// Details
function changeImgDetails() {
    $(".car-img-details").on("click", function (e) {
        var srci = this.getAttribute('src')
        $('#img-prin-details').attr('src', srci)
    })
}
function loadReleatedDetails(id_mark, id_car) {
    var conf = {
        id_mark,
        id_car
    }
    conf.method = "POST"
    ajaxPromise(friendlyURL("?page=shop&op=read_releated_by_mark"), conf.method, 'json', conf)
    // ajaxPromise('module/shop/controller/controller_shop.php?op=read_releated_by_mark&id_mark=' + id_mark + '&id_car=' + id_car, 'GET', 'json')
        .then(function (data) {
            console.log(data.length);
            $('#row-releated').remove();
            if (data.length > 0) {
                $('<div></div>').attr('id', 'row-releated').addClass('row row-releated row-releated-brand').appendTo('#container-shop');
                $('<h2></h2>').attr('id', 'title_releated_by_mark').addClass('title').appendTo('#row-releated');
                $('#title_releated_by_mark').append('Relacionados por marca');
                $('<div></div>').attr('id', 'div-releated').addClass('col-lg-12').appendTo('#row-releated');
                $('<div></div>').attr('id', 'naccs-releated').addClass('naccs').appendTo('#div-releated');
                $('<div></div>').attr('id', 'grid-releated').addClass('grid').appendTo('#naccs-releated');
                $('<div></div>').attr('id', 'row-releated').addClass('row').appendTo('#grid-releated');
                var count = 0
                data.forEach(releated => {

                    $('<div></div>').attr('id', 'car-cont-releated-' + count).addClass('car-card-cont col-lg-3').appendTo('#row-releated');
                    $('<div></div>').attr('id', 'card-releated-' + count).addClass('card').appendTo('#car-cont-releated-' + count);
                    $('<img></img>').attr('src', 'view/images' + releated.url_img).appendTo('#card-releated-' + count);
                    $('<div></div>').attr('id', 'cont-releated-' + count).addClass('cont').appendTo('#card-releated-' + count);
                    $('<div></div>').attr('id', 'cont-ttl-releated-' + count).addClass('ttl').appendTo('#cont-releated-' + count);
                    $('#cont-ttl-releated-' + count).append(releated.name_mark + " " + releated.name_model);
                    $('<div></div>').attr('id', 'cont-price-releated-' + count).addClass('price').appendTo('#cont-releated-' + count);
                    $('#cont-price-releated-' + count).append(releated.price_car);
                    $('<div></div>').attr('id', 'cont-km-releated-' + count).addClass('km').appendTo('#cont-releated-' + count);
                    $('#cont-km-releated-' + count).append(releated.km_car);

                    count++
                    console.log(releated);
                })
            }

        }).catch(function (e) {
            console.log("error" + e);
        })
}

function loadDetails(id) {
    var conf = {
        id
    }
    conf.method = "POST"
    ajaxPromise(friendlyURL("?page=shop&op=read_car"), conf.method, 'json', conf)
    // ajaxPromise('module/shop/controller/controller_shop.php?op=read_car&id=' + id, 'GET', 'json')
        .then(function (data) {
            console.log(data);

            $('#row_shop_car').empty();
            $('<div></div>').attr('id', 'arrow-cont').addClass('arrow-cont').appendTo('#row_shop_car');
            $('#arrow-cont').html('<i class="fa fa-arrow-left"></i>');

            $('<div></div>').attr('id', 'details-container').addClass('container details').appendTo('#row_shop_car');
            $('<div></div>').attr('id', 'details-card').addClass('card').appendTo('#details-container');
            $('<div></div>').attr('id', 'details-card-body').addClass('card').appendTo('#details-card');
            $('<div></div>').attr('id', 'details-row').addClass('row').appendTo('#details-card-body');

            // Row

            $('<div></div>').attr('id', 'details-row-cont-img').addClass('col-lg-5 col-md-5 col-sm-6').appendTo('#details-row');
            // details-row-cont-img
            $('<div></div>').attr('id', 'cont-img-prin').addClass('white-box text-center').appendTo('#details-row-cont-img');
            // img prin
            $('<img></img>').attr({ 'id': 'img-prin-details', 'src': 'view/images' + data['imgs'][0] }).addClass('img-responsive').appendTo('#cont-img-prin');
            // carousel
            $('<div></div>').attr('id', 'cont-img-car-cont').addClass('carrousel-de').appendTo('#details-row-cont-img');
            $('<div></div>').attr('id', 'cont-img-car').addClass('owl-carousel owl-details').appendTo('#cont-img-car-cont');
            var count = 0
            data['imgs'].forEach(img => {
                // console.log(img);
                $('<div></div>').attr('id', 'cont-img-car-item-' + count).addClass('item').appendTo('#cont-img-car');
                $('<img></img>').attr('src', 'view/images' + img).addClass('img-responsive car-img-details').appendTo('#cont-img-car-item-' + count);
                count++
            })

            // /details-row-cont-img

            $('<div></div>').attr('id', 'details-row-cont-ov').addClass('col-lg-7 col-md-7 col-sm-6 mt-3').appendTo('#details-row');
            // details-row-cont-ov
            $('<h6></h6>').attr('id', 'details-ov-h6-subtitle').addClass('card-subtitle').appendTo('#details-row-cont-ov');
            $('#details-ov-h6-subtitle').html('Car');
            $('<h4></h4>').attr('id', 'details-ov-h4-boxtitle').addClass('box-title').appendTo('#details-row-cont-ov')
            $('#details-ov-h4-boxtitle').html('Product description');
            $('<div></div>').attr('id', 'details-ov-fllw').addClass('fllw').appendTo('#details-row-cont-ov')
            // details-ov-fllw
            $('<div></div>').attr('id', 'details-ov-fllw-like').addClass('like').appendTo('#details-ov-fllw')
            $('#details-ov-fllw-like').html('<i class="fa fa-heart"></i>');
            $('<div></div>').attr('id', 'details-ov-fllw-revs').addClass('revs').appendTo('#details-ov-fllw')
            $('#details-ov-fllw-revs').html('<h5>4 Reviews</h5>');
            $('<div></div>').attr('id', 'details-ov-fllw-rrss').addClass('rrss').appendTo('#details-ov-fllw')
            $('#details-ov-fllw-rrss').html('<i class="fa fa-facebook"></i><i class="fa fa-twitter"></i>');
            // /details-ov-fllw

            $('<p></p>').attr('id', 'details-ov-overv').addClass('overv').appendTo('#details-row-cont-ov')
            $('#details-ov-overv').html(data['data'][0].overview_car);
            $('<div></div>').attr('id', 'details-ov-shopd').addClass('cont-just mt-3').appendTo('#details-row-cont-ov')
            $('#details-ov-shopd').html('<h2>' + data['data'][0].price_car + ' €</h5>');
            $('<button></button>').attr('id', 'details-ov-shopd-btn').addClass('btn btn-dark btn-rounded mr-1').appendTo('#details-ov-shopd')
            $('#details-ov-shopd-btn').html('<i class="fa fa-shopping-cart"></i>');
            // /details-row-cont-ov

            $('<div></div>').attr('id', 'details-row-cont-info').addClass('col-lg-12 col-md-12 col-sm-12').appendTo('#details-row');
            $('<h3></h3>').attr('id', 'details-info-box-title').addClass('box-title mt-5 mb-2').appendTo('#details-row-cont-info');
            $('#details-info-box-title').html('General Info');
            // table
            $('<div></div>').attr('id', 'details-info-table').addClass('table-responsive').appendTo('#details-row-cont-info');
            $('<table></table>').attr('id', 'details-table').addClass('table table-striped table-product').appendTo('#details-info-table');
            $('<tbody></tbody>').attr('id', 'details-table-tbody').appendTo('#details-table');
            // /table
            // Row  

            // console.log(data);
            $('#details-table-tbody').html(function () {
                var content = "";
                for (row in data['data'][0]) {
                    // console.log(row);
                    if (row != "id_car" && row != "overview_car" && row != "created_at" && row != "updated_at") {
                        content += '<tr><td width="390">' + row + '</td><td>' + data['data'][0][row] + '</td></tr>';
                    }
                }
                return content;
            })
            $('.owl-details').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                dots: false,
                responsive: {
                    0: {
                        items: 2
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }
            })
            $(".arrow-cont").on("click", function (e) {
                loadCars(4, (actpage - 1) * 4)
                $('#row-releated').remove()
            })
            changeImgDetails()

            if (currentMarkers !== null) {
                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                    currentMarkers[i].remove();
                }
            }
            var markers = []

            markers.push({
                id: data['data'][0].id_car,
                img: 'view/images' + data['imgs'][0],
                text: data['data'][0].name_mark + ' ' + data['data'][0].name_model,
                price: data['data'][0].price_car,
                coord: [data['data'][0].lng, data['data'][0].lat]
            })
            setMarks(markers)
            loadReleatedDetails(data['data'][0].id_mark, id)
        }).catch(function (e) {
            console.log("error" + e);
        })
}
function setUnsetLike(id) {
    var conf = {}
    conf.params = {
        id
    }
    conf.method = "POST"
    // conf.url = 'module/shop/controller/controller_shop.php?op=setUnsetLike'
    conf.url = friendlyURL("?page=shop&op=setUnsetLike")
    ajaxPromise(conf.url, conf.method, 'json', conf.params)
        .then((data) => {
            if(data == "no_id") {
                window.location.href = friendlyURL("?page=auth");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

function controllerClickCard() {
    $(".cardk").on("click", function (e) {
        if (e.target.tagName == 'A') {
            var id = this.getAttribute('data-id')
            loadModalCar(id)
        } else if (e.target.tagName == 'I') {
            var id = this.getAttribute('data-id')
            $('.lll-' + id).empty()
            if (e.target.className == "fa-heart fa" || e.target.className == "fa fa-heart") {
                $('.lll-' + id).html('<i class="fa-heart fa-regular"></i>')
            } else if (e.target.className == "fa-heart fa-regular" || e.target.className == "fa-regular fa-heart") {
                $('.lll-' + id).html('<i class="fa-heart fa"></i>')
            }
            setUnsetLike(id)
        } else {
            $(".menuk").addClass("d-none")
            $('#row_shop_car').empty()
            $('#pagination .cont').empty()
            var id = this.getAttribute('data-id')
            loadDetails(id)
        }
    })
}

function changeFilters() {
    $('.inFilters').change(function () {
        actpage = 1
        var checkboxes = $('.inFilters')
        var cfilts = []
        for (const inp in checkboxes) {
            if (checkboxes[inp].type == "checkbox") {
                if (checkboxes[inp].checked) {
                    cfilts.push(checkboxes[inp].name + ":" + checkboxes[inp].value + ":" + checkboxes[inp].checked + ":" + checkboxes[inp].getAttribute("data-name"))
                }
            }

        }
        localStorage.setItem('filters', cfilts);
        // loadCars(cfilts, 2, (actpage-1) * 2)
        loadCars(4, (actpage - 1) * 4)
        getFilters()
    })
}

function changeFiltersNow() {
    $('.dfiltnow').on("click", function () {
        // console.log(this.attributes['data-id'].value);
        var ss = this.attributes['data-id'].value.split(":")
        // $('input[name="' + ss[0] + '"][value="' + ss[1] + '"]').attr("checked", false)
        var filters = localStorage.getItem("filters").split(",")
        var newFilters = []
        filters.forEach(filter => {
            var filts = filter.split(":")
            if (filts[0] == ss[0] && filts[1] == ss[1]) {

            } else {
                newFilters.push(filter)
            }
        })
        localStorage.setItem('filters', newFilters);
        // console.log(newFilters);
        getFilters()
    })
}

// Filters
function getFilters() {
    var conf = {
        
    }
    conf.method = "GET"
    ajaxPromise(friendlyURL("?page=shop&op=getFilters"), conf.method, 'json')
    // ajaxPromise('module/shop/controller/controller_shop.php?op=getFilters', 'GET', 'json')
        .then(function (data) {
            filters = localStorage.getItem('filters') || false;
            $('#filters_shop').empty();
            $("#cont_filters_now").empty()
            var count = 0
            for (const mod in data) {
                $('<div></div>').attr({ 'id': 'mod-' + count }).addClass('col-lg-12 p-relative column').appendTo('#filters_shop')
                $('<p>' + mod + '</p>').appendTo('#mod-' + count)
                $('<ul></ul>').attr('id', 'ul-' + count).appendTo('#mod-' + count)
                var countt = 0
                data[mod].forEach(modul => {
                    $('<li></li>').attr('id', 'li-' + countt + mod).appendTo('#ul-' + count)
                    $('<input type="checkbox" class="inFilters" data-name="' + modul.name + '" name="' + mod + '" value="' + modul.id + '"/>').appendTo('#li-' + countt + mod)
                    $('<span>' + modul.name + '</span>').appendTo('#li-' + countt + mod)
                    countt++
                })
                count++
            }
            $('<div class="main-white-button dfilt" style="cursor:pointer"><a><i class="fa fa-times"></i> Delete filters</a></div>').appendTo("#filters_shop")
            if (filters) {
                fil_arr = []
                fil_arr = filters.split(',')
                count = 0

                fil_arr.forEach(t => {
                    t_arr = t.split(':')
                    if (t_arr[2] == "true") {
                        $('input[name="' + t_arr[0] + '"][value="' + t_arr[1] + '"]').attr("checked", "checked")

                        $('<div></div>').attr({ "id": "itm-" + count, "data-id": t_arr[0] + ":" + t_arr[1] }).addClass("itm dfiltnow").appendTo("#cont_filters_now")
                        $('<i></i>').attr({ "id": "i-" + count }).addClass("fa fa-times").appendTo("#itm-" + count)
                        $("#itm-" + count).append(t_arr[3])
                    }
                    count++
                });
            }
            $('.dfilt').on('click', function () {
                localStorage.removeItem('filters')
                window.location.href = '?module=shop&op=list';
            })
            changeFilters()
            changeFiltersNow()

        }).catch(function (e) {
            console.log("error" + e);
        })
}

// /Filters
$(document).ready(function () {
    loadCars();
    getFilters();
    loadMap()
});
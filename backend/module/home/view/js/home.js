function bot() {
    $(".bot-shop").on("click", function (e) {
        console.log("Llega");
        var id = this.getAttribute('bot-id')
        // var filters = Array.isArray(filters) && filters.length != 0 ? filters : false || localStorage.getItem('filters') || false
        var filters = localStorage.getItem('filters') != "" ? localStorage.getItem('filters') : false
        var exist = false

        if (filters) {
            var arrFilters = filters.split(",")
            arrFilters.forEach((filter) => {
                if (filter == id) {
                    exist = true
                }
            })
            if (!exist) {
                filters = filters + "," + id
                localStorage.setItem("filters", filters)
            }
        } else {
            localStorage.setItem("filters", id)
        }
        window.location.href = 'shop';
    })
}

function loadMarksCarousel() {
    //   ajaxPromise('module/home/controller/controller_home.php?op=list_marks', 'GET', 'json')
    ajaxPromise(friendlyURL("?page=home&op=list_marks"), 'GET', 'json')
        .then(function (data) {

            $('#marks-carousel').empty();
            var count = 0
            data.forEach(mark => {
                $('<li></li>').attr({ 'id': 'car-item' + count, 'bot-id': "marks:" + mark.id_mark + ":true" }).addClass('item bot-shop').appendTo('#marks-carousel')
                $('<span></span>').attr('id', 'car-icon' + count).addClass('icon').appendTo('#car-item' + count)
                $('<img></img>').attr('src', 'view/icons' + mark.img_mark).appendTo('#car-icon' + count)
                $('#car-item' + count).append(mark.name_mark)

                count++
            })
            $('.owl-marks').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    600: {
                        items: 4
                    },
                    1000: {
                        items: 6
                    }
                }
            })
            bot()
            // console.log(data);
        }).catch(function (e) {
            console.log("error" + e);
        })

}

function loadCategories(limit) {
    var conf = {}
    conf.params = {
        limit
    }
    ajaxPromise(friendlyURL("?page=home&op=list_categories"), 'POST', 'json', conf.params)
        .then(function (data) {
            //   console.log(data);
            $('#menu_categories_home').empty();
            var count = 0
            data.forEach(category => {
                //   console.log(data);
                if (count == 0) {

                    $('<div></div>').attr('id', 'first-thumb').addClass('first-thumb active').appendTo('#menu_categories_home')
                    $('<div></div>').attr('id', 'first-thumb-child').addClass('thumb').appendTo('#first-thumb')
                    $('<span></span>').attr('id', 'first-thumb-span').addClass('icon').appendTo('#first-thumb-child')
                    $('#first-thumb-span').html('<img src="view/icons' + category.icon_category + '"></img>')
                    $('#first-thumb-child').append(category.name_category)

                    $('#first-category-title').empty()
                    $('#first-category-title').append(category.title_category)

                    $('#first-category-desc').empty()
                    $('#first-category-desc').append(category.description_category)

                    $('#first-category-img').empty()
                    $('#first-category-img').html('<img src="view/icons' + category.img_category + '"></img>')
                    $('#first-btn-bot').attr('bot-id', "categories:" + category.id_category + ":true").addClass("bot-shop")
                    // , 'bot-id': "typeFuels:" + fuel.id_type_fuel + ":true"}
                } else if (count == 1) {

                    $('<div></div>').attr('id', 'second-thumb').appendTo('#menu_categories_home')
                    $('<div></div>').attr('id', 'second-thumb-child').addClass('thumb').appendTo('#second-thumb')
                    $('<span></span>').attr('id', 'second-thumb-span').addClass('icon').appendTo('#second-thumb-child')
                    $('#second-thumb-span').html('<img src="view/icons' + category.icon_category + '"></img>')
                    $('#second-thumb-child').append(category.name_category)

                    $('#second-category-title').empty()
                    $('#second-category-title').append(category.title_category)

                    $('#second-category-desc').empty()
                    $('#second-category-desc').append(category.description_category)

                    $('#second-category-img').empty()
                    $('#second-category-img').html('<img src="view/icons' + category.img_category + '"></img>')
                    $('#second-btn-bot').attr('bot-id', "categories:" + category.id_category + ":true").addClass("bot-shop")

                } else if (count == 2) {

                    $('<div></div>').attr('id', 'third-thumb').appendTo('#menu_categories_home')
                    $('<div></div>').attr('id', 'third-thumb-child').addClass('thumb').appendTo('#third-thumb')
                    $('<span></span>').attr('id', 'third-thumb-span').addClass('icon').appendTo('#third-thumb-child')
                    $('#third-thumb-span').html('<img src="view/icons' + category.icon_category + '"></img>')
                    $('#third-thumb-child').append(category.name_category)

                    $('#third-category-title').empty()
                    $('#third-category-title').append(category.title_category)

                    $('#third-category-desc').empty()
                    $('#third-category-desc').append(category.description_category)

                    $('#third-category-img').empty()
                    $('#third-category-img').html('<img src="view/icons' + category.img_category + '"></img>')
                    $('#third-btn-bot').attr('bot-id', "categories:" + category.id_category + ":true").addClass("bot-shop")

                }

                count++
            })
            bot()
        }).catch(function (e) {
            console.log("error" + e);
        })
}

function loadFuelTypes(limit) {
    var conf = {}
    conf.params = {
        limit
    }
    ajaxPromise(friendlyURL("?page=home&op=list_type_fuels"), 'POST', 'json', conf.params)
        //   ajaxPromise('module/fuel/controller/controller_fuel.php?op=list_type_fuels&lim=' + lim, 'GET', 'json')
        .then(function (data) {
            $('#row-fueltypes-home').empty();
            var count = 0
            data.forEach(fuel => {
                // console.log(fuel);
                $('<div></div>').attr({ 'id': 'col-row-fuel-' + count, 'bot-id': "typeFuels:" + fuel.id_type_fuel + ":true" }).addClass('col-md-4 mt-10 align-self-center ccc bot-shop').appendTo('#row-fueltypes-home')
                $('<a></a>').attr('id', 'col-a-fuel-' + count).appendTo('#col-row-fuel-' + count)
                $('<div></div>').attr('id', 'col-div-fuel-' + count).addClass('cont').appendTo('#col-a-fuel-' + count)
                $('<div></div>').attr('id', 'col-img-fuel-' + count).addClass('img').appendTo('#col-div-fuel-' + count)
                $('<img></img>').attr('src', 'view/icons' + fuel.img_type_fuel).appendTo('#col-img-fuel-' + count)
                // $('#col-div-fuel' + count).append('<div class="title" id="col-title-fuel-"' + count + '""></div>')
                $('<div></div>').attr('id', 'col-title-fuel-' + count).addClass('title').appendTo('#col-div-fuel-' + count)
                $('<p></p>').attr('id', 'col-p-fuel-' + count).appendTo('#col-title-fuel-' + count)
                $('#col-p-fuel-' + count).append(fuel.name_type_fuel)
                count++
            })
            bot()
        }).catch(function (e) {
            console.log("error" + e);
        })
}

function loadAttributes() {
    ajaxPromise(friendlyURL("?page=home&op=list_attributes"), 'GET', 'json')
    // ajaxPromise('module/attribute/controller/controller_attribute.php?op=list_attributes', 'GET', 'json')
        .then(function (data) {
            $('#atts').empty()
            var count = 0;
            data.forEach(att => {
                // console.log(att.id_attribute);
                $('<div></div>').attr({ 'id': 'att-' + count, 'bot-id': "attributes:" + att.id_attribute + ":true" }).addClass('attribute bot-shop').appendTo('#atts')
                $('#att-' + count).append(att.name_attribute)
                count++
            })
            bot()
        }).catch(function (e) {
            console.log("error" + e);
        })
}

var news = null
var contNews = 5
function loadNews() {
    $('#container-news').empty()
    if (news != null) {
        var count = 0
        var gs = 0
        var gsc = 1
        var itms_gs = 1
        for (let index = 0; index < contNews; index++) {
            count++
            if (news[index]) {
                if (itms_gs == 1) {
                    $('<div></div>').attr({ 'id': 'gc-' + gs }).addClass('grid-container g0' + gsc).appendTo('#container-news')
                }
                $('<div></div>').attr({ 'id': 'gc-item-' + count }).addClass('item grid-cell-' + itms_gs).appendTo('#gc-' + gs)
                $('<div></div>').attr({ 'id': 'gc-item-img-' + count }).addClass('img').appendTo('#gc-item-' + count)
                $('<img />').attr({ 'src': news[index].urlToImage }).appendTo('#gc-item-img-' + count)
                $('<div></div>').attr({ 'id': 'gc-item-cont-' + count }).addClass('cont').appendTo('#gc-item-' + count)
                $('<div></div>').attr({ 'id': 'gc-item-cont-title-' + count }).addClass('title').appendTo('#gc-item-cont-' + count)
                $('#gc-item-cont-title-' + count).append(news[index].title)

                $('<div></div>').attr({ 'id': 'gc-item-cont-desc-' + count }).addClass('desc').appendTo('#gc-item-cont-' + count)
                $('#gc-item-cont-desc-' + count).append(news[index].description)

                $('<div></div>').attr({ 'id': 'gc-item-cont-author-' + count }).addClass('author').appendTo('#gc-item-cont-' + count)
                $('#gc-item-cont-author-' + count).append(news[index].author)
                if (gsc == 3) {
                    gsc = 1
                } else {
                    gsc++
                }
                if (itms_gs > 4) {
                    itms_gs = 1
                    gs++
                } else {
                    itms_gs++
                }
            }
        }
        if (news.length > count) {
            $('<button></button>').attr({ 'id': 'load-more-news' }).addClass('load-more-news').appendTo('#container-news')
            $('#load-more-news').append('Load more')
            loadMoreNews()
        }

    }
}

function getNews() {
    return new Promise((resolve, reject) => {
        var url = 'https://newsapi.org/v2/everything?' +
            'q=car&' +
            'language=es&' +
            // 'from=2022-04-11&' +
            'sortBy=popularity&' +
            'apiKey=f2d9196570914e7da8f09b7648782c9b';
        ajaxPromiseSH(url, 'GET', 'json')
            .then(function (data) {
                news = data.articles
                resolve()
            })
            .catch(function(e) {
                console.log(e);
            })
    })
}

function loadMoreNews() {
    $('#load-more-news').on('click', function () {
        contNews = contNews + 5
        loadNews()
    })
}

$(document).ready(function () {
    console.log("entra");
    loadMarksCarousel();
    loadCategories(5);
    loadFuelTypes(3);
    loadAttributes();
    getNews()
        .then(() => {
            loadNews()
        })
});
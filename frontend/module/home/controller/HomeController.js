app.controller('homeController', ($scope, $location, servicesLS, marks, categories, type_fuels, attributes, news) => {
  $scope.markClick = function () {
    servicesLS.setLS('filters', 'marks:' + this.mark.id_mark + ':true:' + this.mark.name_mark)
    $location.path('/shop')
  }

  $scope.categoryClick = function () {
    servicesLS.setLS('filters', 'categories:' + this.category.id_category + ':true:' + this.category.name_category)
    $location.path('/shop')
  }
  
  $scope.fuelTypeClick = function () {
    servicesLS.setLS('filters', 'typeFuels:' + this.type_fuel.id_type_fuel + ':true:' + this.type_fuel.name_type_fuel)
    $location.path('/shop')
  }
  
  $scope.attributeClick = function () {
    servicesLS.setLS('filters', 'attributes:' + this.attribute.id_attribute + ':true:' + this.attribute.name_attribute)
    $location.path('/shop')
  }

  $scope.newsAct = 0
  $scope.moreNews = function () {
    $scope.newsAct++
  }

  $scope.marks = marks
  $scope.categories = categories

  $scope.type_fuels = type_fuels
  $scope.attributes = attributes

  $scope.categoryActive = 0
  $scope.changeCategory = function () {
    $scope.categoryActive = this.key
  }

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    speed: 400,
    loop: true,
    slideToClickedSlide: true,
    loopedSlides: 50,
    slidesPerView: 3,
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 2500
    },
  })

  function changeNews() {
    swiper
    var newsListar = []
    var count = 0
    var typeSec = 1
    var sec = {}
    var newSec = []
    for (let index = 0; index < news.articles.length; index++) {
      if(count < 5) {
        newSec.push(news.articles[index]) 
        count++
      } else {
        sec = {
          typeSec,
          news: newSec
        }
        newSec= []
        newsListar.push(sec)
        count = 0
        typeSec++
        if(typeSec > 3) {
          typeSec = 1
        }
      }
      
    }
    $scope.newsListar = newsListar
    console.log(newsListar);
  }

  setTimeout(
    changeNews()
  , 0)

});
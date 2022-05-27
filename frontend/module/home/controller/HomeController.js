app.controller('homeController', ($scope, marks, categories, type_fuels, attributes, news) => {
  $scope.markClick = function () {
    console.log(this.mark.id_mark);
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

  $scope.newsAct = 0
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
  }

  setTimeout(
    changeNews()
  , 0)


});
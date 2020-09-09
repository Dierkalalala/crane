var myFullPage = new fullpage('#fullpage', {
  navigation: true,
  responsiveWidth: 700,
  anchors: ['home', 'cranetypes', 'benefits', 'advantages', 'awards', 'news', 'types', 'geography', 'contactus'],
  scrollOverflow: true,
  onLeave: function (origin, destination, direction) {
    console.log(destination)
    if(destination.index == 2 || destination.index == 4
    || destination.index == 7){
      document.getElementsByClassName('fp-right')[0].classList.add('active')
    } else{
    document.getElementsByClassName('fp-right')[0].classList.remove('active')
    }
  }
});

try {
  var mySwiper = new Swiper('.certificates-slider', {
    navigation: {
      nextEl: '.certificate-next',
      prevEl: '.certificate-prev',
    },
    slidesPerView: 1
  })
} catch (e) {
  void e
}
try {
  let myMainSwiper = new Swiper('.main-slider', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.main-swiper-button-next',
      prevEl: '.main-swiper-button-prev'
    },
    autoplay: {
      delay: 5000,
    }
  })
} catch (e) {
  void e
}
try {
  let companiesSwiper = new Swiper('.companies_slider', {
    slidesPerView: 'auto', // or 'auto'
    slidesPerColumn: 3,
    simulateTouch:false,
    noSwiping: true,
    navigation: {
      nextEl: '.companies-next',
      prevEl: '.companies-prev'
    },
   /* breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 4
      },
      // when window width is >= 640px

      1200: {
        slidesPerView: 5
      }
    }*/
  })
  companiesSwiper.init()
} catch (e) {
  console.log(e)
}
let form = document.getElementsByClassName('footer-right-col-form')
let footerFormControls = document.getElementsByClassName('footer-form-control')
let headerDefBtn = document.getElementsByClassName('head-def-btn')[0]
let closeModalBtn = document.getElementsByClassName('close-button')[0]
let rightPopUp = document.getElementsByClassName('right-pop-up-container')[0]
let burger = document.getElementsByClassName('burger')[0]


burger.onclick = function (e) {
  let header = document.getElementsByClassName('header')[0]
  let nav = header.getElementsByTagName('nav')[0]
  this.classList.toggle('open')
  if (this.classList.contains('open')) {
    console.log('pageScrollDisable')
    /* scrollLock.disablePageScroll(); */
  } else {
    /* scrollLock.enablePageScroll(); */
  }
  document.documentElement.classList.toggle('no-scroll')
  if (nav.classList.contains('active')) {
    nav.classList.add('erasing');
    setTimeout(() => {
      nav.classList.remove('erasing')
      nav.classList.remove('active')
    }, 500)
    return false
  }
  nav.classList.toggle('active')
}
closeModalBtn.onclick = function (e) {
  document.documentElement.classList.remove('no-scroll')
  document.body.classList.remove('no-scroll')
  scrollLock.enablePageScroll(document.documentElement);
  try {
    fullpage_api.setAllowScrolling(true);
  } catch (e) {
    void e
  }
  rightPopUp.classList.add('erasing')
  setTimeout(() => {

    rightPopUp.classList.remove('active')
    rightPopUp.classList.remove('erasing')
  }, 300)
}
headerDefBtn.onclick = function (e) {
  rightPopUp.classList.add('active')
  document.body.classList.add('no-scroll')
  document.documentElement.classList.add('no-scroll')
  try {
    fullpage_api.setAllowScrolling(false);
  } catch (e) {
    void e
  }
  /*   scrollLock.addScrollableTarget(rightPopUp);
    scrollLock.disablePageScroll(document.documentElement); */

}

Array.from(footerFormControls).forEach(inp => {
  new FooterInput(inp)
})

function FooterInput(input) {
  input.oninput = function (e) {
    if (this.value !== '') {
      this.classList.add('hasText')
      return false
    }
    this.classList.remove('hasText')
  }
}

Array.from(form).forEach(form => {
  new FormSubmition(form)
})

function FormSubmition(f) {
  f.onsubmit = function (e) {
    let labels = f.getElementsByTagName('label')
    Array.from(labels).forEach(label => {
      label.classList.remove('hasError')
    })
    e.preventDefault()

    let errorInputs = []

    function isEmpty(inp) {
      if (inp.value == '') {
        errorInputs.push(inp)
      }
    }

    let inputs = f.getElementsByClassName('able-to-type')
    Array.from(inputs).forEach(inp => {
      isEmpty(inp)
    })
    console.log(errorInputs)
    if (errorInputs.length !== 0) {
      console.log('123')
      Array.from(errorInputs).forEach(erinp => {
        erinp.parentNode.classList.add('hasError')
      })
    } else {
      alert('Ваша форма была успешно отправлена')
      f.reset()
    }

  }
}

if (screen.width < 1200) {
  try {
    fullpage_api.destroy('all');
  } catch (e) {
    void e
  }
  let copyright = document.getElementsByClassName('copyright')[0]
  copyright.remove()
  copyright.classList.remove('position-absolute')
  let footerConntainer = document.getElementsByClassName('footer-container')[0]
  footerConntainer.append(copyright)
}
try {
  var myMap;
  var myMap2;
  var myMap3;
  var myMap4;
// Дождёмся загрузки API и готовности DOM.
  ymaps.ready(init);

  function init() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [55.656702, 37.715992], // Москва
      zoom: 14,
    }, {
      searchControlProvider: 'yandex#search'
    });
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="map-content"><img src="img/contacts-page/marker.svg" alt=""><span>$[properties.iconContent]</span></div>'
    ),

      myPlacemark = new ymaps.Placemark([55.656702, 37.715992], {
        iconContent: 'г. Железнодорожный, ул. Промышленная д. 37',
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        // Размеры метки.
        iconContentLayout: MyIconContentLayout,
      })
    myMap.geoObjects
      .add(myPlacemark)

    myMap2 = new ymaps.Map('map2', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [54.656702, 34.715992], // Москва
      zoom: 14,
    }, {
      searchControlProvider: 'yandex#search'
    });
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="map-content"><img src="img/contacts-page/marker.svg" alt=""><span>$[properties.iconContent]</span></div>'
    ),

      myPlacemark = new ymaps.Placemark([51.656702, 37.715992], {
        iconContent: 'г. Железнодорожный, ул. Промышленная д. 37',
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        // Размеры метки.
        iconContentLayout: MyIconContentLayout,
      })
    myMap2.geoObjects
      .add(myPlacemark)

    myMap3 = new ymaps.Map('map3', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [55.656702, 37.715992], // Москва
      zoom: 14,
    }, {
      searchControlProvider: 'yandex#search'
    });
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="map-content"><img src="img/contacts-page/marker.svg" alt=""><span>$[properties.iconContent]</span></div>'
    ),

      myPlacemark = new ymaps.Placemark([52.656702, 37.715992], {
        iconContent: 'г. Железнодорожный, ул. Промышленная д. 37',
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        // Размеры метки.
        iconContentLayout: MyIconContentLayout,
      })
    myMap3.geoObjects
      .add(myPlacemark)

    myMap4 = new ymaps.Map('map4', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [55.656702, 37.715992], // Москва
      zoom: 14,
    }, {
      searchControlProvider: 'yandex#search'
    });
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="map-content"><img src="img/contacts-page/marker.svg" alt=""><span>$[properties.iconContent]</span></div>'
    ),

      myPlacemark = new ymaps.Placemark([56.656702, 33.715992], {
        iconContent: 'г. Железнодорожный, ул. Промышленная д. 37',
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        // Размеры метки.
        iconContentLayout: MyIconContentLayout,
      })
    myMap4.geoObjects
      .add(myPlacemark)


    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
      myMap.container.fitToViewport();
    })
  }
} catch (e) {
  console.log(e)
}
try {
  let navBurger = document.getElementsByClassName('nav-burger')[0]
  navBurger.addEventListener('click', openSecondaryNavBar)

  function openSecondaryNavBar(e) {
    this.classList.toggle('open')
    let navbarParent = this.parentNode.parentNode
    let navbar = navbarParent.getElementsByClassName('navbar')[0]
    if (navbar.classList.contains('active')) {
      navbar.classList.add('erasing')
      setTimeout(() => {
        navbar.classList.remove('erasing')
        navbar.classList.remove('active')

        return false
      }, 250)
    }
    navbar.classList.add('active')
  }
} catch (e) {
  void e
}
try {
  let pointerEvents = document.getElementsByClassName('contacts__images__wrap')
  Array.from(pointerEvents).forEach(pe => {
    pe.addEventListener('click', removePointerEvents)
  })

  function removePointerEvents(e) {
    console.log('123')
    this.querySelector('.pointer-events').classList.remove('pointer-events')
  }
} catch (e) {
  console.log(e)
}
document.onclick = function (e) {
  try {
    let navBurger = document.getElementsByClassName('nav-burger')[0]
    let navbar = document.getElementsByClassName('navbar')[0]
    let navBarWrapper = document.getElementsByClassName('history-page-navbar-wrapper')[0]
    if (!Array.from(e.path).includes(navBarWrapper) && navbar.classList.contains('active')) {
      navbar.classList.add('erasing')
      navBurger.classList.remove('open')
      setTimeout(() => {
        navbar.classList.remove('erasing')
        navbar.classList.remove('active')

        return false
      }, 250)
    }

  } catch (e) {
    console.log(e)
  }
}

try {
  let tabBar = document.getElementsByClassName('tab-bar')
  Array.from(tabBar).forEach(tab => {
    tab.addEventListener('click', goToAnotherServiceTab)
  })

  function goToAnotherServiceTab(e) {
    e.preventDefault()
    let parentNode = this.parentNode
    let index = Array.from(parentNode.children).indexOf(this)
    let tabsParent = document.getElementsByClassName('controlled-bytabs-container')[0]
    Array.from(tabsParent.children).forEach(tab => {
      tab.classList.remove('active')
    })
    Array.from(parentNode.children).forEach(tabController => {
      tabController.classList.remove('active')
    })
    document.getElementsByClassName('nav-burger')[0].classList.remove('open')
    parentNode.classList.remove('active')
    Array.from(parentNode.children)[index].classList.add('active')
    tabsParent.children[index].classList.add('active')

  }
} catch (e) {
  console.log(e)
}
try {


let questionListDropDown = document.getElementsByClassName('question-list-dropdown-wrapper')
Array.from(questionListDropDown).forEach(list => {
  list.addEventListener('click', showQuestionList)
})

function showQuestionList(e) {
  if (this.classList.contains('open')) {
    this.classList.remove('open')
    return false
  }
  Array.from(document.getElementsByClassName('open')).forEach(open => {
    open.classList.remove('open')
  })
  this.classList.add('open')
}

document.onclick = function (e) {
  if (e.target.hasAttribute('data-changed')) {
    return false
  }
  if (e.target.classList.contains('nav-burger') || e.target.parentNode.classList.contains('nav-burger')) {
    return false
  }
  if (e.target.classList.contains('burger') || e.target.parentNode.classList.contains('burger')) {
    return false
  }
  Array.from(document.getElementsByClassName('open')).forEach(open => {
    open.classList.remove('open')
  })
}
let questionListLi = document.querySelectorAll('.question-list-dropdown > ul > li')
Array.from(questionListLi).forEach(li => {
  li.addEventListener('click', dropDownToggled)
})

function dropDownToggled() {
  let questionList = this.parentNode.parentNode.parentNode
  let innerToggler = questionList.getElementsByClassName('question-drop-down-toggler')[0]
  let innerTogglerSpan = innerToggler.getElementsByTagName('span')[1]
  innerToggler.setAttribute('data-changed', 'true')
  innerTogglerSpan.innerText = this.innerText
  questionList.classList.add('changed')
}

function NextStep(el, submitBtn) {
  function openCompleted(e) {
    if (e.target.classList.contains('next-step' || e.target.parentNode.classList.contains('next-step'))) {
      return false
    }
    let stepContents = document.getElementsByClassName('step-content')
    Array.from(stepContents).forEach(step => {
      step.style.maxHeight = ''
      step.style.overflow = 'hidden'
      step.parentNode.classList.remove('active')
    })
    this.getElementsByClassName('step-content')[0].style.maxHeight = this.getElementsByClassName('step-content')[0]
      .scrollHeight + 'px'
    this.getElementsByClassName('step-content')[0].style.overflow = 'visible'
    this.classList.add('active')
  }

  this.el = el
  this.submitBtn = submitBtn
  let self = this
  let requiredEls = this.el.querySelectorAll('.required')

  this.submitBtn.onclick = function (e) {
    let requiredElements = []
    Array.from(requiredEls).forEach(required => {
      required.classList.remove('error')
      if (required.tagName == 'DIV') {
        let changed = required.getElementsByClassName('question-drop-down-toggler')[0].getAttribute('data-changed')
        if (changed == 'false') {
          requiredElements.push(required)
        }
      } else if (required.tagName == 'INPUT') {
        if (required.value !== '') {
          return false
        }
        requiredElements.push(required)
      }
    })
    if (requiredElements.length !== 0) {
      Array.from(requiredElements).forEach(req => {
        req.classList.add('error')
        return false
      })
    } else {
      self.el.getElementsByClassName('step-content')[0].style.maxHeight = ''
      self.el.getElementsByClassName('step-content')[0].style.overflow = 'hidden'
      self.el.classList.remove('active')
      let next = self.el.nextElementSibling
      if (next) {
        next.classList.add('active')
        self.el.classList.add('completed')
        setTimeout(() => {
          self.el.addEventListener('click', openCompleted)
        }, 1000)
        let nextContent = next.getElementsByClassName('step-content')[0]
        if (nextContent.style.maxHeight == '') {
          nextContent.style.maxHeight = nextContent.scrollHeight + 'px';
          nextContent.style.overflow = 'visible'
        }
      }
      else {
        self.el.classList.add('completed')
        setTimeout(() => {
          self.el.addEventListener('click', openCompleted)
        }, 1000)
        let submitBtn = document.getElementsByClassName('question-list-form-submit')[0]
        submitBtn.classList.remove('disabled')
        submitBtn.removeAttribute('disabled')
      }

    }
  }
}

let steps = document.getElementsByClassName('step-wrapper')
Array.from(steps).forEach(step => {
  new NextStep(step, step.getElementsByClassName('next-step')[0])
})
let changingInputs = document.getElementsByClassName('changing')
Array.from(changingInputs).forEach(inp => {
  inp.addEventListener('input', hasContent)
})
function hasContent() {
  if (this.value !== '') {
    this.classList.add('hasContent')
  }
}
let questionListForm = document.getElementsByClassName('question-list-main-form')[0]
questionListLi.addEventListener('click', submitForm)
function submitForm(e) {
  e.preventDefault()
}
} catch (e) {
  void (e)
}
let navbar = document.getElementsByClassName('history-page-navbar-wrapper')[0]
let navbarParams = navbar.getBoundingClientRect()
window.onscroll = function (e) {
  if(navbarParams.top < pageYOffset){
    navbar.classList.add('sticky')
    return false
  }
  navbar.classList.remove('sticky')
}

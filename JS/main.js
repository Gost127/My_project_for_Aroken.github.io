// =======================================GLOBAL=======================================

const inputs = document.querySelectorAll('input[type=number]');
Array.from(inputs).forEach(input => {
  const min = +input.min;
  const max = +input.max;
  input.addEventListener('input', (e) => {
    const value = +input.value;
    if (value > max) {
      input.value = max
    } else if (value < min && input.value != '') {
      input.value = min
    }
  });
});


// =====================================ADAPTIVE======================================

const header_top_inner = document.querySelector('.header__content-top-inner')
const header_content_top = document.querySelector('.header__content-top')
const header_ti_outer = header_top_inner.outerHTML
let adaptive_i = 0

if (window.innerWidth <= 700) {
  header_content_top.insertAdjacentHTML('afterend', header_ti_outer)
  header_content_top.remove()
  adaptive_i++;
}

setInterval(function () {
  if (adaptive_i == 1 && window.innerWidth > 700) {
    location.reload()
  } else if (adaptive_i == 0 && window.innerWidth <= 700) {
    location.reload()
  }
}, 200);


// =======================================HEADER TOP BAR=======================================

const TopBarBtn = document.querySelector('.header__language-btn')
const languageContent = document.querySelector('.header__language-content')
const languageLink = document.querySelectorAll('.header__language-link')

TopBarBtn.addEventListener('click', AccTopBarHeaderBtn)


languageLink.forEach(function (link) {
  link.addEventListener('click', AccTopBarHeaderLink)
});

function AccTopBarHeaderBtn(e) {
  e.preventDefault()
  languageContent.classList.toggle('header__language-content_hidden')
  TopBarBtn.classList.toggle('header__language-btn_active')
}

function AccTopBarHeaderLink(e) {
  e.preventDefault()
  languageContent.classList.toggle('header__language-content_hidden')
  const innerCurrent = document.querySelector('.header__language-item_current').innerHTML
  const innerTarget = e.currentTarget.innerHTML
  document.querySelector('.header__language-item_current').innerHTML = innerTarget
  e.currentTarget.innerHTML = innerCurrent
  TopBarBtn.classList.toggle('header__language-btn_active')
}

// =========================================HEADER TOP=========================================

const SearchBtn = document.querySelector('.header__search-btn')
const categoriesContent = document.querySelector('.header__categories-content')
const categoriesItem = document.querySelectorAll('.header__categories-item')

SearchBtn.addEventListener('click', AccTopHeaderBtn)

categoriesItem.forEach(function (Item) {
  Item.addEventListener('click', AccTopHeaderItem)
});

function AccTopHeaderBtn(e) {
  e.preventDefault()
  categoriesContent.classList.toggle('header__categories-content_hidden')
  SearchBtn.classList.toggle('header__search-btn_active')
}

function AccTopHeaderItem(e) {
  e.preventDefault()
  categoriesContent.classList.toggle('header__categories-content_hidden')
  const innerCurrent = document.querySelector('.header__search-status').innerHTML
  const innerTarget = e.currentTarget.innerHTML
  document.querySelector('.header__search-status').innerHTML = innerTarget
  e.currentTarget.innerHTML = innerCurrent
  SearchBtn.classList.toggle('header__search-btn_active')
}

// =====================================HEADER TOP CONTENT=====================================

const AllCol = document.querySelector('.header__collection span')
const colContent = document.querySelector('.header__collection-content')
const collectionItem = document.querySelectorAll('.header__collection-item')

if (adaptive_i == 1) {
  colContent.classList.add('header__collection-content_hidden')
}

AllCol.addEventListener('click', AccTopContentHeaderCol)

collectionItem.forEach(function (Item) {
  Item.addEventListener('click', AccTopContentHeaderCol)
});

function AccTopContentHeaderCol(e) {
  e.preventDefault()
  colContent.classList.toggle('header__collection-content_hidden')
}

// =====================================HEADER SLIDER======================================

const headerSlider = document.querySelector('.header__slider')
const headerSliderWrap = document.querySelector('.header__slider-wrap')
const headerSliderDots = Array.from(document.querySelector('.header__slider-dots').children)
const headerSlides = Array.from(headerSliderWrap.children)

headerSlides.forEach(function (slide, index) {
  slide.dataset.index = index

})

function NextHeaderSlide() {

  const CurrentSlide = headerSliderWrap.querySelector('[data-active]')

  headerSliderDots.forEach(function (dot) {
    dot.classList.remove('header__slider-dot_active')
  })


  if (CurrentSlide.nextElementSibling != null) {

    const CurrentSlideIndex = CurrentSlide.nextElementSibling.getAttribute('data-index')

    CurrentSlide.removeAttribute('data-active')
    CurrentSlide.nextElementSibling.dataset.active = ''
    headerSliderWrap.style.cssText = `transform: translateX(calc(-${CurrentSlideIndex}00% / ${headerSlides.length}));`
    document.querySelector(`#headerDot${parseFloat(CurrentSlideIndex) + 1}`).classList.add('header__slider-dot_active')

  } else {

    CurrentSlide.removeAttribute('data-active')

    headerSliderWrap.style.cssText = `transform: translateX(0%);`
    headerSlides[0].dataset.active = ''
    document.querySelector(`#headerDot1`).classList.add('header__slider-dot_active')
  }



}

setInterval(NextHeaderSlide, 8000)

// =====================================TRENDING SLIDER======================================

let trendingObj = {}

const trendingSlider = document.querySelector('.trending__slider')
const trendingSliderWrap = document.querySelector('.trending__slider-wrap')
const trendingSliderDots = Array.from(document.querySelector('.trending__slider-dots').children)
const trendingSlides = Array.from(trendingSliderWrap.children)

trendingSliderWrap.addEventListener('mousedown', trendingSwipeStart)
trendingSliderWrap.addEventListener('mouseup', trendingSwipeEnd)
trendingSliderWrap.addEventListener('touchstart', trendingSwipeStart)
trendingSliderWrap.addEventListener('touchend', trendingSwipeEnd)

trendingSlides.forEach(function (slide, index) {
  slide.dataset.index = index
})

function TrendingNextSlide() {

  const CurrentSlide = trendingSliderWrap.querySelector('[data-active]')


  if (CurrentSlide.nextElementSibling != null) {

    trendingSliderDots.forEach(function (dot) {
      dot.classList.remove('trending__slider-dot--active')
    })

    const CurrentSlideIndex = CurrentSlide.nextElementSibling.getAttribute('data-index')

    CurrentSlide.removeAttribute('data-active')
    CurrentSlide.nextElementSibling.dataset.active = ''
    trendingSliderWrap.style.cssText = `transform: translateX(calc(-${CurrentSlideIndex}00% - 30px));`

    document.querySelector(`#trendingDot${parseFloat(CurrentSlideIndex) + 1}`).classList.add('trending__slider-dot--active')

  }

}

function TrendingPrevSlide() {

  const CurrentSlide = trendingSliderWrap.querySelector('[data-active]')

  if (CurrentSlide.previousElementSibling != null) {

    trendingSliderDots.forEach(function (dot) {
      dot.classList.remove('trending__slider-dot--active')
    })

    const CurrentSlideIndex = CurrentSlide.previousElementSibling.getAttribute('data-index')
    CurrentSlide.removeAttribute('data-active')
    CurrentSlide.previousElementSibling.dataset.active = ''
    trendingSliderWrap.style.cssText = `transform: translateX(-${CurrentSlideIndex}00%);`

    document.querySelector(`#trendingDot${parseFloat(CurrentSlideIndex) + 1}`).classList.add('trending__slider-dot--active')

  }


}

function trendingSwipeStart(e) {
  trendingObj.posStart = e.clientX
}

function trendingSwipeEnd(e) {
  const posEnd = e.clientX
  if (0 < trendingObj.posStart - posEnd) {
    TrendingNextSlide()
  } else if (0 > trendingObj.posStart - posEnd) {
    TrendingPrevSlide()
  }
}

// =====================================TRENDING FILTER======================================

const TrendingTP = document.querySelector('#trending__TopProducts')
const TrendingNA = document.querySelector('#trending__NewArrivals')
const TrendingBS = document.querySelector('#trending__BestSellers')
const TrendingNEW = Array.from(document.querySelectorAll('.trending__new'))
const TrendingSELL = Array.from(document.querySelectorAll('.trending__sell'))
const TrendingPages = Array.from(trendingSliderWrap.children)
TrendingTP.addEventListener('click', TrendingTPfunc)
TrendingNA.addEventListener('click', TrendingNAfunc)
TrendingBS.addEventListener('click', TrendingBSfunc)



function TrendingRAfunc() {
  TrendingPages.forEach(function (page) {
    const cards = Array.from(page.children)
    cards.forEach(function (card) {
      card.classList.remove('trending__hidden')
    })
  })
}


function TrendingTPfunc(e) {
  e.preventDefault()
  TrendingRAfunc()
  this.classList.add('trending__subtitle--active')
  TrendingNA.classList.remove('trending__subtitle--active')
  TrendingBS.classList.remove('trending__subtitle--active')
}

function TrendingNAfunc(e) {
  e.preventDefault()
  TrendingRAfunc()
  TrendingSELL.forEach(function (card) {
    card.classList.add('trending__hidden')
  })
  this.classList.add('trending__subtitle--active')
  TrendingTP.classList.remove('trending__subtitle--active')
  TrendingBS.classList.remove('trending__subtitle--active')
}

function TrendingBSfunc(e) {
  e.preventDefault()
  TrendingRAfunc()
  TrendingNEW.forEach(function (card) {
    card.classList.add('trending__hidden')
  })
  this.classList.add('trending__subtitle--active')
  TrendingNA.classList.remove('trending__subtitle--active')
  TrendingTP.classList.remove('trending__subtitle--active')
}

// =====================================Timer Special======================================

const SpecialSeconds = document.querySelectorAll('.special__seconds span')

function SpecialTimer() {

  SpecialSeconds.forEach(function (timer) {
    const minutes = timer.parentElement.parentElement.querySelector('.special__minute span')
    const hours = timer.parentElement.parentElement.querySelector('.special__hours span')
    const days = timer.parentElement.parentElement.querySelector('.special__days span')
    if (parseInt(timer.innerHTML) <= 10) {
      timer.innerHTML = ` 0${parseInt(timer.innerHTML) - 1}`
    } else {
      timer.innerHTML = parseInt(timer.innerHTML) - 1
    }
    if (parseInt(timer.innerHTML) == 0) {
      if (parseInt(minutes.innerHTML) != 0) {
        timer.innerHTML = 59
        if (parseInt(minutes.innerHTML) <= 10) {
          minutes.innerHTML = ` 0${parseInt(minutes.innerHTML) - 1}`
        } else {
          minutes.innerHTML = parseInt(minutes.innerHTML) - 1
        }
      }
    }
    if (parseInt(minutes.innerHTML) == 0) {
      if (parseInt(hours.innerHTML) != 0) {
        minutes.innerHTML = 59
        if (parseInt(hours.innerHTML) <= 10) {
          hours.innerHTML = ` 0${parseInt(hours.innerHTML) - 1}`
        } else {
          hours.innerHTML = parseInt(hours.innerHTML) - 1
        }
      }
    }
    if (parseInt(hours.innerHTML) == 0) {
      if (parseInt(days.innerHTML) != 0) {
        hours.innerHTML = 23
        if (parseInt(days.innerHTML) <= 10) {
          days.innerHTML = ` 0${parseInt(days.innerHTML) - 1}`
        } else {
          days.innerHTML = parseInt(days.innerHTML) - 1
        }
      }
    }
    if (parseInt(days.innerHTML) == 0) {
      days.innerHTML = 0
    }
    if (parseInt(timer.innerHTML) == 0 && parseInt(minutes.innerHTML) == 0 && parseInt(hours.innerHTML) == 0 && parseInt(days.innerHTML) == 0) {
      timer.parentElement.parentElement.classList.add('special__timer--hidden')
      timer.parentElement.parentElement.parentElement.querySelector('.special__end-discount').classList.remove("special__end-discount--hidden")
    }
  })

}

setInterval(SpecialTimer, 1000)

// =====================================PRODUCTS SLIDER======================================

let ProductObj = {}

const Productslider = document.querySelector('.products__slider')
const ProductsliderWrap = document.querySelector('.products__slider-wrap')
const Productslides = Array.from(ProductsliderWrap.children)
const ProductPrevBtn = document.querySelectorAll('.products__prev-btn')
const ProductNextBtn = document.querySelectorAll('.products__next-btn')
const ProductNextBtn1 = document.querySelector('.products__next-btn-1')
const ProductPrevBtn1 = document.querySelector('.products__prev-btn-1')
const PageCounter = document.querySelector('.products__page-counter input')

ProductPrevBtn.forEach(function (btn) {
  btn.addEventListener('click', ProductPrevSlide)
  btn.addEventListener('click', ProductBtnInput)
})
ProductNextBtn.forEach(function (btn) {
  btn.addEventListener('click', ProductNextSlide)
  btn.addEventListener('click', ProductBtnInput)
})

Productslider.addEventListener('mousedown', ProductSwipeStart)
Productslider.addEventListener('mouseup', ProductSwipeEnd)
Productslider.addEventListener('touchstart', ProductSwipeStart)
Productslider.addEventListener('touchend', ProductSwipeEnd)
PageCounter.addEventListener('change', ChangeSlides)

Productslides.forEach(function (slide, index) {
  if (index == 0) {
    slide.dataset.active = ''
  }

  slide.dataset.index = index

})

function ProductNextSlide() {

  const CurrentSlide = ProductsliderWrap.querySelector('[data-active]')

  if (CurrentSlide.nextElementSibling != null) {
    const CurrentSlideIndex = CurrentSlide.nextElementSibling.getAttribute('data-index')
    CurrentSlide.removeAttribute('data-active')
    CurrentSlide.nextElementSibling.dataset.active = ''
    ProductsliderWrap.style.cssText = `transform: translateX(calc(-${CurrentSlideIndex}00% - (30px * ${CurrentSlideIndex})));`

  } else {

    CurrentSlide.removeAttribute('data-active')

    ProductsliderWrap.style.cssText = `transform: translateX(0%);`
    Productslides[0].dataset.active = ''
  }

}

function ProductPrevSlide() {

  const CurrentSlide = ProductsliderWrap.querySelector('[data-active]')
  if (CurrentSlide.previousElementSibling != null) {
    const CurrentSlideIndex = CurrentSlide.previousElementSibling.getAttribute('data-index')
    CurrentSlide.removeAttribute('data-active')
    CurrentSlide.previousElementSibling.dataset.active = ''
    ProductsliderWrap.style.cssText = `transform: translateX(calc(-${CurrentSlideIndex}00% - (30px * ${CurrentSlideIndex})));`
  } else {
    CurrentSlide.removeAttribute('data-active')
    ProductsliderWrap.style.cssText = `transform: translateX(calc(-${Productslides.length - 1}00% - (30px * ${Productslides.length - 1})));`
    Productslides[Productslides.length - 1].dataset.active = ''
  }


}

function ProductSwipeStart(e) {
  ProductObj.posStart = e.clientX
}

function ProductSwipeEnd(e) {
  const posEnd = e.clientX
  if (0 < ProductObj.posStart - posEnd) {
    ProductNextSlide()
  } else if (0 > ProductObj.posStart - posEnd) {
    ProductPrevSlide()
  }
  ProductBtnInput()
}

function ProductBtnInput() {
  const CurrentSlide = ProductsliderWrap.querySelector('[data-active]')
  const CurrentSlideIndex = +CurrentSlide.getAttribute('data-index')
  switch (CurrentSlideIndex) {
    case 0:
      ProductPrevBtn1.classList.add('products__btn-hide')
      ProductNextBtn1.classList.remove('products__btn-hide')
      break;
    case Productslides.length - 1:
      ProductPrevBtn1.classList.remove('products__btn-hide')
      ProductNextBtn1.classList.add('products__btn-hide')
      break;
    default:
      ProductPrevBtn1.classList.remove('products__btn-hide')
      ProductNextBtn1.classList.remove('products__btn-hide')
      break;
  }
  PageCounter.value = CurrentSlideIndex + 1
}

function ChangeSlides() {
  if (PageCounter.value == '') {
    PageCounter.value = 1
  }
  const CurrentSlide = ProductsliderWrap.querySelector('[data-active]')
  const CurrentSlideIndex = PageCounter.value - 1
  CurrentSlide.removeAttribute('data-active')
  Productslides[CurrentSlideIndex].dataset.active = ''
  ProductsliderWrap.style.cssText = `transform: translateX(calc(-${CurrentSlideIndex}00% - (30px * ${CurrentSlideIndex})));`
  switch (CurrentSlideIndex) {
    case 0:
      ProductPrevBtn1.classList.add('products__btn-hide')
      ProductNextBtn1.classList.remove('products__btn-hide')
      break;
    case Productslides.length - 1:
      ProductPrevBtn1.classList.remove('products__btn-hide')
      ProductNextBtn1.classList.add('products__btn-hide')
      break;
    default:
      ProductPrevBtn1.classList.remove('products__btn-hide')
      ProductNextBtn1.classList.remove('products__btn-hide')
      break;
  }
}

// =====================================PRODUCTS FILTER======================================

const ProductsAP = document.querySelector('.products__all-btn')
const ProductsBS = document.querySelector('.products__sell-btn')
const ProductsNA = document.querySelector('.products__new-btn')
const ProductsTD = document.querySelector('.products__deal-btn')
const ProductsNEW = Array.from(document.querySelectorAll('.products__new'))
const ProductsSELL = Array.from(document.querySelectorAll('.products__sell'))
const ProductsDEAL = Array.from(document.querySelectorAll('.products__deal'))
const ProductsPages = Array.from(ProductsliderWrap.children)

ProductsAP.addEventListener('click', ProductsAPfunc)
ProductsNA.addEventListener('click', ProductsNAfunc)
ProductsBS.addEventListener('click', ProductsBSfunc)
ProductsTD.addEventListener('click', ProductsTDfunc)



function ProductsRAfunc() {
  ProductsPages.forEach(function (page) {
    const cards = Array.from(page.children)
    cards.forEach(function (card) {
      card.classList.remove('products__hidden')
    })
  })
}


function ProductsAPfunc(e) {
  e.preventDefault()
  ProductsRAfunc()
  this.classList.add('products__filter-btn--active')
  ProductsNA.classList.remove('products__filter-btn--active')
  ProductsBS.classList.remove('products__filter-btn--active')
  ProductsTD.classList.remove('products__filter-btn--active')
}

function ProductsNAfunc(e) {
  e.preventDefault()
  ProductsRAfunc()
  ProductsSELL.forEach(function (card) {
    card.classList.add('products__hidden')
  })
  ProductsDEAL.forEach(function (card) {
    card.classList.add('products__hidden')
  })
  this.classList.add('products__filter-btn--active')
  ProductsAP.classList.remove('products__filter-btn--active')
  ProductsBS.classList.remove('products__filter-btn--active')
  ProductsTD.classList.remove('products__filter-btn--active')
}

function ProductsBSfunc(e) {
  e.preventDefault()
  ProductsRAfunc()
  ProductsNEW.forEach(function (card) {
    card.classList.add('products__hidden')
  })
  ProductsDEAL.forEach(function (card) {
    card.classList.add('products__hidden')
  })
  this.classList.add('products__filter-btn--active')
  ProductsNA.classList.remove('products__filter-btn--active')
  ProductsAP.classList.remove('products__filter-btn--active')
  ProductsTD.classList.remove('products__filter-btn--active')
}

function ProductsTDfunc(e) {
  e.preventDefault()
  ProductsRAfunc()
  ProductsNEW.forEach(function (card) {
    card.classList.add('products__hidden')
  })
  ProductsSELL.forEach(function (card) {
    card.classList.add('products__hidden')
  })
  this.classList.add('products__filter-btn--active')
  ProductsNA.classList.remove('products__filter-btn--active')
  ProductsAP.classList.remove('products__filter-btn--active')
  ProductsBS.classList.remove('products__filter-btn--active')
}

// =====================================Testi SLIDER======================================


let TestiObj = {}

const Testislider = document.querySelector('.testimonials__slider')
const TestisliderWrap = document.querySelector('.testimonials__slider-wrap')
const Testislides = Array.from(TestisliderWrap.children)
const TestiPrevBtn = document.querySelector('.testimonials__prev-btn')
const TestiNextBtn = document.querySelector('.testimonials__next-btn')

TestiNextBtn.addEventListener('click', TestiNextSlide)
TestiPrevBtn.addEventListener('click', TestiPrevSlide)
Testislider.addEventListener('mousedown', TestiSwipeStart)
Testislider.addEventListener('mouseup', TestiSwipeEnd)
Testislider.addEventListener('touchstart', TestiSwipeStart)
Testislider.addEventListener('touchend', TestiSwipeEnd)

Testislides.forEach(function (slide, index) {
  if (index == 0) {
    slide.dataset.active = ''
  }

  slide.dataset.index = index

})

function TestiNextSlide() {

  const CurrentSlide = TestisliderWrap.querySelector('[data-active]')

  if (CurrentSlide.nextElementSibling != null) {
    const CurrentSlideIndex = CurrentSlide.nextElementSibling.getAttribute('data-index')
    CurrentSlide.removeAttribute('data-active')
    CurrentSlide.nextElementSibling.dataset.active = ''
    TestisliderWrap.style.cssText = `transform: translateX(calc(-${CurrentSlideIndex}00% - (30px * ${CurrentSlideIndex})));`

  } else {

    CurrentSlide.removeAttribute('data-active')

    TestisliderWrap.style.cssText = `transform: translateX(0%);`
    Testislides[0].dataset.active = ''
  }

}

function TestiPrevSlide() {

  const CurrentSlide = TestisliderWrap.querySelector('[data-active]')

  if (CurrentSlide.previousElementSibling != null) {
    const CurrentSlideIndex = CurrentSlide.previousElementSibling.getAttribute('data-index')
    CurrentSlide.removeAttribute('data-active')
    CurrentSlide.previousElementSibling.dataset.active = ''
    TestisliderWrap.style.cssText = `transform: translateX(calc(-${CurrentSlideIndex}00% - (30px * ${CurrentSlideIndex})));`

  } else {

    CurrentSlide.removeAttribute('data-active')
    TestisliderWrap.style.cssText = `transform: translateX(calc(-${Testislides.length - 1}00% - (30px * ${Testislides.length - 1})));`
    Testislides[Testislides.length - 1].dataset.active = ''
  }


}


function TestiSwipeStart(e) {
  TestiObj.posStart = e.clientX
}

function TestiSwipeEnd(e) {
  if (!window.innerWidth <= 800){
    const posEnd = e.clientX
    if (0 < TestiObj.posStart - posEnd) {
      TestiNextSlide()
    } else if (0 > TestiObj.posStart - posEnd) {
      TestiPrevSlide()
    }
  }
}

function Breakpoint() {
  if (window.innerWidth <= 800) {
    TestisliderWrap.style.cssText = 'transform: translateX(0)'
  }
}


setInterval(Breakpoint, 200);

// =====================================BASKET======================================

const basket = document.querySelector('.header__basket span')
const Trendingbasket = Array.from(document.querySelectorAll('.trending__basket'))
const Productbasket = Array.from(document.querySelectorAll('.products__basket'))

Trendingbasket.forEach(function (baskets) {
  baskets.addEventListener('click', TrendingBasketFunc)
})

Productbasket.forEach(function (baskets) {
  baskets.addEventListener('click', ProdcutsBasketFunc)
})

function TrendingBasketFunc(e) {
  e.preventDefault();
  if (!this.classList.contains('trending__basket--active')) {
    this.classList.add('trending__basket--active');
    basket.innerHTML = +basket.innerHTML + 1
  } else {
    this.classList.remove('trending__basket--active');
    basket.innerHTML = +basket.innerHTML - 1
  }
  if (+basket.innerHTML != 0 || +basket.innerHTML != '') {
    basket.classList.remove('header__basket-span--hidden')
  } else {
    basket.classList.add('header__basket-span--hidden')
  }
}
function ProdcutsBasketFunc(e) {
  e.preventDefault();
  if (!this.classList.contains('products__basket--active')) {
    this.classList.add('products__basket--active');
    basket.innerHTML = +basket.innerHTML + 1
  } else {
    this.classList.remove('products__basket--active');
    basket.innerHTML = +basket.innerHTML - 1
  }
  if (+basket.innerHTML != 0 || +basket.innerHTML != '') {
    basket.classList.remove('header__basket-span--hidden')
  } else {
    basket.classList.add('header__basket-span--hidden')
  }
}

// =====================================BURGER======================================

const burger = document.querySelector('.burger')
const TopBar = document.querySelector('.header__top-bar')
const overlay = document.querySelector('.overlay')

burger.addEventListener('click', TopBarFunc)
overlay.addEventListener('click', TopBarFunc)

function TopBarFunc() {
  burger.classList.toggle('burger--active')
  TopBar.classList.toggle('header__top-bar--active')
  overlay.classList.toggle('overlay--active')
}

setInterval(function () {
  if (window.scrollY > 100) {
    burger.classList.remove('burger--follow')
  } else {
    burger.classList.add('burger--follow')
  }
}, 200);

(function () {
  const slideBox = document.querySelector('.slide_box_ver2');
  const slideList = document.querySelector('.slide_list2');
  const slideContents = document.querySelectorAll('.slide_content2');
  const slideBtnNext = document.querySelector('.slide_btn_next2');
  const slideBtnPrev = document.querySelector('.slide_btn_prev2');
  const slideBtnPlay = document.querySelector('.slide_btn_play2');
  const slideBtnStop = document.querySelector('.slide_btn_stop2');
  const pagination = document.querySelector('.slide_pagination2');
  let slideLen = slideContents.length;
  let slideWidth = slideList.clientWidth;
  let slideSpeed = 300;
  let curIndex = 0;

  function makeClone() {
    for (var i = 0; i < slideLen; i++) {
      var cloneSlide = slideContents[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      slideList.appendChild(cloneSlide);
    }

    let firstChild = slideList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    slideList.insertBefore(clonedFirst, slideList.firstElementChild);

    var currentSlides = document.querySelectorAll('.slide_content2');
    slideList.style.width = slideWidth * (currentSlides.length) + "px";
  }

  makeClone();

  //리사이즈
  // window.addEventListener("resize", () => {
  //   console.log('slideList width' + slideList.clientWidth);
  //   console.log('innerwidth:' + window.innerWidth);

  //   slideWidth = window.innerWidth / 2;
  //   newWidth();
  // });

  let pageChild = '';
  for (var i = 0; i < slideLen; i++) {
    pageChild += '<li class="dot dot2';
    pageChild += (i === curIndex) ? ' dot_active2' : '';
    pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
  }
  pagination.innerHTML = pageChild;
  const pageDots = document.querySelectorAll('.dot2');

  slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";

  let curSlide = slideContents[curIndex];
  curSlide.classList.add('slide_active');

  function nextMove() {
    console.log('nextMove');
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    }

    if (curIndex === slideLen - 1) {
      setTimeout(function () {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + (slideWidth) + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }

    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active2');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active2');
  }

  function prevMove() {
    if (curIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
    }
    if (curIndex === 0) {
      setTimeout(function () {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = slideLen;
    }

    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot_active2');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active2');
  }

  let autoPlayStart = setInterval(nextMove, 1000);

  function autoSlide() {
    clearInterval(autoPlayStart);
    autoPlayStart = setInterval(nextMove, 1000);
  }
  function stopSlide() {
    clearInterval(autoPlayStart);
  }

  let curDot;
  Array.prototype.forEach.call(pageDots, function (dot, i) {
    dot.addEventListener('click', function (e) {
      e.preventDefault();
      curDot = document.querySelector('.dot_active2');
      curDot.classList.remove('dot_active2');
      curDot = this;
      this.classList.add('dot_active2');
      curSlide.classList.remove('slide_active');
      curIndex = Number(this.getAttribute('data-index'));
      curSlide = slideContents[curIndex];
      curSlide.classList.add('slide_active');
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
    });
  });

  let startPoint = 0;
  let endPoint = 0;
  var stopFunc = function (e) {
    e.preventDefault();
    return false;
  };

  var all = document.querySelectorAll('*');

  slideList.addEventListener("mousedown", (e) => {
    console.log("mousedown", e.pageX);
    startPoint = e.pageX;
    e.preventDefault();
    slideList.addEventListener("mousemove", (e) => {
      for (var index in all) {
        var el2 = all[index];
        if (el2.addEventListener) {
          el2.addEventListener('click', stopFunc, true);
        }
      }
    });
  });

  slideList.addEventListener("mouseup", (e) => {
    console.log("mouseup", e.pageX);
    endPoint = e.pageX;
    if (startPoint < endPoint) {
      console.log("prev move");
      prevMove();
    } else if (startPoint > endPoint) {
      console.log("next move");
      nextMove();
    }

    slideList.addEventListener("mousemove", (e) => {
      for (var index in all) {
        var el2 = all[index];
        if (el2.addEventListener) {
          el2.removeEventListener('click', stopFunc, true);
        }
      }
    });
  });

  slideList.addEventListener("touchstart", (e) => {
    stopSlide();
    console.log("touchstart", e.touches[0].pageX);
    startPoint = e.touches[0].pageX;
  });

  slideList.addEventListener("touchend", (e) => {
    console.log("touchend", e.changedTouches[0].pageX);
    endPoint = e.changedTouches[0].pageX;

    var diffX = startPoint - endPoint;
    console.log("diffX", diffX);
    if (Math.abs(diffX) < 6) { }
    else if (startPoint < endPoint) {
      console.log("prev move");
      prevMove();
    } else if (startPoint > endPoint) {
      console.log("next move");
      nextMove();
    }

  });

  slideBtnPlay.addEventListener("click", () => {
    slideBtnPlay.style.display = "none";
    slideBtnStop.style.display = "block";

    autoSlide();
    slideBox.addEventListener("mouseenter", (e) => {
      e.preventDefault();
      autoSlide();
    });
    slideBox.addEventListener("mouseleave", (e) => {
      e.preventDefault();
      autoSlide();
    });
    slideBtnNext.addEventListener("click", () => {
      stopSlide();
    });
    slideBtnNext.addEventListener("mouseleave", () => {
      autoSlide();
    });
    slideBtnPrev.addEventListener("click", () => {
      stopSlide();
    });
    slideBtnPrev.addEventListener("mouseleave", () => {
      autoSlide();
    });
    pagination.addEventListener("click", () => {
      stopSlide();
    });
    pagination.addEventListener("mouseleave", () => {
      autoSlide();
    });
  });

  slideBtnStop.addEventListener("click", () => {
    slideBtnStop.style.display = "none";
    slideBtnPlay.style.display = "block";

    stopSlide();
    slideBox.addEventListener("mouseenter", (e) => {
      e.preventDefault();
      stopSlide();
    });
    slideBox.addEventListener("mouseleave", (e) => {
      e.preventDefault();
      stopSlide();
    });
    slideBtnNext.addEventListener("click", (e) => {
      e.preventDefault();
      stopSlide();
    });
    slideBtnNext.addEventListener("mouseleave", () => {
      stopSlide();
    });
    slideBtnPrev.addEventListener("click", (e) => {
      e.preventDefault();
      stopSlide();
    });
    slideBtnPrev.addEventListener("mouseleave", () => {
      stopSlide();
    });
    pagination.addEventListener("click", () => {
      stopSlide();
    });
    pagination.addEventListener("mouseleave", () => {
      stopSlide();
    });
  });  

  slideBox.addEventListener("touchstart", (e) => {
    stopSlide();
  });
  slideBox.addEventListener("touchend", (e) => {
    autoSlide();
  });

  slideBox.addEventListener("mouseenter", (e) => {
    e.preventDefault();
    stopSlide();
  });
  slideBox.addEventListener("mouseleave", (e) => {
    e.preventDefault();
    autoSlide();
  });

  slideBtnNext.addEventListener("click", () => {
    nextMove();
    console.log("nextMove");
  });
  slideBtnPrev.addEventListener("click", () => {
    prevMove();
    console.log("prevMove");
  });

})();

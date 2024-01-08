const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  loop: true, 
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});
// //swiper slider





document.addEventListener("DOMContentLoaded", function () {
  var mobileButton = document.querySelector(".mobile_button");
  var dimmed = createDimmedElement();
  var mobileNav = document.querySelector(".mobile_nav");
  var mobileSubmenus = document.querySelectorAll(".mobile_nav>ul>li>ul");

  mobileButton.addEventListener("click", function () {
    this.classList.toggle('flipped');
    toggleMobileNav();
  });

  dimmed.addEventListener("click", function () {
    hideMobileNav();
  });

  mobileSubmenus.forEach(function (submenu) {
    var parentItem = submenu.parentElement;

    parentItem.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();  // 메뉴클릭시 화면상단올라가는 기본동작 막아줌

      // 다른 서브메뉴 닫기
      closeOtherSubmenus(submenu);

      // 서브메뉴 토글
      toggleSubmenu(submenu);
    });
  });

  function toggleMobileNav() {
    if (mobileNav.classList.contains("on")) {
      hideMobileNav();
    } else {
      showMobileNav();
    }
  }

  function showMobileNav() {
    mobileNav.classList.add("on");
    dimmed.classList.add("active");
    mobileButton.classList.add("active");
  }

  function hideMobileNav() {
    mobileNav.classList.remove("on");
    dimmed.classList.remove("active");
    mobileButton.classList.remove("active");

    // 열려있는 서브메뉴 닫기
    mobileSubmenus.forEach(function (submenu) {
      hideSubmenu(submenu);
    });
  }

  function closeOtherSubmenus(currentSubmenu) {
    mobileSubmenus.forEach(function (submenu) {
      if (submenu !== currentSubmenu && submenu.classList.contains("show")) {
        hideSubmenu(submenu);
      }
    });
  }

  function toggleSubmenu(submenu) {
    if (submenu.classList.contains("show")) {
      hideSubmenu(submenu);
    } else {
      showSubmenu(submenu);
    }
  }

  function showSubmenu(submenu) {
    submenu.style.maxHeight = submenu.scrollHeight + "px";
    submenu.classList.add("show");
  }

  function hideSubmenu(submenu) {
    submenu.style.maxHeight = "0";
    submenu.classList.remove("show");
  }

  function createDimmedElement() {
    var dimmedElement = document.createElement("div");
    dimmedElement.classList.add("dimmed");
    document.body.appendChild(dimmedElement);
    return dimmedElement;
  }
  
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    if (width > 1200){ 
        hideMobileNav();
    }
  });
  // //mobile_nav





  let navListItems = document.querySelectorAll(".web_nav > ul > li");
// web_submenu내용이 있는 li만 오버시 메뉴출력

navListItems.forEach(item => {
  let submenu = item.querySelector(".web_submenu");
  if (submenu) {
    item.addEventListener("mouseover", () => {
      submenu.style.height = "159px";
      document.querySelector(".header_inner").classList.add("on");
    });

    item.addEventListener("mouseout", () => {
      submenu.style.height = "0px";
      document.querySelector(".header_inner").classList.remove("on");
    });
  }
});
  // //web_nav




  var topupButton = document.querySelector("#wrap .footer_inner .topup_button");

  // 스크롤 이벤트에 따라 버튼을 숨기거나 보이기
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) { // 200은 스크롤 위치 조절 값.스크롤 위치에 따라 조절
      showTopupButton();
    } else {
      hideTopupButton();
    }
  });

  // topup_button이 클릭되었을 때
  topupButton.addEventListener("click", function () {
    scrollToTop();
  });

  function scrollToTop() {
    var scrollDuration = 400;
    var startTime = performance.now();
    var startY = window.scrollY;

    function scrollAnimation(currentTime) {
      var elapsedTime = currentTime - startTime;

      window.scrollTo(0, easeInOut(elapsedTime, startY, -startY, scrollDuration));

      if (elapsedTime < scrollDuration) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // 스크롤 애니메이션 후 버튼 보이기
    requestAnimationFrame(function () {
      showTopupButton();
    });

    requestAnimationFrame(scrollAnimation);
  }

  function hideTopupButton() {
    topupButton.style.opacity = "0"; 
    topupButton.style.pointerEvents = "none"; // 클릭 이벤트 비활성화
  }

  function showTopupButton() {
    topupButton.style.opacity = "1"; 
    topupButton.style.pointerEvents = "auto"; // 클릭 이벤트 활성화
  }
  // //topup_btn





  var familySite = document.querySelector(".family_site");
  var familyMenu = document.querySelector(".family_menu");

  // family_menu가 열려있는지 추적하는 변수.
  var isMenuOpen = false;

  // 페이지가 로드되었을 때 'family_menu'를 숨김.
  familyMenu.style.maxHeight = "0px";
  familyMenu.style.visibility = "hidden";

  familySite.addEventListener("click", function (event) {
    event.stopPropagation();

    if (!isMenuOpen) {
      familyMenu.style.visibility = "visible";
      familyMenu.style.maxHeight = familyMenu.scrollHeight + "px";
    } else {
      familyMenu.style.maxHeight = "0px";
      // 'family_menu'가 완전히 닫힌 후에 'visibility: hidden;'을 적용하기 위한 코드
      setTimeout(function () {
        familyMenu.style.visibility = "hidden";
      }, 500); // 500은 css transition이랑 일치해야됨.
    }

    // 메뉴 상태를 업데이트.
    isMenuOpen = !isMenuOpen;
  });

  // 페이지의 어떤 곳을 클릭하더라도 'family_menu'를 닫기.
  document.addEventListener("click", function () {
    if (isMenuOpen) {
      familyMenu.style.maxHeight = "0px";
      setTimeout(function () {
        familyMenu.style.visibility = "hidden";
      }, 500);
      isMenuOpen = false;
    }
  });
  // //family_site
});

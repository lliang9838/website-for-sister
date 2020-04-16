let animateHTML = function () {
  let windowHeight;
  let hashMap = {};
  let lastScrollTop = 0;

  function init() {
    
    var containers = document.querySelectorAll(".animated-grid");

    for(let i = 0; i < containers.length; i++){
      hashMap[i] = containers[i];
    }

    windowHeight = window.innerHeight;
    addEventHandlers();
    checkPosition();
    const themeMap = {
      dark: "light",
      light: "solar",
      solar: "dark"
    };
    
    const theme = localStorage.getItem('theme')
      || (tmp = Object.keys(themeMap)[0],
          localStorage.setItem('theme', tmp),
          tmp);
    const bodyClass = document.body.classList;
    bodyClass.add(theme);
    
    function toggleTheme() {
      const current = localStorage.getItem('theme');
      const next = themeMap[current];
    
      bodyClass.replace(current, next);
      localStorage.setItem('theme', next);
    }
    
    document.getElementById('themeButton').onclick = toggleTheme;
  }

  function addEventHandlers() {
    window.addEventListener("scroll", checkPosition, false);
    window.addEventListener("resize", init);

    window.addEventListener("hashchange", function () {
      window.scrollTo(window.scrollX, window.scrollY - 50);
  });
  }

  // so would show the pictures 
  function checkPosition() {

      for(let key in hashMap) {
        let parent = hashMap[key];

        // get the mid point of the pictures
        let parentPosition = (parent.getBoundingClientRect().top + parent.getBoundingClientRect().bottom)/2;

        if (parentPosition - windowHeight <= 0) {
          let elems = parent.querySelectorAll(".hidden");
          for (let i = 0; i < elems.length; i++) {
            elems[i].className = elems[i].className.replace("hidden", "card");
          }
        }

        if (parentPosition - windowHeight > 1 || parentPosition < 0) {
          let elems = parent.querySelectorAll(".card");
          for (let i = 0; i < elems.length; i++) {
            elems[i].className = elems[i].className.replace("card", "hidden");
          }
        }
    }
  }

  return {
    init: init,
  };
};

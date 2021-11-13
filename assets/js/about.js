let info, spans;

window.addEventListener("load", (event) => {
  info = document.querySelector(".info");
  spans = document.querySelectorAll(".info span");
  landing = document.querySelector(".landing");
  setup = document.querySelector('.setup');

  infoObserver();
  spanObserver();
}, false);

function infoObserver() {
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  let observer = new IntersectionObserver((entries, observer)=> {
    entries.forEach((entry) => {
      if (entry.intersectionRatio && entry.isIntersecting){
        document.body.style.transition = "background-color 1500ms"
        document.body.style.backgroundColor = "#FF865E";
        // entry.target.style.scrollSnapAlign = 'start';
      } else if (entry.intersectionRatio){
        document.body.style.transition = "background-color 1500ms"
        document.body.style.backgroundColor = "rgb(164, 194, 221)";
        // entry.target.style.scrollSnapAlign = 'end';
      }
    });
  }, options);

  observer.observe(info);
}

function spanObserver() {
  let options = {
    root : null,
    rootMargin: "0px",
    threshold: 1
  };

  let observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach((entry) => {
      if (entry.intersectionRatio){
        entry.target.style.transition = "opacity 1500ms ease 500ms";
        entry.target.style.opacity = 1;        
      }
    })
  }, options);

  for (let index = 0; index < spans.length; index++) {
    observer.observe(spans[index]);
  }
}
gsap.registerPlugin(ScrollTrigger);
// helper function for causing the sections to always snap in the direction of the scroll (next section) rather than whichever section is "closest" when scrolling stops.
function directionalSnap(increment) {
  let snapFunc = gsap.utils.snap(increment);
  return (raw, self) => {
    let n = snapFunc(raw);
    return Math.abs(n - raw) < 1e-4 || n < raw === self.direction < 0
      ? n
      : self.direction < 0
      ? n - increment
      : n + increment;
  };
}
let sections = gsap.utils.toArray(".panel");
let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none", // <-- IMPORTANT!
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 0.1,
    // snap: directionalSnap(1 / (sections.length - 1)),
    end: "+=3000",
  },
});
["red", "gray", "green"].forEach((triggerClass, i) => {
  ScrollTrigger.create({
    trigger: "." + triggerClass,
    containerAnimation: scrollTween,
    start: "left 30%",
    end: i === 3 ? "right right" : "right 30%",
    markers: false,
  });
});
// gsap.set(".box-1, .box-2", {y: 100});
gsap.to(".box-1", {
  y: -130,
  duration: 2,
  ease: "elastic",
  scrollTrigger: {
    trigger: ".box-1",
    containerAnimation: scrollTween,
    start: "left center",
    toggleActions: "play none none reset",
    id: "1",
    markers: true,
    scrub: 1,
    id: "box1",
  },
});

ScrollTrigger.create({
  trigger: ".box-2",
  containerAnimation: scrollTween,
  toggleClass: "active",
  // scrub: 1,
  start: "center 80%",
  end: "end 30%",
  id: "box2",
  markers: true,
});

gsap.to(".scroll-down", {
  // rotation: 27,
  yPercent: -30,
  ease: "elastic",
  duration: 2,
  repeat: -1,
  yoyo: true,
});

const links = document.querySelectorAll('.link');
links.forEach((link, index)=>{
  link.addEventListener('click', (evt)=>{
    evt.preventDefault();
    let target = evt.target;
    let hash = target.hash;
    console.log(hash);

    gsap.to(window, {
      duration: 1,
      scrollTo: hash,
      ease: "Power1.easeInOut"
    });
  })
})

window.addEventListener('load', () => {
  gsap.to('.app', { autoAlpha: 1, duration: 0.3 });
});

gsap.to(".replace-text", {
  duration: 4,
  text: {
      value: "This is the new text",
      delimiter: "",
      newClass: "class2",
  },
  ease: "none"
});
gsap.to(".new-text", {
  duration: 3,
  text: {
      value: "This is the new text",
      delimiter: "",
      newClass: "class2",
  },
  ease: "none"
});

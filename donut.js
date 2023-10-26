import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

const canvasEl = document.querySelector("#my-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const textureLoader = new THREE.TextureLoader();
const alphaShadow = textureLoader.load("/assets/texture/simpleShadow.jpg");

const controls = new OrbitControls(camera, canvasEl);
controls.enableRotate = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 6;

let scrollY = window.scrollY;
let currentSection = 0;

const transformDonut = [
  {
    rotationZ: 0.9,
    positionX: 1.5094,
  },
  {
    rotationZ: -0.9,
    positionX: -1.5,
  },
  {
    rotationZ: 0.45,
    positionX: 0,
  },
  {
    rotationZ: -0.9,
    positionX: -2,
  },
];

let meshFlower;
const flMaterial = new THREE.MeshMatcapMaterial({
  matcap: new THREE.TextureLoader().load(
    "./assets/textures/matcaps/black-n-shiney.jpg"
  ),
});

function init(geometry) {
  meshFlower = new THREE.Mesh(geometry, flMaterial);
  scene.add(meshFlower);
  geometry.computeBoundingBox();
  var box = geometry.boundingBox;
  meshFlower.position.x = 1.5;
  meshFlower.rotation.z = Math.PI * 0.15;
  return meshFlower;
}
const loader = new OBJLoader();


function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
  if (meshFlower) {
    meshFlower.rotation.z -= 0.01;
  }
}
window.addEventListener('DOMContentLoaded', ()=>{
  loader.load("./assets/models/A_10.obj", (obj) => {
    init(obj.children[0].geometry);
  });
  animate();
})

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / window.innerHeight);

  console.log(newSection);

  if (newSection != currentSection) {
    currentSection = newSection;

    if (!!meshFlower) {
      gsap.to(meshFlower.rotation, {
        duration: 1,
        ease: "power2.inOut",
        z: transformDonut[currentSection].rotationZ,
      });
      gsap.to(meshFlower.position, {
        duration: 1,
        ease: "power2.inOut",
        x: transformDonut[currentSection].positionX,
      });
    }
  }
});

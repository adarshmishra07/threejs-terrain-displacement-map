import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from "dat.gui";

// const gui = new dat.GUI();

const loader = new THREE.TextureLoader();

const texture = loader.load("/texture/texture.jpg");
const height = loader.load("/height.png");
const alpha = loader.load("/alpha.jpeg");
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Cube
 */
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(3, 3, 64, 64),
  new THREE.MeshStandardMaterial({
    color: "grey",
    map: texture,
    displacementMap: height,
    displacementScale: 0.3,
    alphaMap: alpha,
    transparent: true,
    depthTest: false,
  })
);
scene.add(plane);

plane.rotation.x = 181;
plane.position.z = 1.8;

const pointLight = new THREE.PointLight("#ffd400", 2);
pointLight.position.x = 2;
pointLight.position.y = 10;
pointLight.position.z = 4;

scene.add(pointLight);

// const col = { color: "#00b3ff" };

// gui.addColor(col, "color").onChange(() => {
//   pointLight.color.set(col.color);
// });

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4));

let scale = 0;

window.addEventListener("mousemove", (e) => {
  scale = e.clientY;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   const deltaTime = elapsedTime - lastElapsedTime;
  //   lastElapsedTime = elapsedTime;

  // Update controls
  //   controls.update();

  plane.material.displacementScale = 0.2 + 0.0002 * scale;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

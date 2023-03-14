import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// every three.js project needs a scene, camera, and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); //full screen!
camera.position.setZ(30);

renderer.render(scene, camera) //draws to screen

// https://threejs.org/docs/index.html#api/en/geometries/TorusGeometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial( {color:0xFF6347, wireframe: true} );
const material = new THREE.MeshStandardMaterial( {color:0xFF6347} ); //allows light to bounce off of it
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff); //akin to a lightbulb
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff); //akin to a floodlight
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight); //to mark where the pointlight is for debugging
const gridHelper = new THREE.GridHelper(200, 50); //draws a grid (like a plane())
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement); //mouse can click and pan around!

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25); //radius of 0.025
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);

  // use THREE.js randfloatspread to generate random coordnates!
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar); //fill an array of 200 stars

// add a source image to the background! (i dont like how it looks though, esp with moving around)
// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update(); //update screen w user controls!

  renderer.render(scene, camera);
}

animate()
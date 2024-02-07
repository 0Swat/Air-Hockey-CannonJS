//////////////////////////////////////////////////// IMPORTY //////////////////////////////////////////////////////////
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

//////////////////////////////////////////////////// ZMIENNE //////////////////////////////////////////////////////////

var stol_x = 0;
var stol_y = 0;
var stol_z = 0;

var stol_szerokosc = 80;
var stol_dlugosc = 160;
var stol_wysokosc = 3.5;

var krazek_promien = 3.5;
var krazek_predkosc = 2;
var krazek_wysokosc = 1;

var odbijak_promien = 4;
var odbijak_predkosc = 1;

var camera_x = 0;
var camera_y = 170;
var camera_z = 150;

var bramka_szerokosc = stol_szerokosc/3;
var bramka_widocznosc = false;

var skala_pokoju = 70;

//TEXTRURY
const textureLoader = new THREE.TextureLoader();

import importedFiled from '../../img/fieldTexture.png';
import importedDetail from '../../img/detailTexture.png';

const fieldTexture = textureLoader.load( importedFiled );
const DetailTexture = textureLoader.load( importedDetail );

//OBSLUGA KLAWIATURY
var key = [];
document.addEventListener("keydown", function(event) {key[event.keyCode] = true;});
document.addEventListener("keyup", function(event) {key[event.keyCode] = false;});

///////////////////////////////////////////////////// SCENA /////////////////////////////////////////////////////////

//Tworzenie sceny, kamery, renderera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.01, 100000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );

//powiazanie renderera z <body>
document.body.appendChild( renderer.domElement );

//Pozycja kamery
camera.position.set(
    stol_x + camera_x,
    stol_y + camera_y,
    stol_z + camera_z
  );
  
camera.lookAt(stol_x, stol_y, stol_z);

//OrbitControls, gdy włączone pozycja stolu: 0,0,0
const controls = new OrbitControls( camera, renderer.domElement );
//controls.update();

///////////////////////////////////////////////////// FIGURY /////////////////////////////////////////////////////////

//ŚCIANY

//ściana 1a
const wall1aGeometry = new THREE.BoxGeometry(stol_szerokosc/2 - bramka_szerokosc/2, stol_wysokosc*stol_wysokosc, stol_wysokosc);
const wall1aMaterial = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall1a = new THREE.Mesh(wall1aGeometry, wall1aMaterial);
scene.add(wall1a);

//ściana 1b
const wall1bGeometry = new THREE.BoxGeometry(stol_szerokosc/2  - bramka_szerokosc/2, stol_wysokosc*stol_wysokosc, stol_wysokosc);
const wall1bMaterial = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall1b = new THREE.Mesh(wall1bGeometry, wall1bMaterial);
scene.add(wall1b);

//ściana 2a
const wall2aGeometry = new THREE.BoxGeometry(stol_szerokosc/2  - bramka_szerokosc/2, stol_wysokosc*stol_wysokosc, stol_wysokosc);
const wall2aMaterial = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall2a = new THREE.Mesh(wall2aGeometry, wall2aMaterial);
scene.add(wall2a);

//ściana 2b
const wall2bGeometry = new THREE.BoxGeometry(stol_szerokosc/2  - bramka_szerokosc/2, stol_wysokosc*stol_wysokosc, stol_wysokosc);
const wall2bMaterial = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall2b = new THREE.Mesh(wall2bGeometry, wall2bMaterial);
scene.add(wall2b);

//ściana 3
const wall3Geometry = new THREE.BoxGeometry(stol_wysokosc, stol_wysokosc*stol_wysokosc, stol_dlugosc);
const wall3Material = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall3 = new THREE.Mesh(wall3Geometry, wall3Material);
wall3.position.set(stol_x-(stol_szerokosc/2)-(stol_wysokosc/2),stol_y,stol_z);
scene.add(wall3);

//ściana 4
const wall4Geometry = new THREE.BoxGeometry(stol_wysokosc, stol_wysokosc*stol_wysokosc, stol_dlugosc);
const wall4Material = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall4 = new THREE.Mesh(wall4Geometry, wall4Material);
scene.add(wall4);

//ściana 5
const wall5Geometry = new THREE.BoxGeometry(stol_szerokosc/2  - bramka_szerokosc/2, (stol_wysokosc*stol_wysokosc)/2 - krazek_wysokosc - stol_wysokosc/2, stol_wysokosc);
const wall5Material = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall5 = new THREE.Mesh(wall5Geometry, wall5Material);
wall5.position.set( (stol_x), (stol_y + ((stol_wysokosc*stol_wysokosc)/4 - krazek_wysokosc*2 + stol_wysokosc/2)), (stol_z - stol_dlugosc/2 - stol_wysokosc/2) );
scene.add(wall5);

//ściana 6
const wall6Geometry = new THREE.BoxGeometry(stol_szerokosc/2  - bramka_szerokosc/2, (stol_wysokosc*stol_wysokosc)/2 - krazek_wysokosc - stol_wysokosc/2, stol_wysokosc);
const wall6Material = new THREE.MeshBasicMaterial({color: 0x532915, side: THREE.DoubleSide});
const wall6 = new THREE.Mesh(wall6Geometry, wall6Material);
wall6.position.set( (stol_x), (stol_y + ((stol_wysokosc*stol_wysokosc)/4 - krazek_wysokosc*2 + stol_wysokosc/2)), (stol_z + stol_dlugosc/2 + stol_wysokosc/2) );
scene.add(wall6);

//ZAOKRAGLENIE BOKOW
const roundGeometry = new THREE.CylinderGeometry(stol_wysokosc, stol_wysokosc, stol_wysokosc*stol_wysokosc, 32, 1, false, 0, Math.PI/2);
const roundMaterial = new THREE.MeshBasicMaterial({color: 0x432616, side:THREE.DoubleSide});
const round1 = new THREE.Mesh(roundGeometry, roundMaterial);
round1.position.set(40, 0, stol_dlugosc/2);

const round2 = new THREE.Mesh(roundGeometry, roundMaterial);
round2.position.set(-40, 0, stol_dlugosc/2);
round2.rotation.y = -Math.PI/2;

const round3 = new THREE.Mesh(roundGeometry, roundMaterial);
round3.position.set(40, 0, -stol_dlugosc/2);
round3.rotation.y = Math.PI/2;

const round4 = new THREE.Mesh(roundGeometry, roundMaterial);
round4.position.set(-40, 0, -stol_dlugosc/2);
round4.rotation.y = Math.PI;

const corners = new THREE.Group();
corners.add(round1);
corners.add(round2);
corners.add(round3);
corners.add(round4);
scene.add(corners);

//NOGI STOLU
const legGeometry = new THREE.CylinderGeometry(3, 1, 50, 4);
const legMaterial = new THREE.MeshBasicMaterial({color: 0x2e1503, side:THREE.DoubleSide});
const leg1 = new THREE.Mesh(legGeometry, legMaterial);
leg1.position.set(32.5, 0, -5);

const leg2 = new THREE.Mesh(legGeometry, legMaterial);
leg2.position.set(-32.5, 0, -5);

const leg3 = new THREE.Mesh(legGeometry, legMaterial);
leg3.position.set(32.5, 0, -155);

const leg4 = new THREE.Mesh(legGeometry, legMaterial);
leg4.position.set(-32.5, 0, -155);

const legs = new THREE.Group();
legs.add(leg1);
legs.add(leg2);
legs.add(leg3);
legs.add(leg4);
legs.position.y = -25;
legs.position.z = stol_szerokosc;
scene.add(legs);

//TABLICA Z WYNIKIEM
const scoreGeometry = new THREE.BoxGeometry(25, 10, 0.5);
const scoreMaterial = new THREE.MeshBasicMaterial({color:0xcc1111, side:THREE.DoubleSide});
const score = new THREE.Mesh(scoreGeometry, scoreMaterial);
score.position.set(0, 10, -80);

//RAMA TABLICY Z WYNIKAMI
const stickGeometry = new THREE.CylinderGeometry(1, 1, 36, 32);
const stickMaterial = new THREE.MeshBasicMaterial({color: 0x3a3a3a});
const stick1 = new THREE.Mesh(stickGeometry, stickMaterial);
stick1.position.set(-35.5, 0, -80);
stick1.rotation.z = -Math.PI/8;

const stick2 = new THREE.Mesh(stickGeometry, stickMaterial);
stick2.position.set(35.5, 0, -80);
stick2.rotation.z = Math.PI/8;

//GEOMETRIA BELKI TRZYMAJACEJ TABLICE
const sticklayGeometry = new THREE.CylinderGeometry(1, 1, 59, 32);
const sticklayMaterial = new THREE.MeshBasicMaterial({color: 0x3a3a3a});
const stick3 = new THREE.Mesh(sticklayGeometry, sticklayMaterial); //POZIOMA BELKA TRZYMAJACA TABLICE
stick3.rotation.z = -Math.PI/2;
stick3.position.set(0, 16.1, -80);

const stick4layGeometry = new THREE.CylinderGeometry(0.5, 0.5, 25, 32);
const stick4 = new THREE.Mesh(stick4layGeometry, sticklayMaterial); 
stick4.rotation.z = -Math.PI/2;
stick4.position.set(0, 5, -80);

const stick5layGeometry = new THREE.CylinderGeometry(0.5, 0.5, 11, 32);
const stick5 = new THREE.Mesh(stick5layGeometry, sticklayMaterial); 
stick5.position.set(13, 10, -80);

const stick6layGeometry = new THREE.CylinderGeometry(0.5, 0.5, 11, 32);
const stick6 = new THREE.Mesh(stick6layGeometry, sticklayMaterial); 
stick6.position.set(-13, 10, -80);

const rama = new THREE.Group();
rama.add(stick1);
rama.add(stick2);
rama.add(stick3);
rama.add(stick4);
rama.add(stick5);
rama.add(stick6);
rama.add(score);
rama.position.y = stol_szerokosc/4;
rama.position.z = stol_szerokosc;
scene.add(rama);

//POWIERZCHNIA
const flatGeometry = new THREE.BoxGeometry(stol_szerokosc, stol_dlugosc, stol_wysokosc);
const flatMaterial = new THREE.MeshBasicMaterial({ map: fieldTexture });
const flat = new THREE.Mesh(flatGeometry, flatMaterial);
scene.add(flat);

flat.rotation.x = -Math.PI/2;
flat.position.set(stol_x, stol_y, stol_z);

//DOL BLATU
const bottomGeometry = new THREE.BoxGeometry(stol_szerokosc, stol_wysokosc*2 - 1, stol_dlugosc + stol_wysokosc*2);
const bottomMaterial = new THREE.MeshBasicMaterial({color: 0x532915});
const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
scene.add(bottom);
bottom.position.set(stol_x, stol_y-stol_wysokosc+krazek_wysokosc/2, stol_z);


//KRAŻEK PODSATWA
const BaseGeometry = new THREE.CylinderGeometry(krazek_promien, krazek_promien, krazek_wysokosc, 64); //default 0.2, 64
const BaseMaterial = new THREE.MeshBasicMaterial({color: 0xfc6b02});
const krazekBase = new THREE.Mesh(BaseGeometry, BaseMaterial);

//KRAZEK DETAL
const DetailGeometry = new THREE.CircleGeometry(krazek_promien/2, 64);
const DetailMaterial = new THREE.MeshBasicMaterial({ map: DetailTexture });
const krazekDetail = new THREE.Mesh(DetailGeometry, DetailMaterial);
krazekDetail.rotation.x = -Math.PI/2;
krazekDetail.position.set(0, 0.61 ,0);

const krazek = new THREE.Group();
krazek.add(krazekBase);
krazek.add(krazekDetail);
scene.add(krazek);

krazek.position.set(stol_x, stol_y, stol_z);

//ODBIJAK 1

//TRZYMAK (CZERWONY)
const handleGeometry = new THREE.CylinderGeometry(odbijak_promien*2/5, odbijak_promien * 2/5, odbijak_promien, 64);
const handleMaterial = new THREE.MeshBasicMaterial({color: 0xcc0000});
const handle = new THREE.Mesh(handleGeometry, handleMaterial);
handle.position.set(0, 0, 0);

//KOLKO PODSTAWY (CZERWONE)
const baseGeometry = new THREE.CylinderGeometry(odbijak_promien, odbijak_promien, odbijak_promien/25, 64);
const baseMaterial = new THREE.MeshBasicMaterial({color: 0xaa0000});
const base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.set(0, -2.4, 0);


//SCIANY ODBIJAKA
const sidesGeometry = new THREE.CylinderGeometry(odbijak_promien + odbijak_promien/10, odbijak_promien, odbijak_promien*3/5, 64, 1, true);
const sidesMaterial = new THREE.MeshBasicMaterial({color:0xaa2233, side:THREE.DoubleSide});
const sides = new THREE.Mesh(sidesGeometry, sidesMaterial);
sides.position.set(0, -1.2, 0);

//WYKONCZENIE GORY
const sidetopGeometry = new THREE.TorusGeometry(odbijak_promien*1.1, odbijak_promien*3/50, odbijak_promien, 64);
const sidetopMaterial = new THREE.MeshBasicMaterial({color: 0xcc5588});
const sidetop = new THREE.Mesh(sidetopGeometry, sidetopMaterial);
sidetop.rotation.x = -Math.PI/2;
sidetop.position.set(0, 0.1, 0);

//OKRAGLY CZUBEK
const sticktopGeometry = new THREE.SphereGeometry(odbijak_promien * 21/50, 32, 16, 0, 2*Math.PI, 0, 1.3);
const sticktopMaterial = new THREE.MeshBasicMaterial({color: 0xcc0000});
const sticktop = new THREE.Mesh(sticktopGeometry, sticktopMaterial);
sticktop.position.set(0, odbijak_promien*19/50, 0);

const odbijak1 = new THREE.Group();
odbijak1.add(handle);
odbijak1.add(base);
odbijak1.add(sides);
odbijak1.add(sidetop);
odbijak1.add(sticktop);

scene.add(odbijak1);

//ODBIJAK 2

//TRZYMAK2 (NIEBIESKI)
const handle2Material = new THREE.MeshBasicMaterial({color: 0x0000cc});
const handle2 = new THREE.Mesh(handleGeometry, handle2Material);
handle2.position.set(0, 0, 0);

//KOLKO PODSTAWY2 (NIEBIESKA)
const base2Material = new THREE.MeshBasicMaterial({color: 0x0000aa});
const base2 = new THREE.Mesh(baseGeometry, base2Material);
base2.position.set(0, -2.4, 0);

//SCIANY ODBIJAKA2 (NIEBIESKIE)
const sides2Material = new THREE.MeshBasicMaterial({color:0x3322aa, side:THREE.DoubleSide});
const sides2 = new THREE.Mesh(sidesGeometry, sides2Material);
sides2.position.set(0, -1.2, 0);

//WYKONCZENIE GORY2
const sidetop2Material = new THREE.MeshBasicMaterial({color: 0X8855cc});
const sidetop2 = new THREE.Mesh(sidetopGeometry, sidetop2Material);
sidetop2.rotation.x = -Math.PI/2;
sidetop2.position.set(0, 0.1, 0);

//OKRAGLY CZUBEK2
const sticktop2Material = new THREE.MeshBasicMaterial({color: 0x0000cc});
const sticktop2 = new THREE.Mesh(sticktopGeometry, sticktop2Material);
sticktop2.position.set(0, odbijak_promien*19/50, 0);

const odbijak2 = new THREE.Group();
odbijak2.add(handle2);
odbijak2.add(base2);
odbijak2.add(sides2);
odbijak2.add(sidetop2);
odbijak2.add(sticktop2);


scene.add(odbijak2);

//////////////////////////////////////////////////// POKÓJ ///////////////////////////////////////////////////////

// Loader
const Loader = new GLTFLoader();

Loader.load('./assets/room/scene.gltf', function(gltf){
    const room = gltf.scene;
    room.scale.set(skala_pokoju,skala_pokoju,skala_pokoju);
    room.position.set(-120, 16, -200);
    room.rotation.set(0, Math.PI/2, 0);
    scene.add(room);
});

//////////////////////////////////////////////////// ŚWIATŁO ///////////////////////////////////////////////////////
const DirectionalLight = new THREE.DirectionalLight( 0xffffff, 2);
DirectionalLight.position.set( 0, 100, 0 );
DirectionalLight.castShadow = true;
scene.add( DirectionalLight );

//////////////////////////////////////////////////// STEROWANIE ///////////////////////////////////////////////////////
function keyboard() {
  //ODBIJAK1
  if (key['a'.charCodeAt(0)] || key['A'.charCodeAt(0)]) {
      if((odbijak1Body.position.x - odbijak_predkosc) <= ((-stol_szerokosc/2) + stol_x + odbijak_promien + 0.6))
      {
        odbijak1Body.position.x -= odbijak1Body.position.x - ((-stol_szerokosc/2)+stol_x+odbijak_promien + 0.6);
      }
      else odbijak1Body.position.x -= odbijak_predkosc;
  }
  if (key['d'.charCodeAt(0)] || key['D'.charCodeAt(0)]) {
      if((odbijak1Body.position.x + odbijak_predkosc) >= (stol_x + stol_szerokosc/2 - odbijak_promien - 0.6))
      {
        odbijak1Body.position.x += (stol_szerokosc/2 + stol_x - odbijak_promien - 0.6 - odbijak1Body.position.x);
      }
      else odbijak1Body.position.x += odbijak_predkosc;
  }  
  if (key['s'.charCodeAt(0)]|| key['S'.charCodeAt(0)]) {
      if((odbijak1Body.position.z + odbijak_predkosc) >= (stol_z + stol_dlugosc/2 - odbijak_promien - 0.6))
      {
        odbijak1Body.position.z += (stol_dlugosc/2 + stol_z - odbijak_promien - 0.6 - odbijak1Body.position.z);
      }
      else odbijak1Body.position.z += odbijak_predkosc;
  }
  if (key['w'.charCodeAt(0)] || key['W'.charCodeAt(0)] && (odbijak1Body.position.z > stol_z + odbijak_promien + krazek_promien)){  
    if((odbijak1Body.position.z - odbijak_predkosc) <= ((-stol_dlugosc/2) + stol_z + odbijak_promien))
    {
      odbijak1Body.position.z -= odbijak1Body.position.z - ((-stol_dlugosc/2)+stol_z+odbijak_promien);
    }
    else odbijak1Body.position.z -= odbijak_predkosc;
  }
//ODBIJAK2
  if (key['j'.charCodeAt(0)] || key['J'.charCodeAt(0)]) {
    if((odbijak2Body.position.x - odbijak_predkosc) <= ((-stol_szerokosc/2) + stol_x + odbijak_promien + 0.6))
    {
      odbijak2Body.position.x -= odbijak2Body.position.x - ((-stol_szerokosc/2)+stol_x+odbijak_promien+ 0.6);
    }
    else odbijak2Body.position.x -= odbijak_predkosc;
  }
  if (key['l'.charCodeAt(0)] || key['L'.charCodeAt(0)]) {
      if((odbijak2Body.position.x + odbijak_predkosc) >= (stol_x + stol_szerokosc/2 - odbijak_promien - 0.6))
      {
        odbijak2Body.position.x += (stol_szerokosc/2 + stol_x - odbijak_promien - 0.6 - odbijak2Body.position.x);
      }
      else odbijak2Body.position.x += odbijak_predkosc;
  }  
  if (key['k'.charCodeAt(0)]|| key['K'.charCodeAt(0)] && (odbijak2Body.position.z < stol_z - odbijak_promien - krazek_promien )) {
      if((odbijak2Body.position.z + odbijak_predkosc) >= (stol_z + stol_dlugosc/2 - odbijak_promien))
      {
        odbijak2Body.position.z += (stol_dlugosc/2 + stol_z - odbijak_promien - odbijak2Body.position.z);
      }
      else odbijak2Body.position.z += odbijak_predkosc;
  }
  if (key['i'.charCodeAt(0)] || key['I'.charCodeAt(0)]){  
    if((odbijak2Body.position.z - odbijak_predkosc) <= ((-stol_dlugosc/2) + stol_z + odbijak_promien + 0.6))
    {
      odbijak2Body.position.z -= odbijak2Body.position.z - ((-stol_dlugosc/2)+stol_z+odbijak_promien + 0.6);
    }
    else odbijak2Body.position.z -= odbijak_predkosc;
  }
}

//////////////////////////////////////////////////// FIZYKA ///////////////////////////////////////////////////////

//ŚWIAT
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -98.1, 0) //-9.81 default
});

//BLAT
const flatPhysMat = new CANNON.Material();
const flatBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(stol_szerokosc/2, stol_dlugosc/2, stol_wysokosc/2)),
  type: CANNON.Body.STATIC,
  position: new CANNON.Vec3(stol_x,stol_y,stol_z),
  material: flatPhysMat
});
world.addBody(flatBody);
flatBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

//ODBIJAKI
const odbijakPhysMat = new CANNON.Material();
const odbijak1Body = new CANNON.Body({
  mass: 1000,
  shape: new CANNON.Cylinder(odbijak_promien, odbijak_promien, 12, 64),
  position: new CANNON.Vec3(stol_x, stol_y+10  , stol_z + (stol_dlugosc/2) - odbijak_promien*3),
  material: odbijakPhysMat
});
world.addBody(odbijak1Body);

const odbijak2Body = new CANNON.Body({
  mass: 1000,
  shape: new CANNON.Cylinder(odbijak_promien, odbijak_promien, 12, 64),
  position: new CANNON.Vec3(stol_x, stol_y+10  , stol_z - (stol_dlugosc/2) + odbijak_promien*3),
  material: odbijakPhysMat
});
world.addBody(odbijak2Body);

//ŚCIANY

const wallPhysMat = new CANNON.Material();

//ściana 1a
const wall1aBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3( (stol_szerokosc/2 - bramka_szerokosc/2)/2, (stol_wysokosc*stol_wysokosc)/2, stol_wysokosc/2 ) ),
  position: new CANNON.Vec3( (stol_x - stol_szerokosc/2 - bramka_szerokosc/2)/2, (stol_y)/2, (stol_z - stol_dlugosc)/2 - stol_wysokosc/2 ),
  material: wallPhysMat
});
world.addBody(wall1aBody);

//ściana 1b
const wall1bBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3( (stol_szerokosc/2 - bramka_szerokosc/2)/2, (stol_wysokosc*stol_wysokosc)/2, stol_wysokosc/2 ) ),
  position: new CANNON.Vec3( (stol_x + stol_szerokosc/2 + bramka_szerokosc/2)/2, (stol_y)/2, (stol_z - stol_dlugosc)/2 - stol_wysokosc/2 ),
  material: wallPhysMat
});
world.addBody(wall1bBody);

//ściana 2
const wall2aBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3( (stol_szerokosc/2 - bramka_szerokosc/2)/2, (stol_wysokosc*stol_wysokosc)/2, stol_wysokosc/2 ) ),
  position: new CANNON.Vec3( (stol_x - stol_szerokosc/2 - bramka_szerokosc/2)/2, (stol_y)/2, (stol_z + stol_dlugosc)/2 + stol_wysokosc/2 ),
  material: wallPhysMat
});
world.addBody(wall2aBody);

//ściana 2b
const wall2bBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3( (stol_szerokosc/2 - bramka_szerokosc/2)/2, (stol_wysokosc*stol_wysokosc)/2, stol_wysokosc/2 ) ),
  position: new CANNON.Vec3( (stol_x + stol_szerokosc/2 + bramka_szerokosc/2)/2, (stol_y)/2, (stol_z + stol_dlugosc)/2 + stol_wysokosc/2 ),
  material: wallPhysMat
});
world.addBody(wall2bBody);

//ściana 3
const wall3Body = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3(stol_wysokosc/2, (stol_wysokosc*stol_wysokosc)/2, (stol_dlugosc)/2)),
  position: new CANNON.Vec3(stol_x-(stol_szerokosc/2)-(stol_wysokosc/2),stol_y,stol_z),
  material: wallPhysMat
});
world.addBody(wall3Body);

//ściana 4
const wall4Body = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3(stol_wysokosc/2, (stol_wysokosc*stol_wysokosc)/2, (stol_dlugosc)/2)),
  position: new CANNON.Vec3(stol_x+(stol_szerokosc/2)+(stol_wysokosc/2),stol_y,stol_z),
  material: wallPhysMat
});
world.addBody(wall4Body);


//ściana 5
const wall5Body = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3( (stol_szerokosc/2  - bramka_szerokosc/2)/2, ((stol_wysokosc*stol_wysokosc)/2 - krazek_wysokosc - stol_wysokosc/2)/2, (stol_wysokosc)/2 )),
  position: new CANNON.Vec3(  (stol_x), (stol_y + ((stol_wysokosc*stol_wysokosc)/4 - krazek_wysokosc/2 + stol_wysokosc/2)) + 0.125, (stol_z - stol_dlugosc/2 - stol_wysokosc/2) ),
  material: wallPhysMat
});
world.addBody(wall5Body);

//ściana 6
const wall6Body = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Box(new CANNON.Vec3( (stol_szerokosc/2  - bramka_szerokosc/2)/2, ((stol_wysokosc*stol_wysokosc)/2 - krazek_wysokosc - stol_wysokosc/2)/2, (stol_wysokosc)/2 )),
  position: new CANNON.Vec3(  (stol_x), (stol_y + ((stol_wysokosc*stol_wysokosc)/4 - krazek_wysokosc/2 + stol_wysokosc/2)) + 0.125, (stol_z + stol_dlugosc/2 + stol_wysokosc/2) ),
  material: wallPhysMat
});
world.addBody(wall6Body);

//bramka 1
const goal1Geometry = new THREE.BoxGeometry(stol_szerokosc/2  - bramka_szerokosc/2, stol_wysokosc*2, stol_wysokosc);
const goal1Material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
const goal1 = new THREE.Mesh(goal1Geometry, goal1Material);
goal1.position.set( (stol_x), (stol_y), (stol_z - stol_dlugosc/2 - stol_wysokosc/2 - 4) );
goal1.visible = bramka_widocznosc;
scene.add(goal1);

//bramka 2
const goal2Geometry = new THREE.BoxGeometry(stol_szerokosc/2  - bramka_szerokosc/2, stol_wysokosc*2, stol_wysokosc);
const goal2Material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
const goal2 = new THREE.Mesh(goal2Geometry, goal2Material);
goal2.position.set( (stol_x), (stol_y), (stol_z + stol_dlugosc/2 + stol_wysokosc/2 + 4) );
goal2.visible = bramka_widocznosc;
scene.add(goal2);

//KRĄŻEK
const krazekPhysMat = new CANNON.Material();
const krazekBody = new CANNON.Body({
  mass: 0.028,
  shape: new CANNON.Cylinder(krazek_promien, krazek_promien, krazek_wysokosc, 64),
  position: new CANNON.Vec3(stol_x, (stol_y+stol_wysokosc/2), stol_z),
  material: krazekPhysMat
});
world.addBody(krazekBody);
//krazekBody.applyForce(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(100, 0, krazek_promien));

//////////////////////TARCIE/////////////////////////

krazekBody.linearDamping = 0; // opor powietrza

const flatKrazekContactMaterial = new CANNON.ContactMaterial(
  flatPhysMat,
  krazekPhysMat,
  {friction: -10}
);
world.addContactMaterial( flatKrazekContactMaterial );

const wallKrazekContactMaterial = new CANNON.ContactMaterial(
  wallPhysMat,
  krazekPhysMat,
  {friction: -100}
);
world.addContactMaterial( wallKrazekContactMaterial );

const odbijakKrazekContactMaterial = new CANNON.ContactMaterial(
  odbijakPhysMat,
  krazekPhysMat,
  {friction: -1000}
);
world.addContactMaterial( odbijakKrazekContactMaterial );

const odbijakFlatContactMaterial = new CANNON.ContactMaterial(
  odbijakPhysMat,
  flatPhysMat,
  {friction:1}
);
world.addContactMaterial( odbijakFlatContactMaterial );

//////////////////////////////////////////////////// MECHANIKA ///////////////////////////////////////////////////////

UstawKrazekLosowo();

var CzerwonyPunkt = false;
var NiebieskiPunkt = false;

var PunktyCzerwony = 0;
var PunktyNiebieski = 0;

function getRandomBinary()
{
  return Math.floor(Math.random() * 2);
}

function SprawdzajKrazek()
{
  if(krazekBody.position.y < stol_y - 50)
  {
    if(CzerwonyPunkt == true)
    {
      UstawKrazekNiebieski();
    }
    else if(NiebieskiPunkt == true)
    {
      UstawKrazekCzerwony();
    }
    else
    {
      UstawKrazekLosowo();
    }
    updateScore();
  }
  
}

function UstawKrazekLosowo()
{

  const random = getRandomBinary(); 

  if(random == 1)
  {
    krazekBody.position.set(stol_x, stol_y + 20, stol_z + 50);
  }
  if(random == 0)
  {
    krazekBody.position.set(stol_x, stol_y + 20, stol_z - 50);
  }
  krazekBody.velocity.set(0,0,0);
  odbijak1Body.position.set(stol_x, stol_y+20  , stol_z + (stol_dlugosc/2) - odbijak_promien*3);
  odbijak2Body.position.set(stol_x, stol_y+20  , stol_z - (stol_dlugosc/2) + odbijak_promien*3);
}

function UstawKrazekCzerwony()
{
  krazekBody.position.set(stol_x, stol_y + 20, stol_z + 50);
  krazekBody.velocity.set(0,0,0);
  odbijak1Body.position.set(stol_x, stol_y+20  , stol_z + (stol_dlugosc/2) - odbijak_promien*3);
  odbijak2Body.position.set(stol_x, stol_y+20  , stol_z - (stol_dlugosc/2) + odbijak_promien*3);
  PunktyCzerwony+=1;
}

function UstawKrazekNiebieski()
{
  krazekBody.position.set(stol_x, stol_y + 20, stol_z - 50);
  krazekBody.velocity.set(0,0,0);
  odbijak1Body.position.set(stol_x, stol_y+20  , stol_z + (stol_dlugosc/2) - odbijak_promien*3);
  odbijak2Body.position.set(stol_x, stol_y+20  , stol_z - (stol_dlugosc/2) + odbijak_promien*3);
  PunktyNiebieski+=1;
}

function CheckCollision(object1, object2) 
{
  var box1 = new THREE.Box3().setFromObject(object1);
  var box2 = new THREE.Box3().setFromObject(object2);

  var collision = box1.intersectsBox(box2);

  return collision;
}

//WYNIK
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 256;

const context = canvas.getContext('2d');
context.font = 'Bold 130px HighSpeed, Arial';
context.fillStyle = '#ffffff';
context.textAlign = 'center';
context.textBaseline = 'middle';

const wynik_texture = new THREE.CanvasTexture(canvas);

scoreMaterial.map = wynik_texture;

function updateScore() {
  CzerwonyPunkt = false;
  NiebieskiPunkt = false;
  // Wyczyść canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  if(PunktyCzerwony<10 && PunktyNiebieski<10)
  {
    context.fillText(`0${PunktyCzerwony} `, canvas.width / 2 - 100, canvas.height / 2);
    context.fillText(`:`, canvas.width / 2 + 8, canvas.height / 2);
    context.fillText(` 0${PunktyNiebieski}`, canvas.width / 2 + 100, canvas.height / 2);
  }
  else if(PunktyCzerwony<10 && PunktyNiebieski>9)
  {
    context.fillText(`0${PunktyCzerwony} `, canvas.width / 2 - 100, canvas.height / 2);
    context.fillText(`:`, canvas.width / 2, canvas.height / 2);
    context.fillText(` ${PunktyNiebieski}`, canvas.width / 2 + 100, canvas.height / 2);
  }
  else if(PunktyCzerwony>9 && PunktyNiebieski<10)
  {
    context.fillText(`${PunktyCzerwony} `, canvas.width / 2 - 100, canvas.height / 2);
    context.fillText(`:`, canvas.width / 2, canvas.height / 2);
    context.fillText(` 0${PunktyNiebieski}`, canvas.width / 2 + 100, canvas.height / 2);
  }
  else
  {
    context.fillText(`${PunktyCzerwony} `, canvas.width / 2 - 100, canvas.height / 2);
    context.fillText(`:`, canvas.width / 2, canvas.height / 2);
    context.fillText(` ${PunktyNiebieski}`, canvas.width / 2 + 100, canvas.height / 2);
  }

  // Zaktualizuj teksturę
  wynik_texture.needsUpdate = true;
}


//////////////CZAS/////////////
const timeStep = 1/30;

function CannonPositions()
{
    krazek.position.copy(krazekBody.position);
    krazek.quaternion.copy(krazekBody.quaternion);

    //odbijak1Body.position.copy(odbijak1.position);
    //odbijak1Body.quaternion.copy(odbijak1.quaternion);

    odbijak1.position.copy(odbijak1Body.position);
    odbijak1.quaternion.copy(odbijak1Body.quaternion);
    odbijak1.position.y -= 3.2;
    

    //odbijak2Body.position.copy(odbijak2.position);
    //odbijak2Body.quaternion.copy(odbijak2.quaternion);

    odbijak2.position.copy(odbijak2Body.position);
    odbijak2.quaternion.copy(odbijak2Body.quaternion);
    odbijak2.position.y -= 3.2;

    wall1a.position.copy(wall1aBody.position);
    wall1a.quaternion.copy(wall1aBody.quaternion);

    wall1b.position.copy(wall1bBody.position);
    wall1b.quaternion.copy(wall1bBody.quaternion);

    wall2a.position.copy(wall2aBody.position);
    wall2a.quaternion.copy(wall2aBody.quaternion);

    wall2b.position.copy(wall2bBody.position);
    wall2b.quaternion.copy(wall2bBody.quaternion);

    wall3.position.copy(wall3.position);
    wall3.quaternion.copy(wall3Body.quaternion);

    wall4.position.copy(wall4Body.position);
    wall4.quaternion.copy(wall4Body.quaternion);

    wall5.position.copy(wall5Body.position);
    wall5.quaternion.copy(wall5Body.quaternion);

    wall6.position.copy(wall6Body.position);
    wall6.quaternion.copy(wall6Body.quaternion);

    flat.position.copy(flatBody.position);
    flat.quaternion.copy(flatBody.quaternion);

    
    
    //camera.position.set(odbijak1.position.x, camera_y, odbijak1.position.z + 50);

}

//////////////////////////////////////////////////// FUNKCJE ///////////////////////////////////////////////////////

animate();
updateScore();

function renderScene(){

  CannonPositions();

  if(CheckCollision(krazek, goal1) == true) {NiebieskiPunkt = true;}
  if(CheckCollision(krazek, goal2) == true) {CzerwonyPunkt = true;}
  
  SprawdzajKrazek();
  
  world.step(timeStep);
  
  renderer.render(scene, camera);
}

//ZMIANA ROZMIARU SCENY DOPASOWANA DO WIELKOŚCI OKNA
window.addEventListener('resize', function()
{
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//ANIMACJA
function animate() {
  requestAnimationFrame( animate );

  keyboard();

	renderScene();
};


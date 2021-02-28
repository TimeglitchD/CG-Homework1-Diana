//MAKE SURE TO LOAD ALL OTHER FILES BEFORE THIS ONE

const scene = new THREE.Scene();

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

// Define light
var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);


var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.shadow.camera = new THREE.OrthographicCamera( -100, 100, 100, -100, 0.5, 1000 );
light.castShadow = true;
light.position.set(300, 200, -150);
scene.add(light);





// ADD ALL OBJECTS HERE

createLandscape();
const camera = createCamera();
//our house
createHouse(new THREE.Vector3( 0, 0, 4 ), new THREE.Quaternion(), new THREE.Vector3(2,1.5,3));
//our garage/barn
createHouse(new THREE.Vector3( -2, 0, 8 ), new THREE.Quaternion(), new THREE.Vector3(2,1,3));
var barnq = new THREE.Quaternion()
barnq.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
createHouse(new THREE.Vector3( -.5, 0, 10 ), barnq, new THREE.Vector3(2,1.1,5));

//neigbours
createHouse(new THREE.Vector3( -50, 0, 10 ), new THREE.Quaternion(), new THREE.Vector3(2,1.1,5));
createHouse(new THREE.Vector3( 50, 0, 10 ), new THREE.Quaternion(), new THREE.Vector3(2,1.1,3));
createHouse(new THREE.Vector3( -50, 0, -2 ), barnq, new THREE.Vector3(2,1.1,3));
createHouse(new THREE.Vector3( -10, 0, -20 ), new THREE.Quaternion(), new THREE.Vector3(2,1.1,3));
createHouse(new THREE.Vector3( 2, 0, -20 ), barnq, new THREE.Vector3(2,1.1,3));
createHouse(new THREE.Vector3( 10, 0, -10 ), barnq, new THREE.Vector3(2,1.1,2));
createHouse(new THREE.Vector3( 50, 0, -10 ), barnq, new THREE.Vector3(4,3,4));
createHouse(new THREE.Vector3( -55, 0, -20 ), new THREE.Quaternion, new THREE.Vector3(5,3,5));

//lantarns
createLantern(new THREE.Vector3( -40, 0, -1 ), new THREE.Quaternion(), new THREE.Vector3(1,1,1));
createLantern(new THREE.Vector3( 3, 0, -1 ), new THREE.Quaternion(), new THREE.Vector3(1,1,1));
createLantern(new THREE.Vector3( 50, 0, -1 ), new THREE.Quaternion(), new THREE.Vector3(1,1,1));

//trees
createTree(new THREE.Vector3( 2, 0, 2 ), new THREE.Quaternion(), new THREE.Vector3(1,5,1));
createTree(new THREE.Vector3( 3, 0, 3 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( 3, 0, 4 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( 3, 0, 6 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));

createTree(new THREE.Vector3( -8, 0, -2 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( -8, 0, -4 ), new THREE.Quaternion(), new THREE.Vector3(1,4,1));
createTree(new THREE.Vector3( -8, 0, -6 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( -8, 0, -8 ), new THREE.Quaternion(), new THREE.Vector3(1,3.5,1));

createTree(new THREE.Vector3( 8, 0, -2 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( 8, 0, -4 ), new THREE.Quaternion(), new THREE.Vector3(1,4,1));
createTree(new THREE.Vector3( 8, 0, -6 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( 8, 0, -8 ), new THREE.Quaternion(), new THREE.Vector3(1,4,1));
createTree(new THREE.Vector3( 12, 0, -1 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( 12, 0, -3 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));
createTree(new THREE.Vector3( 12, 0, -5 ), new THREE.Quaternion(), new THREE.Vector3(1,4,1));
createTree(new THREE.Vector3( 12, 0, -7 ), new THREE.Quaternion(), new THREE.Vector3(1,4,1));
createTree(new THREE.Vector3( 12, 0, -9 ), new THREE.Quaternion(), new THREE.Vector3(1,3,1));

//car
createModel(new THREE.Vector3( -2, 0, 4 ), new THREE.Quaternion(), new THREE.Vector3(.2,.2,.2), "1967-shelby-ford-mustang-threejs/1967-shelby-ford-mustang.json");
//mailbox
var mailq = new THREE.Quaternion();
mailq.setFromAxisAngle(new THREE.Vector3(0,0,Math.PI), Math.PI);
createModel(new THREE.Vector3( -3, 0.25, 2 ), mailq, new THREE.Vector3(.5,.5,.5), "mailbox-threejs/mailbox.json");



var render = function () {
    requestAnimationFrame(render);
    createSnowFlake();
    animateSnow();
    animateLeaves();
    renderer.render(scene, camera);
}

render();

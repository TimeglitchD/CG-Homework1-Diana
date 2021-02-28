// Scene variables
const speed = .03;
const floorHeight = .2;

// Create scene
const scene = new THREE.Scene();

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create camera
var camera = new THREE.PerspectiveCamera(
    75,     // fov - Camera frustum vertical field of view
    window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
    0.1,   // near - Camera frustum near plane
    5000); // far - Camera frustum far plane
// Far clipping plane above will not work, because skybox is 5000x5000x5000. Try 2500

var camera_pivot = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);

// Import camera control and rotation library
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.noKeys = false;
controls.keys = { LEFT: 65, UP: 81, RIGHT: 68, BOTTOM: 69 };


// Move camera from center
camera.position.x = 2;  // Move right from center of scene
camera.position.y = 1;  // Move up from center of scene
camera.position.z = 5;  // Move camera away from center of scene
controls.target = new THREE.Vector3(2,1,5.01);
controls.update();

const direction = new THREE.Vector3();
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    camera.getWorldDirection(direction);
    var correction = new THREE.Vector3(-direction.z, 0, direction.x);
    switch (keyCode)
    {
        case 32:
            camera.position.set(2, 1, 5);
            controls.target = new THREE.Vector3(2,1,5.01);
            break;
        case 65: //LEFT
            camera.position.addScaledVector(correction, -speed);
            controls.target.addScaledVector(correction, -speed);
            if(camera.position.y < floorHeight){
                camera.position.addScaledVector(new THREE.Vector3(0, -correction.y, 0),speed);
                controls.target.addScaledVector(new THREE.Vector3(0, -correction.y, 0),speed);
            }
            break;
        case 68: //RIGHT
            camera.position.addScaledVector(correction, speed);
            controls.target.addScaledVector(correction, speed);
            if(camera.position.y < floorHeight){
                camera.position.addScaledVector(new THREE.Vector3(0, -correction.y, 0),speed);
                controls.target.addScaledVector(new THREE.Vector3(0, -correction.y, 0),speed);
            }
            break;
        case 87: //FORWARD
            camera.position.addScaledVector(direction, speed);
            controls.target.addScaledVector(direction, speed);
            if(camera.position.y < floorHeight){
                camera.position.addScaledVector(new THREE.Vector3(0, -direction.y, 0),speed);
                controls.target.addScaledVector(new THREE.Vector3(0, -direction.y, 0),speed);
            }
            break;
        case 83: //BACKWARD
            camera.position.addScaledVector(direction, -speed);
            controls.target.addScaledVector(direction, -speed);
            if(camera.position.y < floorHeight){
                camera.position.addScaledVector(new THREE.Vector3(0, -direction.y, 0),speed);
                controls.target.addScaledVector(new THREE.Vector3(0, -direction.y, 0),speed);
            }
            break;
        case 81: //UP
            camera.position.y++;
            controls.target.y++;
            break;
        case 69: //DOWN
            if(camera.position.y > floorHeight)
            {
                camera.position.y--;
                controls.target.y--;
            }
            break;
        default:
            break;
    }
    controls.update();
};




// Create skybox
var directions = ["posx.bmp", "negx.bmp", "posy.bmp", "negy.bmp", "posz.bmp", "negz.bmp"];
var skyMaterial = [];
for (var i = 0; i < 6; i++) {
    skyMaterial.push(
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(directions[i]),
            side: THREE.BackSide
        })
    );
}


var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skyBox);

// Create geometry for earth
var earthGeometry = new THREE.SphereGeometry(1, 32, 24);
var earthNormalMap = new THREE.TextureLoader().load("earth_normal.jpg");
var earthColorMap = new THREE.TextureLoader().load("earth.jpg");
var earthMaterial = new THREE.MeshPhongMaterial({ map: earthColorMap, normalMap: earthNormalMap });
var earth = new THREE.Mesh(earthGeometry, earthMaterial);
//scene.add(earth);

// Create floor
const floorT = new THREE.TextureLoader().load("grass.jpg");
floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping;
floorT.repeat.set( 5000, 5000 );
floorT.anisotropy = 16;
floorT.encoding = THREE.sRGBEncoding;

var floorM = new THREE.MeshLambertMaterial( { map: floorT } );

var floor = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), floorM );
floor.position.y = 0.0;
floor.rotation.x = - Math.PI / 2;
floor.receiveShadow = true;
scene.add( floor );

// CREATE TEXTURE FOR REFLECTIVE OBJECTS
skyTexture = new THREE.CubeTextureLoader().load(directions);

var createHouse = function(_position, _rotation, _scale, _body, _roof)
{
    
    const bodyG = new THREE.CubeGeometry( 1, 1, 2);
    var bodyM = new THREE.MeshPhongMaterial({color: 0xAAAAAA});
    var body = new THREE.Mesh(bodyG, bodyM);
    body.position.copy(_position);
    body.position.y += _scale.z/2;
    body.quaternion.copy(_rotation);
    body.scale.copy(_scale);
    body.updateMatrix();
    body.receiveShadow = true;
    body.castShadow = true;
    scene.add(body);



    const roofG = new THREE.CylinderGeometry( 5, 5, 10, 3 );
    var roofM = new THREE.MeshPhongMaterial({color: 0xAAAAAA});
    var roof = new THREE.Mesh(roofG, roofM);
    roof.position.copy( _position);
    roof.quaternion.copy(_rotation);
    roof.scale.copy(_scale);
    roof.updateMatrix();

    var materials = [bodyM, roofM];
    
    var houseG = new THREE.Geometry();
    houseG.merge(body.geometry, body.matrix, 0);
    houseG.merge(roof.geometry, roof.matrix, 1);
    var house = new THREE.Mesh(houseG, materials);

	//scene.add(house);
}

var createSatellite = function(_position, _rotation, _scale)
{
    
    const pipeG = new THREE.CylinderGeometry( .1, .1, 5, 32);
    var pipeM = new THREE.MeshPhongMaterial({envMap: skyTexture, color: 0xAAAAAA, combine: THREE.MixOperation});
    var pipe = new THREE.Mesh(pipeG, pipeM);
    //scene.add(pipe);
    pipe.position.copy(_position);
    pipe.quaternion.copy(_rotation);
    pipe.scale.copy(_scale);
    pipe.rotation.z += .5 * Math.PI;
    pipe.updateMatrix();


    const baseG = new THREE.CylinderGeometry( .1, 1, 5, 32 );
    var baseM = new THREE.MeshPhongMaterial({envMap: skyTexture, color: 0xAAAAAA, combine: THREE.MixOperation});
    var base = new THREE.Mesh(baseG, baseM);
    //scene.add(base);
    base.position.copy( _position);
    base.quaternion.copy(_rotation);
    base.scale.copy(_scale);
    base.updateMatrix();

    const topG = new THREE.ConeGeometry( .2, 2, 32 );
    var topM = new THREE.MeshPhongMaterial({color: 0x000000});
    var top = new THREE.Mesh(topG, topM);
    //scene.add(top);
    top.position.copy(_position);
    top.quaternion.copy(_rotation);
    top.scale.copy(_scale);
    top.position.y += 2.5;
    top.updateMatrix();
    
    var materials = [pipeM, baseM, topM];
    
    var satelliteG = new THREE.Geometry();
    satelliteG.merge(pipe.geometry, pipe.matrix, 0);
    satelliteG.merge(base.geometry, base.matrix, 1);
    satelliteG.merge(top.geometry, top.matrix, 2);
    var satellite = new THREE.Mesh(satelliteG, materials);

    satellite.scale.set(0.5,0.5,0.5);
	scene.add(satellite);
}

const position = new THREE.Vector3( 0, 0, 0 );
const rotation = new THREE.Quaternion();
const scale = new THREE.Vector3(1,1,1);

createHouse(position, rotation, scale);

// Define light
var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(30, 20, -20);
scene.add(light);
var render = function () {
    requestAnimationFrame(render);
    
    //rotate earth around y axis and slightly around x axis
    //var time = Date.now() * 0.0001;
	//earth.rotation.x = Math.sin(time*0.5) * 0.5;
	//earth.rotation.y = Math.PI * time;
    controls.update();
    renderer.render(scene, camera);
}

render();

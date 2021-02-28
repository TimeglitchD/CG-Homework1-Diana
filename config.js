// constants and variables
const tUrl = "textures/";
const floorHeight = .2;
const speed = .5;
const directions = [tUrl+'posx.bmp', tUrl+'negx.bmp', tUrl+'posy.bmp', tUrl+'negx.bmp', tUrl+'posz.bmp', tUrl+'negz.bmp'];
const loader = new THREE.ObjectLoader();
var flakes = []
var continueFlakes = []
var removeFlakes = []
const animationSpeed = 0.10;
var spheres = [];

// materials and textures
var bricks = new THREE.TextureLoader().load(tUrl+"bricks.jpg");
var bodyM = new THREE.MeshPhongMaterial({map: bricks});

var tiles = new THREE.TextureLoader().load(tUrl+"tiles.jpg");
var roofM = new THREE.MeshPhongMaterial({map: tiles});

skyTexture = new THREE.CubeTextureLoader().load(directions);

metalTexture = new THREE.TextureLoader().load(tUrl+"bumpmap_metal.jpg");
metalTexture.wrapS = metalTexture.wrapT = THREE.RepeatWrapping;
metalTexture.repeat.set( 1, 1000 );
metalTexture.anisotropy = 16;
metalTexture.encoding = THREE.sRGBEncoding;

var pipeM = new THREE.MeshPhongMaterial({envMap: skyTexture, bumpMap: metalTexture, bumpScale: .1});

var lightM = new THREE.MeshPhongMaterial({emissive: 0xFFFF00, emissiveIntensity: .5});

var woodM = new THREE.MeshPhongMaterial({color: 0x964B00});

leafTexture = new THREE.TextureLoader().load(tUrl+"bumpmap_leaves.jpg");
leafTexture.wrapS = leafTexture.wrapT = THREE.RepeatWrapping;
leafTexture.repeat.set( 5, 5 );
leafTexture.anisotropy = 16;
leafTexture.encoding = THREE.sRGBEncoding;

var sphereM = new THREE.MeshPhongMaterial({color: 0x228B22, bumpMap: leafTexture, bumpScale: .1});

var snowM = new THREE.MeshPhongMaterial({color: 0xFFFFFF});

const roadT = new THREE.TextureLoader().load(tUrl+"road.jpg");
roadT.wrapS = roadT.wrapT = THREE.RepeatWrapping;
roadT.repeat.set( 5000, 2 );
roadT.anisotropy = 16;
roadT.encoding = THREE.sRGBEncoding;
const roadN = new THREE.TextureLoader().load(tUrl+"roadnormal.png");
roadN.wrapS = roadN.wrapT = THREE.RepeatWrapping;
roadN.repeat.set( 5000, 2 );
roadN.anisotropy = 16;
roadN.encoding = THREE.sRGBEncoding;
var roadM = new THREE.MeshPhongMaterial( { map: roadT, normalMap: roadN } );

var skyMaterial = [];
for (var i = 0; i < 6; i++) {
    skyMaterial.push(
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(directions[i]),
            side: THREE.BackSide
        })
    );
}

const floorT = new THREE.TextureLoader().load(tUrl+"grass.jpg");
floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping;
floorT.repeat.set( 5000, 5000 );
floorT.anisotropy = 16;
floorT.encoding = THREE.sRGBEncoding;

var floorM = new THREE.MeshLambertMaterial( { map: floorT} );
var createLandscape = function()
{
    // Create skybox
    var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyBox);

    // Create floor
    var floor = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), floorM );
    floor.position.y = 0.0;
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    scene.add( floor );

    // Create road
    var road = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 2 ), roadM );
    road.position.y = 0.01;
    road.rotation.x = - Math.PI / 2;
    road.receiveShadow = true;
    road.castShadow = true;
    scene.add( road );

}



var createHouse = function(_position, _rotation, _scale, _body, _roof)
{
    const bodyG = new THREE.CubeGeometry( 1, 1, 1);
    var body = new THREE.Mesh(bodyG, bodyM);
    body.position.copy(_position);
    body.position.y += _scale.y/2;
    body.quaternion.copy(_rotation);
    body.scale.copy(_scale);
    body.updateMatrix();
	body.receiveShadow = true;
    body.castShadow = true;
    scene.add(body);

    const roofG = new THREE.CylinderGeometry( 1, 1, 1, 3 ); // cylinder with three sides = prisma
    var roof = new THREE.Mesh(roofG, roofM);
    roof.position.copy( _position);
    roof.scale.copy(new THREE.Vector3(_scale.x, _scale.z, _scale.y)); //roof was rotated over x, so z and y switch
    roof.quaternion.copy(_rotation);
    //switch y and z rotation
    var y = roof.rotation.y;
    roof.rotation.y = roof.rotation.z;
    roof.rotation.z = y;

    roof.rotation.x = -Math.PI/2; //turn roof right side up
    roof.scale.z -= 0.5*roof.scale.z; // flatten the roof
    roof.scale.x *= 0.7;
    roof.scale.y *= 1.1;
    roof.position.y = body.scale.y + body.scale.y/4;
    roof.updateMatrix();
	roof.receiveShadow = true;
    roof.castShadow = true;
    scene.add(roof);

}

var createLantern = function(_position, _rotation, _scale)
{
    // create reflection
    
    const pipeG = new THREE.CylinderGeometry( .07, .07, 1, 32);
   
    var pipe = new THREE.Mesh(pipeG, pipeM);
    pipe.position.copy(_position);
    pipe.position.y += 3;
    pipe.position.z += .5;
    pipe.quaternion.copy(_rotation);
    pipe.scale.copy(_scale);
    pipe.scale.z -= .5;
    pipe.position.y += _scale.z/2;
    pipe.rotation.x += .5 * Math.PI;
    pipe.updateMatrix();
    
    pipe.receiveShadow = true;
    pipe.castShadow = true;
    scene.add(pipe);

    const baseG = new THREE.CylinderGeometry( .07, .07, 6, 32 );
    var base = new THREE.Mesh(baseG, pipeM);
    base.position.copy( _position);
    base.quaternion.copy(_rotation);
    base.scale.copy(_scale);
    base.position.y += _scale.z/2;
    base.updateMatrix();
    
    base.receiveShadow = true;
    base.castShadow = true;
    scene.add(base);

    const lightG = new THREE.CylinderGeometry( .05, .05, .5, 32 );
    var light = new THREE.Mesh(lightG, lightM);
    light.position.copy(_position);
    light.position.y += 2.95;
    light.position.z += .7;
    light.quaternion.copy(_rotation);
    light.scale.copy(_scale);
    light.position.y += _scale.z/2;
    light.rotation.x += .5 * Math.PI;
    light.updateMatrix();
    
    light.receiveShadow = true;
    light.castShadow = true;
    scene.add(light);
}

var createTree = function(_position, _rotation, _scale)
{
    var scaly = _scale.y;
    createCanopy(_position, new THREE.Vector3(1,scaly,0), .8);
    createCanopy(_position, new THREE.Vector3(0,scaly,0), .9);
    createCanopy(_position, new THREE.Vector3(0,scaly,1), .8);
    createCanopy(_position, new THREE.Vector3(0,scaly,0), 1);
    createCanopy(_position, new THREE.Vector3(1,scaly,0), .6);
    createCanopy(_position, new THREE.Vector3(1,scaly,1), .7);
    createCanopy(_position, new THREE.Vector3(0,scaly,-1), .8);
    createCanopy(_position, new THREE.Vector3(-1,scaly+.5,-.5), .7);
    createCanopy(_position, new THREE.Vector3(-.2,scaly+1,.2), .8);
    createCanopy(_position, new THREE.Vector3(.3,scaly+1,-.2), .7);


    const woodG = new THREE.CylinderGeometry( .3, .3, 1, 32);
    var wood = new THREE.Mesh(woodG, woodM);
    wood.position.copy(_position);
    wood.quaternion.copy(_rotation);
    wood.scale.copy(_scale);
    wood.position.y += _scale.y/2;
    wood.updateMatrix();
    
    wood.receiveShadow = true;
    wood.castShadow = true;
    scene.add(wood);
}

var createCanopy = function(_position, __position, _size){
    var v1=new THREE.Vector3();
    v1.copy(_position);
    v1.add(__position);
    
    const sphereG = new THREE.SphereGeometry( _size, 32, 32, 0, Math.PI*2, 0, Math.PI);
    var sphere = new THREE.Mesh(sphereG, sphereM);
    sphere.position.copy(v1);
    sphere.updateMatrix();

    sphere.receiveShadow = true;
    sphere.castShadow = true;
    scene.add(sphere);
    spheres.push(sphere);
}

var createModel = function(_position, _rotation, _scale, url)
{
    // Load json models
    loader.load(
        // resource URL
        url,

        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
            // Add the loaded object to the scene
            obj.position.x = _position.x;
            obj.position.y = _position.y;
            obj.position.z = _position.z;
            obj.rotation.x = _rotation.x;
            obj.rotation.y = _rotation.y;
            obj.rotation.z = _rotation.z;
            obj.scale.x = _scale.x;
            obj.scale.y = _scale.y;
            obj.scale.z = _scale.z;
            //obj.updateMatrix();
            scene.add(obj);
        },

        // onProgress callback
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // onError callback
        function ( err ) {
            console.error( 'An error happened' );
        }
        
    );
    
}

var createSnowFlake = function(){
    if(flakes.length < 200) // only create a new snowflake if there are less than 200.
    {
        var radius = Math.random()*.10;
        var detail = Math.floor(Math.random()*6);
        var snowG = new THREE.TetrahedronGeometry(radius, detail) // create snowflake with random amount of sides and random size.
        var snow = new THREE.Mesh(snowG, snowM);
        snow.position.x = Math.random()*100-50;
        snow.position.y = Math.random()*50+50;
        snow.position.z = Math.random()*100-50;
        snow.rotation.x = Math.random()*2.00*Math.PI;
        snow.rotation.y = Math.random()*2.00*Math.PI;
        snow.rotation.z = Math.random()*2.00*Math.PI;
        snow.castShadow = true;
        snow.receiveShadow = true;
        
        scene.add(snow);
        flakes.push(snow);
    }
}

var animateSnow = function(){
    flakes.forEach(snow => {
        snow.position.y -= animationSpeed; //fall down
        
        snow.position.x += (Math.random()*animationSpeed-(animationSpeed/2));
        snow.position.z += (Math.random()*animationSpeed-(animationSpeed/2));
        
        snow.rotation.x += Math.random()*animationSpeed-(animationSpeed/2);
        snow.rotation.z += Math.random()*animationSpeed-(animationSpeed/2);
        snow.rotation.z += Math.random()*animationSpeed-(animationSpeed/2);
        if(snow.position.y > floorHeight-1){ //check if snowflakes got through the floor
            continueFlakes.push(snow);
        }else{
            removeFlakes.push(snow);
        }
    });

    flakes = continueFlakes;
    continueFlakes = [];

    removeFlakes.forEach(snow => { //delete invisible snowflakes
        snow.geometry.dispose();
        snow.material.dispose();
        scene.remove( snow );
    });
    removeFlakes = [];

}

var animateLeaves = function(){ //move and scale the spheres on each tree randomly
    spheres.forEach(sphere => {
        sphere.position.y += (Math.random()*animationSpeed-(animationSpeed/2))*.01;
        sphere.position.x += (Math.random()*animationSpeed-(animationSpeed/2))*.01;
        sphere.position.z += (Math.random()*animationSpeed-(animationSpeed/2))*.01;
        sphere.scale.y += (Math.random()*animationSpeed-(animationSpeed/2))*.01;
        sphere.scale.x += (Math.random()*animationSpeed-(animationSpeed/2))*.01;
        sphere.scale.z += (Math.random()*animationSpeed-(animationSpeed/2))*.01;
    });
}
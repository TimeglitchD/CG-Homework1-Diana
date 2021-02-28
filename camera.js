var createCamera = function(){

    // Create camera
    var camera = new THREE.PerspectiveCamera(
        75,     // fov - Camera frustum vertical field of view
        window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
        0.1,   // near - Camera frustum near plane
        5000); // far - Camera frustum far plane
    // Far clipping plane above will not work, because skybox is 5000x5000x5000. Try 2500

    var camera_pivot = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.noKeys = false;
    controls.keys = { LEFT: 65, UP: 81, RIGHT: 68, BOTTOM: 69 };


    // Move camera from center
    camera.position.x = -2;  // Move right from center of scene
    camera.position.y = 1;  // Move up from center of scene
    camera.position.z = -4;  // Move camera away from center of scene
    controls.target = new THREE.Vector3(-2,1,-3.99);
    controls.update();

    // All camera movements
    const direction = new THREE.Vector3();
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        camera.getWorldDirection(direction);
        var correction = new THREE.Vector3(-direction.z, 0, direction.x);
        switch (keyCode)
        {
            case 32: // Reset
                camera.position.set(-2, 1, -4);
                controls.target = new THREE.Vector3(-2,1,-3.99);
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
                    camera.position.addScaledVector(new THREE.Vector3(0, +direction.y, 0),speed);
                    controls.target.addScaledVector(new THREE.Vector3(0, +direction.y, 0),speed);
                }
                break;
            case 81: //UP
                camera.position.y+=speed;
                controls.target.y+=speed;
                break;
            case 69: //DOWN
                    camera.position.y-=speed;
                    controls.target.y-=speed;
                if(camera.position.y < floorHeight) // Check for floor
                {
                    camera.position.y+=speed;
                    controls.target.y+=speed;
                }
                break;
            default:
                break;
        }
        controls.update();
    };
    return camera;
}

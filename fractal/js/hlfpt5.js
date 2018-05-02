var scene, camera, oribiter, renderer; // scene and camera(s)
var plane, top_plane_geometry, top_plane, sml_sphere, med_sphere, lrg_sphere; // geometries
var box_texture, top_plane_texture, bottom_plane_texture, top_material, bottom_material, phong_material; // textures and materials
var ambient_light, direct_light, cool_wisp, pale_wisp, warm_wisp, energy_wisp; // lighting elements
var clock = new THREE.Clock(); // clock for an animation purpose
var edge_w = 5.0;
var edge_h = 6.75;
var levels = 10;

var geometry = new THREE.CubeGeometry( edge_w, edge_h, edge_w ); // tree geometry 1


setup();   // initializes the scene
animate(); // starts rendering scene


// colors of purple: 0x331832, 0x694d75, 0xa183c4, 0xb497d6, 0xccabf2, 0x85678f, 0xb294bb

function setup() {
	// sets up scene and camera
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 20, 60);
	oribiter = new THREE.OrbitControls(camera);
	oribiter.autoRotate = true;
	oribiter.autoRotateSpeed = 4.25;
	oribiter.update();
	
	// this is for the initial "block(s)" for the tree to function.
  var root, sub_root1, sub_root2;
  var color; 
  color = new THREE.Color(0xff0000);
  material = new THREE.MeshPhongMaterial( {color:color, wireframe: false} );
	root = new THREE.Mesh(geometry, material);
	/*sub_root1 = new THREE.Mesh(geometry, material);
	sub_root1.position.x = 2;
	sub_root1.position.y = -2;
	sub_root1.position.z = 2;
	sub_root2 = new THREE.Mesh(geometry, material);
	sub_root2.position.x = -3;
	sub_root2.position.y = 4;
	sub_root2.position.z = -5; */ //delete the sub_root1 and sub_root2 stuff
	scene.add(root);
	// scene.add(sub_root1);
	// scene.add(sub_root2);
	root.matrixAutoUpdate = false;
	// sub_root1.matrixAutoUpdate = false;
	// sub_root2.matrixAutoUpdate = false;

	// need these geometries for the plane and the wisps
	sml_sphere = new THREE.SphereBufferGeometry(0.25, 8, 8);
	med_sphere = new THREE.SphereBufferGeometry(0.40, 16, 16);
	lrg_sphere = new THREE.SphereBufferGeometry(0.60, 32, 32);
	top_plane_geometry = new THREE.PlaneBufferGeometry(35, 35, 35, 35);
	// bottom_plane_geometry = new THREE.PlaneBufferGeometry(35, 35, 35, 35);
	// bottom_plane_geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
	// bottom_plane_geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(0-Math.PI));

	// texture loading and material setting
	box_texture = new THREE.TextureLoader().load('./texture/tree_bark_square.jpg');
	top_plane_texture = new THREE.TextureLoader().load('./texture/ground_square.jpg');
	// bottom_plane_texture = new THREE.TextureLoader().load('./texture/birch_square.jpg');
	phong_material = new THREE.MeshPhongMaterial( { map: box_texture } );
	top_material = new THREE.MeshBasicMaterial({ map: top_plane_texture, side: THREE.DoubleSide });
	// bottom_material = new THREE.MeshLambertMaterial({ map: bottom_plane_texture, side: THREE.DoubleSide });

	// lighting and positioning
	ambient_light = new THREE.AmbientLight(0xe5b0ff);
	direct_light = new THREE.DirectionalLight(0x90dbb9);

	// creates "wisps" of a color, intensity, distance where intensity is 0, with lighting decay.
	cool_wisp = new THREE.PointLight(0x0bc5ff, 2.0, 100, 2);
	cool_wisp.add(new THREE.Mesh(sml_sphere, new THREE.MeshBasicMaterial( {color: 0x0bc5ff} )));
	scene.add(cool_wisp);

	pale_wisp = new THREE.PointLight(0xd6d9d9, 1.75, 75, 2);
	pale_wisp.add(new THREE.Mesh(sml_sphere, new THREE.MeshBasicMaterial( {color: 0xd6d9d9} )));
	scene.add(pale_wisp);

	warm_wisp = new THREE.PointLight(0xe34234, 1.33, 66, 1);
	warm_wisp.add(new THREE.Mesh(med_sphere, new THREE.MeshBasicMaterial( {color: 0xe34234} )));
	scene.add(warm_wisp);

	energy_wisp = new THREE.PointLight(0x9acd32, 1.25, 50, 1);
	energy_wisp.add(new THREE.Mesh(lrg_sphere, new THREE.MeshBasicMaterial( {color: 0x9acd32} )));
	scene.add(energy_wisp);

	// rederer setup
	renderer = new THREE.WebGLRenderer( {antialias: true} );
	renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
	document.body.appendChild(renderer.domElement);

	// plane setup
	top_plane = new THREE.Mesh(top_plane_geometry, top_material);
	// bottom_plane = new THREE.Mesh(bottom_plane_geometry, bottom_material);
	plane = new THREE.Object3D();
	plane.add(top_plane);
	// plane.add(bottom_plane);
	scene.add(plane);

	// scene setup
	scene.background = new THREE.Color(0x331822);
	scene.add(ambient_light);
	scene.add(direct_light);

	// window resize listener
	window.addEventListener('resize', onResize, false);

	// tree setup
	var self = this;
	var W, H;
	var geometry, material;
	var pointLight, ambientLight;
	var mouseX = 0;
	var mouseY = 0;
	var nbmesh = 1;
	var edge_w = 100;
	var edge_h = 150;
	var levels = 12;

	tree(levels, root.matrix.clone(), color);
	// tree(levels-2, sub_root1.matrix.clone(), color);
	// tree(levels-4, sub_root2.matrix.clone(), color);
}

// function for the drawing of the tree. 
// Algorithm credit: Josep Llodrà (https://codepen.io/jllodra/pen/aqLlg).
// Only the tree algorithm was used for this project.
function tree (n, mat, c) {
	if(n > 0) {
		var new_mat = new THREE.Matrix4();
		var new_mat_t = new THREE.Matrix4();
		var new_mat_r = new THREE.Matrix4();
		var new_mat_r2 = new THREE.Matrix4();
		var new_mat_s = new THREE.Matrix4();
		var mat1 = mat.clone();
		var mat2 = mat.clone();
		var col1 = c.clone();
		var col2 = c.clone();
		col1.offsetHSL(0.12,0,0);
		material = new THREE.MeshPhongMaterial( { color:col1, wireframe: false } );
		mesh = new THREE.Mesh(geometry, phong_material);
		new_mat_t.makeTranslation(edge_w/1.66,edge_h*0.95,0);
		new_mat_r.makeRotationZ(-Math.PI/4);
		new_mat_s.makeScale(0.75,0.75,0.75);
		new_mat.multiplyMatrices(new_mat_t, new_mat_r);
		new_mat.multiply(new_mat_s);
		mat1.multiply(new_mat);
		mesh.matrix.copy(mat1);
		mesh.matrixAutoUpdate=false;
		mesh.updateMatrix=false; //
		scene.add(mesh);
		tree(n-1, mesh.matrix.clone(), col1);

		col2.offsetHSL(0.12,0,0);
		material = new THREE.MeshPhongMaterial( { color:col2, wireframe: false } );
		mesh = new THREE.Mesh(geometry, phong_material);
		new_mat_t.makeTranslation(-edge_w/1.66,edge_h*0.95,0);
		new_mat_r.makeRotationZ(Math.PI/4);
		new_mat_s.makeScale(0.75,0.75,0.75);
		new_mat.multiplyMatrices(new_mat_t, new_mat_r);
		new_mat.multiply(new_mat_s);
		mat2.multiply(new_mat);
		mesh.matrix.copy(mat2);
		mesh.matrixAutoUpdate=false;
		mesh.updateMatrix=false; //
		scene.add(mesh);
		tree(n-1, mesh.matrix.clone(), col2);
	}
}


// function for handling window resizes
function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
}

// function for animating the scene
function animate() {
	requestAnimationFrame(animate);
	oribiter.update();
	render_scene();
  // render.render(scene, camera);
}

// function for setting up the redered scene
function render_scene() {
	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();

	plane.position.y = -10.0;
	plane.rotation.x = Math.PI / 2;
	plane.rotation.z = (3 * Math.PI) / 2;

	cool_wisp.position.x = Math.sin(time * 0.7) * 3;
	cool_wisp.position.y = Math.cos(time * 0.5) * 4;
	cool_wisp.position.z = Math.cos(time * 0.3) * 3;

	pale_wisp.position.x = Math.cos(time * 0.15) * 3;
	pale_wisp.position.y = Math.sin(time * 0.25) * 4;
	pale_wisp.position.z = Math.cos(time * 0.35) * 3;

	warm_wisp.position.x = Math.cos(time * 0.90) * 30;
	warm_wisp.position.y = Math.sin(time * 0.81) * 20;
	warm_wisp.position.z = Math.sin(time * 0.45) * 40;

	energy_wisp.position.x = Math.sin(time * 0.22) * 15;
	energy_wisp.position.y = Math.cos(time * 0.44) * 16;
	energy_wisp.position.z = Math.sin(time * 0.33) * 17;

	renderer.render(scene, camera);
}

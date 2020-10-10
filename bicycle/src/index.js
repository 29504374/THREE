import * as THREE from 'three';
import Bicycle from './com/views/Bicycle'

const OrbitControls = require('three-orbit-controls')(THREE);
var container;
var renderer;
var scene;
var camera;
var light;
var gridHelper;
var orbitControls;

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    globalOnStart();
}
//threeJS 初始化
function globalOnStart() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    globalAddedScene();
    globalAddedCamera();
    globalAddedlight();
    globalAddedGrid();
    globalAddedOrbitControls();
    // globalAddedToStage();
}
//添加场景
function globalAddedScene() {
    scene = new THREE.Scene();
    
}
//添加全局摄像机
function globalAddedCamera() {
    camera = new THREE.PerspectiveCamera(45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )
    camera.lookAt(scene.position);
    camera.position.set(-10, 50, 50);
}
//添加全局灯光
function globalAddedlight() {
    light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
}
//添加辅助网格
function globalAddedGrid() {
    gridHelper = new THREE.GridHelper(window.innerWidth,
        window.innerHeight,
        0x000000,
        0x000000
    )
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    var axesHelper = new THREE.AxesHelper(15 );
scene.add( axesHelper );
}
//渲染
function globalOnRender() {
    renderer.render(scene, camera);
    // if (window.ThreeDevTools) {
    //     window.ThreeDevTools.connect({ scene, renderer });
    //   }
    
    //   console.log(":>>>>>>>>>>>>>>>",window.ThreeDevTools)
}
//一直渲染
function globalGoAnimate() {
    requestAnimationFrame(globalGoAnimate);
    globalOnRender();
}
//基础辅助工具
function globalAddedOrbitControls() {
    orbitControls = new OrbitControls(camera);
    orbitControls.enableDamping = true
    orbitControls.dampingFactor = 0.25
    orbitControls.enableZoom = false
}
//添加物体
function globalAddedToStage()
{
    var bicycle = new Bicycle(scene);
    bicycle.load('../model/scene.gltf');
}
init();
globalGoAnimate();

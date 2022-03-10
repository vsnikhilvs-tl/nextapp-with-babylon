import { ReactElement, useEffect } from "react"
import Layout from "../../components/layout/layout";

import * as BABYLON from 'babylonjs';
import { Engine, ISceneLoaderAsyncResult } from "babylonjs";
import Script from "next/script";
import Head from "next/head";

import 'babylonjs-loaders';
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { StandardMaterial } from "babylonjs/Materials/standardMaterial";

// import "@babylonjs/loaders/OBJ";
// import "@babylonjs/loaders/glTF";

var canvas: HTMLCanvasElement;
var engine: Engine;

const earcut = require('earcut');

var turn: any;
var dist: any;
/**
 * 
 * @returns Scene with car, dude and bounding box
 */
// function createScene() {

//     /**
//      * Utilities
//      */
//     const scene = new BABYLON.Scene(engine);
//     const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 3, new BABYLON.Vector3(1, 2, -3), scene);
//     camera.attachControl(canvas, true);
//     const light = new BABYLON.HemisphericLight('firstLight', new BABYLON.Vector3(0, 1, 0), scene);

//     /**
//      * Materials Definition
//      */
//     const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
//     groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
//     const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
//     roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
//     const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
//     boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene)
   
//     // const faceUV = [];
//     // faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
//     // faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
//     // faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
//     // faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side

//     /**
//      * Box Definition
//      */
//     // const box = BABYLON.MeshBuilder.CreateBox('firstBox',  {faceUV: faceUV, wrap: true}, scene);
//     // box.position.y = 0.5;
//     // box.material = boxMat;

//     const buildBox = () => {
//         const faceUV = [];
//         faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
//         faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
//         faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
//         faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
//         const box = BABYLON.MeshBuilder.CreateBox('firstBox',  {faceUV: faceUV, wrap: true}, scene);
//         box.position.y = 0.5;
//         box.material = boxMat;
//         return box;
//     }
    
//     /**
//      * Roof Definition
//      */
//     // const roof = BABYLON.MeshBuilder.CreateCylinder('roofCyl', {diameter: 1.3, height: 1.2, tessellation: 3}, scene);
//     // roof.scaling.x = 0.75;
//     // roof.rotation.z = Math.PI / 2;
//     // roof.position.y = 1.22;
//     // roof.material = roofMat;

//     /**
//      * 
//      * @returns Build a Roof
//      */
//     const buildRoof = () => {
//         const roof = BABYLON.MeshBuilder.CreateCylinder('roofCyl', {diameter: 1.3, height: 1.2, tessellation: 3}, scene);
//         roof.scaling.x = 0.75;
//         roof.rotation.z = Math.PI / 2;
//         roof.position.y = 1.22;
//         roof.material = roofMat;
//         return roof;
//     }

//     /**
//      * 
//      * @returns Build a Home
//      */
//     const buildHome = () => {
//         const box = buildBox();
//         const roof = buildRoof();
//         return BABYLON.Mesh.MergeMeshes([box, roof], true, false, undefined, false, true);
//     }

//     // const home1 = buildHome();
//     // const home2 = buildHome();
//     // home1!.position.x = 2;
//     // home2!.position.x = 4;

//     /**
//      * 
//      * @returns Build a car
//      */
//     const buildCar = () => {
//         const carMat = new BABYLON.StandardMaterial("carMat", scene);
//         carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png", scene);
//         const faceUV = [];
//         faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
//         faceUV[1] = new BABYLON.Vector4(0.7, 0, 1, 0.5);
//         faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);
//         const outline = [
//             new BABYLON.Vector3(-0.3, 0, -0.1),
//             new BABYLON.Vector3(0.2, 0, -0.1),
//         ]
//         for (let i = 0; i < 20; i++) {
//             outline.push(
//                 new BABYLON.Vector3(
//                     0.2 * Math.cos(i * Math.PI / 40),
//                     0,
//                     0.2 * Math.sin(i * Math.PI / 40) - 0.1
//                 )
//             );
//         }
//         outline.push(new BABYLON.Vector3(0, 0, 0.1));
//         outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));
//         const car = BABYLON.MeshBuilder.ExtrudePolygon("car", { shape: outline, depth: 0.2, faceUV: faceUV });
//         car.material = carMat;
//         return car;
//     }

//     // const car1 = buildCar();
//     // car1!.position.y = 0.16;
//     // car1.rotation.x = 4.7

//     // const wheelMat = new BABYLON.StandardMaterial("wheelMat", scene);
//     // wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png", scene);

//     // const wheelUV = [];
//     // wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
//     // wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
//     // wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

//     // const wheelRB = BABYLON.MeshBuilder.CreateCylinder('wheelRB', { diameter: 0.125, height: 0.05, faceUV: wheelUV });
//     // wheelRB.material = wheelMat;
//     // wheelRB.parent = car1;
//     // wheelRB.position.z = -0.1;
//     // wheelRB.position.x = -0.2;
//     // wheelRB.position.y = 0.035;
    
//     // const wheelRF = wheelRB.clone("wheelRF");
//     // wheelRF.position.x = 0.1;

//     // const wheelLB = wheelRB.clone("wheelLB");
//     // wheelLB.position.y = -0.2 - 0.035;

//     // const wheelLF = wheelRF.clone("wheelLF");
//     // wheelLF.position.y = -0.2 - 0.035;

//     /**
//      * Wheel Animation
//      */
//     // const animWheel = new BABYLON.Animation('wheelAnimation', 'rotation.y', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
//     // const wheelKeys = [];
//     // wheelKeys.push({
//     //     frame: 0,
//     //     value: 0
//     // });
//     // wheelKeys.push({
//     //     frame: 60,
//     //     value: 2 * Math.PI
//     // });
//     // animWheel.setKeys(wheelKeys);
//     // wheelRB.animations = [];
//     // wheelRB.animations.push(animWheel);
//     // wheelRF.animations = [];
//     // wheelRF.animations.push(animWheel);
//     // wheelLB.animations = [];
//     // wheelLB.animations.push(animWheel);
//     // wheelLF.animations = [];
//     // wheelLF.animations.push(animWheel);

//     /**
//      * Ground Definition
//      */
//     // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 15, height: 15}, scene);
//     // ground.material = groundMat;

//     // scene.beginAnimation(wheelRB, 0, 60, true);
//     // scene.beginAnimation(wheelRF, 0, 30, true);
//     // scene.beginAnimation(wheelLB, 0, 30, true);
//     // scene.beginAnimation(wheelLF, 0, 30, true);

//     // BABYLON.SceneLoader.ImportMesh('', '/scenes/', 'Dude/dude.babylon', scene, (meshes) => {
//     //     console.log(meshes);
//     //     scene.createDefaultCameraOrLight(true, true, true);
//     //     scene.createDefaultEnvironment();
//     // })

//     let carReady = false;

//     const generateCar = () => {
//         console.log("Generate Car start")
//         const car = scene.getMeshByName("car");    
//         carReady = true;
//         car!.rotation = new BABYLON.Vector3(Math.PI / 2, 0, -Math.PI / 2);
//         car!.position.y = 0.16;
//         car!.position.x = -3;
//         car!.position.z = 8;

//         const animCar = new BABYLON.Animation("carAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

//         const carKeys = []; 

//         carKeys.push({
//             frame: 0,
//             value: 8
//         });


//         carKeys.push({
//             frame: 150,
//             value: -7
//         });

//         carKeys.push({
//             frame: 200,
//             value: -7
//         });

//         animCar.setKeys(carKeys);

//         car!.animations = [];
//         car!.animations.push(animCar);

//         scene.beginAnimation(car, 0, 200, true);
      
//         //wheel animation
//         const wheelRB = scene.getMeshByName("wheelRB");
//         const wheelRF = scene.getMeshByName("wheelRF");
//         const wheelLB = scene.getMeshByName("wheelLB");
//         const wheelLF = scene.getMeshByName("wheelLF");
      
//         scene.beginAnimation(wheelRB, 0, 30, true);
//         scene.beginAnimation(wheelRF, 0, 30, true);
//         scene.beginAnimation(wheelLB, 0, 30, true);
//         scene.beginAnimation(wheelLF, 0, 30, true);

//         console.log("Generate Car end")
//         console.log("Generate Village start")

//         BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "village.glb", scene)
//         .then(() => {
//             generateDudeAndTrack();
//         })
//         console.log("Generate Village end")
//     }
 
//     BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "car.glb", scene)
//     .then(() => {
//         generateCar();
//     });
 
//     const generateDudeAndTrack = () => {
//         console.log("Generate Dude start")
//         const wireMat = new BABYLON.StandardMaterial("wireMat", scene);
//         wireMat.wireframe = true;
//         const hitBox = BABYLON.MeshBuilder.CreateBox("carbox", {width: 0.5, height: 0.6, depth: 4.5});
//         hitBox.material = wireMat;
//         hitBox.position.x = 3.1;
//         hitBox.position.y = 0.3;
//         hitBox.position.z = -5;
        
//         const walk: any = function (this: any, turn: any, dist: any) {
//             this.turn = turn;
//             this.dist = dist;
//         }
    
//         const track: any = [];
//         track.push(new walk(86, 7));
//         track.push(new walk(-85, 14.8));
//         track.push(new walk(-93, 16.5));
//         track.push(new walk(48, 25.5));
//         track.push(new walk(-112, 30.5));
//         track.push(new walk(-72, 33.2));
//         track.push(new walk(42, 37.5));
//         track.push(new walk(-98, 45.2));
//         track.push(new walk(0, 47))
    
//         BABYLON.SceneLoader.ImportMeshAsync("him", "/scenes/", "Dude/dude.babylon", scene).then((result: ISceneLoaderAsyncResult) => {
//             console.log(result)
//             var dude: AbstractMesh = result.meshes[0];
//             dude.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
//             dude.position = new BABYLON.Vector3(-6, 0, 0);
//             dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-95), BABYLON.Space.LOCAL);
//             const startRotation = dude.rotationQuaternion!.clone();
                        
//             scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
    
//             let distance = 0;
//             let step = 0.015;
//             let p = 0;
    
//             scene.onBeforeRenderObservable.add(() => {
//                 if (carReady) {
//                     const node = dude.getChildren()[1] as AbstractMesh // getChildren returns a node, but we need AbstractMesh for intersectsMesh
//                     if (!node.intersectsMesh(hitBox) && scene.getMeshByName("car")!.intersectsMesh(hitBox)) {
//                         return;
//                     }
//                 }
//                 dude.movePOV(0, 0, step);
//                 distance += step;
                  
//                 if (distance > track[p].dist) {
//                     // }
//                     dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
//                     p +=1;
//                     p %= track.length; 
//                     if (p === 0) {
//                         distance = 0;
//                         dude.position = new BABYLON.Vector3(-6, 0, 0);
//                         dude.rotationQuaternion = startRotation.clone();
//                     }
//                 }
                
//             })
//         });
//         console.log("Generate Dude end")
//     }   

//     return scene;
// }

/**
 * 
 * @returns Scene with shadows, particles and lamps
 */
function createScene() {
    const scene = new BABYLON.Scene(engine);
    
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 200, new BABYLON.Vector3(0, 0, 0), scene);
    camera.upperBetaLimit = Math.PI/2.2;
    camera.attachControl(canvas, true);
    // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 1, 0), scene);
    // light.intensity = 0.3;

    // const skybox = BABYLON.MeshBuilder.CreateBox('skybox', { size: 150 }, scene);
    // const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('/textures/skybox', scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // skybox.material = skyboxMaterial;

    // const spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "textures/palm.png", 2000, {width: 512, height: 1024}, scene);
    // for (let i = 0; i < 500; i++) {
    //     const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
    //     tree.position.x = Math.random() * (-30);
    //     tree.position.z = Math.random() * 20 + 8;
    //     tree.position.y = 0.5;
    // }
    // for (let i = 0; i < 500; i++) {
    //     const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
    //     tree.position.x = Math.random() * (25) + 7;
    //     tree.position.z = Math.random() * -35  + 8;
    //     tree.position.y = 0.5;
    // }

    // const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat", scene);
    // largeGroundMat.diffuseTexture = new BABYLON.Texture("/environments/valleygrass.png", scene);
    
    // const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "/environments/villageheightmap.png", {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 10});
    // largeGround.material = largeGroundMat;
    // largeGround.position.y = -0.01;

    // const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    // groundMat.diffuseTexture = new BABYLON.Texture("/environments/villagegreen.png", scene);
    // groundMat.diffuseTexture.hasAlpha = true;

    // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:24, height:24});
    // ground.material = groundMat;
    
    // BABYLON.SceneLoader.ImportMeshAsync("", "/meshes/", "valleyvillage.glb").then(() => {
    //     const mesh: AbstractMesh | null = scene!.getMeshByName("ground");
    //     console.log(mesh)
    //     console.log(mesh?.material)
    //     const material = mesh!.material as StandardMaterial;
    //     material.maxSimultaneousLights = 6;
    // })

    // BABYLON.SceneLoader.ImportMeshAsync("", "/meshes/", "car.glb").then(() => {
    //     const car: any = scene.getMeshByName("car");
    //     car.rotation = new BABYLON.Vector3(Math.PI / 2, 0, -Math.PI / 2);
    //     car.position.y = 0.16;
    //     car.position.x = -3;
    //     car.position.z = 8;

    //     const animCar = new BABYLON.Animation("carAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    //   const carKeys = []; 

    //   carKeys.push({
    //     frame: 0,
    //     value: 10
    //   });


    //   carKeys.push({
    //     frame: 200,
    //     value: -15
    //   });

    //   animCar.setKeys(carKeys);

    //   car.animations = [];
    //   car.animations.push(animCar);

    //   scene.beginAnimation(car, 0, 200, true);
      
    //   const wheelRB = scene.getMeshByName("wheelRB");
    //   const wheelRF = scene.getMeshByName("wheelRF");
    //   const wheelLB = scene.getMeshByName("wheelLB");
    //   const wheelLF = scene.getMeshByName("wheelLF");
      
    //   scene.beginAnimation(wheelRB, 0, 30, true);
    //   scene.beginAnimation(wheelRF, 0, 30, true);
    //   scene.beginAnimation(wheelLB, 0, 30, true);
    //   scene.beginAnimation(wheelLF, 0, 30, true);
    // });

    // function fountainSystem() {
    //     const fountainOutline = [
    //         new BABYLON.Vector3(0, 0, 0),
    //         new BABYLON.Vector3(0.5, 0, 0),
    //         new BABYLON.Vector3(0.5, 0.2, 0),
    //         new BABYLON.Vector3(0.4, 0.2, 0),
    //         new BABYLON.Vector3(0.4, 0.05, 0),
    //         new BABYLON.Vector3(0.05, 0.1, 0),
    //         new BABYLON.Vector3(0.05, 0.8, 0),
    //         new BABYLON.Vector3(0.15, 0.9, 0)
    //     ];
        
    //     const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", {shape: fountainOutline, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    //     fountain.position.x = -4;
    //     fountain.position.z = -6;
    
    //     const particleSystem = new BABYLON.ParticleSystem('fountain', 10000, scene);
    //     particleSystem.particleTexture = new BABYLON.Texture('/textures/flare.png', scene);
    //     particleSystem.emitter = new BABYLON.Vector3(-4, 0.8, -6);
    //     particleSystem.minEmitBox = new BABYLON.Vector3(-0.05, 0, -0.05);
    //     particleSystem.maxEmitBox = new BABYLON.Vector3(0.05, 0, 0.05);
    //     particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    //     particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    //     particleSystem.minSize = 0.01;
    //     particleSystem.maxSize = 0.025;
    //     particleSystem.minLifeTime = 0.3;
    //     particleSystem.maxLifeTime = 1.5;
    //     particleSystem.emitRate = 2000;
    //     particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    //     particleSystem.gravity = new BABYLON.Vector3(0, -9.8, 0);
    //     particleSystem.direction1 = new BABYLON.Vector3(-1, 8, 1);
    //     particleSystem.direction2 = new BABYLON.Vector3(1, 8, -1);
    //     particleSystem.minEmitPower = 0.2;
    //     particleSystem.maxEmitPower = 0.6;
    //     particleSystem.updateSpeed = 0.01;
    //     particleSystem.start();
    // }
    
    // fountainSystem();

    /**
     * Village scene with reflection from street lamps Final with shadows
     */

     const  light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
     light.position = new BABYLON.Vector3(0, 50, -100);

     const shadowGenerator = new BABYLON.ShadowGenerator(1024, light, true);

    BABYLON.SceneLoader.ImportMeshAsync("", "/meshes/", "lamp.babylon").then(() => {
        const lampLight = new BABYLON.SpotLight("lampLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -1, 0), 0.8 * Math.PI, 0, scene);
        lampLight.diffuse = BABYLON.Color3.Yellow();
        lampLight.parent = scene.getMeshByName("bulb")
        
        const lamp: any = scene.getMeshByName('lamp');
        lamp.position = new BABYLON.Vector3(2, 0, 2); 
        lamp.rotation = BABYLON.Vector3.Zero();
        lamp.rotation.y = -Math.PI / 4;
        shadowGenerator.addShadowCaster(lamp, true);

        const lamp3: any = lamp.clone("lamp3");
        lamp3.position.z = -8;
        shadowGenerator.addShadowCaster(lamp3, true);

        const lamp1 = lamp.clone("lamp1");
        lamp1.position.x = -8;
        lamp1.position.z = 1.2;
        lamp1.rotation.y = Math.PI / 2;
        shadowGenerator.addShadowCaster(lamp1, true);

        const lamp2 = lamp1.clone("lamp2");
        lamp2.position.x = -2.7;
        lamp2.position.z = 0.8;
        lamp2.rotation.y = -Math.PI / 2;
        shadowGenerator.addShadowCaster(lamp2, true);

        const lamp4 = lamp.clone("lamp2");
        lamp4.position = new BABYLON.Vector3(4, 0, 8);
        lamp.rotation.y = -Math.PI / 4;
        shadowGenerator.addShadowCaster(lamp4, true);
    })

    const walk: any = function (this: any, turn: any, dist: any) {
        this.turn = turn;
        this.dist = dist;
    }
    
    const track: any = [];
    track.push(new walk(86, 7));
    track.push(new walk(-85, 14.8));
    track.push(new walk(-93, 16.5));
    track.push(new walk(48, 25.5));
    track.push(new walk(-112, 30.5));
    track.push(new walk(-72, 33.2));
    track.push(new walk(42, 37.5));
    track.push(new walk(-98, 45.2));
    track.push(new walk(0, 47));

    BABYLON.SceneLoader.ImportMeshAsync("him", "/scenes/Dude/", "Dude.babylon", scene).then((result) => {
        const dude = result.meshes[0];
        dude.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);

        shadowGenerator.addShadowCaster(dude, true);

        dude.position = new BABYLON.Vector3(-6, 0, 0);
        dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-95), BABYLON.Space.LOCAL);
        const startRotation = dude.rotationQuaternion!.clone();    
            
        camera.parent = dude;
        scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

        let distance = 0;
        let step = 0.01;
        let p = 0;

        scene.onBeforeRenderObservable.add(() => {
		    dude.movePOV(0, 0, step);
            distance += step;
              
            if (distance > track[p].dist) {
                    
                dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
                p +=1;
                p %= track.length; 
                if (p === 0) {
                    distance = 0;
                    dude.position = new BABYLON.Vector3(-6, 0, 0);
                    dude.rotationQuaternion = startRotation.clone();
                }
            }
			
        })
    });

    //Skybox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:150}, scene);
	  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	  skyboxMaterial.backFaceCulling = false;
	  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
	  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	  skybox.material = skyboxMaterial;

    BABYLON.SceneLoader.ImportMeshAsync("", "/meshes/", "valleyvillage.glb").then((result: ISceneLoaderAsyncResult) => {
        for(let mesh of result.meshes) {
            if(mesh.name.includes('house')) {
                shadowGenerator.addShadowCaster(mesh, true);
            }
        }
        const mesh = scene!.getMeshByName("ground") as AbstractMesh;
        mesh.receiveShadows = true;
        const material = mesh.material as StandardMaterial;
        material.maxSimultaneousLights = 6;
    });

    return scene;
}

function renderLoop() {
    
    (window as any).earcut = earcut;
    const canvas1: HTMLCanvasElement = document.getElementById("renderCanvas")! as HTMLCanvasElement;
    canvas = canvas1;
    
    const engine1 = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
    engine = engine1;
    
    const scene = createScene();
    
    engine.runRenderLoop(() => {
        scene.render();
    })
    
    window.addEventListener('resize', () => {
        engine.resize();
    })
}


export default function Home() {

    useEffect(() => {
        renderLoop();
    }, [])

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Script src="https://unpkg.com/earcut@latest/dist/earcut.min.js"></Script>
            <h1>Home component</h1>
            <canvas id="renderCanvas" style={{width: "100%"}}></canvas>
        </div>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}

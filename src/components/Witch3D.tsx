import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

interface Witch3DProps {
  direction: 'left' | 'right';
  isWalking: boolean;
}

const Witch3D: FC<Witch3DProps> = ({ direction, isWalking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 3.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(2, 4, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xa5c5f5, 0.6);
    fillLight.position.set(-2, 2, -1);
    scene.add(fillLight);

    // 5. Load textures manually to ensure mapping
    const textureLoader = new THREE.TextureLoader();
    const basePath = '/stylized_dark_witch_fbx_def_bones/Textures/';

    const bodyColor = textureLoader.load(`${basePath}Stylized_Dark_Witch_Body_Base_color.png`);
    const bodyNormal = textureLoader.load(`${basePath}Stylized_Dark_Witch_Body_Normal_OpenGL.png`);
    const bodyRoughness = textureLoader.load(`${basePath}Stylized_Dark_Witch_Body_Roughness.png`);
    const bodyMetallic = textureLoader.load(`${basePath}Stylized_Dark_Witch_Body_Metallic.png`);

    const clothColor = textureLoader.load(`${basePath}Stylized_Dark_Witch_Cloth_Base_color.png`);
    const clothNormal = textureLoader.load(`${basePath}Stylized_Dark_Witch_Cloth_Normal_OpenGL.png`);
    const clothRoughness = textureLoader.load(`${basePath}Stylized_Dark_Witch_Cloth_Roughness.png`);
    const clothMetallic = textureLoader.load(`${basePath}Stylized_Dark_Witch_Cloth_Metallic.png`);

    const hairColor = textureLoader.load(`${basePath}Hair_Color.png`);
    const hairAlpha = textureLoader.load(`${basePath}Hair_Alpha.png`);
    const hairNormal = textureLoader.load(`${basePath}Hair_Normal.png`);

    const eyeColor = textureLoader.load(`${basePath}Eye_Iris_Color.png`);

    // 6. Load FBX Model
    const loader = new FBXLoader();
    loader.load(
      '/stylized_dark_witch_fbx_def_bones/Stylized_Dark_Witch.fbx',
      (fbx) => {
        modelRef.current = fbx;

        // Apply materials to meshes
        fbx.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const name = mesh.name.toLowerCase();

            if (name.includes('body')) {
              mesh.material = new THREE.MeshStandardMaterial({
                map: bodyColor,
                normalMap: bodyNormal,
                roughnessMap: bodyRoughness,
                metalnessMap: bodyMetallic,
                roughness: 0.7,
                metalness: 0.1,
              });
            } else if (name.includes('cloth') || name.includes('dress') || name.includes('cape') || name.includes('hat') || name.includes('boot')) {
              mesh.material = new THREE.MeshStandardMaterial({
                map: clothColor,
                normalMap: clothNormal,
                roughnessMap: clothRoughness,
                metalnessMap: clothMetallic,
                roughness: 0.6,
                metalness: 0.2,
              });
            } else if (name.includes('hair')) {
              mesh.material = new THREE.MeshStandardMaterial({
                map: hairColor,
                alphaMap: hairAlpha,
                normalMap: hairNormal,
                transparent: true,
                alphaTest: 0.3,
                roughness: 0.8,
              });
            } else if (name.includes('eye')) {
              mesh.material = new THREE.MeshBasicMaterial({
                map: eyeColor,
              });
            }
          }
        });

        // Center and scale down the model (FBX imports are usually huge)
        fbx.scale.set(0.012, 0.012, 0.012);
        fbx.position.set(0, -0.4, 0);
        scene.add(fbx);

        // Animations
        if (fbx.animations && fbx.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(fbx);
          mixerRef.current = mixer;
          
          // Play the first animation (usually Idle or Walk)
          const action = mixer.clipAction(fbx.animations[0]);
          action.play();
        }

        setLoading(false);
      },
      () => {
        // Progress
      },
      (error) => {
        console.error('An error occurred loading the FBX model:', error);
        setLoading(false);
      }
    );

    // 7. Animation Loop
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Rotate model dynamically to face the direction of walking
      if (modelRef.current) {
        const targetRotation = direction === 'left' ? -Math.PI / 2 : Math.PI / 2;
        // Smoothly interpolate rotation
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          targetRotation,
          0.1
        );

        // Add a gentle floating/breathing animation if idle
        if (!isWalking) {
          modelRef.current.position.y = -0.4 + Math.sin(clockRef.current.getElapsedTime() * 2) * 0.05;
        } else {
          // Walking step bobbing
          modelRef.current.position.y = -0.4 + Math.abs(Math.sin(clockRef.current.getElapsedTime() * 8)) * 0.03;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [direction, isWalking]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-marigold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Witch3D;

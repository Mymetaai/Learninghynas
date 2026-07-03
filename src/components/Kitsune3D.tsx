import { useEffect, useRef, type FC } from 'react';
import * as THREE from 'three';

interface Kitsune3DProps {
  direction: 'left' | 'right';
  mode: 'idle' | 'walk' | 'wag';
}

const Kitsune3D: FC<Kitsune3DProps> = ({ direction, mode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  const directionRef = useRef(direction);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 112;
    const height = mount.clientHeight || 112;

    // ---------- Scene / Camera / Renderer ----------
    const scene = new THREE.Scene();
    // Transparent background for floating screen pet
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Constrain canvas dimensions
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.display = 'block';

    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    let camDistance = 8;
    let camTheta = 0.5; // horizontal angle
    let camPhi = 1.15; // vertical angle
    const target = new THREE.Vector3(0, 1.1, 0);

    // ---------- Lights (Pixar-style 3-point setup) ----------
    const hemi = new THREE.HemisphereLight(0xfff3e0, 0xcfe0f5, 0.9);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xfff0d8, 1.5);
    dir.position.set(4, 8, 5);
    dir.castShadow = true;
    dir.shadow.mapSize.set(512, 512);
    dir.shadow.camera.left = -4;
    dir.shadow.camera.right = 4;
    dir.shadow.camera.top = 4;
    dir.shadow.camera.bottom = -4;
    dir.shadow.radius = 3;
    scene.add(dir);
    
    const fill = new THREE.DirectionalLight(0xbcd6ff, 0.5);
    fill.position.set(-5, 3, -4);
    scene.add(fill);
    
    const rim = new THREE.DirectionalLight(0xaeefff, 0.9);
    rim.position.set(-2, 5, -6);
    scene.add(rim);

    // ---------- Ground / Shadow Blob ----------
    const aoGeo = new THREE.CircleGeometry(1.4, 32);
    const aoMat = new THREE.MeshBasicMaterial({ color: 0x0c1220, transparent: true, opacity: 0.28 });
    const aoBlob = new THREE.Mesh(aoGeo, aoMat);
    aoBlob.rotation.x = -Math.PI / 2;
    aoBlob.position.y = 0.02;
    scene.add(aoBlob);

    // ---------- Materials ----------
    const fur = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.45, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.5 });
    const blueTip = new THREE.MeshPhysicalMaterial({ color: 0x4a97f2, roughness: 0.25, metalness: 0.05, clearcoat: 0.6, clearcoatRoughness: 0.25, emissive: 0x1a4a8c, emissiveIntensity: 0.06 });
    const black = new THREE.MeshPhysicalMaterial({ color: 0x201f24, roughness: 0.25, clearcoat: 0.6 });
    const innerEar = new THREE.MeshPhysicalMaterial({ color: 0xffd3dc, roughness: 0.4, clearcoat: 0.3 });
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xffb3c1, transparent: true, opacity: 0.45 });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeBlue = new THREE.MeshPhysicalMaterial({ color: 0x3fb0ff, roughness: 0.1, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05, emissive: 0x1176c9, emissiveIntensity: 0.35 });

    const fox = new THREE.Group();
    scene.add(fox);

    const shadowify = (mesh: THREE.Mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    // ---------- Body ----------
    const bodyGeo = new THREE.SphereGeometry(1, 28, 20);
    const body = new THREE.Mesh(bodyGeo, fur);
    body.scale.set(0.95, 0.85, 1.1);
    body.position.set(0, 1.18, 0.05);
    shadowify(body);
    fox.add(body);

    const chestGeo = new THREE.SphereGeometry(0.68, 22, 18);
    const chest = new THREE.Mesh(chestGeo, fur);
    chest.scale.set(1.05, 1.2, 0.82);
    chest.position.set(0, 1.05, 0.8);
    shadowify(chest);
    fox.add(chest);

    // ---------- Head group ----------
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.05, 0.95);
    fox.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.68, 28, 22);
    const head = new THREE.Mesh(headGeo, fur);
    head.scale.set(1.02, 0.92, 1);
    shadowify(head);
    headGroup.add(head);

    const muzzleGeo = new THREE.ConeGeometry(0.27, 0.46, 16);
    const muzzle = new THREE.Mesh(muzzleGeo, fur);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, -0.14, 0.62);
    shadowify(muzzle);
    headGroup.add(muzzle);

    const muzzleTipGeo = new THREE.SphereGeometry(0.16, 16, 14);
    const muzzleTip = new THREE.Mesh(muzzleTipGeo, fur);
    muzzleTip.scale.set(1, 0.85, 1);
    muzzleTip.position.set(0, -0.15, 0.85);
    shadowify(muzzleTip);
    headGroup.add(muzzleTip);

    const noseGeo = new THREE.SphereGeometry(0.075, 12, 12);
    const nose = new THREE.Mesh(noseGeo, black);
    nose.scale.set(1.1, 0.85, 0.9);
    nose.position.set(0, -0.13, 0.98);
    headGroup.add(nose);

    // cheeks
    const blushGeoL = new THREE.CircleGeometry(0.12, 20);
    const blushL = new THREE.Mesh(blushGeoL, blushMat);
    blushL.position.set(0.34, -0.18, 0.62);
    blushL.rotation.y = 0.6;
    headGroup.add(blushL);
    
    const blushR = new THREE.Mesh(blushGeoL, blushMat);
    blushR.position.set(-0.34, -0.18, 0.62);
    blushR.rotation.y = -0.6;
    headGroup.add(blushR);

    // ears
    const makeEar = (sign: number) => {
      const earGroup = new THREE.Group();
      const outerGeo = new THREE.ConeGeometry(0.26, 0.56, 12);
      const outer = new THREE.Mesh(outerGeo, fur);
      shadowify(outer);
      const innerGeo = new THREE.ConeGeometry(0.15, 0.36, 12);
      const inner = new THREE.Mesh(innerGeo, innerEar);
      inner.position.set(0, 0.02, 0.1);
      outer.add(inner);
      earGroup.add(outer);
      earGroup.position.set(sign * 0.34, 0.58, -0.05);
      earGroup.rotation.z = sign * -0.22;
      earGroup.rotation.x = -0.1;
      return earGroup;
    };
    const earL = makeEar(1);
    const earR = makeEar(-1);
    headGroup.add(earL, earR);

    // eyes
    const makeEye = (sign: number) => {
      const eyeGroup = new THREE.Group();
      const whiteGeo = new THREE.SphereGeometry(0.16, 16, 16);
      const white = new THREE.Mesh(whiteGeo, new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.15, clearcoat: 0.8 }));
      eyeGroup.add(white);
      
      const irisGeo = new THREE.SphereGeometry(0.115, 16, 16);
      const iris = new THREE.Mesh(irisGeo, eyeBlue);
      iris.position.z = 0.07;
      eyeGroup.add(iris);
      
      const pupilGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const pupil = new THREE.Mesh(pupilGeo, black);
      pupil.position.z = 0.14;
      eyeGroup.add(pupil);
      
      // catchlights
      const bigHi = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), catchlightMat);
      bigHi.position.set(0.045, 0.05, 0.17);
      eyeGroup.add(bigHi);
      const smallHi = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), catchlightMat);
      smallHi.position.set(-0.04, -0.03, 0.165);
      eyeGroup.add(smallHi);
      
      // upper lid
      const lidGeo = new THREE.TorusGeometry(0.115, 0.018, 8, 16, Math.PI);
      const lid = new THREE.Mesh(lidGeo, black);
      lid.rotation.z = Math.PI;
      lid.rotation.x = 0.3;
      lid.position.set(0, 0.04, 0.06);
      eyeGroup.add(lid);
      
      eyeGroup.position.set(sign * 0.28, 0.05, 0.52);
      eyeGroup.rotation.y = sign * -0.15;
      return eyeGroup;
    };
    const eyeL = makeEye(1);
    const eyeR = makeEye(-1);
    headGroup.add(eyeL, eyeR);

    // ---------- Legs ----------
    const legGroups: THREE.Group[] = [];
    const makeLeg = (x: number, z: number) => {
      const group = new THREE.Group();
      group.position.set(x, 0.95, z);
      
      const upperGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.55, 12);
      const upper = new THREE.Mesh(upperGeo, fur);
      upper.position.y = -0.27;
      shadowify(upper);
      group.add(upper);
      
      const lowerGeo = new THREE.CylinderGeometry(0.13, 0.1, 0.45, 12);
      const lower = new THREE.Mesh(lowerGeo, fur);
      lower.position.y = -0.7;
      shadowify(lower);
      group.add(lower);
      
      const pawGeo = new THREE.SphereGeometry(0.14, 12, 10);
      const paw = new THREE.Mesh(pawGeo, blueTip);
      paw.scale.set(1, 0.6, 1.3);
      paw.position.y = -0.93;
      shadowify(paw);
      group.add(paw);
      
      for (let i = -1; i <= 1; i++) {
        const clawGeo = new THREE.ConeGeometry(0.02, 0.08, 6);
        const claw = new THREE.Mesh(clawGeo, black);
        claw.rotation.x = Math.PI / 2.2;
        claw.position.set(i * 0.06, -1.0, 0.12);
        group.add(claw);
      }
      return group;
    };
    const legFL = makeLeg(0.42, 0.55);
    const legFR = makeLeg(-0.42, 0.55);
    const legBL = makeLeg(0.5, -0.55);
    const legBR = makeLeg(-0.5, -0.55);
    legGroups.push(legFL, legFR, legBL, legBR);
    legGroups.forEach((l) => fox.add(l));

    // ---------- Tails ----------
    const NUM_TAILS = 9;
    interface TailConfig {
      base: THREE.Group;
      segments: THREE.Group[];
      phase: number;
    }
    const tailGroups: TailConfig[] = [];
    for (let i = 0; i < NUM_TAILS; i++) {
      const t = i / (NUM_TAILS - 1);
      const spread = (t - 0.5) * 2;
      const baseGroup = new THREE.Group();
      baseGroup.position.set(0, 1.35, -0.75);
      baseGroup.rotation.y = spread * 0.95;
      baseGroup.rotation.x = -0.55 - Math.abs(spread) * 0.15;
      fox.add(baseGroup);

      const segCount = 5;
      let parent: THREE.Group | THREE.Mesh = baseGroup;
      const segments: THREE.Group[] = [];
      for (let s = 0; s < segCount; s++) {
        const st = s / (segCount - 1);
        const radiusTop = 0.19 * (1 - st * 0.75);
        const radiusBottom = 0.19 * (1 - (st - 1 / segCount) * 0.75);
        const len = 0.55;
        const geo = new THREE.CylinderGeometry(Math.max(radiusTop, 0.02), Math.max(radiusBottom, 0.03), len, 10);
        const mat = st > 0.62 ? blueTip : fur;
        const seg = new THREE.Mesh(geo, mat);
        shadowify(seg);
        seg.position.y = len / 2;
        
        const segGroup = new THREE.Group();
        segGroup.position.y = s === 0 ? 0 : len;
        segGroup.rotation.x = 0.18 + s * 0.05;
        segGroup.add(seg);
        parent.add(segGroup);
        segments.push(segGroup);
        parent = segGroup;
      }
      
      const tipGeo = new THREE.SphereGeometry(0.19, 16, 14);
      const tip = new THREE.Mesh(tipGeo, blueTip);
      tip.scale.set(1, 1.15, 1);
      tip.position.y = 0.65;
      shadowify(tip);
      parent.add(tip);

      tailGroups.push({ base: baseGroup, segments, phase: t * Math.PI * 2 });
    }

    // Adjust entire group position and scale to center nicely
    fox.scale.set(0.48, 0.48, 0.48);
    fox.position.set(0, 0, 0);

    // ---------- Custom Orbit Controls (drag to interact) ----------
    let isDragging = false;
    let lastX = 0, lastY = 0;
    const onPointerDown = (e: PointerEvent) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; };
    const onPointerUp = () => { isDragging = false; };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      camTheta -= dx * 0.005;
      camPhi -= dy * 0.005;
      camPhi = Math.max(0.5, Math.min(1.5, camPhi));
    };
    const onWheel = (e: WheelEvent) => {
      camDistance += e.deltaY * 0.003;
      camDistance = Math.max(5, Math.min(12, camDistance));
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: true });

    // ---------- Animation Loop ----------
    const clock = new THREE.Clock();
    let blinkTimer = 1.5 + Math.random() * 2;
    let blinkPhase = 0;

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      const currentMode = modeRef.current;
      const currentDirection = directionRef.current;

      // camera position update
      camera.position.x = target.x + camDistance * Math.sin(camPhi) * Math.sin(camTheta);
      camera.position.y = target.y + camDistance * Math.cos(camPhi);
      camera.position.z = target.z + camDistance * Math.sin(camPhi) * Math.cos(camTheta);
      camera.lookAt(target);

      // Rotate fox group based on walking direction
      const targetRotation = currentDirection === 'left' ? -Math.PI / 2 : Math.PI / 2;
      fox.rotation.y = THREE.MathUtils.lerp(fox.rotation.y, targetRotation, 0.1);

      // breathing
      const breathe = Math.sin(t * 1.8) * 0.02;
      body.scale.y = 0.78 + breathe;
      chest.scale.y = 1.15 + breathe * 0.5;

      // head bob
      headGroup.position.y = 2.05 + Math.sin(t * 1.8 + 0.4) * 0.02;
      // Head looking forward (offset by direction rotation)
      headGroup.rotation.y = Math.sin(t * 0.6) * 0.12;
      headGroup.rotation.x = Math.sin(t * 0.9) * 0.04;

      // ears
      earL.rotation.z = -0.25 + Math.sin(t * 2.3) * 0.03;
      earR.rotation.z = 0.25 - Math.sin(t * 2.1) * 0.03;

      // blink
      blinkTimer -= dt;
      if (blinkTimer <= 0 && blinkPhase === 0) { blinkPhase = 1; }
      if (blinkPhase > 0) {
        blinkPhase += dt * 10;
        const s = Math.max(0.05, Math.abs(Math.sin(Math.min(blinkPhase, Math.PI))));
        eyeL.scale.y = s; eyeR.scale.y = s;
        if (blinkPhase > Math.PI) { blinkPhase = 0; blinkTimer = 1.5 + Math.random() * 3; eyeL.scale.y = 1; eyeR.scale.y = 1; }
      }

      // leg walk animation
      let walkCycle = 0;
      if (currentMode === "walk") {
        walkCycle = t * 6.5;
        const strideL = Math.sin(walkCycle) * 0.45;
        const strideR = Math.sin(walkCycle + Math.PI) * 0.45;
        legFL.rotation.x = strideR;
        legBR.rotation.x = strideR;
        legFR.rotation.x = strideL;
        legBL.rotation.x = strideL;
        fox.position.y = Math.abs(Math.sin(walkCycle * 2)) * 0.05;
      } else {
        legGroups.forEach((l) => { l.rotation.x *= 0.85; });
        fox.position.y *= 0.85;
      }

      // tails movement
      const tailIntensity = currentMode === "wag" ? 2.5 : currentMode === "walk" ? 1.3 : 0.6;
      const tailSpeed = currentMode === "wag" ? 5.5 : currentMode === "walk" ? 3.5 : 1.5;
      tailGroups.forEach(({ base, segments, phase }) => {
        base.rotation.z = Math.sin(t * tailSpeed * 0.5 + phase) * 0.08 * tailIntensity;
        segments.forEach((seg, si) => {
          const wave = Math.sin(t * tailSpeed + phase + si * 0.6) * (0.12 + si * 0.05) * tailIntensity * 0.35;
          seg.rotation.z = wave;
        });
      });

      renderer.render(scene, camera);
    };
    animate();

    // ---------- Resize ----------
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full relative" />;
};

export default Kitsune3D;

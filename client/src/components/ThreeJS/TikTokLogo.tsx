import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const TikTokLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create TikTok logo group
    const group = new THREE.Group();
    
    // Create a note-like shape for TikTok
    const noteGeometry = new THREE.BoxGeometry(1, 1.5, 0.2);
    const noteMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xFE2C55,
      emissive: 0x660418,
      specular: 0xFFFFFF,
      shininess: 100
    });
    const note = new THREE.Mesh(noteGeometry, noteMaterial);
    
    // Create the circle part of logo
    const circleGeometry = new THREE.TorusGeometry(0.6, 0.1, 16, 100);
    const circleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x25F4EE,
      emissive: 0x0A5A58,
      specular: 0xFFFFFF,
      shininess: 100
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.set(0.8, -0.5, 0);
    circle.rotation.x = Math.PI / 2;
    
    group.add(note);
    group.add(circle);
    scene.add(group);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xFFFFFF, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xFE2C55, 1);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);
    
    camera.position.z = 5;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      group.rotation.z += 0.005;
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full animate-[float_6s_ease-in-out_infinite]" />;
};

export default TikTokLogo;

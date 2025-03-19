import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const HeroBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15;
      
      // Colors - alternating between TikTok teal and pink
      if (i % 3 === 0) {
        // R value
        colorsArray[i] = i % 6 === 0 ? 0x25/255 : 0xFE/255;
      } else if (i % 3 === 1) {
        // G value
        colorsArray[i] = i % 6 === 0 ? 0xF4/255 : 0x2C/255;
      } else {
        // B value
        colorsArray[i] = i % 6 === 0 ? 0xEE/255 : 0x55/255;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Handle mouse move
    const onDocumentMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX - window.innerWidth / 2) / 100,
        y: (event.clientY - window.innerHeight / 2) / 100
      };
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x = mousePosition.current.y * 0.05;
      particlesMesh.rotation.y = mousePosition.current.x * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default HeroBg;

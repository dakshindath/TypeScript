import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Text3D,
  Center,
  Stars,
  OrbitControls,
  Environment
} from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import "../styles/home.css";

// Enhanced 3D Text component
const WelcomeText = ({ text }: { text: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Make the text slowly float up and down
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      // Slowly rotate the text
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshPhysicalMaterial 
            color="#ffffff"
            emissive="#5588ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Text3D>
      </Center>
    </group>
  );
};

// Light setup
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#3366ff" />
    </>
  );
};

const Home: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <div className="home-page">
      <button onClick={handleLogout} className="logout-button">Log Out</button>
      
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 75 }} 
        className="canvas-background"
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          pixelRatio: Math.min(window.devicePixelRatio, 2)
        }}
      >
        {/* Dark space-like background */}
        <color attach="background" args={['#050510']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lighting */}
        <Lights />
        
        {/* Main 3D welcome text */}
        <WelcomeText text={`Welcome ${currentUser?.name || "Guest"}`} />
        
        {/* Removed the reflective floor */}
        
        {/* Simple post-processing effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1} />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        </EffectComposer>
        
        {/* Environment lighting for better reflections */}
        <Environment preset="night" />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Home;
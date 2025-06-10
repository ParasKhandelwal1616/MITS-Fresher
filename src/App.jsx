import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoGallery from './components/VideoGallery'
import Clubs from './components/Clubs'
import Footer from './components/Footer'
import Loading from './components/Loading'
import FloatingParticles from './components/FloatingParticles'

function App() {
  const [activeSection, setActiveSection] = useState('events');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="relative z-0">
      <Canvas className="fixed top-0 left-0">
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <FloatingParticles />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
        </Suspense>
      </Canvas>
      
      <div className="relative z-10">
        <Navbar setActiveSection={setActiveSection} />
        <Hero />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {activeSection === 'events' && <VideoGallery category="events" />}
          {activeSection === 'fun' && <VideoGallery category="fun" />}
          {activeSection === 'clubs' && <Clubs />}
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App
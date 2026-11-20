import { MotionConfig } from 'motion/react'
import GridOverlay from './components/dev/GridOverlay.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    // Respect the OS "reduce motion" setting for all Motion animations.
    <MotionConfig reducedMotion="user">
      <HomePage />
      {import.meta.env.DEV && <GridOverlay />}
    </MotionConfig>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SignedOut>
      <SignInButton mode='modal'>
        Login
      </SignInButton>
    </SignedOut>

    <SignedIn>
      <SignOutButton/>
    </SignedIn>
    <UserButton/>
    </>
  )
}

export default App

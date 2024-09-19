import { Suspense } from "react"

const SuspenseComponent = ({children}) => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="loader"></div></div>}>
        {children}
    </Suspense>
  )
}

const Container = ({children}) => {
  return (
    <div className="container max-w-[1366px] h-full mx-auto">
        {children}
    </div>
  )
}

export {SuspenseComponent, Container}
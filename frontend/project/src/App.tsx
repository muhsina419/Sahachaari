import { Outlet } from "react-router"
import { useState } from "react"


function App() {
const [count,setCount] = useState(1)

const increment = ()=>{
  setCount(count+1)
}

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
    <div className="">Header</div>
    <Outlet/>
    <div className="">Footer</div>
    </div>
  )
}

export default App

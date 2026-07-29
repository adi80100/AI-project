import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import { useEffect } from "react"
import { getCurrentUser } from "./features/getCurrentUser.js"
import { useDispatch } from "react-redux"
import { setUserData } from "./redux/userSlice.js"
const App = () => {

  const dispatch = useDispatch()


  useEffect(()=>{
    const getUser = async ()=>{
      const data = await getCurrentUser()
      dispatch(setUserData(data))
    }
    getUser()
  },[])
  return (

    <div>
        <BrowserRouter>
          <Routes>
            < Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App

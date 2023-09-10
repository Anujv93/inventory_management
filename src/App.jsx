import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import './pages/dashboard/Dashboard'
import LoginPage from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import { selectUser,login, logout } from './features/user/userSlice'
import { useEffect } from 'react'

import { auth } from './firebase/config'
// import Dashboard from './pages/dashboard/Dashboard'


function App() {

  const user = useSelector(selectUser);
  console.log(user)
  const dispatch = useDispatch();
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        dispatch(login({uid:userAuth.uid, email:userAuth.email}))
      }else{
        dispatch(logout())
      }
    })
    return unsuscribe;
  },[dispatch])

  return (
    <>
    {user.user ? <Dashboard/> : <LoginPage/>}
    </>
  )
}

export default App

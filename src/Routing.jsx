
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Login } from './Components/Login'
import { Registration } from './Components/Registration'
import propTypes from "prop-types";
import { Home } from './Components/Home';

export const Routing = () => {

    function ProtectedRoute({routerElement}){
        return routerElement;
    }

    ProtectedRoute.propTypes={
        routerElement:propTypes.element
    }

    //set authentication to unauthorize without authorizing we can't able to acces the home router
    localStorage.setItem("authentication","unauthorize");
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login></Login>}></Route>
    <Route path='/Register' element={<ProtectedRoute routerElement={<Registration></Registration>}></ProtectedRoute>}></Route>
    <Route path='/Home' element={<Home></Home>}></Route>
    {/* <Route path='/Register' element={<Registration></Registration>}></Route> */}
    </Routes>
    </BrowserRouter>
    </>
  )
}
import { Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import Home from "./pages/user/home/home";
import NoPage from "./pages/nopage";

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Menu/>}>
                <Route index element={<Home/>}/>
            </Route>
            <Route path="*" element={<NoPage/>}/>
        </Routes>
    )
}
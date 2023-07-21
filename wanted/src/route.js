import { Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import Home from "./pages/user/home/home";
import NoPage from "./pages/nopage";
import Grid from "./pages/user/grid/gridPage";
import ReportPage from "./pages/user/report/reportPage";
import Docs from "./pages/user/docs/docsPage";


export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Menu/>}>
                <Route index element={<Home/>}/>
                <Route path="grid" element={<Grid />}/>
                <Route path="report" element={<ReportPage />}/>
                <Route path="docs" element={<Docs />}/>
            </Route>
            <Route path="*" element={<NoPage/>}/>
        </Routes>
    )
}
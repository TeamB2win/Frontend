import { Routes, Route } from "react-router-dom";
import UserNav from "./components/userNav";
//import MainCarousel from "./pages/user/home/home";
import Home from "./pages/user/home/home_copy_3";
import NoPage from "./pages/nopage";
import Grid from "./pages/user/grid/gridPage_3";
import ReportPage from "./pages/user/report/reportPage";
import Docs from "./pages/user/docs/docsPage";
import Login from "./pages/user/login/login";
import AdminNav from "./components/adminNav";
import Dashboard from "./pages/admin/dashboard/dashboard";



export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<UserNav />}>
                <Route index element={<Home />} />
                <Route path="grid" element={<Grid />} />
                <Route path="report" element={<ReportPage />} />
                <Route path="docs" element={<Docs />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="/admin" element={<AdminNav />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}
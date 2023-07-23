import { Routes, Route } from "react-router-dom";
import UserNav from "./components/userNav";
import Home from "./pages/user/home/home";
import NoPage from "./pages/nopage";
import Grid from "./pages/user/grid/gridPage";
import ReportPage from "./pages/user/report/reportPage";
import Docs from "./pages/user/docs/docsPage";
import Login from "./pages/user/login/login";
import AdminNav from "./components/adminNav";


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
            <Route path="/admin" element={<AdminNav/>} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}
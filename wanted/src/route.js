import { Routes, Route } from "react-router-dom";
import UserNav from "./components/userNav";
import Home from "./pages/user/home/home";
import NoPage from "./pages/nopage";
import Grid from "./pages/user/grid/gridPage";
import ReportPage from "./pages/user/report/reportPage";
import Docs from "./pages/user/docs/docsPage";
import Login from "./pages/user/login/login";
import AdminNav from "./components/adminNav";
import Dashboard from "./pages/admin/dashboard/dashboard";
import Create from "./pages/admin/create/create";
import Update from "./pages/admin/update/update";
import Delete from "./pages/admin/delete/delete";
import Edit from "./pages/admin/edit/edit";


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
                <Route path="create" element={<Create />} />
                <Route path="update" element={<Update />} />
                <Route path="delete" element={<Delete />} />
                <Route path="edit" element={<Edit />} />
            </Route>
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/user/dashboard-page";

function AppRoutes() {
  return (
    <Routes>
      <Route index />
      <Route path="users" element={<UserList />} />
      {/*<Route path="*" element={<NoPage/>}/>*/}
    </Routes>
  );
}

export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Bestiary from "../pages/Bestiary.jsx";
import ImportMonster from "../pages/ImportMonster.jsx";
import CreateMonster from "../pages/CreateMonster.jsx";
import EditMonster from "../pages/EditMonster.jsx";
import MonsterProfile from "../pages/MonsterProfile.jsx";
import Campaigns from "../pages/Campaigns.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bestiary" element={<Bestiary />} />
      <Route path="/import" element={<ImportMonster />} />
      <Route path="/monsters/new" element={<CreateMonster />} />
      <Route path="/monsters/:id" element={<MonsterProfile />} />
      <Route path="/monsters/:id/edit" element={<EditMonster />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

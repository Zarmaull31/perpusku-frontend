// src/pages/DashboardDispatcherPage.jsx

import { useAuth } from "../hooks/useAuth";
import DashboardAppPage from "../sections/@dashboard/app/DashboardAppPage";
import DashboardMemberPage from "../sections/@dashboard/app/DashboardMemberPage";

export default function DashboardDispatcherPage() {
  const { user } = useAuth();

  // Cek role user, lalu render komponen dashboard yang sesuai
  if (user.isAdmin) {
    return <DashboardAppPage />;
  }

  return <DashboardMemberPage />;
}
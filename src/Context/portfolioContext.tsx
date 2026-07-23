import { createContext, useContext, useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReactNode } from "react";
import type { ProfileData, ProjectData } from "../Types/customTypes";

interface PortfolioContextType {
  profile: ProfileData | null;
  setProfile: Dispatch<SetStateAction<ProfileData | null>>;
  projects: ProjectData[];
  setProjects: Dispatch<SetStateAction<ProjectData[]>>;
  loading: boolean;
  error: string | null;
  adminTokenSet: boolean;
  setAdminTokenSet: Dispatch<SetStateAction<boolean>>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminTokenSet, setAdminTokenSet] = useState(false);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_SERVER_URL}/api/profile/1`),
          fetch(`${import.meta.env.VITE_SERVER_URL}/api/profile/1/projects`)
        ]);

        if (!profileRes.ok || !projectsRes.ok) {
          throw new Error("Failed to fetch data from server.");
        }

        const profileData: ProfileData = await profileRes.json();
        const projectsData: ProjectData[] = await projectsRes.json();

        setProfile(profileData);
        setProjects(projectsData);
      } catch (err: any) {
        console.error("Data loading error:", err);
        setError(err.message || "Failed to sync with API database.");
      } finally {
        setLoading(false);
      }
    }

    const securityToken = localStorage.getItem("admin_token");

    if (securityToken) {
      setAdminTokenSet(true);
      fetchDashboardData();
    }
  }, [adminTokenSet]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        loading,
        error,
        setProfile,
        setProjects,
        adminTokenSet,
        setAdminTokenSet
      }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function useMyGlobalState() {
  const context = useContext(PortfolioContext);

  if (context === undefined) {
    throw new Error(
      "useMyGlobalState must be used within PortfolioProvider"
    );
  }

  return context;
}

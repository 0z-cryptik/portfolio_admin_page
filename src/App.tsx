import { useMyGlobalState } from "./Context/portfolioContext";
import { PageLoader } from "./Components/Loaders/pageLoader";
import { HomePageError } from "./Components/ErrorPages/HomePageError";
import { Header } from "./Components/Profile/Header/header";
import { AboutMe } from "./Components/Profile/aboutMe";
import { MySkills } from "./Components/Profile/MySkills/mySkills";
import { ProjectsHeading } from "./Components/Projects/projectHeading";
import { Projects } from "./Components/Projects/projects";

export default function App() {
  const { loading, error } = useMyGlobalState();

  if (loading) {
    return <PageLoader></PageLoader>;
  }

  if (error) {
    return <HomePageError></HomePageError>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-6 sm:py-12">
      <div className="max-w-[92%] sm:max-w-[80%] lg:max-w-4xl mx-auto space-y-6 md:space-y-12">
        <Header />

        <div>
          <AboutMe />
          <MySkills />
        </div>

        <div className="space-y-6 pt-4">
          <ProjectsHeading />
          <Projects />
        </div>
      </div>
    </div>
  );
}

import { useMyGlobalState } from "./Context/portfolioContext";
import { PageLoader } from "./Components/Loaders/pageLoader";
import { HomePageError } from "./Components/ErrorPages/HomePageError";
import { Header } from "./Profile/header";
import { AboutMe } from "./Profile/aboutMe";
import { MySkills } from "./Profile/mySkills";
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
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <Header></Header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AboutMe></AboutMe>
          <MySkills></MySkills>
        </div>

        <div className="space-y-6 pt-4">
          <ProjectsHeading></ProjectsHeading>
          <Projects></Projects>
        </div>
      </div>
    </div>
  );
}

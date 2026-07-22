import { PDFDownloadLink } from "@react-pdf/renderer";
import { CVPdfDocument } from "./resume";
import type { ProfileData, ProjectData } from "../../Types/customTypes";

interface DownloadCVProps {
  profile: ProfileData;
  projects: ProjectData[];
}

export function DownloadCVButton({ profile, projects }: DownloadCVProps) {
  return (
    <PDFDownloadLink
      document={
        <CVPdfDocument
          profile={profile}
          projects={projects}
        />
      }
      fileName={`${profile.full_name.replaceAll(" ", "_")}_CV.pdf`}
      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors">
      {({ loading }) => (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>{loading ? "Generating PDF..." : "Download CV"}</span>
        </>
      )}
    </PDFDownloadLink>
  );
}

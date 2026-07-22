import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import { styles } from "./style";
import type { ProfileData, ProjectData } from "../../Types/customTypes";

interface CVPdfProps {
  profile: ProfileData;
  projects: ProjectData[];
}

export function CVPdfDocument({ profile, projects }: CVPdfProps) {
  return (
    <Document title={`${profile.full_name} - CV`}>
      <Page
        size="A4"
        style={styles.page}>
        {/* 1. Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.full_name}</Text>

          <View style={styles.contactRow}>
            {profile.email && (
              <Link
                src={`mailto:${profile.email}`}
                style={styles.link}>
                {profile.email}
              </Link>
            )}
            {profile.github_url && (
              <Link
                src={profile.github_url}
                style={styles.link}>
                GitHub
              </Link>
            )}
            {profile.linkedin_url && (
              <Link
                src={profile.linkedin_url}
                style={styles.link}>
                LinkedIn
              </Link>
            )}
            {profile.twitter_url && (
              <Link
                src={profile.twitter_url}
                style={styles.link}>
                X / Twitter
              </Link>
            )}
          </View>
        </View>

        {/* 2. Summary Section */}
        {profile.about_me && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.aboutText}>{profile.about_me}</Text>
          </View>
        )}

        {/* 3. Global Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Programming Languages/Frameworks</Text>
            <View style={styles.skillsList}>
              {profile.skills.map((s) => (
                <Text
                  key={s.skill_id}
                  style={styles.skillBadge}>
                  {s.skill_name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* 4. Key Projects Section */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View
                key={proj.project_id}
                style={styles.projectCard}
                wrap={false}>
                {/* Project Title */}
                <Text style={styles.projectTitle}>{proj.title}</Text>

                {/* Description */}
                <Text style={styles.projectDesc}>{proj.description}</Text>

                {/* Tech Stack Tags */}
                {proj.skills && proj.skills.length > 0 && (
                  <View style={styles.projectSkillsRow}>
                    {proj.skills.map((skill) => (
                      <Text
                        key={skill.skill_id}
                        style={styles.projectSkillTag}>
                        #{skill.skill_name}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Clean, Clickable Links (ASCII Safe) */}
                <View style={styles.projectLinksRow}>
                  {proj.live_link && (
                    <Link
                      src={proj.live_link}
                      style={styles.link}>
                      [ Live Link ]
                    </Link>
                  )}
                  {proj.see_how_it_works && (
                    <Link
                      src={proj.see_how_it_works}
                      style={styles.link}>
                      [ Demo ]
                    </Link>
                  )}
                  {proj.repo_link && (
                    <Link
                      src={proj.repo_link}
                      style={styles.link}>
                      [ Source Code ]
                    </Link>
                  )}
                  {proj.backend_repo && (
                    <Link
                      src={proj.backend_repo}
                      style={styles.link}>
                      [ Backend Code ]
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

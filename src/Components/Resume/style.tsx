import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    color: "#0F172A"
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 12
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: "#64748B"
  },
  link: {
    color: "#0284C7",
    textDecoration: "none"
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#475569",
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 4
  },
  aboutText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#334155"
  },
  /* Skills Container */
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },
  skillBadge: {
    fontSize: 8.5,
    color: "#334155",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "#CBD5E1"
  },
  /* Project Card Styles */
  projectCard: {
    marginBottom: 18 /* Increased spacing between individual projects */
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 4 /* Space between Title and Description */
  },
  projectDesc: {
    fontSize: 9,
    lineHeight: 1.45,
    color: "#334155",
    marginBottom: 6 /* Space between Description and Tech Stack */
  },
  projectSkillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 6 /* Space between Tech Stack and Action Links */
  },
  projectSkillTag: {
    fontSize: 8,
    color: "#64748B"
  },
  projectLinksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 8.5
  }
});

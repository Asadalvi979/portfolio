import { readData } from "@/lib/apiHelper";
import AboutClient from "./AboutClient";

export default async function About() {
  const [skills, education, projects, certifications] = await Promise.all([
    readData("skills.json"),
    readData("education.json"),
    readData("projects.json"),
    readData("certifications.json"),
  ]);

  return (
    <AboutClient
      skillData={Array.isArray(skills) ? skills : []}
      educationData={Array.isArray(education) ? education : []}
      projectCount={Array.isArray(projects) ? projects.length : 0}
      certCount={Array.isArray(certifications) ? certifications.length : 0}
    />
  );
}

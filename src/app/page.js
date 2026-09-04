import { readData } from "@/lib/apiHelper";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [techStackData, services, projectsData, profile, skills, certifications] =
    await Promise.all([
      readData("techStack.json"),
      readData("services.json"),
      readData("projects.json"),
      readData("profile.json"),
      readData("skills.json"),
      readData("certifications.json"),
    ]);

  const counts = {
    projects: Array.isArray(projectsData) ? projectsData.length : 0,
    skills: Array.isArray(skills) ? skills.length : 0,
    certifications: Array.isArray(certifications) ? certifications.length : 0,
  };

  return (
    <HomeClient
      techStackData={techStackData}
      services={services}
      projectsData={projectsData}
      counts={counts}
      profile={profile}
    />
  );
}

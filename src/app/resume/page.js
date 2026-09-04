import { readData } from "@/lib/apiHelper";
import ResumeClient from "./ResumeClient";

export const dynamic = "force-dynamic";

export default async function Resume() {
  const [skills, education, experience, certifications, profile] = await Promise.all([
    readData("skills.json"),
    readData("education.json"),
    readData("experience.json"),
    readData("certifications.json"),
    readData("profile.json"),
  ]);

  return (
    <ResumeClient
      skillData={Array.isArray(skills) ? skills : []}
      educationData={Array.isArray(education) ? education : []}
      experienceData={Array.isArray(experience) ? experience : []}
      certificationData={Array.isArray(certifications) ? certifications : []}
      cv={typeof profile?.cv === "string" ? profile.cv : ""}
    />
  );
}

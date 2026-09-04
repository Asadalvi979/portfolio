import { readData } from "@/lib/apiHelper";
import ExperienceClient from "./ExperienceClient";

export default async function Experience() {
  const [experienceData, educationData] = await Promise.all([
    readData("experience.json"),
    readData("education.json"),
  ]);

  return (
    <ExperienceClient
      experienceData={Array.isArray(experienceData) ? experienceData : []}
      educationData={Array.isArray(educationData) ? educationData : []}
    />
  );
}

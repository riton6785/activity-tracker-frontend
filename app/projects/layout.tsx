import { ReactNode } from "react";
import { ProjectNavbar } from "../components/ProjectNavbar";

export default function ActivityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ProjectNavbar />
      {children}
    </>
  );
}

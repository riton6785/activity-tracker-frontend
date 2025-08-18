import { ActivityNavbar } from "../components/ActivityNavbar";
import { ReactNode } from "react";

export default function ActivityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ActivityNavbar />
      {children}
    </>
  );
}

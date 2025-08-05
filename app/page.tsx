import Image from "next/image";
import { HomePageSparkle } from "./components/HomePageSparkle";
import FeatureSection from "./components/FeatureSection";

export default function Home() {
  return (
   <div>
    <HomePageSparkle/>
    <FeatureSection/>
   </div>
  );
}

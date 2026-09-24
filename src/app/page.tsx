import { Hero } from "@/components/Hero";
import { LibrarySection } from "@/components/LibrarySection";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <LibrarySection />
    </div>
  );
}

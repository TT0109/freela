import Image from "next/image";
import ProfileSpySelector from "./compoents/ProfileSpySelector";

export default function Home() {
  return (
    <div className="w-full max-w-sm h-screen bg-gray-100 flex flex-col mx-auto">
      <ProfileSpySelector />
    </div>
  );
}
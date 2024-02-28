import ThemeToggle from "./ThemeToggle";
import { MdTravelExplore } from "react-icons/md";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-red-500 via-yellow-500 to-green-500 shadow-xl p-2 rounded-lg">
        AI
      </h1>
      <h2 className="text-xl font-bold relative">hadiKolayla</h2>
      <ThemeToggle />
    </div>
  );
};
export default SidebarHeader;

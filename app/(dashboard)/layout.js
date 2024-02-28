import { RiMenuSearchLine } from "react-icons/ri";
import Sidebar from "@/components/Sidebar";
const layout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden fixed top-6 right-6"
        >
          <span className="flex items-center text-gradient-to-r from-red-500 via-yellow-500 to-green-500">
            <RiMenuSearchLine className="w-8 h-8" />
          </span>
        </label>

        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden fixed top-6 left-6"
        >
          <h1 className="text-xl font-bold relative">
            hadiKolayla
            <span className="ml-2 bg-gradient-to-r font-black text-transparent bg-clip-text from-red-500 via-yellow-500 to-green-500 shadow-xl p-2 rounded-lg">
              AI
            </span>
          </h1>
        </label>

        <div className="bg-base-200 px-8 py-12 min-h-screen">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};
export default layout;

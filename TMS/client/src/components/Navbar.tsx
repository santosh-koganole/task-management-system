import { useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          className="text-2xl text-gray-500 block md:hidden"
          onClick={() => dispatch(setOpenSidebar(true))}
        >
          <RxHamburgerMenu />
        </button>
      </div>

      <div className="justify-end items-center">
        {/* Notification panel */}
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;

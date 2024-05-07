import { MdDashboard, MdOutlineNotificationsNone } from "react-icons/md";

import { FaRegClock, FaRegFlag, FaRegUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineProject } from "react-icons/ai";
import { IoNotificationsSharp } from "react-icons/io5";

const style = {
    size: 20,
    color: "rgb(55 65 81)",
}

export const topSidebarItems = [
    {
        key: "/activity",
        icon: <MdDashboard {...style} />,
        title: "Activity",
        disabled: false
    },
    {
        key: "/projects",
        icon: <AiOutlineProject {...style} />,
        title: "Projects",
        disabled: true
    },
    {
        key: "/updates",
        icon: <FaRegClock {...style} />,
        title: "All Updates",
        disabled: true
    },
    {
        key: "/settings",
        icon: <IoMdSettings {...style} />,
        title: "Settings",
        disabled: true
    },
];


export const bottomSidebarItems = [
    {
        key: "/profile",
        icon: <FaRegUserCircle {...style} />,
        title: "Profile",
        disabled: true
    },
    {
        key: "/notifications",
        icon: <IoNotificationsSharp {...style} />,
        title: "Notifications",
        disabled: true
    },

];
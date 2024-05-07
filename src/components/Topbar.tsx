
import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Avatar, Dropdown, Space } from "antd";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/util/supabase/action";

const TopBar = () => {
    const router = useRouter()


    const handleLogout = async () => {
        signOut().then(() => {
            router.push("/");
        })
    };
    return (
        <div className="flex h-[70px] gap-2 justify-between items-center p-2 shadow-sm">
            <div
                onClick={() => {
                    router.push("/activity");
                }}
            >

            </div>
            <div className="flex items-center gap-4 md:gap-[1.8rem]">
                {/* <FaEnvelope className="text-[20px] text-[text-[#3F4257]] cursor-pointer" />
        <IoNotifications className="text-[20px] text-[text-[#3F4257]] cursor-pointer" /> */}

                <div className="flex items-center gap-3">
                    <Avatar size={40} src={<Image
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="Avatar"
                        width={30}
                        height={30}

                    />} />

                    <div className="flex items-center gap-2 ">
                        <Space size="middle">
                            <Dropdown
                                placement="bottom"
                                menu={{
                                    items: [
                                        {
                                            key: "2",
                                            label: (
                                                <span
                                                    className="flex items-center gap-2 text-red-600"
                                                    onClick={handleLogout}
                                                >
                                                    <FiLogOut className="text-[18px]" /> Logout
                                                </span>
                                            ),
                                        },
                                    ],
                                }}
                            >
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <h3 className="text-[18px] font-medium text-[#3F4257]">
                                        John Doe
                                    </h3>
                                    <MdArrowDropDown className="text-[20px] text-[#3F4257]" />
                                </div>
                            </Dropdown>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TopBar);
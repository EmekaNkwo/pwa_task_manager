import { Spin } from "antd";
import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    className?: string;
    loading?: boolean;
    variant: "Filled" | "Outlined"
}


export const CustomButton = ({
    title,
    className,
    loading,
    variant,
    ...props
}: IProps) => {
    return (
        <>
            {
                variant === "Filled" ? <button
                    className={`${className} gap-2 cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed h-[42px] p-2 text-[15px] rounded-md border-none flex items-center justify-center outline-none hover:bg-opacity-90 relative`}
                    {...props}
                >

                    {loading ? (
                        <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    ) : title}
                </button> : <button
                    className={`${className} relative h-[40px] gap-2  p-2 text-[15px] rounded-md border-[2px] flex items-center justify-center outline-none hover:border-opacity-90`}
                    {...props}
                >
                    {loading ? (
                        <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    ) : title}
                </button>
            }
        </>
    );
};
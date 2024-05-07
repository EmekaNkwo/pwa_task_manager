import { Checkbox, CheckboxProps, ConfigProvider, Input, InputProps } from "antd";

interface IProps extends InputProps {
    className?: string;
    labelName?: string;
}
interface ICheckBoxProps extends CheckboxProps {
    className?: string;
    labelName?: string;
    title?: string
}

export const InputField = ({ className, labelName, ...inputProps }: IProps) => {
    return (
        <div className=" flex flex-col gap-1 font-semibold w-full ">
            {labelName && (
                <span className="font-medium text-[13px] text-baseColor">{labelName}</span>
            )}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#066FA9",
                    },
                }}
            >
                <Input

                    {...inputProps}
                    className={`rounded-md h-[45px] ${className}`}
                />
            </ConfigProvider>
        </div>
    );
};

export const PasswordField = ({ className, labelName, ...props }: IProps) => {
    return (
        <label className="flex-1 flex flex-col gap-1 font-semibold w-full">
            {labelName && (
                <span className="font-medium text-[13px] text-baseColor">{labelName}</span>
            )}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#066FA9",
                    },
                }}
            >
                <Input.Password
                    {...props}
                    className={`rounded-md h-[45px] ${className}`}
                />
            </ConfigProvider>
        </label>
    );
};

export const CheckboxField = ({ className, labelName, title, ...props }: ICheckBoxProps) => {
    return (
        <label className="flex-1 flex flex-col gap-1 font-semibold w-full">
            {labelName && (
                <span className="font-medium text-[13px] text-primaryColor">{labelName}</span>
            )}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#066FA9",
                    },
                }}
            >
                <Checkbox {...props} className={`rounded-md ${className}`} >
                    {title}
                </Checkbox>
            </ConfigProvider>
        </label>
    );
};
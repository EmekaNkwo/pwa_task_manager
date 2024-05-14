"use client";

import { useRouter } from "next/navigation";
import { Form, FormProps, message } from "antd";
import { AppRoutes } from "@/shared/routes/AppRoutes";
import { CheckboxField, InputField, PasswordField } from "@/shared/ui/InputField";
import { CustomButton } from "@/shared/ui/CustomButtons";
import { login, loginWithGoogle } from "@/util/supabase/action";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { CLEAR_PENDING_TASK_UPDATE } from "@/redux/slice/pendingTaskSlice";


type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const Login = () => {
    const { push } = useRouter();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(CLEAR_PENDING_TASK_UPDATE());
    }, [])

    // Implement later
    // const onHandleGoogleLogin = async () => {


    //     const { error, data } = await loginWithGoogle();
    //     console.log(data);
    //     if (error) {
    //         message.error(error?.message); // Display the error message
    //     } else {
    //         message.success('Login successful');
    //         // sessionStorage.setItem('task_token');
    //         push(AppRoutes.Activity)
    //     }
    //     push(data?.url ?? "")
    // };
    const onHandleEmailLogin: FormProps<FieldType>['onFinish'] = async (values) => {
        const formData = new FormData();
        formData.append('email', values.email ?? '');
        formData.append('password', values.password ?? '');

        const { error, data } = await login(formData);
        if (error) {
            message.error(error?.message); // Display the error message
        } else {
            message.success('Login successful');
            sessionStorage.setItem('task_token', data?.session?.access_token ?? '');
            push(AppRoutes.Activity)
        }
    };

    return (
        <>
            <div className="flex flex-col gap-y-4 items-center justify-center w-full bg-whiteColor h-screen">
                <h3 className="text-[32px] mt-2 font-medium text-baseColor">Welcome back</h3>
                {/* <div
                    onClick={onHandleGoogleLogin}
                    className="p-2 rounded-md flex items-center bg-whiteColor justify-center gap-2 shadow-md mt-4 cursor-pointer"
                >
                    <FcGoogle className="text-[2.2rem]" />
                    <span className="text-primaryColor">Continue with Google</span>
                </div> */}

                <Form

                    onFinish={onHandleEmailLogin}
                    layout="vertical"
                    className="mt-[2rem]"
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <InputField
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <PasswordField
                            size="large"

                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"



                    >
                        <CheckboxField title="Remember me" />
                    </Form.Item>

                    <Form.Item >
                        <CustomButton
                            variant="Filled"
                            title="Log in"
                            className="bg-[#0F376A] w-full text-whiteColor mt-2"
                            type="submit"


                        />
                    </Form.Item>


                </Form>
                <span className="mt-4">
                    Not Registered?{" "}
                    <b
                        className="text-baseColor cursor-pointer"
                        onClick={() => push(AppRoutes.Signup)}
                    >
                        Sign Up
                    </b>
                </span>
            </div>
        </>
    );
};

export default Login;

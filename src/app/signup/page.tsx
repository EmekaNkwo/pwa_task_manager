"use client";
import { useState, useEffect, FormEventHandler } from "react";

import { FcGoogle } from "react-icons/fc";

import { useRouter } from "next/navigation";


import { Form, FormProps, message } from "antd";
import { AppRoutes } from "@/shared/routes/AppRoutes";
import { CheckboxField, InputField, PasswordField } from "@/shared/ui/InputField";
import { CustomButton } from "@/shared/ui/CustomButtons";
import { signup } from "@/util/supabase/action";

type FieldType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};


const SignUp = () => {
    const { push } = useRouter();
    // const onHandleGoogleLogin = async () => {

    // };
    const onHandleEmailLogin: FormProps<FieldType>['onFinish'] = async (values) => {
        const formData = new FormData();
        formData.append('email', values.email ?? '');
        formData.append('password', values.password ?? '');

        const { error, data } = await signup(formData);
        if (error) {
            message.error(error?.message);
        } else {
            message.success('Signup successful');
            push(AppRoutes.Login)
        }
    };

    return (
        <>
            <div className="flex flex-col gap-y-4 items-center justify-center w-full bg-whiteColor h-screen">
                <h3 className="text-[32px] mt-2 font-medium text-baseColor">Lets get started</h3>
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
                    className="l mt-[2rem]"
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
                        label="ConfirmPassword"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Confirm your password!' }]}
                    >
                        <PasswordField
                            size="large"

                        />
                    </Form.Item>
                    <Form.Item >
                        <CustomButton
                            variant="Filled"
                            title="Sign Up"
                            className="bg-[#0F376A] w-full text-whiteColor mt-2"
                            type="submit"

                        />
                    </Form.Item>


                </Form>
                <span className="mt-4">
                    Already registered?{" "}
                    <b
                        className="text-baseColor cursor-pointer"
                        onClick={() => push(AppRoutes.Login)}
                    >
                        Login
                    </b>
                </span>
            </div>
        </>
    );
};

export default SignUp;

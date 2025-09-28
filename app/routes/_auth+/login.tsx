import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import { Button, Flex } from "antd";
import Cookies from "js-cookie";
import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch } from "react-redux";
import CheckBox from "~/components/ui/CheckBox";
import SecretBox from "~/components/ui/SecretBox";
import TextBox from "~/components/ui/TextBox";
import { FRONTEND_LINKS } from "~/constants/links";
import { useCreateLoginMutation } from "~/states/actions/auth";
import { setCurrentUser } from "~/states/reducers/auth";
import { LoginFormType } from "~/types/auth";
import { alertMessage, isError, validateError } from "~/utils/helpers";


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [queryParams] = useSearchParams();
    const redirectUrl = queryParams.get("redirect") ?? "";

    const router = useNavigate();
    const [create, result] = useCreateLoginMutation();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            remember_me: false,
        },
    });

    const onSubmit = async (data: LoginFormType) => {
        await create(data)
            .unwrap()
            .then(async (res) => {
                if (res.status === "success") {
                    alertMessage({
                        title: res.message,
                        icon: "success",
                        timer: 2000,
                    });
                    Cookies.set("authToken", res.data.token, { expires: 2 });
                    Cookies.set("department_id", res.data.department_id, {
                        expires: 2,
                    });
                    Cookies.set("permissions", res.data.permissions, {
                        expires: 2,
                    });
                    const myDecodedToken = decodeToken(res.data.token);
                    dispatch(
                        setCurrentUser({
                            token: res.data.token,
                            isAuthenticate: true,
                            decodeToken: myDecodedToken,
                        })
                    );

                    if (!redirectUrl)
                        router(FRONTEND_LINKS.panels.dashboard, {
                            replace: true,
                        });
                    else router(redirectUrl, { replace: true });
                }
            })
            .catch((err) => {
                if (err.status === "validateError") {
                    const errors = validateError(err.data);
                    Object.keys(errors).forEach((fieldName) =>
                        setError(fieldName as keyof LoginFormType, {
                            type: "manual",
                            message: errors[fieldName],
                        })
                    );
                } else {
                    alertMessage({
                        title: err.message,
                        icon: "error",
                        timer: 2000,
                    });
                }
            });
    };

    const tokenChecker = useCallback(() => {
        const authToken = Cookies.get("authToken") ?? null;

        if (authToken) {
            const myDecodedToken = decodeToken(authToken);
            const isMyTokenExpired = isExpired(authToken);

            if (isMyTokenExpired) {
                Cookies.remove("authToken");
                return;
            }

            dispatch(
                setCurrentUser({
                    token: authToken,
                    isAuthenticate: true,
                    decodeToken: myDecodedToken,
                })
            );

            if (redirectUrl) {
                return router(redirectUrl, { replace: true });
            }

            return router(FRONTEND_LINKS.panels.dashboard, { replace: true });
        }
    }, [dispatch, redirectUrl, router]);

    useEffect(() => {
        // tokenChecker();
    }, [tokenChecker]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex vertical gap="middle">
                <div className="grid grid-cols-1 gap-2">
                    <TextBox
                        label="Email"
                        placeholder="Email"
                        name="email"
                        control={control}
                        error={isError(errors.email)}
                        helperText={errors.email?.message}
                    />

                    <SecretBox
                        control={control}
                        name="password"
                        rules={{
                            required: "Password field is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password field should be minimum 6 characters",
                            },
                        }}
                        label="Password"
                        placeholder="Password"
                        error={isError(errors.password)}
                        helperText={errors.password?.message}
                    />

                    <Controller
                        name="remember_me"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CheckBox
                                label="Remember Me"
                                onChange={onChange}
                                onBlur={onBlur}
                                checked={value}
                            />
                        )}
                    />

                    <div className="lg:text-end">
                        <Link
                            to={FRONTEND_LINKS.auth.reset.request}
                            style={{
                                color: 'black',
                            }}
                        >
                            Forget Password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={result.isLoading}
                >
                    Login
                </Button>
            </Flex>
        </form>
    );
};

export default Login;

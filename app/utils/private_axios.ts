/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AnyObject } from "~/types/anyObject";
import { API_URL } from "~/constants/links";
import Cookies from "js-cookie";
import { alertMessage } from "./helpers";
import { UseFormSetError } from "react-hook-form";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get("authToken");

async function private_axios_post(endpoint: string, data = {}, setError?: UseFormSetError<any>) {
    try {
        const res = await axios.post(endpoint, data || {});
        return {
            ...res.data,
            status: res.data.status,
            statusCode: res.data.statusCode,
        };
    } catch (error) {
        const cerror = error as AnyObject;

        if (cerror.response?.status === 422 && setError) {
            const errors = cerror.response.data.errors;
            for (const key in errors) {
                if (Object.prototype.hasOwnProperty.call(errors, key)) {
                    const element = errors[key];
                    setError(key, {
                        type: "manual",
                        message: element[0],
                    })
                }
            }
        }

        return {
            statusCode: cerror.response.data.statusCode || cerror.response.status,
            status: cerror.response.data.message,
            errors: cerror.response.data?.errors || {},
        }
    }
}

async function private_axios_get(endpoint: string) {
    try {
        const res = await axios.get(endpoint);
        return res.data;
    } catch (error) {
        return {};
    }
}

axios.interceptors.request.use(
    function (config) {
        const form_errors = document.querySelectorAll('.form_error');
        [...form_errors].forEach((e) => e.remove());
        const has_errors = document.querySelectorAll('.has_error');
        [...has_errors].forEach((e) => e.classList.remove('has_error'));

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            for (const key in errors) {
                if (Object.prototype.hasOwnProperty.call(errors, key)) {
                    const element = errors[key];

                    const el = document.querySelector(`[name="${key}"]`);
                    if (el) {
                        (el.parentNode as HTMLElement).classList.add('has_error');
                        (el.parentNode as HTMLElement)?.insertAdjacentHTML(
                            'beforeend',
                            `
                                <div class="form_error" style="color: red;">
                                    ${element[0]}
                                </div>
                            `,
                        );
                    }
                }
            }
            // errors.forEach((error: AnyObject) => {
            //     const el = document.querySelector(`[name="${error.path}"]`);
            //     if (el) {
            //         (el.parentNode as HTMLElement).classList.add('has_error');
            //         (el.parentNode as HTMLElement)?.insertAdjacentHTML(
            //             'beforeend',
            //             `
            //             <div class="form_error">
            //                 ${error.msg}
            //             </div>
            //             `,
            //         );
            //     }
            // });

            // (window as AnyObject).toaster(
            //     `${error.response.status} - ${error.response.statusText}`,
            // );

            // const error_el = document.querySelector('.has_error');
            // if (error_el) {
            //     setTimeout(() => {
            //         error_el.scrollIntoView({
            //             behavior: 'smooth',
            //             block: 'center',
            //         });
            //     }, 300);
            // }
            // console.log(error.response);
        }
        
        alertMessage({ title: error.response.statusText, icon: "error", timer: 2000 });
        return Promise.reject(error);
    },
);


export { private_axios_get, private_axios_post };
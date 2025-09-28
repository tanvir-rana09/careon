import { Empty, theme, Typography } from "antd";
import React, { ReactNode } from "react";
import Loader from "./Loader";

type HeaderProps = {
    field: string;
    align: string;
    w?: string | number;
};

type IProps = {
    title?: string;
    actions?: ReactNode;
    headers?: HeaderProps[];
    rows?: ReactNode;
    paginate?: React.ReactNode;
    found?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    error?: any;
};
const { useToken } = theme;

const AppTable: React.FC<IProps> = ({
    title,
    actions,
    headers = [],
    rows,
    paginate,
    found = false,
    isLoading = false,
    isError = false,
    error,
}) => {
    const { token } = useToken();
    return (
        <div>
            <Typography.Text className="!font-semibold !text-xl">
                {title}
            </Typography.Text>
            {actions ? <div className="my-2">{actions}</div> : ""}

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-[#F3F4EE]">
                <table className="table-auto w-full whitespace-nowrap border-separate border-spacing-y-2 [&_tbody>tr]:bg-[#FBFBFB] [&_tbody>tr:hover]:bg-white [&_tbody>tr>td]:px-4 [&_tbody>tr>td]:py-2 [&_tbody>tr>td]:relative [&_tbody>tr>td]:before:absolute [&_tbody>tr>td]:before:w-[1px] [&_tbody>tr>td]:before:h-[60%] [&_tbody>tr>td]:before:bg-gray-200 [&_tbody>tr>td]:before:left-0 [&_tbody>tr>td]:before:top-1/2 [&_tbody>tr>td]:before:-translate-y-1/2 first:[&_tbody>tr>td]:before:hidden">
                    {headers?.length ? (
                        <thead className="bg-white">
                            <tr>
                                {headers?.map((item, i) => (
                                    <th
                                        key={i}
                                        align={
                                            item?.align as
                                                | "left"
                                                | "center"
                                                | "right"
                                                | "justify"
                                                | "char"
                                                | undefined
                                        }
                                        style={{ color: token.colorPrimary }}
                                        className="font-medium px-4 py-2 relative before:absolute before:w-[1px] before:h-[60%] before:bg-gray-200 before:left-0 before:top-1/2 before:-translate-y-1/2 first:before:hidden"
                                    >
                                        {item?.field}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    ) : (
                        ""
                    )}

                    {(isLoading || isError) ? (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={headers.length ?? 2}
                                    align="center"
                                >
                                    <Loader
                                        isLoading={isLoading}
                                        isError={isError}
                                        error={error}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    ) : found ? (
                        <tbody>{rows}</tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={headers.length ?? 2}
                                    align="center"
                                >
                                   <Empty/>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            {paginate}
        </div>
    );
};

export default AppTable;

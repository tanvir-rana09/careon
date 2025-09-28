import { Flex, Spin, Typography } from "antd";
import React from "react";

const Loader: React.FC<{
    isLoading?: boolean;
    isError?: boolean;
    error?: any;
}> = ({ isLoading = true, isError = false, error }) => {
    return (
        <Flex vertical align="center" justify="center" className="p-3">
            {isError && (
                <>
                    <Typography.Text
                        className="!text-6xl font-semibold"
                        type="danger"
                    >
                        {error.status || error?.data?.statusCode}
                    </Typography.Text>
                    <Typography.Text className="!text-lg    " type="danger">
                        {error.originalStatus || error?.data?.status}
                    </Typography.Text>
                    <Typography.Text className="!text-lg" type="danger">
                        {error.error || error?.data?.message}
                    </Typography.Text>
                </>
            )}
            {isLoading && (
                <Spin tip="Loading" size="large">
                    <div className="p-10" />
                </Spin>
            )}
        </Flex>
    );
};

export default Loader;

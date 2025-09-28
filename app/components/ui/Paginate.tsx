import { Pagination, Typography } from "antd";
import React from "react";

const Paginate: React.FC<{
    page: number;
    offset: number;
    from: number;
    to: number;
    total: number;
    handler: (page: number, pageSize: number) => void;
}> = ({
    page = 1,
    offset = 10,
    from = 0,
    to = 0,
    total = 0,
    handler = () => {},
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
            <Typography.Text className="!text-gray-500 text-center lg:text-start">
                Showing {from ?? 0} to {to ?? 0} of {total ?? 0} entities.
            </Typography.Text>
            <div className="lg:flex lg:justify-end">
                <Pagination
                    showSizeChanger
                    defaultCurrent={page}
                    pageSize={offset}
                    total={total}
                    onChange={handler}
                />
            </div>
        </div>
    );
};

export default Paginate;

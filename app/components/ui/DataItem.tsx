import { Flex, Typography } from "antd";
import { FC } from "react";

const DataItem: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <Flex vertical gap="small">
      <Typography.Text className="text-base font-semibold text-gray-500">
        {label}
      </Typography.Text>

      <Typography.Text className="text-sm capitalize font-normal text-gray-400">
        {value || "-"}
      </Typography.Text>
    </Flex>
  );
};

export default DataItem;

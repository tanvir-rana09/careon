import { Icon } from "@iconify/react";
import { Button, Popover, Tooltip } from "antd";
import { FC, ReactNode } from "react";

type IProps = {
    actionType: "edit" | "remove" | "view" | "option";
    options?: ReactNode;
};

const actionConfig = {
    edit: { title: "Edit", icon: "ic:outline-edit" },
    remove: { title: "Delete", icon: "mdi:trash" },
    view: {
        title: "View",
        icon: "lets-icons:view-light",
    },
    option: {
        title: "Option",
        icon: "mage:dots",
    },
};

const ActionButton: FC<IProps> = ({ actionType, options }) => {
    const { title, icon } = actionConfig[actionType] || actionConfig.view;

    if (actionType === "option") {
        return (
            <Popover trigger="click" placement="leftBottom" content={options}>
                <Button
                    size="small"
                    icon={<Icon icon={icon} fontSize={16} />}
                    variant="outlined"
                />
            </Popover>
        );
    }

    return (
        <Tooltip placement="top" title={title}>
            <Button
                size="small"
                icon={<Icon icon={icon} fontSize={16} />}
                variant="outlined"
            />
        </Tooltip>
    );
};

export default ActionButton;

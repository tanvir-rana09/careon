import { Icon } from "@iconify/react";
import { Button, ButtonProps } from "antd";
import React from "react";

type IProps = {
  actionType:
    | "add"
    | "save"
    | "cancel"
    | "filter"
    | "back"
    | "refresh"
    | "delete";
  label?: string;
} & ButtonProps;

const actionConfig = {
  add: {
    label: "Add New",
    icon: "lets-icons:add-round",
    variant: "outlined",
    color: "primary",
  },
  save: {
    label: "Save",
    icon: "prime:check-circle",
    variant: "solid",
    color: "primary",
  },
  cancel: {
    label: "Cancel",
    icon: "mi:close",
    variant: "outlined",
    color: "danger",
  },
  back: {
    label: "Back",
    icon: "stash:arrow-reply",
    variant: "outlined",
    color: "primary",
  },
  filter: {
    label: "Filter",
    icon: "mynaui:filter",
    variant: "",
    color: "",
  },
  refresh: {
    label: "Refresh",
    icon: "mynaui:refresh",
    variant: "",
    color: "",
  },
  delete: {
    label: "Delete",
    icon: "mynaui:delete",
    variant: "outlined",
    color: "danger",
  },
};

const AppButton: React.FC<IProps> = ({ actionType, label, ...props }) => {
  const { icon, color, variant } = actionConfig[actionType];
  const buttonLabel = label || actionConfig[actionType].label;

  return (
    <Button
      icon={<Icon icon={icon} fontSize={20} />}
      className="!font-semibold"
      color={color as "primary" | "danger" | "default" | undefined}
      variant={
        variant as
          | "outlined"
          | "link"
          | "text"
          | "dashed"
          | "solid"
          | "filled"
          | undefined
      }
      {...props}
    >
      {buttonLabel}
    </Button>
  );
};

export default AppButton;

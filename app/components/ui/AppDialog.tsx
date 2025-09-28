import { Modal, ModalProps } from "antd";
import { FC, ReactNode } from "react";

type IProps = {
    title?: string;
    open: boolean;
    footer?: boolean;
    onConfirm?: () => void;
    onCancel: () => void;
    children?: ReactNode;
} & ModalProps;

const AppDialog: FC<IProps> = ({
    title = "Dialog",
    open,
    footer = false,
    onConfirm,
    onCancel,
    children,
    ...props
}) => {
    return (
        <Modal
            title={title}
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            destroyOnClose
            footer={footer}
            className="[&_.ant-modal-content]:!pb-1"
            width={{
                xs: "90%",
                sm: "80%",
                md: "70%",
                lg: "60%",
                xl: "50%",
                xxl: "40%",
            }}
            {...props}
        >
            {children}
        </Modal>
    );
};

export default AppDialog;

import { Link } from "@remix-run/react";
import { Button, Image, Tooltip } from "antd";
import { FC } from "react";

const LinkButton: FC<{
    label: string;
    href: string;
    icon: string;
    placement?:
        | "top"
        | "left"
        | "right"
        | "bottom"
        | "topLeft"
        | "topRight"
        | "bottomLeft"
        | "bottomRight"
        | "leftTop"
        | "leftBottom"
        | "rightTop"
        | "rightBottom";
}> = ({ label, href, icon, placement = "right" }) => {
    return (
        <Tooltip title={label} placement={placement}>
            <Link to={href}>
                <Button
                    size="middle"
                    shape="circle"
                    icon={
                        <Image
                            src={icon}
                            width={22}
                            height={22}
                            alt={label}
                            preview={false}
                        />
                    }
                    className="hover:scale-110"
                />
            </Link>
        </Tooltip>
    );
};

export default LinkButton;

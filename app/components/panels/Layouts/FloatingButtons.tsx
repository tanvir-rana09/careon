import { Link, useLocation } from "@remix-run/react";
import { Flex, Image, Tooltip, Typography } from "antd";
import React from "react";

type IProps = {
  links: { label: string; title: string; icon: string; path: string }[];
};

const FloatingButtons: React.FC<IProps> = ({ links }) => {
  const location = useLocation();

  return (
    <div className="fixed bottom-2 bg-[#E5E7EB] rounded-lg left-1/2 -translate-x-1/2 z-50 p-1">
      <Flex gap={1}>
        {links?.map((item, i) => (
          // <LinkButton
          //     label={item?.label}
          //     href={item?.path}
          //     icon={item?.icon}
          //     placement="top"
          //     key={i}
          // />

          <Tooltip title={item?.label} key={i}>
            <Link to={item?.path} className="max-w-16 place-content-start">
              <Flex
                vertical
                align="center"
                className={`rounded-md scale-95 p-1 hover:scale-110 transition-all ease-in-out duration-200 ${
                  location.pathname === item?.path
                    ? " bg-[rgba(0,0,0,0.1)] scale-110"
                    : ""
                }`}
              >
                <div className="bg-white rounded-md p-1 w-8 h-8 shadow-sm mb-0.5">
                  <Image
                    src={item?.icon}
                    width="100%"
                    height="100%"
                    preview={false}
                    alt={item?.label}
                  />
                </div>
                <Typography.Text className="text-center text-sm font-medium leading-tight line-clamp-1">
                  {/* {item?.label?.replace(/\s+/g, "\n")} */}
                  {item?.title}
                </Typography.Text>
              </Flex>
            </Link>
          </Tooltip>
        ))}
      </Flex>
    </div>
  );
};

export default FloatingButtons;

import { Link } from "@remix-run/react";
import { Button, Flex, Image, Popover, Tooltip, Typography } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { menu } from "~/constants/menu";
import { icons } from "~/constants/themes";

const MenuContent: React.FC<{ close: () => void }> = ({ close = () => {} }) => {
    const permissions = Cookies.get("permissions");
      const filteredMenu = menu.filter((item) => {
          return permissions?.split(",")?.includes(item.permission);
      });
  
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-[#F3F4EE] pr-2">
      <Flex vertical gap={40}>
        {filteredMenu?.map((item, i) => (
          <div key={i}>
            <div className="mb-4">
              <Typography.Text className="!text-base !font-semibold">
                {item?.label}
              </Typography.Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
              {item?.children?.map((cItem, cI) => (
                <Link to={cItem?.path} onClick={close} key={cI}>
                  <Flex gap="small" align="start" key={cI}>
                    {cItem?.icon && (
                      <Image
                        src={cItem?.icon}
                        width={35}
                        height={35}
                        alt={cItem?.label}
                        preview={false}
                      />
                    )}
                    <Flex vertical>
                      {cItem?.label && (
                        <Typography.Text className="!text-sm !font-semibold">
                          {cItem?.label}
                        </Typography.Text>
                      )}
                      {cItem?.description && (
                        <Typography.Text className="!text-xs !text-gray-400">
                          {cItem?.description}
                        </Typography.Text>
                      )}
                    </Flex>
                  </Flex>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Flex>
    </div>
  );
};

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Popover
        placement="rightTop"
        title="Menu"
        content={<MenuContent close={() => setOpen(false)} />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Tooltip title="Menu" placement="left">
          <Button shape="circle">
            <Image
              src={icons.MenuIcon}
              width={16}
              height={16}
              alt="mega-menu"
              preview={false}
            />
          </Button>
        </Tooltip>
      </Popover>
    </div>
  );
};

export default Menu;

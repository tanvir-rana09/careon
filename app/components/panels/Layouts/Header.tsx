import { Flex } from "antd";
import CompanyLogo from "./Logo";

const Header = () => {
    return (
        <Flex  justify="space-between" className="px-2 h-[66px] py-1 flex !justify-end border-b border-gray-200">
            <CompanyLogo  />
        </Flex>
    );
};

export default Header;

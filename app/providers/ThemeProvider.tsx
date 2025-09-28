import { App, ConfigProvider } from "antd";
import React from "react";

const theme = {
    token: {
        fontFamily: "inherit",
        borderRadius: 2,

        colorPrimary: "#4C6EAB",
        colorPrimaryHover: "#3F5C91",
        colorPrimaryActive: "#374F7E",
        colorPrimaryBg: "#EBF0FA",
        colorPrimaryBorder: "#9CB4D6",

        colorTextBase: "#243642",
        colorTextSecondary: "#788297",

        bgColor: "#d21c23",
        textColorLight: "#fff",

        Menu: {
            itemHoverBg: "#EBF0FA", // Background color on hover
            itemSelectedBg: "#4C6EAB", // Background color when selected
            itemSelectedColor: "#ffffff", // Text color when selected
            itemHoverColor: "#1E3A3A", // Text color on hover
            itemColor: "#1E3A3A",
        },
    },
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <ConfigProvider theme={theme}>
            <App>{children}</App>
        </ConfigProvider>
    );
};

export default ThemeProvider;

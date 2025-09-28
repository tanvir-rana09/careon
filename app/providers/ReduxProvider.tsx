import React from "react";
import { Provider } from "react-redux";
import state from "~/states";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <Provider store={state}>{children}</Provider>;
};

export default ReduxProvider;

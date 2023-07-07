import React from "react"
import { OverlayProvider } from "../overlay/context";
import { PopupProvider } from "../popup/context";
import { Theme, ThemeStyle } from "../../theme/theme";
import { LightTheme } from "../../theme/themes";

interface Props {

    children: React.ReactNode | React.ReactElement | JSX.Element;
    theme?: Theme;

}

const KloktunUI: React.FC<Props> = ({ children, theme = LightTheme }) => {

    return <>
        
        <OverlayProvider>
            <PopupProvider>
                {children}
            </PopupProvider>
        </OverlayProvider>

        <ThemeStyle value={theme} />

    </>

}

export default KloktunUI;
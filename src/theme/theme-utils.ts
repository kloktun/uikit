import { mixColors } from "../utils/colors";

class ThemeColorPalette {

    hover?: string;
    active?: string;
    
    front?: string;
    light?: string;

    plain?: string;
    plainHover?: string;
    plainActive?: string;
    
    primaryHover?: string;
    primaryActive?: string;

}

interface GenerateThemeColorPaletteProps {

    color: string;
    background: string;

}

export const getBrightness = (color: string) => {

    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(3, 2), 16);
    const blue = parseInt(color.substring(5, 2), 16);

    return (red * 299 + green * 587 + blue * 114) / 1000;

}

export const generateThemeColorPalette = ({ color, background }: GenerateThemeColorPaletteProps): ThemeColorPalette => {

    const brightness = getBrightness(color);
    const isLight = brightness > 260;

    const hover = mixColors(color, background, 10);
    const active = mixColors(color, background, 20);
    const front = isLight ? "#000000" : "#ffffff";

    const primaryHover = mixColors(color, background, 80);
    const primaryActive = mixColors(color, background, 105);

    const light = mixColors(color, background, 54);
    const plain = mixColors(color, background, 10);
    const plainHover = mixColors(color, background, 20);
    const plainActive = mixColors(color, background, 15);
    
    return {

        hover,
        active,
        
        front,
        light,
        
        primaryHover,
        primaryActive,
    
        plain,
        plainHover,
        plainActive,

       
    }

}
import React from 'react';
import { hex2rgb, isHex, mixColors } from '../utils/colors';
import { generateThemeColorPalette, getBrightness } from './theme-utils';

const DEFAULT_PRIMARY = "#9160f8";
const DEFAULT_ERROR_PRIMARY = "#f16969";
const DEFAULT_WARNING_PRIMARY = "#f89760";
const DEFAULT_SUCCESS_PRIMARY = "#67c23a";

export class Theme {
    
    controlRounded?: string = '0.75rem';
    modalRounded?: string = '1.5rem';
    stroke?: string = "#e5e7eb";

    front?: string = "#404040";
    frontHint?: string = "#aaaaaa";

    background?: string = "#ffffff";
    backgroundBody?: string = "#ffffff";
    backgroundBackdrop?: string = "#000000";
    backgroundHover?: string = "#fafafa";
    backgroundActive?: string = "#f9f9f9";
    
    primary?: string = DEFAULT_PRIMARY;
    primaryFront?: string = "#ffffff";
    primaryHover?: string = "#A780F9";
    primaryActive?: string = "#8b55fd";
    primaryLight?: string = "#c3a7ff";
    primaryAccentHover?: string = "#A780F9";
    primaryAccentActive?: string = "#8B55FD";
    primaryPlain?: string = "#f4effe";
    primaryPlainHover?: string = "#EBE1FF";
    primaryPlainActive?: string = "#f2ebff";
   
    error?: string = DEFAULT_ERROR_PRIMARY
    errorFront?: string = "#ffffff";
    errorHover?: string = "#fff5f5";
    errorActive?: string = "#ffeeee";
    errorLight?: string = "#ffecef";
    errorAccentHover?: string = "#fb7c7c";
    errorAccentActive?: string = "#f25d5d";
    errorPlain?: string = "#ffecef";
    errorPlainHover?: string = "#ffe8eb";
    errorPlainActive?: string = "#ffe4e9";

    warning?: string = DEFAULT_WARNING_PRIMARY;
    warningFront?: string = "#ffffff";
    warningHover?: string = "#fff6f1";
    warningActive?: string = "#fff0e8";
    warningLight?: string = "#FFF3ED";
    warningAccentHover?: string = "#ffa775";
    warningAccentActive?: string = "#f2884c";
    warningPlain?: string = "#fff3ed"; 
    warningPlainHover?: string = "#fff0e8";
    warningPlainActive?: string = "#ffe8dc";

    success?: string = DEFAULT_SUCCESS_PRIMARY;
    successFront?: string = "#ffffff";
    successHover?: string = "#f7fff5";
    successActive?: string =  "#efffeb";
    successLight?: string = "#E9FFE3";
    successAccentHover?: string = "#85ce61"; 
    successAccentActive?: string = "#5daf34";
    successPlain?: string = "#f0f9eb" ;
    successPlainHover?: string = "#f2ffee";
    successPlainActive?: string = "#e4ffdd";

    constructor(props: Readonly<Theme>){

        let {

            front,
            background,
            backgroundBody,
            stroke,
            
            primary,

            error,

            warning,
            
            success,

        } = props;

        const backgroundBrightness = getBrightness(background ?? "#ffffff");
        background = background ?? "#ffffff";
        backgroundBody = backgroundBody ?? background;
        front = front ?? (backgroundBrightness > 260 ? "#000000" : "#ffffff");
        stroke = stroke ?? "#e5e7eb";

        const backgroundHover = mixColors(front, background, 3);
        const backgroundActive = mixColors(front, background, 5);

        stroke = mixColors(front, background, 10);

        const {
            front: primaryFront,
            hover: primaryHover,
            active: primaryActive,
            light: primaryLight,
            plain: primaryPlain,
            plainHover: primaryPlainHover,
            plainActive: primaryPlainActive,
            primaryHover: primaryAccentHover,
            primaryActive: primaryAccentActive,
        } = generateThemeColorPalette({ color: primary ?? DEFAULT_PRIMARY, background });

        const {
            front: errorFront,
            hover: errorHover,
            active: errorActive,
            light: errorLight,
            plain: errorPlain,
            plainHover: errorPlainHover,
            plainActive: errorPlainActive,
            primaryHover: errorAccentHover,
            primaryActive: errorAccentActive,
        } = generateThemeColorPalette({ color: error ?? DEFAULT_ERROR_PRIMARY, background });

        const {
            front: warningFront,
            hover: warningHover,
            active: warningActive,
            light: warningLight,
            plain: warningPlain,
            plainHover: warningPlainHover,
            plainActive: warningPlainActive,
            primaryHover: warningAccentHover,
            primaryActive: warningAccentActive,
        } = generateThemeColorPalette({ color: warning ?? DEFAULT_WARNING_PRIMARY, background });

        const {
            front: successFront,
            hover: successHover,
            active: successActive,
            light: successLight,
            plain: successPlain,
            plainHover: successPlainHover,
            plainActive: successPlainActive,
            primaryHover: successAccentHover,
            primaryActive: successAccentActive,
        } = generateThemeColorPalette({ color: success ?? DEFAULT_SUCCESS_PRIMARY, background: background });

        Object.assign(this, {
            ...props,

            front,
            backgroundBody: props.backgroundBody ?? backgroundBody,
            backgroundHover: props.backgroundHover ?? backgroundHover,
            backgroundActive: props.backgroundActive ?? backgroundActive,

            stroke: props.stroke ?? stroke,

            primaryFront: props.primaryFront ?? primaryFront,
            primaryHover: props.primaryHover ?? primaryHover,
            primaryActive: props.primaryActive ?? primaryActive,
            primaryLight: props.primaryLight ?? primaryLight,
            primaryAccentHover: props.primaryAccentHover ?? primaryAccentHover,
            primaryAccentActive: props.primaryAccentActive ?? primaryAccentActive,
            primaryPlain: props.primaryPlain ?? primaryPlain,
            primaryPlainHover: props.primaryPlainHover ?? primaryPlainHover,
            primaryPlainActive: props.primaryPlainActive ?? primaryPlainActive,

            errorFront: props.errorFront ?? errorFront,
            errorHover: props.errorHover ?? errorHover,
            errorActive: props.errorActive ?? errorActive,
            errorLight: props.errorLight ?? errorLight,
            errorAccentHover: props.errorAccentHover ?? errorAccentHover,
            errorAccentActive: props.errorAccentActive ?? errorAccentActive,
            errorPlain: props.errorPlain ?? errorPlain,
            errorPlainHover: props.errorPlainHover ?? errorPlainHover,
            errorPlainActive: props.errorPlainActive ?? errorPlainActive,

            warningFront: props.warningFront ?? warningFront,
            warningHover: props.warningHover ?? warningHover,
            warningActive: props.warningActive ?? warningActive,
            warningLight: props.warningLight ?? warningLight,
            warningAccentHover: props.warningAccentHover ?? warningAccentHover,
            warningAccentActive: props.warningAccentActive ?? warningAccentActive,
            warningPlain: props.warningPlain ?? warningPlain,
            warningPlainHover: props.warningPlainHover ?? warningPlainHover,
            warningPlainActive: props.warningPlainActive ?? warningPlainActive,
            
            successFront: props.successFront ?? successFront,
            successHover: props.successHover ?? successHover,
            successActive: props.successActive ?? successActive,
            successLight: props.successLight ?? successLight,
            successAccentHover: props.successAccentHover ?? successAccentHover,
            successAccentActive: props.successAccentActive ?? successAccentActive,
            successPlain: props.successPlain ?? successPlain,
            successPlainHover: props.successPlainHover ?? successPlainHover,
            successPlainActive: props.successPlainActive ?? successPlainActive,

        });
        
    }

}

export const ThemeStyle = ({ value }: { value: Theme }) => {

    let props: any = {
        ...value,
    }

    for(let key of Object.keys(props)){
        
        let value = props[key];

        if(isHex(value)){
            props[key] = hex2rgb(value);
        }

    }

    let theme: Theme = props;

    return (
        <style>
        {`
           

            :root {

                --kloktun-control-rounded: ${theme.controlRounded};
                --kloktun-modal-rounded: ${theme.modalRounded};
            
                /*
                ===================
                STROKE
                ===================
                */
                --kloktun-stroke: ${theme.stroke};
            
                /*
                ===================
                FRONT
                ===================
                */
                --kloktun-front: ${theme.front};
                --kloktun-front-hint: ${theme.frontHint};
            
                /*
                ===================
                BACKGROUND
                ===================
                */
                --kloktun-background: ${theme.background};
                --kloktun-background-body: ${theme.backgroundBody};
                --kloktun-background-backdrop: ${theme.backgroundBackdrop};
                --kloktun-background-hover: ${theme.backgroundHover};
                --kloktun-background-active: ${theme.backgroundActive};
            
                /*
                ===================
                PRIMARY
                ===================
                */
                --kloktun-primary: ${theme.primary};
                --kloktun-primary-front: ${theme.primaryFront};
                --kloktun-primary-hover: ${theme.primaryHover};
                --kloktun-primary-active: ${theme.primaryActive};
                --kloktun-primary-accent-hover: ${theme.primaryAccentHover};
                --kloktun-primary-accent-active: ${theme.primaryAccentActive};
                --kloktun-primary-light: ${theme.primaryLight};
            
                --kloktun-primary-plain: ${theme.primaryPlain};
                --kloktun-primary-plain-hover: ${theme.primaryPlainHover};
                --kloktun-primary-plain-active: ${theme.primaryPlainActive};
            
            
                /*
                ===================
                ERROR
                ===================
                */
                --kloktun-error: ${theme.error};
                --kloktun-error-front: ${theme.errorFront};
                --kloktun-error-hover: ${theme.errorHover};
                --kloktun-error-active: ${theme.errorActive};
                --kloktun-error-light: ${theme.errorLight};
                --kloktun-error-accent-hover: ${theme.errorAccentHover};
                --kloktun-error-accent-active: ${theme.errorAccentActive};
                --kloktun-error-plain: ${theme.errorPlain};
                --kloktun-error-plain-hover: ${theme.errorPlainHover};
                --kloktun-error-plain-active: ${theme.errorPlainActive};
            
            
                /*
                ===================
                WARNING
                ===================
                */
                --kloktun-warning: ${theme.warning};
                --kloktun-warning-front: ${theme.warningFront};
                --kloktun-warning-hover: ${theme.warningHover};
                --kloktun-warning-active: ${theme.warningActive};
                --kloktun-warning-accent-hover: ${theme.warningAccentHover};
                --kloktun-warning-accent-active: ${theme.warningAccentActive};
                --kloktun-warning-plain: ${theme.warningPlain};
                --kloktun-warning-plain-hover: ${theme.warningPlainHover};
                --kloktun-warning-plain-active: ${theme.warningPlainActive};
            
            
                /*
                ===================
                SUCCESS
                ===================
                */
                --kloktun-success: ${theme.success};
                --kloktun-success-front: ${theme.successFront};
                --kloktun-success-hover: ${theme.successHover};
                --kloktun-success-active: ${theme.successActive};
                --kloktun-success-accent-hover: ${theme.successAccentHover};
                --kloktun-success-accent-active: ${theme.successAccentActive};
                --kloktun-success-plain: ${theme.successPlain};
                --kloktun-success-plain-hover: ${theme.successPlainHover};
                --kloktun-success-plain-active: ${theme.successPlainActive};
            
            }

            body {
                color: rgb(var(--kloktun-front));
                background-color: rgb(var(--kloktun-background-body));
            }
        `}
        </style>
    )

}
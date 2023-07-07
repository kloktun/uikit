import React, { ReactElement } from "react";
import Button, { ButtonProps } from "../button";
import { ControlStatusProps } from "../../common/controls.type";
import Window from "../window";
import classnames from "classnames";
import Icon from "../icon";
import ExclamationIcon from "../../icons/exclamation-icon";
import CheckIcon from "../../icons/check-icon";
import CloseIcon from "../../icons/close-icon";
import { OverlayChildrenProps } from "../overlay";
import InfoIcon from "../../icons/info-icon";

export type OnPopupClose<T = any> = (result?: T) => void;

export type PopupButtons<T = any> = ButtonProps[] | ((close: OnPopupClose<T>) => ButtonProps[]);
export type PopupButtonsDirection = "vertical" | "horizontal";

export interface PopupProps<T = any> extends ControlStatusProps {

    title?: string | React.ReactElement;
    titleAlign?: "start" | "center" | "end";
    children: string | React.ReactElement | ((props: OverlayChildrenProps) => React.ReactElement);
    buttons?: PopupButtons<T>,
    buttonsDirection?: PopupButtonsDirection;
    show?: boolean;
    onClose?: OnPopupClose;

    danger?: boolean;
    info?: boolean;

}

const Popup = ({ show = true, onClose = (result) => {}, title, titleAlign = "center", children, buttons = [], buttonsDirection = "horizontal", success, error, warning, danger, info }: PopupProps) => {

    const status = error ? "error" : success ? "success": warning ? "warning" : danger ? "danger" : info ? "info" : "default";

    let buttonsArray = Array.isArray(buttons) ? buttons : buttons(onClose);

    if(buttonsArray.length > 2 || buttonsArray.length == 1){
        buttonsDirection = 'vertical';
    }

    if(buttonsDirection == 'horizontal'){
        buttonsArray = buttonsArray.reverse();
    }

    let icon: ReactElement | undefined;

    const el = (props: OverlayChildrenProps) => {

        if(typeof children === 'function'){
            return children(props);
        }

        if(typeof children == 'string'){
            return <div className="flex flex-col text-center">{children}</div>
        }
        
        return children as React.ReactElement;

    }

    switch(status){
        case "danger":
        case "warning":
            icon = <ExclamationIcon />;
            break;
        case "error":
            icon = <CloseIcon />;
            break;
        case "success":
            icon = <CheckIcon />;
            break;
        case "info":
            icon = <InfoIcon />;
            break;
        }

    return (

        <Window show={show} onClose={onClose}>

            {
                (overlayProps) => {

                    return (

                        <div className={ classnames('flex flex-col min-w-full w-80 max-w-full bg-background rounded-modal shadow-modal p-6 gap-5') }>

                            {
                                icon &&

                                <div className='flex flex-row items-center justify-center'>

                                    <div className={
                                        classnames('w-16 h-16 rounded-full fill-current flex items-center justify-center', {
                                            'text-primary bg-primary-plain': info,
                                            'text-success bg-success-plain': success,
                                            'text-error bg-error-plain': error || danger,
                                            'text-warning bg-warning-plain': warning,
                                        })
                                    }>

                                        <Icon size="huge" icon={icon}></Icon>

                                    </div>

                                </div>
                            }

                            <div className="flex flex-col gap-2">
                                { title &&
                                    <div className={ classnames('font-medium text-xl', {
                                        'text-start': titleAlign == 'start',
                                        'text-center': titleAlign == 'center',
                                        'text-end': titleAlign == 'end',
                                    })}>
                                        {title}                            
                                    </div> 
                                }

                                {el(overlayProps)}

                            </div>

                            { buttonsArray.length > 0 &&

                                <div className={classnames('grid gap-4', {
                                    'grid-cols-1': buttonsDirection == 'vertical',
                                    'grid-cols-2': buttonsDirection == 'horizontal',
                                })}>
                                    { buttonsArray.map((button, index) => <Button key={index} {...button} />) }
                                </div>

                            }

                        </div>
                    );

                }

            }
        </Window>

    );


}

export default Popup;
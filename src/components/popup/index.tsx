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
            return <div className="kl-flex kl-flex-col kl-text-center">{children}</div>
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

                        <div className={ classnames('kl-flex kl-flex-col kl-min-w-full kl-w-80 kl-max-w-full kl-bg-background kl-rounded-modal kl-shadow-modal kl-p-6 kl-gap-5') }>

                            {
                                icon &&

                                <div className='kl-flex kl-flex-row kl-items-center kl-justify-center'>

                                    <div className={
                                        classnames('kl-w-16 kl-h-16 kl-rounded-full kl-fill-current kl-flex kl-items-center kl-justify-center', {
                                            'kl-text-primary kl-bg-primary-plain': info,
                                            'kl-text-success kl-bg-success-plain': success,
                                            'kl-text-error kl-bg-error-plain': error || danger,
                                            'kl-text-warning kl-bg-warning-plain': warning,
                                        })
                                    }>

                                        <Icon size="huge" icon={icon}></Icon>

                                    </div>

                                </div>
                            }

                            <div className="flex flex-col gap-2">
                                { title &&
                                    <div className={ classnames('kl-font-medium kl-text-xl', {
                                        'kl-text-start': titleAlign == 'start',
                                        'kl-text-center': titleAlign == 'center',
                                        'kl-text-end': titleAlign == 'end',
                                    })}>
                                        {title}                            
                                    </div> 
                                }

                                {el(overlayProps)}

                            </div>

                            { buttonsArray.length > 0 &&

                                <div className={classnames('kl-grid kl-gap-4', {
                                    'kl-grid-cols-1': buttonsDirection == 'vertical',
                                    'kl-grid-cols-2': buttonsDirection == 'horizontal',
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
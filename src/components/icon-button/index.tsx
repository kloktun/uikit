import React from 'react';
import classnames from 'classnames';
import Spinner from '../spinner';
import { ControlsProps } from '../../common/controls.type';
import Icon, { IconProp } from '../icon';

type IconButtonType = "default" | "primary" | "plain" | "borderless" | "text" | "primary-borderless" | "primary-text" | "primary-light-borderless" | "primary-light-text" | "light-borderless" | "light-text";

interface IconButtonProps extends ControlsProps, Omit<React.HTMLProps<HTMLButtonElement>, "size"> {

    type?: IconButtonType;

    loading?: boolean;
    htmlType?: "button" | "submit" | "reset",

    icon?: IconProp;
    children?: IconProp;

}

const IconButton = ({ type = "default", size = "default", loading = false, disabled = false, error, success, warning, icon, children, htmlType = "button", ...restProps }: IconButtonProps) => {
    
    const status = error ? "error" : success ? "success": warning ? "warning" : "default"; 

    const isText = ['text', 'primary-text', 'light-text', 'primary-light-text'].includes(type);

    return (
    
        <button type={htmlType} {...restProps} disabled={disabled || loading} className={
            classnames(
                'kl-rounded-control kl-flex kl-flex-row kl-items-center kl-justify-center kl-transition-all kl-duration-200',
                {
                    // Not text
                    'kl-aspect-square': !isText,

                    // Type
                    'kl-bg-background kl-border': type == 'default',

                    // Default state
                    'kl-text-front kl-fill-front kl-border-stroke': status == 'default' && (type == 'default' || type == 'borderless' || type == 'text'),
                    'hover:kl-bg-background-hover active:kl-bg-background-active': status == "default" && type == 'default',
                    'kl-text-primary-front kl-fill-primary-front kl-bg-primary hover:kl-bg-primary-accent-hover active:kl-bg-primary-accent-active': status == "default" && type == 'primary',
                    'kl-text-primary kl-fill-primary kl-bg-primary-plain hover:kl-bg-primary-plain-hover active:kl-bg-primary-plain-active': status == "default" && type == 'plain',
                    'kl-text-primary kl-fill-primary hover:kl-text-primary-accent-hover hover:kl-fill-primary-accent-hover active:kl-text-primary-accent-active active:kl-fill-primary-accent-active': status == "default" && (type == 'primary-borderless' || type == 'primary-text'),
                    'kl-text-front-hint kl-fill-front-hint hover:kl-text-front hover:kl-fill-front active:kl-text-front active:kl-fill-front': status == "default" && (type == 'light-borderless' || type == 'light-text'),
                    'kl-text-primary-light kl-fill-primary-light hover:kl-text-primary hover:kl-fill-primary active:kl-text-primary-accent-active active:kl-fill-primary-accent-active': status == "default" && (type == 'primary-light-borderless' || type == 'primary-light-text'),

                    // Error state
                    'kl-text-error kl-fill-error kl-border-error hover:kl-bg-error-hover active:kl-bg-error-active': status == "error" && type == 'default',
                    'kl-text-error-front kl-fill-error-front kl-bg-error hover:kl-bg-error-accent-hover active:kl-bg-error-accent-active': status == "error" && type == 'primary',
                    'kl-text-error kl-fill-error kl-bg-error-plain hover:kl-bg-error-plain-hover active:kl-bg-error-plain-active': status == "error" && type == 'plain',
                    'kl-text-error kl-fill-error hover:kl-text-error-accent-hover hover:kl-fill-error-accent-hover active:kl-text-error-accent-active active:kl-fill-error-accent-active': status == "error" && (type == 'text' || type == 'borderless' || type == 'primary-borderless' || type == 'primary-text' || type == 'primary-light-borderless' || type == 'primary-light-text'),
                    'kl-text-front-hint kl-fill-front-hint hover:kl-text-error-accent-hover hover:kl-fill-error-accent-hover active:kl-text-error-accent-active active:kl-fill-error-accent-active': status == "error" && (type == 'light-borderless' || type == 'light-text'),

                    // Warning state
                    'kl-text-warning kl-fill-warning kl-border-warning hover:kl-bg-warning-hover active:kl-bg-warning-active': status == "warning" && type == 'default',
                    'kl-text-warning-front kl-fill-warning-front kl-bg-warning hover:kl-bg-warning-accent-hover active:kl-bg-warning-accent-active': status == "warning" && type == 'primary',
                    'kl-text-warning kl-fill-warning kl-bg-warning-plain hover:kl-bg-warning-plain-hover active:kl-bg-warning-plain-active': status == "warning" && type == 'plain',
                    'kl-text-warning kl-fill-warning hover:kl-text-warning-accent-hover hover:kl-fill-warning-accent-hover active:kl-text-warning-accent-active active:kl-fill-warning-accent-active': status == "warning" && (type == 'text' || type == 'borderless' || type == 'primary-borderless' || type == 'primary-text' || type == 'primary-light-borderless' || type == 'primary-light-text'),
                    'kl-text-front-hint kl-fill-front-hint hover:kl-text-warning-accent-hover hover:kl-fill-warning-accent-hover active:kl-text-warning-accent-active active:kl-fill-warning-accent-active': status == "warning" && (type == 'light-borderless' || type == 'light-text'),

                    // Success state
                    'kl-text-success kl-fill-success kl-border-success hover:kl-bg-success-hover active:kl-bg-success-active': status == "success" && type == 'default',
                    'kl-text-success-front kl-fill-success-front kl-bg-success hover:kl-bg-success-accent-hover active:kl-bg-success-accent-active': status == "success" && type == 'primary',
                    'kl-text-success kl-fill-success kl-bg-success-plain hover:kl-bg-success-plain-hover active:kl-bg-success-plain-active': status == "success" && type == 'plain',
                    'kl-text-success kl-fill-success hover:kl-text-success-accent-hover hover:kl-fill-success-accent-hover active:kl-text-success-accent-active active:kl-fill-success-accent-active': status == "success" && (type == 'text' || type == 'borderless' || type == 'primary-borderless' || type == 'primary-text' || type == 'primary-light-borderless' || type == 'primary-light-text'),
                    'kl-text-front-hint kl-fill-front-hint hover:kl-text-success-accent-hover hover:kl-fill-success-accent-hover active:kl-text-success-accent-active active:kl-fill-success-accent-active': status == "success" && (type == 'light-borderless' || type == 'light-text'),

                    // Size
                    'icon-control-size-large': !isText && size == 'large',
                    'icon-control-size-medium': !isText && size == 'medium',
                    'icon-control-size-default': !isText && size == 'default',
                    'icon-control-size-small': !isText && size == 'small',
                    'icon-control-size-mini': !isText && size == 'mini',


                    // Loading | Disabled
                    'kl-opacity-50': loading || disabled,

                    // Loading
                    'kl-cursor-wait': loading,

                    // Disabled
                    'kl-cursor-not-allowed': disabled,


                }
            )
        }>

            { loading && <Spinner size={size} /> }

            { !loading &&  <Icon size={size} icon={children ?? icon}></Icon>}            

        </button>

    );


}

export default IconButton;
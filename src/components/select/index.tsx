import React, { createContext, useContext, useMemo, useState } from "react";
import { ControlSize, ControlsProps } from "../../common/controls.type";
import classnames from "classnames";
import Icon, { IconProp } from "../icon";
import Dropdown from "../dropdown";

interface SelectContextProps<T> {

    value: T;
    options: SelectOptionData<T>[];
    size?: ControlSize;
    onChange: (value?: T) => void;

}

const SelectContext = createContext<SelectContextProps<any>>({
    value: null,
    options: [],
    size: "default",
    onChange: () => {}
});

const useSelectContext = () => useContext(SelectContext);

type SelectType = "default" | "primary" | "plain" | "borderless" | "text";

interface Props<T> extends ControlsProps {

    value: T;
    onChange: (value: T) => void;

    type?: SelectType;
    children: React.ReactElement | React.ReactElement[];
    placeholder?: string;
    icon?: IconProp;
    disabled?: boolean;

}

const Select = <T=unknown>(props: Props<T>) => {

    const { children, value, onChange, size, disabled } = props;
    
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    }

    const toggle = () => {

        setOpen(!open);
    }

    const options = useMemo(() => {

        const optionComponents: React.ReactElement[] = [];

        React.Children.forEach(children, child => {

            if(React.isValidElement(child) && child.type === SelectOption){
                optionComponents.push(child);
                return;
            }

        });

        return optionComponents.map((comp) => {

            let data: any = {...comp.props};

            if(!data.label){
                data.label = comp.props.children;
            }

            return data;

        });

      
    }, [children]);

    const handleChange = (value: T) => {

        hide();
        onChange(value);

    }
    
    return (

        <SelectContext.Provider value={{ value, options, size, onChange: handleChange }}>

            <Dropdown button={<SelectButton {...props} onClick={toggle} open={open} ></SelectButton>} show={open} onClickOutside={hide}>
                <div className={classnames("max-h-80 overflow-y-auto", {
                    'py-3': size == 'large',
                    'py-2.5': size == 'medium',
                    'py-2': size == 'default',
                    'py-1.5': size == 'small' || size == 'mini',  
                })}>
                    <div className="flex flex-col h-full">
                        {children}
                    </div>
                </div>
            </Dropdown>

        </SelectContext.Provider>

    );

}


interface SelectButtonProps<T> extends Props<T> {

    open: boolean;
    onClick?: () => void;

}


const SelectButton = <T=unknown>({ type = "default", size = "default", placeholder, icon, success, warning, error, disabled, onClick, open }: SelectButtonProps<T>) => {

    const status = error ? "error" : success ? "success": warning ? "warning" : "default"; 

    const { value, options } = useSelectContext();

    let content;

    let selected = useMemo(() => {

        let item = options.find((el) => {
            return el.value == value;
        });

        return item;

    }, [value, options]);

    if(!selected){

        content = (<span className={classnames('select-none', {
            "text-front-hint": type == "default" || type == "borderless" || type == "text"
        })}>{placeholder}</span>)

    } else {
        content = selected.label ?? selected.value;
    }

    const handleClick = () => {

        if(disabled || !onClick){
            return;
        }
        
        onClick();

    }

    return (

        <div onClick={handleClick} className={
            classnames('rounded-control flex flex-row items-center justify-start transition-all duration-200 max-h-full',
            type != 'text' ? {

                'px-3': size == 'large',
                'px-2.5': size == 'medium',
                'px-2': size == 'default',
                'px-1.5': size == 'small' || size == 'mini',                

            } : null,
            { 

                // Type
                'border bg-background  hover:bg-background-hover active:bg-background-active': type == 'default',

                // Default state
                'text-front fill-front border-stroke': status == "default" && (type == 'default' || type == 'text' || type == 'borderless'),
                'text-primary-front fill-primary-front bg-primary hover:bg-primary-accent-hover active:bg-primary-accent-active': status == "default" && type == 'primary',
                'text-primary fill-primary bg-primary-plain  hover:bg-primary-plain-hover active:bg-primary-plain-active': status == "default" && type == 'plain',
                // 'text-primary fill-primary hover:text-primary-hover hover:fill-primary-hover active:text-primary-active active:fill-primary-active': status == "default",

                // Error state
                'text-error  fill-error border-error hover:bg-error-hover active:bg-error-active': status == "error" && type == 'default',
                'text-error-front fill-error-front bg-error hover:bg-error-accent-hover active:bg-error-accent-active': status == "error" && type == 'primary',
                'text-error fill-error bg-error-plain  hover:bg-error-plain-hover active:bg-error-plain-active': status == "error" && type == 'plain',
                'text-error fill-error hover:text-error-accent-hover hover:fill-error-accent-hover active:text-error-accent-active active:fill-error-active': status == "error" && (type == 'text' || type == 'borderless'),
                
                // Warning state
                'text-warning fill-warning border-warning hover:bg-warning-hover active:bg-warning-active': status == "warning" && type == 'default',
                'text-warning-front fill-warning-front bg-warning hover:bg-warning-primary-hover active:bg-warning-primary-active': status == "warning" && type == 'primary',
                'text-warning fill-warning bg-warning-plain  hover:bg-warning-plain-hover active:bg-warning-plain-active': status == "warning" && type == 'plain',
                'text-warning fill-warning hover:text-warning-primary-hover hover:fill-warning-primary-hover active:text-warning-primary-active active:fill-warning-active': status == "warning" && (type == 'text' || type == 'borderless'),
                
                // Success state
                'text-success fill-success border-success hover:bg-success-hover active:bg-success-active': status == "success" && type == 'default',
                'text-success-front fill-success-front bg-success hover:bg-success-accent-hover active:bg-success-accent-active': status == "success" && type == 'primary',
                'text-success fill-success bg-success-plain  hover:bg-success-plain-hover active:bg-success-plain-active': status == "success" && type == 'plain',
                'text-success fill-success hover:text-success-accent-hover hover:fill-success-accent-hover active:text-success-accent-active active:fill-success-active': status == "success" && (type == 'text' || type == 'borderless'),
                                    
                
                // Size
                'control-height-large': type != 'text' && size == 'large',
                'control-height-medium': type != 'text' && size == 'medium',
                'control-height-default': type != 'text' && size == 'default',
                'control-height-small': type != 'text' && size == 'small',
                'control-height-mini': type != 'text' && size == 'mini',

                'gap-3': size == 'large',
                'gap-2.5': size == 'medium',
                'gap-2': size == 'default',
                'gap-1.5': size == 'small' || size == 'mini',  

                // Disabled
                'cursor-not-allowed opacity-50': disabled,
                
                'cursor-pointer': !disabled

            })
        }>

            { (icon || selected?.icon) &&

                <div className={classnames({
                    'text-front-hint fill-front-hint': status == "default" && (type == "default" || type == "borderless" || type == "text"),
                })}>
                    <Icon icon={selected?.icon ?? icon} size={size} />
                </div>
            }

            <div className="flex flex-1 flex-row items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap">
                { content }
            </div>

            <div className={classnames('transition-all', {
                'rotate-180': open,
                'text-front-hint fill-front-hint': status == "default" && (type == "default" || type == "borderless" || type == "text"),
            })}>
                
                <Icon size={size} icon={
                    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 9.17019C16.8126 8.98394 16.5592 8.87939 16.295 8.87939C16.0308 8.87939 15.7774 8.98394 15.59 9.17019L12 12.7102L8.46001 9.17019C8.27265 8.98394 8.0192 8.87939 7.75501 8.87939C7.49082 8.87939 7.23737 8.98394 7.05001 9.17019C6.95628 9.26315 6.88189 9.37375 6.83112 9.49561C6.78035 9.61747 6.75421 9.74818 6.75421 9.88019C6.75421 10.0122 6.78035 10.1429 6.83112 10.2648C6.88189 10.3866 6.95628 10.4972 7.05001 10.5902L11.29 14.8302C11.383 14.9239 11.4936 14.9983 11.6154 15.0491C11.7373 15.0998 11.868 15.126 12 15.126C12.132 15.126 12.2627 15.0998 12.3846 15.0491C12.5064 14.9983 12.617 14.9239 12.71 14.8302L17 10.5902C17.0937 10.4972 17.1681 10.3866 17.2189 10.2648C17.2697 10.1429 17.2958 10.0122 17.2958 9.88019C17.2958 9.74818 17.2697 9.61747 17.2189 9.49561C17.1681 9.37375 17.0937 9.26315 17 9.17019Z"/>
                    </svg>                
                } />

            </div>

        </div>
    );

}


type SelectLabel = "string" | JSX.Element | React.ReactElement | React.ReactNode;

interface SelectOptionData<T> {

    value: T;
    icon?: IconProp;
    label?: SelectLabel;

}

interface SelectOptionProps<T> extends SelectOptionData<T> {

    children?: SelectLabel;
    disabled?: boolean;

}

const SelectOption = <T=unknown>(props: SelectOptionProps<T>) => {

    const { value: selectValue, onChange, size = "default" } = useSelectContext();

    let { value, icon, label, children, disabled } = props;

    const selected = useMemo(() => {

        return value == selectValue;

    }, [value, selectValue]);

    if(!children){
        label = children;
    }

    const handleClick = () => {

        if(disabled){
            return;
        }

        onChange(value);

    };

    return (
        <div className={
            
            classnames("flex flex-row items-center hover:bg-primary-plain", {

                'text-primary fill-primary font-medium': selected,

                'px-3 gap-3': size == 'large',
                'px-2.5 gap-2.5': size == 'medium',
                'px-2 gap-2': size == 'default',
                'px-1.5 gap-1.5': size == 'small' || size == 'mini',   

                // Size
                'control-height-large': size == 'large',
                'control-height-medium': size == 'medium',
                'control-height-default': size == 'default',
                'control-height-small': size == 'small',
                'control-height-mini': size == 'mini',

                // Disabled
                'cursor-not-allowed opacity-50': disabled,
                
                'cursor-pointer': !disabled

            }) } onClick={handleClick}>

            <Icon icon={icon} size={size} />

            { children }

        </div>
    );

}

export { Select, SelectOption };
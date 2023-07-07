import React from "react";
import { ControlSize } from "../../common/controls.type";
import classnames from "classnames";

export type IconProp = string | JSX.Element | React.ReactNode | React.ReactElement;

interface Props {

    icon?: IconProp;

    size?: ControlSize | "huge";

}

const Icon = ({ icon, size = "default" }: Props) => {

    if(!icon){
        return null;
    }

    let el: JSX.Element | React.ReactNode | React.ReactElement;

    if(typeof icon === 'string'){
        el = (<i className={classnames(icon)}></i>);
    } else {
        el = icon;
    }

    
    return (
        <div className={

            classnames('icon flex items-center justify-center leading-none fill-current text-current', {

                'w-12 h-12 text-5xl': size == 'huge',
                'w-6 h-6 text-2xl': size == 'large',
                'w-5 h-5 text-xl': size == 'medium' || size == 'default' || size == 'small',
                'w-4 h-4 text-base': size == 'mini',
        
            })
        } >
            {el}
        </div>
    );

}
export default Icon;
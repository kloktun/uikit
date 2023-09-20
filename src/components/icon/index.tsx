import React from "react";
import { ControlSize } from "../../common/controls.type";
import classnames from "classnames";

export type IconProp = string | JSX.Element | React.ReactNode | React.ReactElement;

interface Props {

    icon?: IconProp;
    color?: string;
    size?: ControlSize | "huge";

}

const Icon = ({ icon, size = "default", color }: Props) => {

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

            classnames('icon kl-flex kl-items-center kl-justify-center kl-leading-none', {
                'kl-fill-current kl-text-current': !color,
                'kl-w-14 kl-h-14 kl-text-5xl': size == 'huge',
                'kl-w-6 kl-h-6 kl-text-2xl': size == 'large',
                'kl-w-5 kl-h-5 kl-text-xl': size == 'medium' || size == 'default' || size == 'small',
                'kl-w-4 kl-h-4 kl-text-base': size == 'mini',
        
            })
        } 
            style={
                {
                    color: color,
                    fill: color
                }
            }
        >
            {el}
        </div>
    );

}
export default Icon;
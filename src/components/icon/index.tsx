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

            classnames('icon kl-flex kl-items-center kl-justify-center kl-leading-none kl-fill-current kl-text-current', {

                'kl-w-12 kl-h-12 kl-text-5xl': size == 'huge',
                'kl-w-6 kl-h-6 kl-text-2xl': size == 'large',
                'kl-w-5 kl-h-5 kl-text-xl': size == 'medium' || size == 'default' || size == 'small',
                'kl-w-4 kl-h-4 kl-text-base': size == 'mini',
        
            })
        } >
            {el}
        </div>
    );

}
export default Icon;
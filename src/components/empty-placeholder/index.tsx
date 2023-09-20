import React, { ReactElement } from "react";
import Icon, { IconProp } from "../icon";

interface Props {

    icon?: IconProp;
    children?: string | ReactElement | ReactElement[];
    action?: ReactElement | ReactElement[];

}


const EmptyPlaceholder = ({ icon, children, action }: Props) => {

    return (
        <div className="kl-flex kl-flex-col kl-gap-5 kl-items-center kl-justify-center kl-px-4">

            { icon && <span className="kl-text-front-hint"><Icon icon={icon} size="huge"  /></span> }

            <div className="kl-text-front-secondary kl-text-center kl-max-w-md">
                { children }
            </div>

            { action && <div className="kl-flex kl-flex-col kl-gap-2">
                {action}
            </div>}

        </div>
    );

}

export default EmptyPlaceholder;
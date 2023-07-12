import React from 'react';

export interface LabelProps extends Omit<React.HTMLProps<HTMLLabelElement>, "label"> {

    label: string | React.ReactElement;
    children: React.ReactElement;

}

const Label = ({ children, label, ...restProps }: LabelProps) => {

    return (
        <div className='kl-flex kl-flex-col kl-gap-2'>
        
            <label {...restProps} className='kl-flex kl-flex-row kl-items-center kl-font-medium'>
                {label}
            </label>

            {children}

        </div>
    );
        

}

export default Label;
import React from 'react';

export interface LabelProps extends Omit<React.HTMLProps<HTMLLabelElement>, "label"> {

    label: string | React.ReactElement;
    children: React.ReactElement;

}

const Label = ({ children, label, ...restProps }: LabelProps) => {

    return (
        <div className='flex flex-col gap-2'>
        
            <label {...restProps} className='flex flex-row items-center font-medium'>
                {label}
            </label>

            {children}

        </div>
    );
        

}

export default Label;
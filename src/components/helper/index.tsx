import React from 'react';
import classnames from "classnames";

export interface HelperProps {

    children: React.ReactElement;
    text: string | React.ReactElement;
    error?: string | React.ReactElement;
    suffix?: string | React.ReactElement;

}

const Helper = ({ children, text, error, suffix }: HelperProps) => {

    const content = error ?? text;
    const hasError = !!error;

    return <div className='flex flex-col gap-1'>
        
        {children}

        <div className={classnames('flex flex-row text-sm items-center justify-between gap-1', {
            'text-front-hint fill-front-hint': !hasError,
            'text-error fill-error': hasError,
        })}>

            <div className='flex flex-row items-center gap-1'>
                {content}
            </div>

            { suffix && <div className='flex flex-row items-center'>{suffix}</div> }

        </div>
    </div>

}

export default Helper;
import React from 'react';
import classnames from "classnames";

export interface HelperProps {

    children: React.ReactElement;
    text?: string | React.ReactElement;
    error?: string | React.ReactElement;
    suffix?: string | React.ReactElement;

}

const Helper = ({ children, text, error, suffix }: HelperProps) => {

    const content = error ?? text;
    const hasContent = !!content;
    const hasSuffix = !!suffix;
    const hasError = !!error;

    const showHelper = hasContent || hasSuffix;

    return <div className='flex flex-col gap-1'>
        
        {children}

        { showHelper &&

            <div className={classnames('kl-flex kl-flex-row kl-text-sm kl-items-center kl-justify-between kl-gap-1', {
                'kl-text-front-hint kl-fill-front-hint': !hasError,
                'kl-text-error kl-fill-error': hasError,
            })}>

                { hasContent &&
                    <div className='kl-flex kl-flex-row kl-items-center kl-gap-1'>
                        {content}
                    </div>
                }

                { hasSuffix &&
                    <div className='kl-flex kl-flex-row kl-items-center'>
                        {suffix}
                    </div>
                }

            </div>

        }
    </div>

}

export default Helper;
import React from 'react';
import classnames from 'classnames';
import { ControlStatusProps } from '../../common/controls.type';
import Icon, { IconProp } from '../icon';

interface Props extends ControlStatusProps {
    
    title?: string | React.ReactNode |  React.ReactElement;
    children?: string | React.ReactNode | React.ReactElement;

    icon?: IconProp;
    suffix?: string | JSX.Element | React.ReactNode | React.ReactElement;

}

const Alert = ({ title, children, icon, suffix, success, warning, error }: Props) => {

    const isDefault = !success && !warning && !error;

    return (

        <div className={
            classnames('kl-flex kl-flex-row kl-items-center kl-justify-start kl-p-4 kl-gap-3 kl-rounded-control', {
                'kl-bg-background kl-border kl-border-stroke': isDefault,
                'kl-text-success kl-bg-success-plain': success,
                'kl-text-error kl-bg-error-plain': error,
                'kl-text-warning kl-bg-warning-plain': warning
            })
        }>
            
            { icon &&
                <div className={classnames('kl-flex kl-items-center kl-justify-center', {
                    'kl-text-front-hint kl-fill-front-hint': isDefault,
                    'kl-text-success kl-fill-success': success,
                    'kl-text-error kl-fill-error': error,
                    'kl-text-warning kl-fill-warning': warning
                })}>
                    <Icon icon={icon} size='large' />
                </div>
            }

            <div className='kl-flex kl-flex-col kl-flex-1'>
                { title && 
                    <div className='kl-font-medium'>
                        { title }
                    </div>
                }
                { children && 
                    <div className='kl-flex kl-flex-col'>
                        { children }
                    </div>
                }
            </div>

            { suffix &&
                <div>
                    {suffix}
                </div>
            }

        </div>

    );

}

export default Alert;
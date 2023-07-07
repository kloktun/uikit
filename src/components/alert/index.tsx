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
            classnames('flex flex-row items-center justify-start p-4 gap-3 control-rounded', {
                'bg-background border border-stroke': isDefault,
                'text-success bg-success-plain': success,
                'text-error bg-error-plain': error,
                'text-warning bg-warning-plain': warning
            })
        }>
            
            { icon &&
                <div className={classnames('flex items-center justify-center', {
                    'text-front-hint fill-front-hint': isDefault,
                    'text-success fill-success': success,
                    'text-error fill-error': error,
                    'text-warning fill-warning': warning
                })}>
                    <Icon icon={icon} size='large' />
                </div>
            }

            <div className='flex flex-col flex-1'>
                { title && 
                    <div className='font-medium'>
                        { title }
                    </div>
                }
                { children && 
                    <div className='flex flex-col'>
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
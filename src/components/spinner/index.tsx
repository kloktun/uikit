import React from 'react';
import { ControlSize } from '../../common/controls.type';
import classnames from 'classnames';
import Icon from '../icon';

interface Props {

    size?: ControlSize;
    icon?: string | JSX.Element | React.ReactElement;
}

const Spinner = ({ size = "default", icon }: Props) => {

    const isSmall = ["small", "mini"].includes(size);

    const width = isSmall ? 20 : 24;

    const DefaultSpinner = (
        <svg  width={width} height={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.1">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
            </g>
            <path d="M18.3809 18.3811C18.762 18.7622 19.384 18.7649 19.7261 18.3486C20.7386 17.1164 21.4448 15.656 21.7796 14.0871C22.1825 12.1992 22.0303 10.235 21.3415 8.43158C20.6526 6.62821 19.4565 5.06278 17.8975 3.92426C16.602 2.97818 15.1019 2.3605 13.5259 2.11714C12.9933 2.0349 12.5315 2.45166 12.5015 2.98972C12.4716 3.52777 12.8854 3.98224 13.4159 4.07705C14.6156 4.29148 15.7555 4.77645 16.7465 5.50024C18.0013 6.41657 18.964 7.67651 19.5185 9.12796C20.0729 10.5794 20.1954 12.1603 19.8711 13.6798C19.6149 14.88 19.0887 16.0014 18.3375 16.9611C18.0053 17.3855 17.9999 18.0001 18.3809 18.3811Z"/>
        </svg>
    )

    return (

        <div className={classnames('flex items-center justify-center animate-spin')}>
            <Icon size={size} icon={ icon ? icon : DefaultSpinner } />
        </div>
    );

}

export default Spinner;
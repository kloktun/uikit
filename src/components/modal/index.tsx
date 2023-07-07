import React, { useRef } from 'react';
import { OverlayChildrenProps } from '../overlay';
import IconButton from '../icon-button';
import CloseIcon from '../../icons/close-icon';
import Window from '../window';
import classnames from 'classnames';

type ModalScrollType = "paper" | "body";

interface Props {

    children: string | React.ReactElement | ((props: OverlayChildrenProps) => React.ReactElement);
    title?: string | React.ReactElement;

    show: boolean;
    onClose: () => void;

    scrollType?: ModalScrollType;

}

const Modal = ({ children, title, show, scrollType = "paper", onClose }: Props) => {

    const el = (props: OverlayChildrenProps) => {

        if(typeof children === 'function'){
            return children(props);
        }
        
        return children as React.ReactElement;

    }

    const ref = useRef(null);

    return (
        <Window show={show} onClose={onClose}>

            {
                ({ close }) => {

                    return (

                        <div className={ classnames('flex flex-col bg-background rounded-modal shadow-modal m-5', {

                            'max-h-full': scrollType == 'paper',
                            'flex-1': scrollType == 'body'

                        }) }>

                            { title && 
                                <div className="flex flex-row items-center justify-between">
                                    <div className='font-medium text-xl p-4 mr-2'>
                                        {title}                            
                                    </div>
                                    <div className='p-1'>
                                        <IconButton size='large' type='light-borderless' icon={<CloseIcon />} onClick={close} ></IconButton>
                                    </div>
                                </div>
                            }

                            <div className={classnames('flex flex-col px-4 pb-4 flex-1 overflow-y-auto ', {
                                'pt-4': !title
                            })}>
                                {el({ close })}
                            </div>

                        </div>
                    );

                }

            }
        </Window>

    );

}

export default Modal;
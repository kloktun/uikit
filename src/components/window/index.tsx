import React, { Fragment } from 'react';
import Overlay, { OverlayChildrenProps } from '../overlay';
import Backdrop from '../backdrop';
import { Transition } from '@headlessui/react';

export interface WindowProps {

    children: React.ReactElement | ((props: OverlayChildrenProps) => React.ReactElement);

    show: boolean;
    onClose: () => void;

}

const Window = ({ children, show, onClose }: WindowProps) => {

    const handleOverlayVisibleChange = (visible: boolean) => {

        if(visible){
            return;
        }

        onClose();

    }

    const el = (props: OverlayChildrenProps) => {

        if(typeof children === 'function'){
            return children(props);
        }
        
        return children as React.ReactElement;

    }

    return (
        <Overlay visible={show} onVisibleChange={handleOverlayVisibleChange}>

            { ({ close }) => {
            
                return (
                    <Backdrop onClick={close}>

                        <Transition

                            as={Fragment}

                            show={show}
                            
                            enter="transform origin-top transition duration-300"
            
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
            
                            leave="transform transition origin-top duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"

                        >

                            <div className='flex flex-col my-auto'>
                                {el({ close })}
                            </div>

                        </Transition>

                    </Backdrop>
                );

            }

        }

        </Overlay>

    );

}

export default Window;
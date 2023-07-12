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
                            
                            enter="kl-transform kl-origin-top kl-transition kl-duration-300"
            
                            enterFrom="kl-opacity-0 kl-scale-95"
                            enterTo="kl-opacity-100 kl-scale-100"
            
                            leave="kl-transform kl-transition kl-origin-top kl-duration-300"
                            leaveFrom="kl-opacity-100 kl-scale-100"
                            leaveTo="kl-opacity-0 kl-scale-95"

                        >

                            <div className='kl-flex kl-flex-col kl-my-auto'>
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
import classnames from 'classnames';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/outside';
import { Transition } from '@headlessui/react';

interface Props {

    button: JSX.Element | React.ReactNode | React.ReactElement;
    children: JSX.Element | React.ReactNode | React.ReactElement;

    show?: boolean;
    onClickOutside?: () => void; 

}


type ChildrenPosition = "top" | "bottom";

const isScrollable = (ele: HTMLElement | null) => {

    if(!ele){
        return false;
    }

    const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowScroll = ['scroll', 'auto'].includes(overflowYStyle);

    return hasScrollableContent && isOverflowScroll;
};
 
const getScrollableParent = (ele: HTMLElement | null): HTMLElement | null => {
    return ele ? isScrollable(ele) ? ele : getScrollableParent(ele.parentElement) : null;
};

const Dropdown = ({ button, children, show, onClickOutside }: Props) => {

    const selectRef = useRef<HTMLDivElement>(null);
    const parentEl = useMemo(() => getScrollableParent(selectRef.current), [selectRef.current]);

    const buttonRef = useRef<HTMLDivElement>(null);
    const childrenRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<ChildrenPosition>("bottom");

    const updatePosition = () => {

        if (!childrenRef.current || !buttonRef.current) {
            return;
        }

        const buttonBounds = buttonRef.current.getBoundingClientRect();
        const listBounds = childrenRef.current.getBoundingClientRect();

        let viewportTop = parentEl?.getBoundingClientRect().top ?? 0;
        let viewportBottom = parentEl ? viewportTop + parentEl.clientHeight : window.innerHeight;

        if(viewportTop < 0){
            viewportTop = 0;
        }

        if(viewportBottom > window.innerHeight){
            viewportBottom = window.innerHeight;
        }

        const { top: buttonTop, bottom: buttonBottom } = buttonBounds;
        const { height: listHeight } = listBounds;

        const openTopPosition = buttonTop - listHeight;
        const openBottomPosition = buttonBottom + listHeight;

        const isOverTop = openTopPosition < viewportTop;
        const isOverBottom = openBottomPosition > viewportBottom;

        const overTopValue = openTopPosition < 0 ? Math.abs(openTopPosition) : 0;
        const overBottomValue = openBottomPosition - viewportBottom;

        let newPosition: ChildrenPosition = 'bottom';

        if(isOverTop && isOverBottom){

            if(overTopValue < overBottomValue){
                
                newPosition = 'top';

            } else {

                newPosition = 'bottom';

            }

        } else if (isOverBottom){

            newPosition = 'top';

        } else {

            newPosition = 'bottom';

        }

        setPosition(newPosition);

    }

    const addEventListeners = () => {

        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);
        parentEl?.addEventListener('scroll', updatePosition);
        parentEl?.addEventListener('resize', updatePosition);

    }

    const removeEventListeners = () => {


        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
        parentEl?.removeEventListener('scroll', updatePosition);
        parentEl?.removeEventListener('resize', updatePosition);

    }

    useEffect(() => {

        updatePosition();

        if(show){
            addEventListeners();
        } else {
            removeEventListeners();
        }

        return () => {
            removeEventListeners();
        }

    }, [show])

    
    useEffect(() => {

        setTimeout(updatePosition, 0);

    }, [show]);


    if(onClickOutside){
        useClickOutside([buttonRef, childrenRef], onClickOutside, show);
    }

    return (

        <div className='relative max-h-full' ref={selectRef}>

            {button}

            <Transition
                as={Fragment}
                
                show={show}
                
                enter="transform transition duration-200"

                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"

                leave="transform transition duration-200"
                leaveFrom="opacity-100 scale-100 "
                leaveTo="opacity-0 scale-95"
            >

                <div className={classnames('absolute overflow-hidden flex flex-col border border-stroke bg-background rounded-control z-10 min-w-full', {
                    'bottom-full mb-2': position == 'top',
                    'top-full mt-2': position == 'bottom'
                })} ref={childrenRef}>
                    {children}
                </div>

            </Transition>
        </div>

    );

};

export default Dropdown;
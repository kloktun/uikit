import React, { createContext, useContext, useEffect, useState } from "react"
import { OVERLAY_CONTAINER_ID } from "./constaints";

export const OverlayContainer = () => {

    return <div id={OVERLAY_CONTAINER_ID}></div>

}

interface OverlayContextProps {

    count: number,
    show: () => void,
    close: () => void,

}

const OverlayContext = createContext<OverlayContextProps>({
    count: 0,
    show: () => {},
    close: () => {}
});

export const useOverlayContext = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {

    const [count, setCount] = useState(0);
    const show = () => setCount(count + 1);
    const close = () => count - 1 < 0 ? setCount(0) : setCount(count - 1);

    const hideScrollBar = () => {

        const currentWidth = document.body.offsetWidth;

        document.body.classList.add('overflow-hidden');

        const afterWidth = document.body.offsetWidth;

        document.body.setAttribute('style', `padding-right: ${afterWidth - currentWidth}px`);
            
    }

    const getBackScrollBar = () => {

        document.body.classList.remove('overflow-hidden');

        document.body.removeAttribute('style');

    }

    useEffect(() => {


        if(count == 0){
            getBackScrollBar();
        } else {
            hideScrollBar();
        }

        return () => {
            getBackScrollBar();
        }

    }, [count]);

    return (
        <OverlayContext.Provider value={ { count, show, close } }>
            {children}
            <OverlayContainer></OverlayContainer>
        </OverlayContext.Provider>
    );

}
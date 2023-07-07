import React, { useEffect } from "react";
import { createPortal } from 'react-dom';
import classnames from "classnames";
import { useOverlayContext } from "./context";
import { OVERLAY_CONTAINER_ID } from "./constaints";


type VisibleChangeFunction = (visible: boolean) => void;
type CloseFunction = () => void;

export interface OverlayChildrenProps {

    close: CloseFunction

}

interface Props {

    children: React.ReactElement | ((props: OverlayChildrenProps) => React.ReactElement);
    visible?: boolean;

    onVisibleChange?: VisibleChangeFunction;

}


const OverlayChildren = (props: Props) => {

    const { children, onVisibleChange } = props;

    const close = () => {

        if(!onVisibleChange){
            return;
        }

        onVisibleChange(false);

    }

    const el = () => {

        if(typeof children === 'function'){
            return children({ close });
        }
        
        return children as React.ReactElement;

    }

    return (
        <div className={classnames("flex flex-col fixed top-0 left-0 bottom-0 right-0")}>{ el() }</div>
    );

}


const Overlay = (props: Props): React.ReactElement | null => {

    const overlayContext = useOverlayContext();


    useEffect(() => {

        if(props.visible){
            overlayContext.show();
        } else {
            overlayContext.close();
        }

        return () => {

            overlayContext.close();

        }

    }, [props.visible]);

    if(props.visible){
        return createPortal(<OverlayChildren {...props}></OverlayChildren>, document.getElementById(OVERLAY_CONTAINER_ID)!);
    } else {
        return null;
    }

}

export default Overlay;
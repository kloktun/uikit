import React, { ReactElement, createContext, useContext, useState } from "react";
import { ControlStatusProps } from "../../common/controls.type";
import Popup, { PopupProps } from ".";


interface PopupContextProps extends ControlStatusProps {

    show: (popup: PopupProps) => any;

}

const PopupContext = createContext<PopupContextProps>({

    show: (popup) => {},

});

export const usePopupContext = () => useContext(PopupContext);

export const usePopup = <T=any>() => {

    const { show } = usePopupContext();

    return (popup: PopupProps<T>) => {

        return new Promise<T>((resolve, reject) => {
        
            show({
                ...popup,
                onClose: (result: T) => {
                    resolve(result);
                }
            });

        });

    };

}

export const PopupProvider = ({ children }: { children: React.ReactNode | React.ReactElement | React.ReactElement[] }) => {

    const [items, setItems] = useState<PopupProps[]>([]);

    const show = (popup: PopupProps) => {    
            
        setItems((value) => [...value, popup]);

    }

    const close = (index: number) => {

        setItems((value) => {

            value.splice(index, 1);
            return [...value];

        });

    };

    return <PopupContext.Provider value={{ show }}>
        <>
            {children}

            {items.map((item, index) => <Popup key={index} {...item} onClose={(result) => {

                close(index);

                if(item.onClose){
                    item.onClose(result);
                }

            }} />)}

        </>
    </PopupContext.Provider>;
    
}
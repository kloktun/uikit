import React, { useRef } from "react";

interface Props {

    children?: React.ReactElement;
    onClick?: () => void;

}

const Backdrop = ({ children, onClick }: Props) => {

    const ref = useRef(null);
    

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {

        if(e.target != ref.current || !onClick){
            return;
        }

        onClick();

    }

    return (
        <div ref={ref} onClick={handleClick} className="kl-bg-background-backdrop/50 kl-flex kl-flex-col kl-items-center kl-w-screen kl-h-screen kl-min-h-full kl-max-h-full kl-overflow-y-auto">
            {children}
        </div>
    );


}

export default Backdrop;
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
        <div ref={ref} onClick={handleClick} className="bg-background-backdrop/50 flex flex-col items-center w-screen h-screen min-h-full max-h-full overflow-y-auto">
            {children}
        </div>
    );


}

export default Backdrop;
import { useEffect } from "react";

export const useClickOutside = (refs: React.MutableRefObject<any> | React.MutableRefObject<any>[], callback: Function, enabled?: boolean) => {

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {

        let currentList = [];

        if(Array.isArray(refs)){

            refs.forEach((ref) => {

                if(!ref.current){
                    return;
                }

                currentList.push(ref.current);

            });    

        } else {
            currentList.push(refs.current);
        }

        const result = currentList.filter((el) => el.contains(event.target));

        if(result.length == 0){
            callback();
        }

    }

    const addEventListeners = () => {
        document.addEventListener("mouseup", handleClickOutside);
    }

    const removeEventListeners = () => {
        document.addEventListener("mouseup", handleClickOutside);
    }

    useEffect(() => {
        
        if(!enabled){
            removeEventListeners();
            return;
        }

        // Bind the event listener
        addEventListeners();

        return () => {

            // Unbind the event listener on clean up
            removeEventListeners();


        };
    }, [refs, enabled]);


}
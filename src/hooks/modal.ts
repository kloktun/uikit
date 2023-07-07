import { useState } from "react"

export const useModalState = (initalValue: boolean = false) => {

    const [show, setShow] = useState(initalValue);

    const open = () => setShow(true);
    const onClose = () => setShow(false);

    return {
        show,
        open,
        onClose
    };

}
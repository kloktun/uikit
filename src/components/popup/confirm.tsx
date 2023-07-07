import { PopupProps } from "."
import { usePopup } from "./context";
import { PopupCancelButton } from "./popup-default-button";

interface ConfirmPopupProps extends Omit<PopupProps<boolean>, "buttons">  {

    confirmButtonText: string;
    cancelButtonText?: string;

}

export const useConfirmPopup = () => {

    const showPopup = usePopup<boolean>();

    return (popup: ConfirmPopupProps): Promise<boolean> => {

        const { success, danger, error, warning, confirmButtonText, cancelButtonText } = popup;

        return showPopup({

            ...popup,
            
            onClose: (close) => {
                close(false);
            },

            buttons: (close) => [

                {
                    type: "primary",
                    success,
                    error: error || danger,
                    warning,
                    children: confirmButtonText,
                    onClick: () => {
                        close(true)
                    }
                },

                PopupCancelButton({
                    
                    children: cancelButtonText,

                    onClick: () => {
                        close(false);
                    }
                })

                

            ]
        });

    }



}
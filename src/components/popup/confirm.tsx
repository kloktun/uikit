import { PopupProps } from "."
import { ButtonProps } from "../button";
import { usePopup } from "./context";
import { PopupCancelButton } from "./popup-default-button";

interface ConfirmPopupProps extends Omit<PopupProps<boolean>, "buttons">  {

    confirmButtonText: string;
    confirmButtonType?: ButtonProps['type'];
    cancelButtonText?: string;
    cancelButtonType?: ButtonProps['type'];

}

export const useConfirmPopup = () => {

    const showPopup = usePopup<boolean>();

    return (popup: ConfirmPopupProps): Promise<boolean> => {

        const { success, danger, error, warning, confirmButtonText, confirmButtonType, cancelButtonText, cancelButtonType } = popup;

        return showPopup({

            ...popup,
            
            onClose: (close) => {
                close(false);
            },

            buttons: (close) => [

                {
                    type: confirmButtonType ?? "primary",
                    success,
                    error: error || danger,
                    warning,
                    children: confirmButtonText,
                    onClick: () => {
                        close(true)
                    }
                },

                PopupCancelButton({
                    
                    type: cancelButtonType,
                    children: cancelButtonText,

                    onClick: () => {
                        close(false);
                    }
                })

                

            ]
        });

    }



}
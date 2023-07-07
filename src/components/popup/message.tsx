import { PopupProps } from ".";
import { usePopup } from './context';
import { PopupCancelButton, PopupOkayButton } from './popup-default-button';

interface MessagePopupProps extends Omit<PopupProps, "buttons">  {

    okayButtonText: string;
    cancelButtonText?: string;

}

export const useMessagePopup = () => {

    const showPopup = usePopup();

    return (popup: MessagePopupProps): Promise<any> => {

        const { success, danger, error, warning, okayButtonText, cancelButtonText } = popup;

        return showPopup({

            ...popup,

            buttons: (close) => [

                PopupOkayButton({
                    type: "primary",
                    success,
                    error: error || danger,
                    warning,
                    children: okayButtonText,
                    onClick: () => {
                        close()
                    }
                }),

                PopupCancelButton({
                    
                    children: cancelButtonText,
                    onClick: () => {
                        close();
                    }

                })

                

            ]

        });

    }


}
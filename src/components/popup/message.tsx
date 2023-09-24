import { PopupProps } from ".";
import { ButtonProps } from "../button";
import { usePopup } from './context';
import { PopupCancelButton, PopupOkayButton } from './popup-default-button';

interface MessagePopupProps extends Omit<PopupProps, "buttons">  {

    okayButtonText: string;
    okayButtonType?: ButtonProps['type'];
    cancelButtonText?: string;
    cancelButtonType?: ButtonProps['type'];

}

export const useMessagePopup = () => {

    const showPopup = usePopup();

    return (popup: MessagePopupProps): Promise<any> => {

        const { success, danger, error, warning, okayButtonText, okayButtonType, cancelButtonText, cancelButtonType } = popup;

        return showPopup({

            ...popup,

            buttons: (close) => [

                PopupOkayButton({
                    type: okayButtonType ?? "primary",
                    success,
                    error: error || danger,
                    warning,
                    children: okayButtonText,
                    onClick: () => {
                        close()
                    }
                }),

                PopupCancelButton({
                    type: cancelButtonType,
                    children: cancelButtonText,
                    onClick: () => {
                        close();
                    }

                })

                

            ]

        });

    }


}
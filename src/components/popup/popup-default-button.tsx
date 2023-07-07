import { ButtonProps } from "../button"

export const PopupOkayButton = (props: ButtonProps) => {

    const children = props.children ?? "Okay";

    return {
        ...props,
        children
    }

}

export const PopupCancelButton = (props: ButtonProps) => {

    const children = props.children ?? "Cancel";

    return {
        ...props,
        children
    }

}
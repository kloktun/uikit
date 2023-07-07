export type ControlSize = "large" | "medium" | "default" | "small" | "mini";

export interface ControlStatusProps {

    success?: boolean;
    error?: boolean;
    warning?: boolean;

}

export interface ControlsProps extends ControlStatusProps {

    size?: ControlSize;

    disabled?: boolean;

}
import "./styles/tailwind.css";

// Components
export { default as KloktunUI } from "./components/wrapper";

export { default as Icon } from "./components/icon";
export { default as Spinner } from "./components/spinner";
export { default as Shimmer } from "./components/shimmer";

export { default as Button } from "./components/button";
export type { ButtonProps } from "./components/button";

export { default as IconButton } from "./components/icon-button";
export { default as Input } from "./components/input";
export { default as Slider } from "./components/slider";
export { RadioGroup, RadioOption, RadioIndicator } from "./components/radio";
export {
	Checkbox,
	CheckboxGroup,
	CheckboxIndicator,
} from "./components/checkbox";
export { default as Switch } from "./components/switch";
export { Select, SelectOption, SelectButton } from "./components/select";
export { default as Tab } from "./components/tab";
export type { TabProps } from "./components/tab";
export { Tabs, TabsPanel, TabsCurrent } from "./components/tabs";

export { default as Alert } from "./components/alert";
export { default as Textarea } from "./components/textarea";
export { default as HoverPopover } from "./components/hover-popover";
export { default as Tooltip } from "./components/tooltip";
export { default as Dropdown } from "./components/dropdown";
export { default as Popover } from "./components/popover";
export { default as Label } from "./components/label";
export { default as Helper } from "./components/helper";
export { default as Divider } from "./components/divider";

export { default as Overlay } from "./components/overlay";
export { default as Window } from "./components/window";
export { default as Backdrop } from "./components/backdrop";
export { default as Modal } from "./components/modal";
export type { ModalProps } from "./components/modal";
export { default as Popup } from "./components/popup";
export type { PopupButtons, OnPopupClose } from "./components/popup";

export { default as EmptyPlaceholder } from "./components/empty-placeholder";
export {
	ActionDropdown,
	ActionDropdownItem,
} from "./components/action-dropdown";
export { default as ColorPicker } from "./components/color-picker";
export { default as InputColorPicker } from "./components/input-color-picker";

export { Theme } from "./theme/theme";
export { LightTheme, DarkTheme } from "./theme/themes";

// Hooks
export { useClickOutside } from "./hooks/outside";
export { useModalState } from "./hooks/modal";

export { usePopupContext, usePopup } from "./components/popup/context";
export { useMessagePopup } from "./components/popup/message";
export { useConfirmPopup } from "./components/popup/confirm";

// Tailwind Config
export { default as TailwindPreset } from "./tailwind/tailwind-preset.cjs";

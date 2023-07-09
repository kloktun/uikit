import './styles/tailwind.css'

// Components
export { default as KloktunUI  } from './components/wrapper';

export { default as Icon }  from './components/icon';
export { default as Spinner } from './components/spinner';
export { default as Shimmer } from './components/shimmer';


export { default as Button } from './components/button';
export type { ButtonProps } from './components/button';

export { default as IconButton } from './components/icon-button';
export { default as Input } from './components/input';
export { default as Slider } from './components/slider';
export { RadioGroup, RadioOption } from './components/radio';
export { Checkbox, CheckboxGroup } from './components/checkbox';
export { Select, SelectOption }  from './components/select';

export { default as Alert }  from './components/alert';
export { default as Textarea } from './components/textarea';
export { default as Dropdown } from './components/dropdown';
export { default as Label } from './components/label';
export { default as Helper } from './components/helper';

export { default as Overlay } from './components/overlay';
export { default as Window } from './components/window';
export { default as Backdrop } from './components/backdrop';
export { default as Modal } from './components/modal';
export { default as Popup } from './components/popup';
export type { PopupButtons, OnPopupClose } from './components/popup';

export { Theme } from './theme/theme';
export { LightTheme, DarkTheme } from './theme/themes';

// Hooks
export { useClickOutside } from './hooks/outside';
export { useModalState } from './hooks/modal';

export { usePopupContext, usePopup } from './components/popup/context';
export { useMessagePopup } from './components/popup/message';
export { useConfirmPopup } from './components/popup/confirm';

// Tailwind Config
export { KloktunTailwindColors, KloktunTailwindScreens, KloktunTailwindBoxShadows, KloktunTailwindBorderRadius, } from './tailwind/variables.cjs';
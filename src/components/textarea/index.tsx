import React, { useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { ControlsProps } from "../../common/controls.type";

interface Props extends Omit<React.HTMLProps<HTMLTextAreaElement> & ControlsProps, "onChange">  {

    value?: string;
    onChange?: (value: string) => void;

    autosize?: boolean | { minRows?: number, maxRows?: number },

}

const Textarea = ({ value, onChange, disabled, success, warning, error, autosize = { minRows: 2, maxRows: 5 }, ...restProps }: Props) => {

    const [textareaElement, setTextareaElement] = useState<HTMLTextAreaElement>();

    const el = useCallback((node: HTMLTextAreaElement) => {
        if (node !== null) {
            setTextareaElement(node);
        }
    }, []);


    useEffect(() => {

        updateSize();

    }, [value, textareaElement]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const value = e.target.value;

        if(onChange){
            onChange(value);
        }

        updateSize();
        
    }

    const updateSize = () => {

        if(!autosize){
            return;
        }

        if(!textareaElement){
            console.log("Textarea null")
            return;
        }
    
        setupHeightLimits();
        
        const styles = getComputedStyle(textareaElement);
        const borderTopWidth = parseInt(styles.borderTopWidth);
        const borderBottomWidth = parseInt(styles.borderBottomWidth);
        const borderVeritalWidth = borderTopWidth + borderBottomWidth;

        textareaElement.style.height = "0";
        textareaElement.style.height = `${textareaElement.scrollHeight + borderVeritalWidth}px`;
    
    }
    
    const setupHeightLimits = () => {
    
        if(!autosize || typeof autosize == "boolean"){
            return;
        }
        
        if(!textareaElement){
            return;
        }
    
        const styles = getComputedStyle(textareaElement);
        const lineHeight = parseInt(styles.lineHeight);
        const borderTopWidth = parseInt(styles.borderTopWidth);
        const borderBottomWidth = parseInt(styles.borderBottomWidth);
        const borderVeritalWidth = borderTopWidth + borderBottomWidth;
        const paddingTop = parseInt(styles.paddingTop);
        const paddingBottom = parseInt(styles.paddingBottom);
        const verticalPadding = paddingTop + paddingBottom;

        let { minRows, maxRows } = autosize;
    
        if(minRows){
    
            textareaElement.style.minHeight = `${lineHeight * minRows + verticalPadding + borderVeritalWidth}px`;
    
        }
    
        if(maxRows){
    
            textareaElement.style.maxHeight = `${lineHeight * maxRows + verticalPadding + borderVeritalWidth}px`;
    
        }
    
    }
    
    return (
        <textarea

            ref={el}

            value={value}
            onChange={handleChange}
            {...restProps}

            className={
                classnames(restProps.className, 'rounded-control editable-control-border editable-control-background editable-control-background resize-none p-2', {

                    'success': success,
                    'error': error,
                    'warning': warning,
                    'opacity-50': disabled

                })
            }

            disabled={disabled}
        >

        </textarea>

    );

};

export default Textarea;
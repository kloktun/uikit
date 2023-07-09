import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { ControlsProps } from "../../common/controls.type";
import { useCombinedRefs } from "../../hooks/combinedrefs";

interface Props extends Omit<React.HTMLProps<HTMLTextAreaElement> & ControlsProps, "">  {

    value?: string;
    autosize?: boolean | { minRows?: number, maxRows?: number },

}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ value, onChange, disabled, success, warning, error, autosize = { minRows: 2, maxRows: 5 }, ...restProps }, ref) => {

    const textareaElement = useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs<HTMLTextAreaElement>(textareaElement, ref);
   
    useEffect(() => {

        updateSize();

    }, [value, textareaElement]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        if(onChange){
            onChange(e);
        }

        updateSize();
        
    }

    const updateSize = () => {

        if(!autosize){
            return;
        }

        if(!textareaElement.current){
            return;
        }
    
        setupHeightLimits();
        
        const styles = getComputedStyle(textareaElement.current);
        const borderTopWidth = parseInt(styles.borderTopWidth);
        const borderBottomWidth = parseInt(styles.borderBottomWidth);
        const borderVeritalWidth = borderTopWidth + borderBottomWidth;

        textareaElement.current.style.height = "0";
        textareaElement.current.style.height = `${textareaElement.current.scrollHeight + borderVeritalWidth}px`;
    
    }
    
    const setupHeightLimits = () => {
    
        if(!autosize || typeof autosize == "boolean"){
            return;
        }
        
        if(!textareaElement.current){
            return;
        }
    
        const styles = getComputedStyle(textareaElement.current);
        const lineHeight = parseInt(styles.lineHeight);
        const borderTopWidth = parseInt(styles.borderTopWidth);
        const borderBottomWidth = parseInt(styles.borderBottomWidth);
        const borderVeritalWidth = borderTopWidth + borderBottomWidth;
        const paddingTop = parseInt(styles.paddingTop);
        const paddingBottom = parseInt(styles.paddingBottom);
        const verticalPadding = paddingTop + paddingBottom;

        let { minRows, maxRows } = autosize;
    
        if(minRows){
    
            textareaElement.current.style.minHeight = `${lineHeight * minRows + verticalPadding + borderVeritalWidth}px`;
    
        }
    
        if(maxRows){
    
            textareaElement.current.style.maxHeight = `${lineHeight * maxRows + verticalPadding + borderVeritalWidth}px`;
    
        }
    
    }
    
    return (
        <textarea
            ref={combinedRef}
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

});

export default Textarea;
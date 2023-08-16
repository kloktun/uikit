import classNames from "classnames";
import React from "react";

interface Props {

    children?: string | React.ReactElement | React.ReactElement[] | React.ReactNode;
    childrenAlign?: "start" | "center" | "end";
    childrenGap?: number;
    color?: string;
    indent?: number;
    endIndent?: number;
    thickness?: number;
    orientation?: "vertical" | "horizontal"
}

const Divider = ({ children, childrenAlign = "center", color, indent, endIndent, thickness, childrenGap, orientation = "horizontal" }: Props) => {

    const line = (
        <div
            className={
                classNames('kl-flex-1 kl-rounded-full',
                    {
                        'kl-border-stroke': !color,
                        'kl-border-t kl-max-h-0': orientation == "horizontal",
                        'kl-border-l kl-max-w-0': orientation == "vertical",
                    }
                )
            }

            style={{

                borderTopWidth: !!thickness && orientation == "horizontal" ? `${thickness}px` : undefined,
                borderLeftWidth: !!thickness && orientation == "vertical" ? `${thickness}px` : undefined,
                borderColor: !!color ? color : undefined,

            }}

        ></div>
    );

    let row;
    
    if(children){

        row = (
            <div className={classNames(
                'kl-flex kl-flex-1',
                {

                    'kl-gap-2': !childrenGap,
                
                    'kl-flex-row kl-items-center kl-w-full kl-min-w-full': orientation == 'horizontal',
                    'kl-flex-col kl-items-center kl-h-full kl-min-h-full': orientation == 'vertical',
                    
                    'kl-text-start': childrenAlign == "start",
                    'kl-text-center': childrenAlign == "center",
                    'kl-text-end': childrenAlign == "end",

                }
            )}

                style={
                    {
                        gap: !!childrenGap ? `${childrenGap}px` : undefined
                    }
                }

            >

                { childrenAlign == "start" && <>{ children}{line}</> }
                { childrenAlign == "center" && <>{line}{children}{line}</> }
                { childrenAlign == "end" && <>{line}{children}</> }

            </div>
        );

    } else {
        row = line;
    }

    return (
        <div className={ classNames('kl-flex kl-text-front-hint', {
            'kl-flex-row kl-items-center kl-w-full kl-min-w-full': orientation == "horizontal",
            'kl-flex-col kl-items-center kl-h-full kl-min-h-full': orientation == "vertical",
        })} style={{

            paddingTop: !!indent && orientation == 'vertical' ? `${indent}px` : undefined,
            paddingLeft: !!indent && orientation == 'horizontal' ? `${indent}px` : undefined,
            paddingBottom: !!indent && orientation == 'vertical' ? `${endIndent}px` : undefined,
            paddingRight: !!indent && orientation == 'horizontal' ? `${endIndent}px` : undefined,

        }}>
            {row}
        </div>
    );

}

export default Divider;
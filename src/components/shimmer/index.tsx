import classNames from "classnames";
import React from "react";

interface Props {

    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;

}

const Shimmer = ({ width, height, borderRadius, className }: Props) => {

    return (

        <div
            className={
                classNames("animate-pulse bg-stroke bg-opacity-70", {
                    'w-full': !width,
                    'h-full': !height,
                    'rounded-control': !borderRadius
                }, className)

            }

            style={
                {
                    width,
                    height,
                    borderRadius
                }
            }
        >

        </div>

    );

}

export default Shimmer;
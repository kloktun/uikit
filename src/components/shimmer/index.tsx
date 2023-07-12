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
                classNames("kl-animate-pulse kl-bg-stroke kl-bg-opacity-70", {
                    'kl-w-full': !width,
                    'kl-h-full': !height,
                    'kl-rounded-control': !borderRadius
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
import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';

interface SliderProps {
  min?: number;
  max?: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({ min = 0, max = 100, value, step = 1, onChange, disabled }) => {

    const sliderRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const saveRange = (value: number) => {

        if(value < min){
            return min;
        }

        if(value > max){
            return max;
        }

        return value;

    }

    const updateValue = (x: number) => {

        if(disabled){
            return;
        }

        const sliderEl = sliderRef.current;

        if (!sliderEl) {
            return;
        }
        const sliderWidth = sliderEl.offsetWidth;

        const percentage = (x / sliderWidth) * 100;
        
        let newValue = saveRange(Math.round((max - min) * (percentage / 100) / step) * step + min);

        onChange(newValue);

    }

    useEffect(() => {
        
        const sliderEl = sliderRef.current;

        if (sliderEl) {
            
            sliderEl.addEventListener('mousedown', handleMouseDown);
            sliderEl.addEventListener('touchstart', handleTouchStart);

            return () => {
                sliderEl.removeEventListener('mousedown', handleMouseDown);
                sliderEl.removeEventListener('touchstart', handleTouchStart);
            };

        }

    }, []);

    const handleMouseDown = (event: MouseEvent) => {

        event.preventDefault();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    };

    const handleMouseMove = (event: MouseEvent) => {

        event.preventDefault();
        
        const sliderEl = sliderRef.current;

        if (!sliderEl) {
            return;
        }

        const sliderLeft = sliderEl.getBoundingClientRect().left;
        const x = event.pageX - sliderLeft;

        updateValue(x)

    };

    const handleMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (event: TouchEvent) => {
        event.preventDefault();
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (event: TouchEvent) => {

        event.preventDefault();

        const sliderEl = sliderRef.current;

        if (!sliderEl) {
            return;
        }

        const sliderLeft = sliderEl.getBoundingClientRect().left;
        const x = event.changedTouches[0].pageX - sliderLeft;

        updateValue(x);

    };

    const handleTouchEnd = (event: TouchEvent) => {
        event.preventDefault();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {

        event.preventDefault();

        const sliderEl = sliderRef.current;

        if (!sliderEl) {
            return;
        }

        const sliderLeft = sliderEl.getBoundingClientRect().left;
        const x = event.pageX - sliderLeft;

        updateValue(x);


    }

    const handleTap = (event: TouchEvent) => {

        event.preventDefault();

        const sliderEl = sliderRef.current;

        if (!sliderEl) {
            return;
        }

        const sliderLeft = sliderEl.getBoundingClientRect().left;
        const x = event.touches[0].pageX - sliderLeft;

        updateValue(x);


    }

    // const percentage = ((sliderValue - min) / (max - min)) * 100;
    const v = saveRange(value);
    const percentage = ((v - min) / (max - min)) * 100;

    const [thumbLeftOffset, setThumbLeftOffet] = useState(0);

    useEffect(() => {

        const el = thumbRef.current;
        
        if(!el){
            return;
        }

        const width = el.offsetWidth;
        const percent = width / 100;

        setThumbLeftOffet(-1 * percentage * percent);
        
    }, [thumbRef.current, value]);

    return (
        <div className={classnames('relative flex flex-col w-full justify-center control-height-default', {
            'cursor-pointer': !disabled,
            'opacity-50': disabled
        })} onClick={handleClick} ref={sliderRef}>

            <div className='flex flex-col w-full bg-stroke h-1 rounded-full overflow-hidden'>
                <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
            </div>

            <div ref={thumbRef} className="absolute flex items-center justify-center h-full" style={{ left: `${percentage}%`, marginLeft: `${thumbLeftOffset}px` }}>

                <div className='w-5 h-5 rounded-full border-2 border-primary bg-background'></div>

            </div>

        </div>
    );

};

export default Slider;

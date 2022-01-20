import { useState, useEffect } from 'react';

const useObserver = <T extends HTMLElement>(Elm: T, options: IntersectionObserverInit = { threshold: 0 }): boolean => {
    const [isInView, setIsInView] = useState<boolean>(false);


    useEffect(() => {
        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (entries[0].isIntersecting) {
                setIsInView(true);
                console.log('inview now');
               if(Elm!==null) observer.unobserve(Elm);
            };
        }, options)
        if (Elm !== null) { 
            observer.observe(Elm);             
        }
        return () => {
            if (Elm !== null) { 
                observer.unobserve(Elm);
                setIsInView(false);
            }
        }
    }, [Elm, options])


    return isInView;
}


export default useObserver;
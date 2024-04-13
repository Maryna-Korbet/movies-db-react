import { useEffect, useState, useRef, MutableRefObject } from "react";


interface Options {
    root?: null | HTMLElement;
    rootMargin?: string;
    threshold?: number;
    onIntersect?(): void;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(options: Options = {}): HookReturnType {

    const { root = null, rootMargin = '0px', threshold = 1.0, onIntersect } = options;
    const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (entry.isIntersecting) { 
                onIntersect?.();
            }
            setEntry(entry);
        }, { root, rootMargin, threshold });

        const currentRef = targetRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return function () {
            if (currentRef) {
                observer.disconnect();
            }
        }
    }, [root, rootMargin, threshold, onIntersect]);

    return [targetRef, entry];
}
import { useEffect, useState, useRef, MutableRefObject } from "react"


interface Options {
    root?: null | HTMLElement;
    rootMargin?: string;
    threshold?: number;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(options: Options = {}): HookReturnType {

    const { root = null, rootMargin = '0px', threshold = 1.0 } = options;
    const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
    const targetRef = useRef(null);

    const callback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setEntry(entry);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callback, { root, rootMargin, threshold });
        const currentRef = targetRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }
        
        return function () {
            if (currentRef) {
                observer.disconnect();
            }
        }
    }, [root, rootMargin, threshold]);

    return [targetRef, entry];
}
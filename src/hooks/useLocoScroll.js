import { useEffect, useRef } from "react";

const useLocoScroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure client-side execution

        import("locomotive-scroll").then((LocomotiveScroll) => {
            if (!scrollRef.current) return;

            const scroll = new LocomotiveScroll.default({
                el: scrollRef.current,
                smooth: true
            });

            const observer = new MutationObserver(() => scroll.update());

            if (scrollRef.current) {
                observer.observe(scrollRef.current, { childList: true, subtree: true });
            }

            window.addEventListener("load", () => scroll.update());

            return () => {
                observer.disconnect();
                scroll.destroy();
            };
        });
    }, []);

    return scrollRef;
};

export default useLocoScroll;

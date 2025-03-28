import { useEffect, useRef } from "react";

const useLocoScroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure it runs only in the browser

        let scroll; // Store Locomotive instance here

        import("locomotive-scroll").then((LocomotiveScroll) => {
            if (!scrollRef.current) return;

            scroll = new LocomotiveScroll.default({
                el: scrollRef.current,
                smooth: true
            });

            // Observe changes in the DOM
            const observer = new MutationObserver(() => {
                scroll.update();
            });

            const config = { childList: true, subtree: true };
            const mainElement = document.querySelector("#main");
            if (mainElement) observer.observe(mainElement, config);

            // Ensure scroll updates when page loads fully
            const updateScroll = () => scroll.update();
            window.addEventListener("load", updateScroll);

            // Cleanup function to avoid memory leaks
            return () => {
                observer.disconnect();
                window.removeEventListener("load", updateScroll);
                scroll.destroy();
            };
        });
    }, []);

    return scrollRef;
};

export default useLocoScroll;

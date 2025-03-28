import { useEffect, useRef } from "react";

const useLocoScroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure code runs only on the client-side

        let scroll; // Store Locomotive instance

        import("locomotive-scroll").then((LocomotiveScroll) => {
            if (!scrollRef.current) return;

            scroll = new LocomotiveScroll.default({
                el: scrollRef.current,
                smooth: true,
            });

            // Ensure document is available before querying elements
            if (typeof document !== "undefined") {
                const observer = new MutationObserver(() => {
                    scroll.update();
                });

                const config = { childList: true, subtree: true };
                const mainElement = document.querySelector("#main");
                if (mainElement) observer.observe(mainElement, config);

                const updateScroll = () => scroll.update();
                window.addEventListener("load", updateScroll);

                // Cleanup to prevent memory leaks
                return () => {
                    observer.disconnect();
                    window.removeEventListener("load", updateScroll);
                    scroll.destroy();
                };
            }
        });
    }, []);

    return scrollRef;
};

export default useLocoScroll;

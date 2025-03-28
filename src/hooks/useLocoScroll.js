import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

const useLocoScroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        window.addEventListener('DOMContentLoaded', () => {
            const scroll = new LocomotiveScroll({
                el: scrollRef.current,
                smooth: true
            });

            // Observe for changes in the DOM and update Locomotive Scroll
            const observer = new MutationObserver(() => {
                scroll.update();
            });

            const config = { childList: true, subtree: true };
            observer.observe(document.querySelector('#main'), config);

            // Call update once all content is loaded
            window.addEventListener('load', () => {
                scroll.update();
            });
        });
        return () => {
            window.removeEventListener("load", () => {
                scroll.update();
            });
            window.removeEventListener("DOMContentLoaded", () => {
                scroll.update();
            });
        };
    }, []);

    return scrollRef;
};

export default useLocoScroll;

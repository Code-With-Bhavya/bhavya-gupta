"use client"; 

import useLocoScroll from "@/hooks/useLocoScroll";

const LocoWrapper = ({ children }) => {
  const scrollRef = useLocoScroll();

  return <div ref={scrollRef}>{children}</div>;
};

export default LocoWrapper;

'use client'

import { useEffect, useState, type FC } from 'react'
import { motion } from "motion/react";

interface HeaderWrapperProps {
    children: React.ReactNode
}

const HeaderWrapper: FC<HeaderWrapperProps> = ({
    children
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Call handleScroll on initial render
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.header
            className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-2xl border-b" : ""
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", bounce: 0.25 }}
        >
            {children}
        </motion.header>
    )
}

export default HeaderWrapper
// Animation variants for section
export const sectionVariants = {
    hidden: {
        opacity: 0,
        x: 100,
    },
    visible: {
        opacity: 1,
        x: 0,
    },
    transition: {
        delay: 0.1,
        duration: 0.5,
        ease: "easeOut",
    },
}

// Animation variants for title
export const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: 0.2,
        },
    },
}

export const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.3,
        },
    },
}

export const avatarVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
        },
    },
}

export const nameVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.4,
            duration: 0.3,
        },
    },
}

export const verifyVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 10,
        },
    },
}

export const starVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -30 },
    hover: {
        scale: 1.2,
        transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            delay: 0.6 + i * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 10,
        },
    }),
}

export const reviewTextVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.7,
            duration: 0.3,
        },
    },
}

export const glowVariants = {
    initial: {
        opacity: 0.3,
        rotate: -40.71,
    },
    animate: {
        opacity: [0.3, 0.6, 0.3],
        rotate: [-40.71, -38, -40.71],
        transition: {
            opacity: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
            },
            rotate: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 8,
                ease: "easeInOut",
            },
        },
    },
}

export const cardVariants = {
    initial: {
        opacity: 0,
        x: 100,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 180,
            damping: 22,
            mass: 1,
        },
    },
    exit: {
        opacity: 0,
        x: -100,
        transition: {
            type: "spring",
            stiffness: 180,
            damping: 22,
        },
    },
    hover: {
        scale: 1.05,
        y: -10,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
        },
    },
};


export const glowBarVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
        opacity: 0.6,
        scaleX: 1,
        transition: {
            delay: 0.3,
            duration: 0.5,
        },
    },
}

export const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.3,
      },
    },
  }

export const buttonVariants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
        },
    },
    tap: { scale: 0.9 },
}

export const getPathVariants = (isDisabled) => ({
    initial: {
        fill: isDisabled ? "#FFFFFF" : "#FD6F00",
    },
    animate: {
        fill: isDisabled ? "#FFFFFF" : ["#FD6F00", "#FF9F4A", "#FD6F00"],
        transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
        },
    },
    hover: {
        fill: "#FF9F4A",
    },
})


export const getCardStyles = (cardpos) => {
    // Center card
    if (cardpos === "center") {
        return {
            scale: 1,
            y: 0,
            rotate: 0,
            zIndex: 50,
            x: 0,
            height: "459px",
        }
    }
    // Left card
    else if (cardpos === "left") {
        return {
            scale: 0.9,
            y: 20,
            rotate: -3.74,
            zIndex: 10,
            x: -200,
            height: "391px",
        }
    }
    // Right card
    else {
        return {
            scale: 0.9,
            y: 20,
            rotate: 3.74,
            zIndex: 10,
            x: 200,
            height: "391px",
        }
    }
}

export const getCardVariants = (cardStyle, cardPosition) => ({
    initial: (direction) => ({
        ...cardStyle,
        x:
            direction > 0
                ? cardPosition === "right"
                    ? 1000
                    : cardPosition === "center"
                        ? 200
                        : -200
                : direction < 0
                    ? cardPosition === "left"
                        ? -1000
                        : cardPosition === "center"
                            ? -200
                            : 200
                    : cardStyle.x,
        opacity: direction === 0 ? 0 : 1,
    }),

    animate: {
        ...cardStyle,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 180,
            damping: 22,
            mass: 1,
        },
    },

    exit: (direction) => ({
        ...cardStyle,
        x:
            direction > 0
                ? cardPosition === "left"
                    ? -1000
                    : cardPosition === "center"
                        ? -200
                        : 200
                : cardPosition === "right"
                    ? 1000
                    : cardPosition === "center"
                        ? 200
                        : -200,
        opacity: cardPosition === "left" || cardPosition === "right" ? 0 : 1,
        transition: {
            type: "spring",
            stiffness: 180,
            damping: 22,
        },
    }),

    hover: cardPosition === "center"
        ? {
            scale: 1.05,
            y: -10,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        }
        : {},

    tap: cardPosition === "center"
        ? {
            scale: 0.98,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        }
        : {},
});


export function formatDate(dateString) {
    if (!dateString) return { formattedDate: "Unknown date", formattedTime: "Unknown time" }

     const dateObj = new Date(dateString)

    const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })

    return { formattedDate, formattedTime }
}

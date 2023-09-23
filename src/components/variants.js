// framer motion variants
export const boardVariant = {
    hidden: {
        opacity: 0.2,
        x: '-100vw'
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring', 
            bounce: 0.5, 
            duration: 0.8,
            when: 'beforeChildren',
            staggerChildren: 0.2
        }
    }
}

export const numBoxVariant = {
    hidden: {
        opacity: 0.2,
        scale: 0
    },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring', 
            bounce: 0.6
        }
    }
}

export const buttonVariant = {
    hidden: {
        y: '100vh',
        opacity: 0.2
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring', 
            bounce: 0.5, 
            duration: 0.8,
        }
    }
}
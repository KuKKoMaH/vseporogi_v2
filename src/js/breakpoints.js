import Breakpoints from "breakpoints-js";

export const BREAKPOINT_LG = 1170;
export const BREAKPOINT_MD = 768;

Breakpoints({
    sm: {
        min: 0,
        max: BREAKPOINT_MD - 1,
    },
    md: {
        min: BREAKPOINT_MD,
        max: BREAKPOINT_LG - 1,
    },
    lg: {
        min: BREAKPOINT_LG,
        max: Infinity,
    },
});

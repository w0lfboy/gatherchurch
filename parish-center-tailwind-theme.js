// Parish Center Tailwind Theme Extension
const parishCenterTheme = {
  colors: {
    background: "hsl(50 20% 98%)",
    foreground: "hsl(220 50% 18%)",
    card: {
      DEFAULT: "hsl(0 0% 100%)",
      foreground: "hsl(220 50% 18%)",
    },
    primary: {
      DEFAULT: "hsl(220 50% 25%)",
      foreground: "hsl(0 0% 100%)",
    },
    secondary: {
      DEFAULT: "hsl(220 20% 95%)",
      foreground: "hsl(220 50% 18%)",
    },
    muted: {
      DEFAULT: "hsl(220 20% 90%)",
      foreground: "hsl(220 15% 50%)",
    },
    accent: {
      DEFAULT: "hsl(260 50% 55%)",
      foreground: "hsl(0 0% 100%)",
    },
    destructive: {
      DEFAULT: "hsl(0 65% 50%)",
      foreground: "hsl(0 0% 100%)",
    },
    border: "hsl(220 20% 85%)",
  },
  fontFamily: {
    display: ["'DM Sans'", "sans-serif"],
    body: ["'Inter'", "sans-serif"],
  },
  borderRadius: {
    sm: "calc(0.5rem - 4px)",
    md: "calc(0.5rem - 2px)",
    lg: "0.5rem",
  },
  boxShadow: {
    card: "0 2px 10px hsla(220, 50%, 18%, 0.06)",
    elevated: "0 10px 28px hsla(220, 50%, 18%, 0.1)",
    glow: "0 0 35px hsla(220, 50%, 25%, 0.18)",
  },
};

export default parishCenterTheme;
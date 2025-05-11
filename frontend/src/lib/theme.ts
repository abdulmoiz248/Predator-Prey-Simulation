export const THEME = {
  colors: {
    // Core gradient
    gradient: {
      primary: "from-[#84ffc9] via-[#aab2ff] to-[#eca0ff]",
      secondary: "from-violet-600 to-pink-600",
    },
    // Species colors
    species: {
      rabbit: {
        primary: "text-violet-500",
        bg: "bg-violet-50",
        border: "border-violet-200",
        focus: "focus:border-violet-500",
        dark: "text-violet-700",
        darker: "text-violet-900",
      },
      wolf: {
        primary: "text-pink-500",
        bg: "bg-pink-50",
        border: "border-pink-200",
        focus: "focus:border-pink-500",
        dark: "text-pink-700",
        darker: "text-pink-900",
      },
      fox: {
        primary: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber-200",
        focus: "focus:border-amber-500",
        dark: "text-amber-700",
        darker: "text-amber-900",
      }
    },
    // Status colors
    status: {
      success: "bg-green-100 text-green-800 hover:bg-green-100",
      error: "bg-red-100 text-red-800 hover:bg-red-100",
      info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      neutral: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    },
    // Growth indicators
    growth: {
      positive: "text-green-600",
      negative: "text-red-600",
    }
  },
  animations: {
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    fadeIn: "animate-fade-in",
    spin: "animate-spin",
  }
};

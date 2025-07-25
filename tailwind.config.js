/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-background-brand-default": "var(--color-background-brand-default)",
        "color-background-brand-hover": "var(--color-background-brand-hover)",
        "color-border-brand-default": "var(--color-border-brand-default)",
        "color-primitives-brand-300": "var(--color-primitives-brand-300)",
        "d-9d-9d-9": "var(--d-9d-9d-9)",
        inkdarkest: "var(--inkdarkest)",
        inklight: "var(--inklight)",
        inklighter: "var(--inklighter)",
        "new-fill-000000": "var(--new-fill-000000)",
        "new-fill-1025dd": "var(--new-fill-1025dd)",
        "new-fill-1a53d9": "var(--new-fill-1a53d9)",
        "new-fill-20c93f": "var(--new-fill-20c93f)",
        "new-fill-2f2b2b": "var(--new-fill-2f2b2b)",
        "new-fill-3a3cb9": "var(--new-fill-3a3cb9)",
        "new-fill-4d1bf1": "var(--new-fill-4d1bf1)",
        "new-fill-6e9de3": "var(--new-fill-6e9de3)",
        "new-fill-729fe7": "var(--new-fill-729fe7)",
        "new-fill-73a3ec": "var(--new-fill-73a3ec)",
        "new-fill-74a4ee": "var(--new-fill-74a4ee)",
        "new-fill-bfbfbf": "var(--new-fill-bfbfbf)",
        "new-fill-ebe9e9": "var(--new-fill-ebe9e9)",
        "new-fill-f1e4f4": "var(--new-fill-f1e4f4)",
        "new-fill-f5f5f5": "var(--new-fill-f5f5f5)",
        "new-fill-f6f6f6": "var(--new-fill-f6f6f6)",
        "new-fill-fcfcfc": "var(--new-fill-fcfcfc)",
        "new-fill-ffffff": "var(--new-fill-ffffff)",
        "new-stroke-style": "var(--new-stroke-style)",
        primarybase: "var(--primarybase)",
        skylight: "var(--skylight)",
        skywhite: "var(--skywhite)",
        "system-colors-labels-primary": "var(--system-colors-labels-primary)",
        skydark: "var(--skydark)",
        primarylightest: "var(--primarylightest)",
      },
      fontFamily: {
        "body-base": "var(--body-base-font-family)",
        "default-bold-body": "var(--default-bold-body-font-family)",
        heading: "var(--heading-font-family)",
        "inter-regular": "var(--inter-regular-font-family)",
        "inter-thin": "var(--inter-thin-font-family)",
        "open-sans-bold": "var(--open-sans-bold-font-family)",
        "open-sans-light": "var(--open-sans-light-font-family)",
        "open-sans-regular": "var(--open-sans-regular-font-family)",
        "open-sans-semibold": "var(--open-sans-semibold-font-family)",
        "regular-none-medium": "var(--regular-none-medium-font-family)",
        "regular-none-regular": "var(--regular-none-regular-font-family)",
        "regular-normal-bold": "var(--regular-normal-bold-font-family)",
        "regular-normal-regular": "var(--regular-normal-regular-font-family)",
        "roboto-medium": "var(--roboto-medium-font-family)",
        "roboto-regular": "var(--roboto-regular-font-family)",
        "single-line-body-base": "var(--single-line-body-base-font-family)",
        "tiny-normal-regular": "var(--tiny-normal-regular-font-family)",
        "title-2": "var(--title-2-font-family)",
        "title-3": "var(--title-3-font-family)",
        "large-none-bold": "var(--large-none-bold-font-family)",
        "large-none-medium": "var(--large-none-medium-font-family)",
        "large-normal-bold": "var(--large-normal-bold-font-family)",
        "regular-tight-regular": "var(--regular-tight-regular-font-family)",
        "small-none-regular": "var(--small-none-regular-font-family)",
        "roboto": ["Roboto", "Helvetica"],
      },
      boxShadow: {
        "drop-shadow-radius-24": "var(--drop-shadow-radius-24)",
        "drop-shadow-radius-4": "var(--drop-shadow-radius-4)",
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.safe-area-pt': {
          'padding-top': 'env(safe-area-inset-top)'
        },
        '.safe-area-pb': {
          'padding-bottom': 'env(safe-area-inset-bottom)'
        },
        '.safe-area-pl': {
          'padding-left': 'env(safe-area-inset-left)'
        },
        '.safe-area-pr': {
          'padding-right': 'env(safe-area-inset-right)'
        }
      })
    }
  ],
};
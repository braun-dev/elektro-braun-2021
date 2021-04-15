module.exports = {
  purge: {
    enabled: false,
    content: [
      "./apps/**/*.{html,ts}",
      "./libs/**/*{html,ts}"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'dashboard': 'repeat(auto-fill, minmax(250px, 1fr))',
        'form-employee': '1fr',
        'form-employee-lg': '270px 1fr',
        'form-employee-xl': '270px 1fr 270px',
        'horizontal-form': 'auto 1fr'
      },
      gridTemplateRows: {
        'form-employee-lg': 'auto auto auto'
      },
      width: {
        '108': '30rem',
      },
      maxWidth: {
        '108': '30rem',
      },
      minWidth: {
        '94': '22rem'
      },
      screens: {
        '3xl': '1700px',
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus-within']
    },
  },
  plugins: [],
}

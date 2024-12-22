import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                '8xl': '90rem', 
            },
            textColor: {
                'yellow-800': 'rgb(133 77 14)',   // Texto amarillo oscuro
                'green-800': 'rgb(22 101 52)',    // Texto verde oscuro
                'red-800': 'rgb(153 27 27)',      // Texto rojo oscuro
            },
        },
    },

    plugins: [forms],
};

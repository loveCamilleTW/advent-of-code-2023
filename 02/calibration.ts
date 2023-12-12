const DIGIT_WORDS: { [key: string]: number } = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'zero': 0
}

import { readFileSync } from 'fs';

function calibration(str: string): number {
    let firstDigit: string | number | undefined;
    let lastDigit: string | number | undefined;
    let firstDigitIndex = Number.MAX_SAFE_INTEGER;
    let lastDigitIndex = -1;

    Object.keys(DIGIT_WORDS).forEach(key => {
        const index = str.indexOf(key);

        if (index === -1) return;

        if (index < firstDigitIndex) {
            firstDigitIndex = index;
            firstDigit = DIGIT_WORDS[key];
        }
    })

    Object.keys(DIGIT_WORDS).forEach(key => {
        const index = str.lastIndexOf(key);

        if (index === -1) return;

        if (index > lastDigitIndex) {
            lastDigitIndex = index;
            lastDigit = DIGIT_WORDS[key];
        }
    })

    for (let i = 0; i < firstDigitIndex && i < str.length; i++) {
        const char = str[i];
        if (isDigit(char)) {
            firstDigit = char;
            break;
        }
    }

    for (let i = str.length - 1; i > lastDigitIndex && i >= 0; i--) {
        const char = str[i];
        if (isDigit(char)) {
            lastDigit = char;
            break;
        }
    }

    return Number(`${firstDigit}${lastDigit}`);
}

function isDigit(str: string): boolean {
    return /^\d$/.test(str);
}

const input = readFileSync('input.txt', 'utf-8');

const ans = input.split('\n')
    .map((str) => calibration(str))
    .reduce((acc, cur) => acc + cur);

console.log(ans);
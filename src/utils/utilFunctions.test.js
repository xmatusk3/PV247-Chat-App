import { validateNonEmptyness } from './validateNonEmpty';
import validateEmail from './validateEmail';
import { uuid } from './uuidGenerator';
import isImage from './isImage';
import enrichHTML from './enrichHTML';
import { createStore } from './createStore';
import { createHashHistory } from 'history';

describe('Util function tests', () => {
    test('validateNonEmpty util function test', () => {
        const expectedText = 'Provide us with a fieldName';
        expect(validateNonEmptyness('fieldName')(null)).toBe(expectedText);
    });

    test('validateEmail util function test', () => {
        const textToValidate = 'test@test.test';
        expect(validateEmail(textToValidate)).toBe(true);
    });

    test('uuidGenerator util function test', () => {
        expect(uuid()).not.toEqual(uuid());
    });

    test('isImage util function test', () => {
        const textToValidate = 'image.jpg';
        expect(isImage(textToValidate)).toEqual(true);
    });

    test('enrichHTML util function test', () => {
        const textToEnrich = 'www.test.test';
        const expectedHTML = `<a href=${textToEnrich} target="_blank">${textToEnrich}</a>`;
        expect(enrichHTML(textToEnrich)).toEqual(expectedHTML);
    });

    test('createStore util function test', () => {
        expect(createStore(createHashHistory())).toBeDefined();
    });
});

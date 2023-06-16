import test from 'ava';
import { calculateBaselinePoints, Category } from '../index.js';

test('calculateBaselinePoints - no nutritional information', t => {
  t.is(calculateBaselinePoints(Category.MilkBasedBeverages, {}), 0);
  t.is(calculateBaselinePoints(Category.OtherFoods, {}), 0);

  t.is(calculateBaselinePoints(Category.NonDairyBeverages, {}), 0);
});

test('calculateBaselinePoints - Category1D', t => {
  const category = Category.DairyBeverages;
  const nutritionalInformation = {
    energykJ: 500,
    saturatedFatGrams: 2,
    totalSugarsGrams: 8,
    sodiumMilligrams: 200,
  };

  const expectedPoints = 5;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Category2 - just below threshold', t => {
  const category = Category.OtherFoods;
  const nutritionalInformation = {
    energykJ: 1005,
    saturatedFatGrams: 9,
    totalSugarsGrams: 28.5,
    sodiumMilligrams: 360,
  };

  const expectedPoints = 2 + 8 + 6 + 3;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Category2 - just above threshold', t => {
  const category = Category.OtherFoods;
  const nutritionalInformation = {
    energykJ: 1006,
    saturatedFatGrams: 10,
    totalSugarsGrams: 28.6,
    sodiumMilligrams: 361,
  };

  const expectedPoints = 3 + 9 + 7 + 4;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Category2D', t => {
  const category = Category.DairyFoods;
  const nutritionalInformation = {
    energykJ: 1675,
    saturatedFatGrams: 5,
    totalSugarsGrams: 16.8,
    sodiumMilligrams: 630,
  };

  const expectedPoints = 4 + 4 + 3 + 6;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Category3', t => {
  const category = Category.FatsOilsAndSpreads;
  const nutritionalInformation = {
    energykJ: 2500,
    saturatedFatGrams: 15,
    totalSugarsGrams: 40,
    sodiumMilligrams: 800,
  };

  const expectedPoints = 7 + 14 + 8 + 8;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Category3D', t => {
  const category = Category.Cheese;
  const nutritionalInformation = {
    energykJ: 1800,
    saturatedFatGrams: 12,
    totalSugarsGrams: 35,
    sodiumMilligrams: 500,
  };

  const expectedPoints = 5 + 11 + 7 + 5;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Category1', t => {
  const category = Category.NonDairyBeverages;
  const nutritionalInformation = {
    energykJ: 50,
    saturatedFatGrams: 20,
    totalSugarsGrams: 3,
    sodiumMilligrams: 100,
  };

  const expectedPoints = 2 + 2;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Unknown Category', t => {
  const category = null;
  const nutritionalInformation = {
    energykJ: 500,
    saturatedFatGrams: 2,
    totalSugarsGrams: 8,
    sodiumMilligrams: 200,
  };

  const expectedPoints = 0;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Above Maximums', t => {
  const category = Category.DairyBeverages;
  const nutritionalInformation = {
    energykJ: 4000,
    saturatedFatGrams: 100,
    totalSugarsGrams: 120,
    sodiumMilligrams: 3000,
  };

  const expectedPoints = 11 + 30 + 25 + 30;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

test('calculateBaselinePoints - Below Minimums', t => {
  const category = Category.DairyBeverages;
  const nutritionalInformation = {
    energykJ: 10,
    saturatedFatGrams: 0.2,
    totalSugarsGrams: 3.6,
    sodiumMilligrams: 89,
  };

  const expectedPoints = 0;
  const result = calculateBaselinePoints(category, nutritionalInformation);
  t.is(result, expectedPoints);
});

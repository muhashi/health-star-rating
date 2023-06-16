import test from 'ava';
import { calculateProteinPoints, Category } from '../index.js';

test('calculateProteinPoints - Category1', t => {
  const category = Category.NonDairyBeverages;
  const baselinePoints = 5;
  const fruitVegetableNutLegumePoints = 3;
  const proteinGrams = 10;

  const expectedPoints = 0;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});

test('calculateProteinPoints - Baseline points >= 13 and FruitVegetableNutLegume points < 5', t => {
  const category = Category.OtherFoods;
  const baselinePoints = 13;
  const fruitVegetableNutLegumePoints = 4;
  const proteinGrams = 20;

  const expectedPoints = 0;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});

test('calculateProteinPoints - Baseline points >= 13 and FruitVegetableNutLegume points >= 5', t => {
  const category = Category.OtherFoods;
  const baselinePoints = 13;
  const fruitVegetableNutLegumePoints = 5;
  const proteinGrams = 20;

  const expectedPoints = 9;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});

test('calculateProteinPoints - Category1D with proteinGrams within range', t => {
  const category = Category.DairyBeverages;
  const baselinePoints = 8;
  const fruitVegetableNutLegumePoints = 7;
  const proteinGrams = 3.5;

  const expectedPoints = 2;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});

test('calculateProteinPoints - Category3D with proteinGrams within range', t => {
  const category = Category.Cheese;
  const baselinePoints = 12;
  const fruitVegetableNutLegumePoints = 4;
  const proteinGrams = 9;

  const expectedPoints = 5;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});

test('calculateProteinPoints - Category2 with proteinGrams above maximum', t => {
  const category = Category.OtherFoods;
  const baselinePoints = 10;
  const fruitVegetableNutLegumePoints = 6;
  const proteinGrams = 55;

  const expectedPoints = 15;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});

test('calculateProteinPoints - Category2 with proteinGrams below minimum', t => {
  const category = Category.OtherFoods;
  const baselinePoints = 10;
  const fruitVegetableNutLegumePoints = 6;
  const proteinGrams = 1.6;

  const expectedPoints = 0;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});



test('calculateProteinPoints - Unknown Category', t => {
  const category = 'Unknown';
  const baselinePoints = 5;
  const fruitVegetableNutLegumePoints = 2;
  const proteinGrams = 20;

  const expectedPoints = 0;
  const result = calculateProteinPoints(category, baselinePoints, fruitVegetableNutLegumePoints, proteinGrams);
  t.is(result, expectedPoints);
});

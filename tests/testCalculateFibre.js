import test from 'ava';
import { calculateFibrePoints, Category } from '../index.js';

test('calculateFibrePoints - Category1', t => {
  const category = Category.NonDairyBeverages;
  const fibreGrams = 3.5;

  const expectedPoints = 0;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Category1D', t => {
  const category = Category.DairyBeverages;
  const fibreGrams = 3.5;

  const expectedPoints = 0;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Category2 with fibreGrams within range', t => {
  const category = Category.OtherFoods;
  const fibreGrams = 5.2;

  const expectedPoints = 5;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Category2D with fibreGrams within range', t => {
  const category = Category.DairyFoods;
  const fibreGrams = 6.3;

  const expectedPoints = 6;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Category3D with fibreGrams above maximum', t => {
  const category = Category.Cheese;
  const fibreGrams = 25;

  const expectedPoints = 15;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Category3D with fibreGrams at below maximum threshold', t => {
  const category = Category.Cheese;
  const fibreGrams = 20;

  const expectedPoints = 14;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Category3D with fibreGrams below minimum', t => {
  const category = Category.Cheese;
  const fibreGrams = 0.8;

  const expectedPoints = 0;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Category3', t => {
  const category = Category.FatsOilsAndSpreads;
  const fibreGrams = 3.8;

  const expectedPoints = 4;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

test('calculateFibrePoints - Unknown Category', t => {
  const category = null;
  const fibreGrams = 8.9;

  const expectedPoints = 0;
  const result = calculateFibrePoints(category, fibreGrams);
  t.is(result, expectedPoints);
});

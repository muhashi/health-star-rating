import test from 'ava';
import { Attributes, Category, calculateFruitVegetableNutLegumePoints } from '../index.js';

test('calculateFruitVegetableNutLegumePoints - Category1D with ContainsFruitOrVegetable', t => {
  const category = Category.DairyBeverages;
  const attributes = [Attributes.ContainsFruitOrVegetable];
  const percentageFruitVegetableNutLegume = 70;

  const expectedPoints = 5;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - Category2 with ContainsNutsOrLegumes', t => {
  const category = Category.OtherFoods;
  const attributes = [Attributes.ContainsNutsOrLegumes];
  const percentageFruitVegetableNutLegume = 85;

  const expectedPoints = 5;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - Category2D with ContainsFruitOrVegetable and ContainsNutsOrLegumes', t => {
  const category = Category.DairyFoods;
  const attributes = [Attributes.ContainsFruitOrVegetable, Attributes.ContainsNutsOrLegumes];
  const percentageFruitVegetableNutLegume = 90;

  const expectedPoints = 7;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - Category3 with ContainsFruitOrVegetable', t => {
  const category = Category.FatsOilsAndSpreads;
  const attributes = [Attributes.ContainsFruitOrVegetable];
  const percentageFruitVegetableNutLegume = 55;

  const expectedPoints = 3;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - Category3D with ContainsNutsOrLegumes', t => {
  const category = Category.Cheese;
  const attributes = [Attributes.ContainsNutsOrLegumes];
  const percentageFruitVegetableNutLegume = 92;

  const expectedPoints = 6;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - Category1 with ContainsFruitOrVegetable', t => {
  const category = Category.NonDairyBeverages;
  const attributes = [Attributes.ContainsFruitOrVegetable];
  const percentageFruitVegetableNutLegume = 35;

  const expectedPoints = 2;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - Unknown Category', t => {
  const category = null;
  const attributes = [Attributes.ContainsFruitOrVegetable];
  const percentageFruitVegetableNutLegume = 80;

  const expectedPoints = 0;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - No Attributes', t => {
  const category = Category.NonDairyBeverages;
  const attributes = [];
  const percentageFruitVegetableNutLegume = 50;

  const expectedPoints = 0;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - below minimum', t => {
  const category = Category.FatsOilsAndSpreads;
  const attributes = [Attributes.ContainsFruitOrVegetable];
  const percentageFruitVegetableNutLegume = 13;

  const expectedPoints = 0;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

test('calculateFruitVegetableNutLegumePoints - at maximum', t => {
  const category = Category.FatsOilsAndSpreads;
  const attributes = [Attributes.ContainsFruitOrVegetable];
  const percentageFruitVegetableNutLegume = 100;

  const expectedPoints = 8;
  const result = calculateFruitVegetableNutLegumePoints(category, attributes, percentageFruitVegetableNutLegume);
  t.is(result, expectedPoints);
});

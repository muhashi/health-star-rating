import test from 'ava';
import { Attributes, Category, calculateHealthStarRating } from '../index.js';

test('calculateHealthStarRating - Category.PlainWater', t => {
  const category = Category.PlainWater;

  const expectedRating = 5;
  const result = calculateHealthStarRating(category);
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category.UnprocessedFruitAndVegetables', t => {
  const category = Category.UnprocessedFruitAndVegetables;

  const expectedRating = 5;
  const result = calculateHealthStarRating(category);
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category.UnsweetenedFlavouredWater', t => {
  const category = Category.UnsweetenedFlavouredWater;

  const expectedRating = 4.5;
  const result = calculateHealthStarRating(category);
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category2 with resulting rating of 0.5', t => {
  const category = Category.OtherFoods;

  const expectedRating = 0.5;
  const result = calculateHealthStarRating(category, {
    saturatedFatGrams: 10.5, // 10
    sodiumMilligrams: 400, // 4
    totalSugarsGrams: 10.5, // 2
    energykJ: 3100, // 9
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category2 improved rating with fruit and vegetable content', t => {
  const category = Category.OtherFoods;

  const expectedRating = 1.5;
  const result = calculateHealthStarRating(category, {
    saturatedFatGrams: 10.5, // 10
    sodiumMilligrams: 400, // 4
    totalSugarsGrams: 10.5, // 2
    energykJ: 3100, // 9
    attributes: [Attributes.ContainsFruitOrVegetable],
    percentageFruitVegetableNutLegume: 90, // -7
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category2 not improved rating with protein content due to high baseline points', t => {
  const category = Category.OtherFoods;

  const expectedRating = 0.5;
  const result = calculateHealthStarRating(category, {
    saturatedFatGrams: 10.5, // 10
    sodiumMilligrams: 400, // 4
    totalSugarsGrams: 10.5, // 2
    energykJ: 3100, // 9
    proteinGrams: 12, // 0
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category2 improved rating with protein content and high baseline points due to FVNL content', t => {
  const category = Category.OtherFoods;

  const expectedRating = 2;
  const result = calculateHealthStarRating(category, {
    saturatedFatGrams: 10.5, // 10
    sodiumMilligrams: 400, // 4
    totalSugarsGrams: 10.5, // 2
    energykJ: 3100, // 9
    proteinGrams: 12, // -7
    attributes: [Attributes.ContainsFruitOrVegetable],
    percentageFruitVegetableNutLegume: 67, // -5
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category2 with 3 star rating', t => {
  const category = Category.OtherFoods;

  const expectedRating = 3; // 3-6
  const result = calculateHealthStarRating(category, {
    saturatedFatGrams: 1.5, // 1
    sodiumMilligrams: 200, // 2
    totalSugarsGrams: 5.3, // 1
    energykJ: 300, // 0
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category2 improved rating with protein content with low baseline points', t => {
  const category = Category.OtherFoods;

  const expectedRating = 4; // -6 -- -2
  const result = calculateHealthStarRating(category, {
    saturatedFatGrams: 1.5, // 1
    sodiumMilligrams: 200, // 2
    totalSugarsGrams: 5.3, // 1
    energykJ: 300, // 0
    proteinGrams: 12, // -7
  });
  t.is(result, expectedRating);
});


test('calculateHealthStarRating - Category2 improved rating with fibre content', t => {
  const category = Category.OtherFoods;

  const expectedRating = 1.5;
  const result = calculateHealthStarRating(category, {
    saturatedFatGrams: 10.5, // 10
    sodiumMilligrams: 400, // 4
    totalSugarsGrams: 10.5, // 2
    energykJ: 3100, // 9
    fibreGrams: 7, // -7
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category2D with resulting rating of 1', t => {
  const category = Category.DairyFoods;

  const expectedRating = 1; // 11-12
  const result = calculateHealthStarRating(category, {
    totalSugarsGrams: 33, // 8
    energykJ: 1100, // 3
    sodiumMilligrams: 100, // 1
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category3 with resulting rating of 2.5', t => {
  const category = Category.FatsOilsAndSpreads;

  const expectedRating = 2.5; // 28-30
  const result = calculateHealthStarRating(category, {
    energykJ: 3100, // 9
    saturatedFatGrams: 7, // 6
    sodiumMilligrams: 400, // 4
    totalSugarsGrams: 45.1, // 10
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category1 with resulting rating of 4', t => {
  const category = Category.Jellies;

  const expectedRating = 4; // <= 0
  const result = calculateHealthStarRating(category, {
    energykJ: 0, // 1
    saturatedFatGrams: 7, // 0
    sodiumMilligrams: 400, // 0
    totalSugarsGrams: 0, // 0
    attributes: [Attributes.ContainsFruitOrVegetable],
    percentageFruitVegetableNutLegume: 25, // 1
  });
  t.is(result, expectedRating);
});

test('calculateHealthStarRating - Category1 with resulting rating of 3.5', t => {
  const category = Category.NonDairyBeverages;

  const expectedRating = 3.5; // 1
  const result = calculateHealthStarRating(category, {
    energykJ: 0, // 1
    saturatedFatGrams: 7, // 0
    sodiumMilligrams: 400, // 0
    totalSugarsGrams: 0, // 0
    attributes: [Attributes.ContainsFruitOrVegetable],
    percentageFruitVegetableNutLegume: 24, // 0
  });
  t.is(result, expectedRating);
});


test('calculateHealthStarRating - Unknown Category', t => {
  const category = null;

  t.throws(() => {
    calculateHealthStarRating(category);
  }, { instanceOf: TypeError });
});

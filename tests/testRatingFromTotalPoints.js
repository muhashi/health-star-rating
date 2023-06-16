import test from 'ava';
import { Category, ratingFromTotalPoints } from '../index.js';

test('ratingFromTotalPoints - Category1 with totalPoints within range', t => {
  const category = Category.NonDairyBeverages;
  const totalPoints = 7;

  const expectedRating = 2;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category1 with totalPoints below range', t => {
  const category = Category.NonDairyBeverages;
  const totalPoints = -1;

  const expectedRating = 4;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category1 with totalPoints above range', t => {
  const category = Category.NonDairyBeverages;
  const totalPoints = 12;

  const expectedRating = 0.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category1D with totalPoints within range', t => {
  const category = Category.DairyBeverages;
  const totalPoints = 4;

  const expectedRating = 2;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category1D with totalPoints below range', t => {
  const category = Category.DairyBeverages;
  const totalPoints = -2;

  const expectedRating = 5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category1D with totalPoints above range', t => {
  const category = Category.DairyBeverages;
  const totalPoints = 7;

  const expectedRating = 0.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category2 with totalPoints within range', t => {
  const category = Category.OtherFoods;
  const totalPoints = 4;

  const expectedRating = 3;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category2 with totalPoints below range', t => {
  const category = Category.OtherFoods;
  const totalPoints = -11;

  const expectedRating = 5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category2 with totalPoints above range', t => {
  const category = Category.OtherFoods;
  const totalPoints = 25;

  const expectedRating = 0.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category2D with totalPoints within range', t => {
  const category = Category.DairyFoods;
  const totalPoints = 3;

  const expectedRating = 3.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category2D with totalPoints below range', t => {
  const category = Category.DairyFoods;
  const totalPoints = -2;

  const expectedRating = 5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category2D with totalPoints above range', t => {
  const category = Category.DairyFoods;
  const totalPoints = 13;

  const expectedRating = 0.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category3 with totalPoints within range', t => {
  const category = Category.FatsOilsAndSpreads;
  const totalPoints = 25;

  const expectedRating = 3;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category3 with totalPoints below range', t => {
  const category = Category.FatsOilsAndSpreads;
  const totalPoints = 13;

  const expectedRating = 5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category3 with totalPoints above range', t => {
  const category = Category.FatsOilsAndSpreads;
  const totalPoints = 42;

  const expectedRating = 0.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category3D with totalPoints within range', t => {
  const category = Category.Cheese;
  const totalPoints = 37;

  const expectedRating = 1.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category3D with totalPoints below range', t => {
  const category = Category.Cheese;
  const totalPoints = 24;

  const expectedRating = 5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Category3D with totalPoints above range', t => {
  const category = Category.Cheese;
  const totalPoints = 40;

  const expectedRating = 0.5;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

test('ratingFromTotalPoints - Unknown Category', t => {
  const category = null;
  const totalPoints = 20;

  const expectedRating = null;
  const result = ratingFromTotalPoints(category, totalPoints);
  t.is(result, expectedRating);
});

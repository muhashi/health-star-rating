# health-star-rating

> Calculate the [ANZ health star rating](https://en.wikipedia.org/wiki/Health_Star_Rating_System) of food given nutritional information

## Install

```sh
npm install health-star-rating
```

## Usage

```js
import { Attributes, Category, calculateHealthStarRating } from 'health-star-rating';

calculateHealthStarRating(Category.DairyFoods, {
  totalSugarsGrams: 33,
  energykJ: 1100,
  sodiumMilligrams: 100,
  saturatedFatGrams: 0,
});
//=> 1

calculateHealthStarRating(Category.NonDairyBeverages, {
  energykJ: 0,
  saturatedFatGrams: 7,
  sodiumMilligrams: 400,
  totalSugarsGrams: 0,
  attributes: [Attributes.ContainsFruitOrVegetable],
  percentageFruitVegetableNutLegume: 25,
});
//=> 4

calculateHealthStarRating(Category.OtherFoods, {
  saturatedFatGrams: 10.5,
  sodiumMilligrams: 400,
  totalSugarsGrams: 10.5,
  energykJ: 3100,
  fibreGrams: 7,
});
//=> 1.5
```

## API

### calculateHealthStarRating(category, nutritionalInformation)

#### returns

One of the following values will be returned:
```
0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
```

#### category

Type: `Category`

These are the possible categories:
- `DairyBeverages`
- `DairyFoods`
  - *"This category does not include ice cream or alternatives derived from cereals, nuts or seeds. These products fall in [OtherFoods]."*
- `FatsOilsAndSpreads`
  - Includes: edible oil, edible oil spreads, margarine, butter
- `Cheese`
- `PlainWater`
- `UnsweetenedFlavouredWater`
  - May only contain -- carbon dioxide, flavouring substances (excluding sugar/sweeteners), mineral salts, safety/stability additives.
  - Must not include -- added sugars, sweeteners, colours, sodium, caffeine, quinine, or any other ingredient that contains energy.
- `UnprocessedFruitAndVegetables`
  - Includes: *"All whole fresh fruit (except coconut) and vegetables, fungi and legumes (except peanuts) as sold with no processing, plus these same products that have only been peeled, cut and/or surface treated and/or blanched and/or frozen (not dried), or canned without the addition of fat, sugars/sweeteners or salt."*
  - Excludes: canned fruit and vegetables in juice and brine 
- `NonDairyBeverages`
- `Jellies`
- `WaterBasedIcedConfection`
- `OtherFoods`: Any food that doesn't fit in the above categories.

#### nutritionalInformation

Type: `object`

Required keys:
- `energykJ` (`int`): kilojoule content of the food per 100g or 100ml
- `sodiumMilligrams` (`int`): sodium content in mg per 100g or 100ml
- `saturatedFatGrams` (`float`): saturated fat in grams per 100g or 100ml
- `totalSugarsGrams` (`float`): sugar content in grams per 100g or 100ml

Optional keys:
- `percentageFruitVegetableNutLegume` (`int`): Percentage from 0-100 of fruit, vegetable, nut or legume content. Improves the health star rating. Use with the `attributes` value set.
- `fibreGrams` (`float`): dietary fibre content in grams per 100g or 100ml. Improves health star rating
- `proteinGrams` (`float`): protein content in grams per 100g or 100ml. Improves health star rating
- `attributes` (`Attributes[]`): If the food contains either non-concentrated fruit/vegetable/nuts/legumes sources or concentrated fruits or vegetables. `percentageFruitVegetableNutLegume` must be set if using this

### `Attributes`

Possible values:
- `ContainsFruitOrVegetable`
- `ContainsNutsOrLegumes`

## Aknowledgement

The calculations and health star rating information is taken from the https://healthstarrating.gov.au website

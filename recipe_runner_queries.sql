-- FOR ALL QUERIES: a leading * denotes variables that will have data from node.js

-- RECIPES  
-- 1. Get all recipes to display in page's main table
SELECT * FROM `Recipes`;

-- 2. Add a new recipe
INSERT INTO `Recipes` (recipeTitle, recipeDescription, recipeServing)
VALUES (*recipeTitleInput, *recipeDescriptionInput, *recipeServingInput);

-- 3. Search for a recipe
SELECT * FROM `Recipes` WHERE * `recipeTitle` LIKE %*recipeTitleInput%;

-- 4. Delete a recipe
DELETE FROM `Recipes` WHERE `recipeID`=*recipeIDInput;


-- INGREDIENTS
-- 1. Get all ingredients for display in page's main table
SELECT * FROM `Ingredients`;

-- 2. Add a new ingredient
INSERT INTO `Ingredients` (ingredientName, price)
VALUES (*ingredientNameInput, *ingredientPriceInput);

-- 3. Update an existing ingredient
UPDATE `Ingredients` 
SET ingredientName=*ingredientNameInput, price=*ingredientPriceInput
WHERE ingredientID=*ingredientIDInput;


-- USERS
-- 1. Get all users for display in page's main table
SELECT * FROM `Users`;

-- 2. Add a new user
INSERT INTO `Users` (fName, lName, email, zipCode)
VALUES (*fNameInput, *lNameInput, *emailInput, *zipCodeInput);

-- 3. Update a user
UPDATE `Users`
SET fName=*fNameInput, lName=*lNameInput, email=*emailInput, zipCode=*zipCodeInput
WHERE customerID=*customerIDInput;


-- SHOPPING CARTS
-- 1. Get all shopping carts for display in page's main table with names from Users
SELECT cartID, customerID, fullName AS (fName, lName) FROM `ShoppingCarts`
JOIN `Users` ON `Users`.customerID = `ShoppingCarts`.customerID
GROUP BY cartID; 

-- 2. Add a new Shopping Cart
-- There will be validation in the program ensure customerID exists and doesn't already have a cart
INSERT INTO `ShoppingCarts` (cartID, customerID)
VALUES (*cartIDInput, *customerIDInput);


-- SELECTED RECIPES
-- 1. Get all selected recipes for display in page's main table
-- includes name of recipes and name of cart owner
SELECT cartID, fullName AS (fName, lName), recipeID, recipeTitle, quantity FROM `SelectedRecipes`
JOIN `ShoppingCarts` ON `ShoppingCarts`.cartID = `SelectedRecipes`.cartID
JOIN `Users` ON `Users`.customerID = `ShoppingCarts`.customerID
JOIN `Recipes` ON `Recipes`.recipeID = `SelectedRecipes`.recipeID
GROUP BY cartID;

-- 2. Add a new selected recipe (add a recipe to the cart)
-- backend validation to ensure a cartID and recipeID are valid
INSERT INTO `SelectedRecipes` (cartID, selectedRecipe, quantity)
VALUES (*cartIDInput, *selectedRecipeIDInput, *quantityInput);


-- RECIPE INGREDIENTS
-- 1. Get all recipe ingredients for display in page's main table
-- includes name of recipe and name of ingredient
SELECT recipeID, recipeTitle, ingredientID, ingredientName, quantity, uOm FROM `RecipeIngredients`
JOIN `Ingredients` ON `Ingredients`.ingredientID = `RecipeIngredients`.ingredientID
JOIN `Recipes` ON `Recipes`.recipeID = `RecipeIngredients`.recipeID
GROUP BY recipeID;

-- 2. Add ingredients to a recipe
-- backend validation to ensure valid recipe and ingredient IDS
INSERT INTO `RecipeIngredients` (recipeID, ingredientID, uOm, quantity)
VALUES (*recipeIDInput, *ingredientIDInput, *uOmInput, *quantityInput);
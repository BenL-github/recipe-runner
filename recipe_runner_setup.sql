--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
    `customerID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
    `cart` int(11) UNIQUE NOT NULL,
    `fName` varchar(255) NOT NULL,
    `lName` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `zipCode` int(5) NOT NULL,
    PRIMARY KEY (`customerID`),
    CONSTRAINT `Users_fk_1` FOREIGN KEY (`cart`) REFERENCES `ShoppingCarts` (`cartID`),
);

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
INSERT INTO `Users` VALUES 
    (1, 1, 'Timothy', 'Jan', 'jant@oregonstate.edu', 83854),
    (2, 2, 'Benny', 'Li', 'libenn@oregonstate.edu', 99999),
    (3, 3, 'Darth', 'Vader', 'vaderd@oregonstate.edu', 12345),
    (4, 4, 'Luke', 'Skywalker', 'skywalkerl@oregonstate.edu', 54321),
    (5, 5, 'Leia', 'Organa', 'organal@oregonstate.edu', 11111);
UNLOCK TABLES;

--
-- Table structure for table `ShoppingCarts`
--

DROP TABLE IF EXISTS `ShoppingCarts`;

CREATE TABLE `ShoppingCarts` (
    `cartID` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
    `cartOwner` int(11) UNIQUE NOT NULL,
    PRIMARY KEY (`cartID`),
    CONSTRAINT `ShoppingCarts_fk_1` FOREIGN KEY (`cartOwner`) REFERENCES `Users` (`customerID`),
);

--
-- Dumping data for table `ShoppingCarts`
-- Intersection table, no need to insert (?) 
-- Probably will need to test how this works
--

LOCK TABLES `ShoppingCarts` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `SelectedRecipes`
--

DROP TABLE IF EXISTS `SelectedRecipes`;

CREATE TABLE `SelectedRecipes` (
    `selectedCart` int(11) NOT NULL,
    `selectedRecipe` int(11) NOT NULL,
    `selectedQuantity` int(11) not NULL,
    PRIMARY KEY (`selectedCart`, `selectedRecipe`),
    CONSTRAINT `SelectedRecipes_fk_1` FOREIGN KEY (`selectedCart`) REFERENCES `ShoppingCarts` (`cartID`),
    CONSTRAINT `SelectedRecipes_fk_2` FOREIGN KEY (`selectedRecipe`) REFERENCES `Recipes` (`recipeID`),
);

-- 
-- Dumping data for table `SelectedRecipes`
--

LOCK TABLES `SelectedRecipes` WRITE;
INSERT INTO `SelectedRecipes` VALUES 
-- (cartID, recipeID, quantity)
    (1, 1, 15),
    (1, 2, 2),
    (2, 5, 1),
    (3, 4, 4),
    (4, 1, 2);
UNLOCK TABLES;

--
-- Table structure for table `Recipes`
--

DROP TABLE IF EXISTS `Recipes`;

CREATE TABLE `Recipes` (
    `recipeID` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
    `recipeTitle` varchar(255) NOT NULL,
    `recipeDescription` varchar(255) NOT NULL,
    `recipeServing` int(11) NOT NULL,
    PRIMARY KEY(`recipeID`),
);

-- 
-- Dumping data for table `SelectedRecipes`
--

LOCK TABLES `Recipes` WRITE;
INSERT INTO `Recipes` VALUES
    (1, 'Chicken Tikka Masala', 'Chicken breast simmered in fragrant red Indian curry', 4),
    (2, 'Beet Salad', 'Cubed boiled beets in balsamic dressing', 2),
    (3, "Grandma's Apple Pie", 'A classic American dessert - tastes like the holidays', 8),
    (4, 'Spicy Omelette', 'Southwestern style omelette with jalapenos and tomatoes', 2),
    (5, 'BLT Sandwich', 'The perfect sandwich when you need to get rid of old stuff in your fridge', 1);
UNLOCK TABLES;

--
-- Table structure for table `RecipeIngredients`
--

DROP TABLE IF EXISTS `RecipeIngredients`;

CREATE TABLE `RecipeIngredients`(
    `recipeID` int(11) NOT NULL,
    `ingredientID` int(11) NOT NULL,
    `uOm` varchar(255) NOT NULL,
    `ingredientQuantity` int(11) NOT NULL,
    PRIMARY KEY (`recipeID`, `ingredientID`)
    CONSTRAINT `RecipeIngredients_fk_1` FOREIGN KEY (`recipeID`) REFERENCES `Recipes` (`recipeID`),
    CONSTRAINT `RecipeIngredients_fk_2` FOREIGN KEY (`ingredientID`) REFERENCES `Ingredients` (`ingredientID`),
);

-- 
-- Dumping data for table `RecipeIngredients`
--

LOCK TABLES `RecipeIngredients` WRITE;
INSERT INTO `RecipeIngredients` VALUES
    -- Chicken Tikka Masala (1)
    (1, 1, '1lb breast', 2), 
    (1, 2, 'jar', 1), 
    (1, 3, 'tsp', 1), 
    (1, 4, 'tsp', 1), 
    -- Beet Salad (2)
    (2, 3, 'tsp', 1), 
    (2, 4, 'tsp', 1), 
    (2, 5, 'beet', 6), 
    (2, 6, 'bottle', 1), 
    -- Grandma's Apple Pie (3)
    (3, 7, 'apple', 6), 
    (3, 8, 'crust', 1), 
    (3, 9, 'tsp', 2), 
    (3, 10, 'scoop', 2),
    -- Spicy Omelette (4)
    (4, 3, 'tsp', 1), 
    (4, 4, 'tsp', 1), 
    (4, 11, 'egg', 3), 
    (4, 12, 'japapeno', 4),
    (4, 13, 'tomato', 1), 
    -- BLT Sandwich (5)
    (5, 12, 'tomato', 1), 
    (5, 13, 'strip of bacon', 3), 
    (5, 14, 'slice', 2), 
    (5, 15, 'tbsp', 1); 
UNLOCK TABLES;

--
-- Table structure for table `Ingredients`
--

DROP TABLES IF EXISTS `Ingredients`;

CREATE TABLE `Ingredients` (
    `ingredientID` int(11) UNIQUE NOT NULL,
    `ingredientName` varchar(255) NOT NULL,
    `price` DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (`ingredientID`),
);

-- 
-- Dumping data for table `Ingredients`
--

LOCK TABLES `Ingredients` WRITE;
INSERT INTO `Ingredients` VALUES
    (1, 'Chicken Breast', 4.99),
    (2, 'Tikka Masala Simmer Sauce', 6.99),
    (3, 'Salt', 2.99),
    (4, 'Black Pepper', 2.99),
    (5, 'Beet', 3.99),
    (6, 'Balsamic Dressing', 4.99),
    (7, 'Apple (Granny Smith)', 3.99),
    (8, 'Pie Crust', 6.99),
    (9, 'Cinnamon', 7.99),
    (10, 'Vanilla Ice Cream', 5.99),
    (11, 'Egg', 0.50),
    (12, 'Jalapeno', 0.99),
    (12, 'Tomato', 0.99),
    (13, 'Bacon', 3.99),
    (14, 'Whole Wheat Bread', 4.99),
    (15, 'Mayonnaise', 4.99);
UNLOCK TABLES;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS ShoppingCarts CASCADE;
DROP TABLE IF EXISTS SelectedRecipes CASCADE;
DROP TABLE IF EXISTS Recipes CASCADE;
DROP TABLE IF EXISTS Ingredients CASCADE;
DROP TABLE IF EXISTS RecipeIngredients CASCADE;
--
-- Table structure for table Users
--

CREATE TABLE IF NOT EXISTS Users (
     customerID  SERIAL NOT NULL UNIQUE ,
     fName  varchar(255) NOT NULL,
     lName  varchar(255) NOT NULL,
     email  varchar(255) NOT NULL,
     zipCode  integer NOT NULL,
    PRIMARY KEY ( customerID )
);

--
-- Dumping data for table  Users 
--


INSERT INTO  Users  VALUES 
    (1, 'Timothy', 'Jan', 'jant@oregonstate.edu', 83854),
    (2, 'Benny', 'Li', 'libenn@oregonstate.edu', 99999),
    (3, 'Darth', 'Vader', 'vaderd@oregonstate.edu', 12345),
    (4, 'Luke', 'Skywalker', 'skywalkerl@oregonstate.edu', 54321),
    (5, 'Leia', 'Organa', 'organal@oregonstate.edu', 11111);


--
-- Table structure for table  ShoppingCarts 
--

CREATE TABLE IF NOT EXISTS ShoppingCarts (
     cartID  integer UNIQUE NOT NULL ,
     customerID  integer UNIQUE NOT NULL,
    PRIMARY KEY ( cartID, customerID ),
    CONSTRAINT  ShoppingCarts_fk_1  FOREIGN KEY ( customerID ) REFERENCES  Users  ( customerID ) ON DELETE CASCADE
);

--
-- Dumping data for table  ShoppingCarts 
--

INSERT INTO ShoppingCarts  VALUES
    -- timothy
    (1, 1),
    -- benny
    (2, 2),
    -- vader
    (3, 3),
    -- luke
    (4, 4),
    -- leia
    (5, 5);


--
-- Table structure for table  Recipes 
--

CREATE TABLE IF NOT EXISTS Recipes (
     recipeID  SERIAL NOT NULL UNIQUE,
     recipeTitle  varchar(255) NOT NULL,
     recipeDescription  varchar(255) NOT NULL,
     recipeServing  integer NOT NULL,
    PRIMARY KEY( recipeID )
);

-- 
-- Dumping data for table  SelectedRecipes 
--

INSERT INTO  Recipes  VALUES
    (1, 'Chicken Tikka Masala', 'Chicken breast simmered in fragrant red Indian curry', 4),
    (2, 'Beet Salad', 'Cubed boiled beets in balsamic dressing', 2),
    (3, 'Grandma''s Apple Pie', 'A classic American dessert - tastes like the holidays', 8),
    (4, 'Spicy Omelette', 'Southwestern style omelette with jalapenos and tomatoes', 2),
    (5, 'BLT Sandwich', 'The perfect sandwich when you need to get rid of old stuff in your fridge', 1);



--
-- Table structure for table  SelectedRecipes 
--

CREATE TABLE IF NOT EXISTS SelectedRecipes (
     cartID  integer NOT NULL,
     recipeID  integer,
     quantity  integer NOT NULL,
     PRIMARY KEY ( cartID, recipeID ),
    CONSTRAINT  SelectedRecipes_fk_1  FOREIGN KEY ( cartID ) REFERENCES  ShoppingCarts  ( cartID ) ON DELETE CASCADE,
    CONSTRAINT  SelectedRecipes_fk_2  FOREIGN KEY ( recipeID ) REFERENCES  Recipes  ( recipeID ) ON DELETE CASCADE
);

-- 
-- Dumping data for table  SelectedRecipes 
--

INSERT INTO  SelectedRecipes  VALUES 
-- (cartID, recipeID, quantity)
    (1, 1, 15),
    (1, 2, 2),
    (2, 5, 1),
    (3, 4, 4),
    (4, 1, 2);


--
-- Table structure for table  Ingredients 
--

CREATE TABLE IF NOT EXISTS Ingredients (
     ingredientID  SERIAL UNIQUE NOT NULL,
     ingredientName  varchar(255) NOT NULL,
     price  DECIMAL NOT NULL,
    PRIMARY KEY ( ingredientID )
);

-- 
-- Dumping data for table  Ingredients 
--

INSERT INTO  Ingredients  VALUES
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
    (13, 'Tomato', 0.99),
    (14, 'Bacon', 3.99),
    (15, 'Whole Wheat Bread', 4.99),
    (16, 'Mayonnaise', 4.99);


--
-- Table structure for table  RecipeIngredients 
--

CREATE TABLE IF NOT EXISTS RecipeIngredients (
     recipeID  integer,
     ingredientID  integer NOT NULL,
     uOm  varchar(255) NOT NULL,
     quantity  integer NOT NULL,
     PRIMARY KEY ( recipeID, ingredientID )
    CONSTRAINT  RecipeIngredients_fk_1  FOREIGN KEY ( recipeID ) REFERENCES  Recipes  ( recipeID ) ON DELETE CASCADE,
    CONSTRAINT  RecipeIngredients_fk_2  FOREIGN KEY ( ingredientID ) REFERENCES  Ingredients  ( ingredientID ) ON DELETE CASCADE
);

-- 
-- Dumping data for table  RecipeIngredients 
--

INSERT INTO  RecipeIngredients  VALUES
    -- Chicken Tikka Masala (1)
    (1, 1, 'lb', 2), 
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
    (4, 12, 'jalapeno', 4),
    (4, 13, 'tomato', 1), 
    -- BLT Sandwich (5)
    (5, 13, 'tomato', 1), 
    (5, 14, 'strip', 3), 
    (5, 15, 'slice', 2), 
    (5, 16, 'tbsp', 1); 

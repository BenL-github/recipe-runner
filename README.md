# Recipe Runner

See the website here: https://recipe-runner.herokuapp.com

## About

Recipe Runner is a database management website for a (hypothetical)
application that stores thousands of recipes into a database. Clients
can select recipes that they would like to cook for the week, and 
the app makes grocery shopping easier by creating a grocery list out of 
their collection of recipes. 


## The Website

The Recipe Runner website is intended to be the administrative aspect 
of the application. On the website, you can manage client information,
the recipes they select, available recipes, and available ingredients. 

The website also contains a demo page to demonstrate Recipe Runner's
main function: constructing a grocery list out of a clients' list of 
chosen recipes. 

## Database Design

The database for RecipeRunner has been normalized to the 3rd normal form. 1NF requires that all values must be a non-divisible, atomic value. For example, if the “email” attribute from the Users table contained multiple emails, this would violate the first normal form. 2NF requires that a nonprime attribute (not part of a primary key) must not be dependent on any key. For example, it the “price” attribute was in the RecipeIngredients table, this would violate 2NF because the price is partially dependent on the ingredient. As you can see, price is in the Ingredients table in order to comply with 2NF. You may think that the “ingredient quantity” attribute being present in the RecipeIngredients table may violate 2NF, but the quantity of an ingredient is dependent on both the recipe and the ingredient. 3NF requires that no nonprime attributes are transitively dependent on any key. For example, because the attribute “ingredient name” in the Ingredients table is dependent on the ingredient ID, a third attribute called “ingredient category” would violate 3NF. This is because “ingredient category” would be dependent on “ingredient name,” which would be dependent on “ingredient id.” (I tried to come up with a good example using this database, but there are better examples of 3NF violation online)

Here is the entity relationship diagram:

![Entity Relationship Diagram](/recipe-runner/public/ERD.png?raw=true "Entity Relationship Diagram")

Here is the schema: 

![Schema](/recipe-runner/public/recipe-runner-schema.png?raw=true "Schema")

## Improvements

I think there can be some improvements in the UI. For example, the search bars and links are difficult to distinguish. Another issue with this website is the inconsistencies in the forms and search functionalities across the entities. Because I had recently learned JavaScript (at the time of completing the project), the code could also be cleaner, and the use of the React library may not be well optimized. I also think the attribute, “unit of measure,” could be its own table, so there would be no inconsistencies when entering in new RecipeIngredients. Lastly, the SELECT query for the demo does not aggregate ingredients with differing units of measure. Right now, it only combines if two different recipes use both the same ingredient and same units of measure. Overall, I am proud of the work I did on this project. Although this is a form of a CRUD website, I had to work with a lot of different facets of web development (React, Material UI, SQL). It was also incredible to work with TJ on this project in a completely remote setting!
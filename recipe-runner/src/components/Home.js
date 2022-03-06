import React from 'react'
import Hero from './Hero'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import { Container, Paper } from '@mui/material';

const post = {
    title: 'Welcome to RecipeRunner Admin!',
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    imageText: 'Groceries',
    author: 'Benny Li',
    author2: 'Timothy Jan'
};

const Home = () => {
    return (
        <>
            <Hero post={post} />
            <Accordion defaultExpanded="true" sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h5">About RecipeRunner</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>
                            This purpose of this website is to manage database entities for an imaginary application called “RecipeRunner.”
                            The pages for each entity (recipe, ingredient, users, etc.) provide basic CRUD functionality for the “RecipeRunner”
                            database. Additionally, there is a “demo” page located on the navbar which is used to demonstrate the overall
                            purpose of the “RecipeRunner” application. The front-end of this website uses the React.js and Material UI libraries,
                            while the back-end was developed using express.js and PostgreSQL. This website is the result of a database course
                            in Oregon State University, and the description of this imaginary application, “RecipeRunner,” is as follows:
                        </div>
                        <div>------------</div>
                        <div>
                            Wandering aimlessly through the grocery store wondering what to cook will be a thing of the
                            past thanks to the Recipe Runner App. A user can simply select what recipes they would like to
                            cook for the week and the application, driven by a robust database, will populate the user’s
                            shopping list with the minimum amount of ingredients necessary. No more buying more than
                            what you need or dealing with excess ingredients! The App showcases more than 1,000 recipes
                            curated by the finest culinary and home chefs and includes hundreds of ingredients! On
                            average, each recipe has at least 4 ingredients. The application will also include the estimated
                            cost of each recipe, based on the average cost of constituent ingredients in the user’s
                            geographic area. Recipe Runner makes life easier for thousands of households around the
                            United States.
                        </div>
                    </Typography>

                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5">Tables</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ marginBottom: 2 }}>
                        Before editing, the tables, please check out the 'About RecipeRunner'
                        section to have a general overview of the database. Thank you! :)
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                        <Link variant="subtitle1" href="recipes">Recipes:</Link>
                        &nbsp; Recipes that are available for users to chose from.
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                        <Link variant="subtitle1" href="ingredients">Ingredients</Link>
                        &nbsp; Ingredients that can be included in a recipe.
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                        <Link variant="subtitle1" href="users">Users</Link>
                        &nbsp; The users for this application.
                    </Typography>

                    <Typography sx={{ marginBottom: 2 }}>
                        <Link variant="subtitle1" href="users">ShoppingCarts</Link>
                        &nbsp; The shopping carts for each user. Each cart comprises of
                        the recipes the user chose for a week.
                    </Typography>

                    <Typography sx={{ marginBottom: 2 }}>
                        <Link variant="subtitle1" href="users">SelectedRecipes</Link>
                        &nbsp; The intersection table between a user's cart and the
                        recipes they chose.
                    </Typography>

                    <Typography>
                        <Link variant="subtitle1" href="users">RecipeIngredients</Link>
                        &nbsp; The intersection table between the many recipes and
                        ingredients.

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="h5">Database Design, Schema, & ERD</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>
                            I think that the database for RecipeRunner has been normalized to the 3rd normal form. 1NF
                            requires that all values must be a non-divisible, atomic value. For example, if the “email”
                            attribute from the Users table contained multiple emails, this would violate the first normal
                            form. 2NF requires that a nonprime attribute (not part of a primary key) must not be dependent
                            on any key. For example, it the “price” attribute was in the RecipeIngredients table, this
                            would violate 2NF because the price is partially dependent on the ingredient. As you can see,
                            price is in the Ingredients table in order to comply with 2NF. You may think that the
                            “ingredient quantity” attribute being present in the RecipeIngredients table may violate 2NF,
                            but the quantity of an ingredient is dependent on both the recipe and the ingredient. 3NF
                            requires that no nonprime attributes are transitively dependent on any key. For example,
                            because the attribute “ingredient name” in the Ingredients table is dependent on the ingredient
                            ID, a third attribute called “ingredient category” would violate 3NF. This is because
                            “ingredient category” would be dependent on “ingredient name,” which would be dependent on
                            “ingredient id.” (I tried to come up with a good example using this database, but there are
                            better examples of 3NF violation online)
                        </div>
                        <div>------------</div>
                        <div>
                            Below you will find the database schema and entity-relationship diagram (ERD) for
                            RecipeRunner.
                        </div>
                        <Paper
                            sx={{
                                position: 'relative',
                                backgroundColor: 'grey.800',
                                color: '#fff',
                                mb: 4,
                                width: 'inherit',
                                height: '400px',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundImage: `url(/recipe-runner-schema.png)`,
                            }}
                        />
                        <Paper
                            sx={{
                                position: 'relative',
                                backgroundColor: 'grey.800',
                                color: '#fff',
                                mb: 4,
                                width: '450px',
                                height: '800px',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundImage: `url(/ERD.png)`,
                            }}
                        />

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="h5">Reflection & Improvement</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        I think there can be some improvements in the UI. For example, the search bars and
                        links are difficult to distinguish. Another issue with this website is the inconsistencies
                        in the forms and search functionalities across the entities. Because I had recently learned
                        JavaScript (at the time of completing the project), the code could also be cleaner, and the
                        use of the React library may not be well optimized. I also think the attribute,
                        “unit of measure,” could be its own table, so there would be no inconsistencies when entering
                        in new RecipeIngredients. Lastly, the SELECT query for the demo does not aggregate ingredients 
                        with differing units of measure. Right now, it only combines if two different recipes use both
                        the same ingredient and same units of measure. Overall, I am proud of the work I did on this 
                        project. Although this is a form of a CRUD website, I had to work with a lot of different facets 
                        of web development (React, Material UI, SQL). It was also incredible to work with TJ on this 
                        project in a completely remote setting!
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Typography color="white" sx={{marginTop: 2}}>
                            Image Credit: @scottiewarman on Unsplash
                        </Typography>
        </>
    )
}

export default Home

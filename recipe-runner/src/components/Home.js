import React from 'react'
import Hero from './Hero'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';

const post = {
    title: 'Welcome to RecipeRunner Admin!',
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    imageText: 'Groceries',
    author: 'Made by Benny Li',
    author2: 'with help from Timothy Jan'
};

const Home = () => {
    return (
        <>
            <Hero post={post} />
            <Accordion sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h5">About RecipeRunner</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Saepe voluptas natus illum quos unde atque soluta doloremque
                        harum accusamus laudantium debitis nobis eligendi, iusto sunt
                        dolores fugiat dolore non. Sit!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Home

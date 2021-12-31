import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, FormControl, Select, TextField } from "@mui/material";
import Form from '../Form';
import axios from "axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }, 
    },
};

export default function AddRecipeIngredientForm(props) {
    const { baseURL } = props;
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [recipeid, setRecipeID] = useState();
    const [ingredientid, setIngredientID] = useState();
    const [uom, setUOM] = useState("");
    const [quantity, setQuantity] = useState(0);

    async function getData() {
        const [firstResponse, secondResponse] = await Promise.all([
            axios.get(baseURL + "recipes"),
            axios.get(baseURL + "ingredients")
        ]);
        setRecipes(firstResponse.data)
        setRecipeID(firstResponse.data[0].recipeid)
        setIngredients(secondResponse.data)
        setIngredientID(secondResponse.data[0].ingredientid)
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAdd = () => {
        axios({
            method: "POST",
            url: baseURL + "recipeingredients",
            data: {
                recipeid: recipeid,
                ingredientid: ingredientid,
                uom: uom,
                quantity: quantity
            }
        })
            .then((res) => window.location.reload())
            .catch((err) => console.log(err))
    }

    return (
        <Form
            buttonLabel="Add"
            title="Add a New RecipeIngredient"
            text="Please enter a recipe, ingredient, uom, and quantity."
            submitAction={onAdd}
        >
            {/* Select recipe */}
            <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel id="add-recipe-label">Recipe</InputLabel>
                <Select
                    labelId="add-recipe-label"
                    label="RecipeID"
                    onChange={(e) => setRecipeID(e.target.value)}
                    value={recipeid}
                    MenuProps={MenuProps}
                >
                    {recipes.map((recipe) => (
                        <MenuItem key={recipe.recipeid} value={recipe.recipeid}>
                            {recipe.recipeid} - {recipe.recipetitle}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Select ingredient */}
            <FormControl fullWidth sx={{ my: 2 }}>

                <InputLabel id="add-ingredient-label">Ingredient</InputLabel>
                <Select
                    labelId="add-ingredient-label"
                    label="IngredientID"
                    onChange={(e) => setIngredientID(e.target.value)}
                    value={ingredientid}
                    MenuProps={MenuProps}
                >
                    {ingredients.map((ingredient) => (
                        <MenuItem key={ingredient.ingredientid} value={ingredient.ingredientid}>
                            {ingredient.ingredientid} - {ingredient.ingredientname}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Edit uom */}
            <TextField
                label="uom"
                type="text"
                onBlur={(e) => setUOM(e.target.value)}

                variant="standard"
                margin="dense"
                sx={{ paddingRight: 2 }}
                autoFocus
            />

            {/* Edit quantity */}
            <TextField
                label="quantity"
                type="number"
                onChange={(e) => setQuantity(e.target.value)}

                variant="standard"
                margin="dense"
                sx={{ paddingRight: 2 }}
                autoFocus
            />

        </Form>
    )
};
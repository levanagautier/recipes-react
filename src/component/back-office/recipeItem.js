import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientInput } from './ingredientInput';

export function RecipeItem () {
    const { id } = useParams();
    const [recipe, setRecipe] = useState();
    const [steps, setSteps] = useState([]);
    const [utensils, setUtensils] = useState([]);
    const [ingredients, setIngredients] = useState([])
    const units = ['', 'g', 'mg', 'l', 'cl', 'ml']

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:8080/recipes/${id}/`);
          const newRecipe = await response.json();
          setRecipe(newRecipe);
        };
      
        fetchData();
    }, [id]);

    useEffect(() => {
        if(recipe) {
            setSteps([])
            recipe.subRecipes.map(subrecipe => {
                for(const [index, step] of Object.entries(subrecipe.instructions)) {
                    setSteps(prevState => ([
                        ...prevState,
                        step
                    ]))
                }
            }
                
    
            )
            setIngredients(...recipe.subRecipes.map(subrecipe => {
                return (subrecipe.Ingredient.map(ingredient => {
                    return {
                        id : ingredient.id,
                        name: ingredient.name,
                        qty: ingredient["subrecipes-ingredients"].qty,
                        unit: ingredient["subrecipes-ingredients"].unit,
                        prepNotes: ingredient["subrecipes-ingredients"].prepNotes,
                    }
                }
    
                   ))
            }))

            setUtensils(...recipe.subRecipes.map(subrecipe => {
        
                return subrecipe.Utensil.map(utensil => {
    
                    return {
                        id : utensil.id,
                        name: utensil.name    
                    }
    
                }
                    
                   )
            }))
        }
    }, [recipe])

    useEffect(() => {
        console.log(steps)
    }, [steps])

    useEffect(() => {
        console.log(ingredients)
    },[ingredients])

    useEffect(() => {
        console.log(utensils)
    },[utensils])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/recipes/${id}/`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*"
            },
            "body":JSON.stringify( {
                "title": recipe.title
            })
        }).then(console.log)


        /*

        1°) fetch (POST)
        2°) then (200) => pop-in (up?)
        3°) catch (403, 400) => affiche le message de l'API

        */
    }

    const handleTitleChange = (e) => {
        setRecipe(prevState => ({
            ...prevState,
            title: e.target.value
        }))
    }

    const handleIngQtyChange = (e, ingredientId) => {
        setIngredients(prevState => prevState.map(ingredient => {
            if(ingredient.id === ingredientId) {
                return {
                    ...ingredient,
                    qty: e.target.value
                }
            }
            return ingredient
        }))
       
    }

    const handleIngUnitChange = (e, ingredientId) => {
        e.preventDefault();
        setIngredients(prevState => prevState.map(ingredient => {
            if(ingredient.id === ingredientId) {
                return {
                    ...ingredient,
                    unit: e.target.value
                }
            }
            return ingredient
        }))        
    }

    const handleIngredientChange = ({target: {name, value}}, ingredientId) => {
        setIngredients(prevState => prevState.map(ingredient => {
            if(ingredient.id === ingredientId) {
                return {
                    ...ingredient,
                    [name]: value
                }
            }
            return ingredient
        }))
    }

    const addIngredient = () => {
        setIngredients(prevState => ([
            ...prevState,
            {}
        ]))
    }



    if (recipe) {
        return (
            <form onSubmit={handleSubmit} className='edit'>
                <h1><input type="text" value={recipe.title} name='recipe-title' onChange={handleTitleChange} /></h1>
                <input type="submit" value="Envoyer"/>

                {recipe.subRecipes.map(subrecipe => (
                    <section>
                        <details className='ingredients__list'>
                            <summary>Ingrédients {subrecipe.title}</summary>
                            <ul>
                            {ingredients.length > 0 && ingredients.map(ingredient => (
                                
                                <IngredientInput {...ingredient} handleIngredientChange={handleIngredientChange} />
                            ))}
                            </ul>
                        </details>
                        <button type='button' onClick={addIngredient}>Ajouter un ingredient</button>

                        <details className='utensils__list'>
                            <summary>Ustensiles {subrecipe.title}</summary>
                            <ul>
                            {subrecipe.Utensil.map(utensil => (
                                <li>{utensil.name}</li>
                            ))}
                            </ul>
                            <button type='button'>Ajouter un ustensile</button>
                        </details>

                        <article className='instructions__list'>
                            <h3>Instructions</h3>
                            {steps.map((step, index) => (
                            <div>
                                <p>étape {index +1}</p>
                                <p>{step}</p>
                            </div>
                            ))}
                            <button type='button'>Ajouter une étape</button>
                        </article>
                    </section>
                    ))
                }
            </form>
        );
    } else {
        return null;
    }
}
import React, { Component } from 'react';
import Recipe from './Recipe';
import { Button, Well, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.state = { 
      // Simple implementation of data persistence with local storage and only one 
      // line in componentWillUpdate
      recipes: JSON.parse(localStorage.getItem('recipes')) || this.props.recipes,
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    let recipes = this.state.recipes;
    recipes.push({ [this.recipe.value]: this.ingredients.value.split(',') })
    this.close();
    this.setState({ recipes });
  }

  deleteRecipe(index) {
    let recipes = this.state.recipes;
    recipes.splice(index, 1);
    this.setState({ recipes });
  }

  editRecipe(index, name, ingredients) {
    let recipes = this.state.recipes;
    recipes[index] = { [name]: ingredients };
    this.setState({ recipes });
  }

  componentWillUpdate() {
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  render() {
    const { recipes } = this.state;
    return (
      <div className="App">
        <div>
          <h1 id="title">Recipes</h1>
          <div className="mainWrap">
            <Well>
              {
                this.state.recipes.map(item => 
                  <Recipe
                    key={recipes.indexOf(item)}
                    index={recipes.indexOf(item)}
                    details={item}
                    recipes={this.state.recipes}
                    deleteRecipe={this.deleteRecipe}
                    editRecipe={this.editRecipe}
                  />
                )
              }
            </Well>
          <Button bsStyle="primary" className="buttonAdd" onClick={this.open}>Add Recipe</Button>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Add a Recipe</Modal.Title>
          </Modal.Header>
          <form ref={(input) => this.recipeForm = input} className="recipeForm" onSubmit={(e) => this.handleSubmit(e)}>
            <Modal.Body>
                <FormGroup controlId="addRecipeForm">
                  <ControlLabel>Recipe</ControlLabel>
                  <FormControl 
                    type="text"
                    placeholder="Recipe"
                    inputRef={(ref) => { this.recipe = ref }}            
                  />       
                  <ControlLabel>Ingredients</ControlLabel>        
                  <FormControl 
                    componentClass="textArea"
                    placeholder="Ingredients (seperated by commas)"
                    inputRef={(ref) => { this.ingredients = ref }}            
                  /> 
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" type="submit">Add Recipe</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

// Default Recipes
App.defaultProps = {
  recipes: [
    { 'fried badger': [ '1 badger', 'hot sauce', 'red peppers' ] },
    { 'Squirel burger': ['squirel knees', 'pickles', 'special sauce'] },
    { 'Example recipe': ['Ingredient 1', 'Ingredient2 ', 'Ingredient 3', 'Ingredient 4'] }
  ]
}

export default App;

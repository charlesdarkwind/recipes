import React, { Component } from 'react';
import Ingredient from './Ingredient';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Recipe extends Component {
	constructor(props) {
		super(props)
		this.close = this.close.bind(this);
    this.open = this.open.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			showModal: false
		};
	}

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

	openRecipe(name) {
	 	if(document.querySelector(`.${name}`)) { 	
	 		document.querySelector(`.${name}`).classList.toggle('active');
	 	}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.close();
		this.props.editRecipe(this.props.index, this.recipe.value, this.ingredients.value.split(','));
	}

  render() {
  	const { details, index } = this.props;
  	const name = Object.keys(details)[0];
  	const nameSplit = name.split(' ').join('');
    return (
    	<div className='recipeWrap'>
	      <div className="recipe" onClick={() => this.openRecipe(nameSplit)}>
	      	{ name }      	
	      </div>
	      <div className={`ingredients ${nameSplit}`} >
	      	<h3 className="ingredientsTit">Ingredients</h3>
	      	<hr/>
	      	<ul>
	      		{ 
	      			details[name].map((item, index) => <Ingredient class="item"    				
	      					key={ details[name][index] }
	      					name={ details[name][index] }
	      				/>)
	      		} 
	      	</ul>
	      	<hr/>
	      	
		      	<Button className="recipeButtons" bsStyle="danger" onClick={() => this.props.deleteRecipe(index)}>Delete</Button>
		      	<Button className="recipeButtons" onClick={this.open}>Edit</Button>
	      	
	      </div>
	      <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Edit a Recipe</Modal.Title>
          </Modal.Header>
            <form ref={(input) => this.recipeFormEdit = input} className="recipeFormEdit" onSubmit={(e) => this.handleSubmit(e)}>
		          <Modal.Body>
	              <FormGroup controlId="addRecipeForm">
	                <ControlLabel>Recipe</ControlLabel>
	                <FormControl 
	                  type="text"
	                  placeholder="Recipe"
	                  defaultValue={Object.keys(details)[0]}
	                  inputRef={(ref) => { this.recipe = ref }}            
	                />       
	                <ControlLabel>Ingredients</ControlLabel>        
	                <FormControl 
	                  componentClass="textArea"
	                  placeholder="Ingredients (seperated by commas)"
	                  defaultValue={details[Object.keys(details)].join(',')}
	                  inputRef={(ref) => { this.ingredients = ref }}            
	                /> 
	              </FormGroup>                    
		          </Modal.Body>
		          <Modal.Footer>
		          	<Button bsStyle="primary" type="submit">Edit Recipe</Button>
		          	<Button onClick={this.close}>Close</Button>      
		          </Modal.Footer>
          	</form>
        </Modal>
      </div>
    );
  }
}

export default Recipe;
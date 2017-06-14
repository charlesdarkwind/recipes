import React, { Component } from 'react';

class Ingredient extends Component {
  render() {
  	const { name } = this.props
    return (
    	<li className='ingredientItem'>
    		{ name }
      </li>
    );
  }
}

export default Ingredient;
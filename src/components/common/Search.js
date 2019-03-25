import React, { Component } from 'react';
import './Search.css';
import { handleResponse } from './../../helpers';
import Loading from './Loading';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			searchQuery: '',
			loading: false
		}
	}


	handleChange = (e) => {
		const searchQuery = e.target.value

		this.setState({ searchQuery : searchQuery })

		//If search query isn't present, don't send request to server
		if(!searchQuery) {
			return '';
		}

		this.setState({ loading: true })

		fetch(`https://api.udilia.com/coins/v1/autocomplete?searchQuery=${searchQuery}`)
		.then(handleResponse)
		.then((result) => {
			console.log(result)
			this.setState({ loading: false })
		})
	}


	render() {
		const { loading } = this.state;
		return (
			<div className="Search">
			<span className="Search-icon"/>
				<input
				className="Search-input" 
				type="text"
				placeholder="Currency name"
				onChange={this.handleChange}/>

				{loading &&
				<div className="Search-loading">
					<Loading 
						width="12px"
						height="12px"
					/>
				</div>}
			</div>
		)
	}
}

export default Search;
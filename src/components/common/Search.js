import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Search.css';
import { handleResponse } from './../../helpers';
import Loading from './Loading';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			searchResults: [],
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
			this.setState({ 
				loading: false,
				searchResults: result
			 })
		})
	}

	renderSearchResults = () => {
		const { searchResults, searchQuery, loading } = this.state;

		if(!searchQuery) {
			return '';
		}

		if(searchResults.length > 0) {
			return (
				<div className="Search-result-container">
					{searchResults.map(result => (
						<div key={result.id} className="Search-result"
						onClick={() => this.handleRedirect(result.id)}  >
							{result.name} ({result.symbol})
						</div>
					))}
				</div> 
			)
		}

		if(!loading) {
			return (
				<div className="Search-result-container">
					<div className="Search-no-result">
						No results found.
					</div>
				</div>
			)
		}
	}

	handleRedirect = (currencyId) => {
		this.setState({ 
			searchQuery: '',
			searchResults: []
		 })

		 this.props.history.push(`/currency/${currencyId}`)
	}


	render() {
		const { loading, searchQuery } = this.state;
		return (
			<div className="Search">
			<span className="Search-icon"/>
				<input
				className="Search-input" 
				type="text"
				placeholder="Currency name"
				onChange={this.handleChange}
					value={searchQuery}
				/>

				{loading &&
				<div className="Search-loading">
					<Loading 
						width="12px"
						height="12px"
					/>
				</div>}

				{this.renderSearchResults()}
			</div>
		)
	}
}

export default withRouter(Search);
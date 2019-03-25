import React, { Component } from 'react';
import { handleResponse } from './../../helpers';
import Loading from './../common/Loading';
import Table from './Table';
import Pagination from './Pagination';


class List extends Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			currencies: [],
			error: null,
			totalPages: 0,
			page: 1
		}
	}

	componentDidMount() {
		this.fetchCurrencies()
	}



	fetchCurrencies() {
		this.setState({ loading: true })

		const { page } = this.state;

		fetch(`https://api.udilia.com/coins/v1/cryptocurrencies?page=${page}&perPage=20`)
		.then(handleResponse)
		.then((data) => {
		  console.log('Success', data);
		  const { currencies, totalPages } = data;

		  this.setState({ currencies: currencies, totalPages: totalPages, loading: false })
		})
		.catch((error) => {
			this.setState({ error: error.message, loading: false })
		  console.log('Error', error);
		});
	}

	handlePaginationClick = (direction) => {
		let nextPage = this.state.page

		if(direction === 'next') {
			nextPage++;
		} else {
			nextPage--;
		}

		this.setState({ page: nextPage}, () => {
			this.fetchCurrencies()
		})
	}


	render() {
		const { loading, error, currencies, page, totalPages } = this.state;

		if(loading) {
			return <div className="loading-container"><Loading /></div>
		}

		if(error) {
			return <div className="error">{error}</div>
		}
		return (
			<div>
				<Table 
				currencies={currencies}
				/>

				<Pagination 
					page={page}
					totalPages={totalPages}
					handlePaginationClick={this.handlePaginationClick}
				/>
			</div>
		)
	}
}

export default List
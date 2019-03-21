import React, { Component } from 'react';
import {Form, Col, Button, Row} from 'react-bootstrap';
import Constants from '../../constants';

class SearchComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			providerValue: '',
			universityValue: '',
			subjectValue: '',
			childSubjectValue: '',
			previousSelectedDropDown: '',			
			sortedValue: '',
		}
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	//function to get course list for selected option
	//param: event of selected option, type is a form field selected
	//return: new course list array
	onChangeHandler(e,type) {
		const {previousSelectedDropDown} = this.state;
		this.setState({
			[e.target.name]: e.target.value,
			sortedValue : '',
		})

		if(type === 3) {
			this.props.onChangeHandler(e.target.value,type);
		}
		else {
			if(previousSelectedDropDown && previousSelectedDropDown !== e.target.name) {
				this.setState({
					[previousSelectedDropDown]: '',
				})
			}
			this.setState({
				previousSelectedDropDown: e.target.name,
				childSubjectValue: '',
			})
			this.props.onChangeHandler(e.target.value,type);
		}
	}

	//function to clear filter
	//return: api feteched arrray
	clearFilter() {
		this.setState({
			providerValue: '',
			universityValue: '',
			subjectValue: '',
			childSubjectValue: '',
			sortedValue: '',
		})
		this.props.clearFilter();
	}

	//function to sort based on next session date and length
	//param: event of sort by selected
	///return: new filtered array of course list
	onFilterChange(e) {
		if(e.target.value) {
			this.setState({
				[e.target.name]: e.target.value,
			})
			this.props.onChangeFilter(parseInt(e.target.value));
		}		
	}
	render() {
		const {providerList, universitiesList, subjectList, childSubjectList} = this.props;
		const {providerValue, universityValue, subjectValue, sortedValue, childSubjectValue} = this.state;
		const {provider, universities, subject, filterBy, clear, childSubject, sortBy, choose, nextSessionLast, nextSessionFirst, lengthHighest, lengthLowest} = Constants;
		const provideOptions = providerList.map((data,index) => <option key={index} value={data}>{data}</option>);
		const universitiesOptions = universitiesList.map((data,index) => <option key={index} value={data}>{data}</option>);
		const subjectOptions = subjectList.map((data,index) => <option key={index} value={data}>{data}</option>);
		const childSubjectOptions = childSubjectList.map((data,index) => <option key={index} value={data}>{data}</option>);
		
		return (
			<div className="border border-primary p-2">
			<Form>
				<Form.Row>
					<Col md={3}>
						<Form.Group as={Col} controlId="formProvider">
							<Form.Label><strong>{provider}</strong></Form.Label>
							<Form.Control as="select" value={providerValue} name="providerValue" onChange={(event) => this.onChangeHandler(event,0)}>
								<option value="">{choose}</option>
								{provideOptions}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group as={Col}  controlId="formUniversity">
							<Form.Label><strong>{universities}</strong></Form.Label>
							<Form.Control as="select" value={universityValue} name="universityValue" onChange={(event) =>this.onChangeHandler(event,1)}>
								<option value="">{choose}</option>
								{universitiesOptions}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={3}>
						<Form.Group as={Col} controlId="formSubject">
							<Form.Label><strong>{subject}</strong></Form.Label>
							<Form.Control as="select" value={subjectValue} name="subjectValue" onChange={(event) => this.onChangeHandler(event,2)}>
								<option value="">{choose}</option>
								{subjectOptions}
							</Form.Control>
						</Form.Group>
					</Col>
				</Form.Row>
				<hr/>
				<Form.Row>
					<Col md={3} xs={11}>
						<Form.Group as={Row} className="ml-2" controlId="formChildSubject">
							<Form.Label><strong>{filterBy} ({childSubject})</strong></Form.Label>
							<Form.Control as="select" value={childSubjectValue} name="childSubjectValue" onChange={(event) => this.onChangeHandler(event,3)}>
								<option value="">{choose}</option>
								{childSubjectOptions}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={1}></Col>
					<Col md={3} xs={11}>
						<Form.Group as={Row} className="ml-2" controlId="formChildSubject">
							<Form.Label><strong>{sortBy} </strong></Form.Label>
							<Form.Control as="select" value={sortedValue} name="sortedValue" onChange={(event) => this.onFilterChange(event)}>
								<option value="">{choose}</option>
								<option value="0">{nextSessionLast}</option>
								<option value="1">{nextSessionFirst}</option>
								<option value="2">{lengthHighest}</option>
								<option value="3">{lengthLowest}</option>
							</Form.Control>
						</Form.Group>
						</Col>
						<Col md={4}></Col>
						<Col md={1} className="m-auto">
							<Form.Group className="text-center pr-3">
								<Button onClick={this.clearFilter}>{clear}</Button>		
							</Form.Group>
						</Col>
					</Form.Row>
				</Form>
			</div>			
		);
	}
}

export default SearchComponent;

import React, { Component } from 'react';
import SearchComponent from '../SearchComponent';
import {getProviderList,getUniversitiesList,getSubjectList, getSortedDateAndNumberArray, getFilterCourseList, getSortedList, getChildSubjectList} from '../../utils';
import {Badge, Button, Row} from 'react-bootstrap';
import CardComponent from '../../components/Card';
import NavBarComponent from '../../components/NavBar';
import Constants from '../../constants';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiData: [],
			providerList: [],
			universitiesList: [],
			subjectList: [],
			childSubjectList: [],
			isLoading: true,
            error: null,
			filteredArray: [],
			totalCourseFound : 0,
			userCoursesFound: 0
		};
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
		this.onChangeFilter = this.onChangeFilter.bind(this);
	}

	componentDidMount() {
		const {endPointApi} = Constants;
		this.getCourseList(endPointApi);
	}

	//function to fetch endpoint api
	//param: url
	//return: json or error
	getCourseList(url) {
		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.getSelectOptions(data);
		})
		.catch(error => this.setState({ error, isLoading: false }));
	}

	//function to get provider, university, parent subject, child subject and sorted date json list
	//param: api data
	//retur: provider, university, parent subject, child subject and sorted date json list
	getSelectOptions(data) {
		const providerList = getProviderList(data);
		const universitiesList = getUniversitiesList(data);
		const subjectList = getSubjectList(data);
		const childSubjectList = getChildSubjectList(data);
		const sortedDateArray = getSortedDateAndNumberArray(data);

		this.setState({
			apiData : sortedDateArray,
			providerList: providerList,
			universitiesList: universitiesList,
			subjectList: subjectList,
			childSubjectList: childSubjectList,
			filteredArray: sortedDateArray,
			isLoading: false,
			totalCourseFound : sortedDateArray.length,
		});
	}

	//function to get course list for selected option
	//param: value selected by option, type is a form field selected
	//return: new course list array
	onChangeHandler(value,type) {
		if(value) {
			if(type === 3) {
				const { filteredArray } =  this.state;
				const filteredCourseList = getFilterCourseList(filteredArray,value,type);
				const childSubjectList = getChildSubjectList(filteredCourseList);
				this.setState({
					filteredArray: filteredCourseList,
					userCoursesFound: filteredCourseList.length,
					childSubjectList: childSubjectList,
					
				});
			}
			else {
				const { apiData } =  this.state;
				const filteredCourseList = getFilterCourseList(apiData,value,type);
				const childSubjectList = getChildSubjectList(filteredCourseList);
				this.setState({
					filteredArray: filteredCourseList,
					userCoursesFound: filteredCourseList.length,
					childSubjectList: childSubjectList,
				});
			}
		}		
	}

	//function to clear filter
	//return: api feteched arrray
	clearFilter() {
		const {apiData} = this.state;
		const childSubjectList = getChildSubjectList(apiData);
		this.setState({
			filteredArray: apiData,
			userCoursesFound: 0,
			childSubjectList: childSubjectList,
		});
	}
	//function to sort based on next session date and length
	//param: type of sort selected
	///return: new filtered array of course list
	onChangeFilter(type) {
		const { filteredArray } =  this.state;
		const sortedCourseList = getSortedList(filteredArray,type);
		this.setState({
			filteredArray: sortedCourseList,
			userCoursesFound: sortedCourseList.length,
		});
	}
	render() {
		const { totalCoursesFound, courseFoundBasedOnUserSearch } = Constants;
		const {providerList, universitiesList, subjectList, childSubjectList, filteredArray, totalCourseFound, userCoursesFound} = this.state;
		if (this.state.isLoading) {
			return (
			  <div className="custom-loading-text">
				Loading.....
			  </div>
			);
		}
		return (
			<div className="p-3">
				<NavBarComponent color="dark" variant="dark" title="React Assignment"/>
				<SearchComponent 
					providerList={providerList} 
					universitiesList={universitiesList} 
					subjectList={subjectList} 
					childSubjectList = {childSubjectList}
					onChangeHandler= {this.onChangeHandler}
					clearFilter = {this.clearFilter}
					onChangeFilter = {this.onChangeFilter}
				/>
				<Row className="m-3 ml-0 ">
			   		<Button variant="dark"className="mr-3 mb-2">
						{totalCoursesFound}:&nbsp;<Badge variant="light">{totalCourseFound}</Badge>
					</Button>
					<Button variant="dark" className="mb-2">
						{courseFoundBasedOnUserSearch}:&nbsp;<Badge variant="light">{userCoursesFound}</Badge>
					</Button>
			   </Row>
				<CardComponent filteredArray= {filteredArray}/>
			</div>
		);
	}
}

export default App;

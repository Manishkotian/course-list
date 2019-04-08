import React, { Component } from 'react';
import SearchComponent from '../SearchComponent';
import {getProviderList,getUniversitiesList,getSubjectList, getSortedDateAndNumberArray, getFilterCourseList, getSortedList, getChildSubjectList} from '../../utils';
import {Badge, Button, Row} from 'react-bootstrap';
import CardComponent from '../../components/Card';
import NavBarComponent from '../../components/NavBar';
import Constants from '../../constants';
import { connect } from 'react-redux'
import {setApiData, setProviderListData, setUniversityListData, setSubjectListData, setChildSubjectListData, 
	setFilteredArray, setTotalCourseFound, setUserCourseFound} from '../../reducer/action';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
            error: null,
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
		this.props.setApiData(sortedDateArray);
		this.props.setProviderListData(providerList);
		this.props.setUniversityListData(universitiesList);
		this.props.setSubjectListData(subjectList);
		this.props.setChildSubjectListData(childSubjectList);
		this.props.setFilteredArray(sortedDateArray);
		this.props.setTotalCourseFound(sortedDateArray.length);
		this.setState({
			isLoading: false,
		});
	}

	//function to get course list for selected option
	//param: value selected by option, type is a form field selected
	//return: new course list array
	onChangeHandler(value,type) {
		if(value) {
			if(type === 3) {
				const { filteredArray } =  this.props;
				const filteredCourseList = getFilterCourseList(filteredArray,value,type);
				const childSubjectList = getChildSubjectList(filteredCourseList);
				this.props.setFilteredArray(filteredCourseList);
				this.props.setUserCourseFound(filteredCourseList.length);
				this.props.setChildSubjectListData(childSubjectList);
			}
			else {
				const { apiData } =  this.props;
				const filteredCourseList = getFilterCourseList(apiData,value,type);
				const childSubjectList = getChildSubjectList(filteredCourseList);
				this.props.setFilteredArray(filteredCourseList);
				this.props.setUserCourseFound(filteredCourseList.length);
				this.props.setChildSubjectListData(childSubjectList);
			}
		}		
	}

	//function to clear filter
	//return: api feteched arrray
	clearFilter() {
		const {apiData} = this.props;
		const childSubjectList = getChildSubjectList(apiData);
		this.props.setFilteredArray(apiData);
		this.props.setUserCourseFound(0);
		this.props.setChildSubjectListData(childSubjectList);
	}
	//function to sort based on next session date and length
	//param: type of sort selected
	///return: new filtered array of course list
	onChangeFilter(type) {
		const { filteredArray } =  this.props;
		const sortedCourseList = getSortedList(filteredArray,type);
		this.props.setFilteredArray(sortedCourseList);
		this.props.setUserCourseFound(sortedCourseList.length);
	}
	render() {
		const { totalCoursesFound, courseFoundBasedOnUserSearch } = Constants;
		const {providerList, universitiesList, subjectList, childSubjectList, filteredArray, totalCourseFound, userCoursesFound} = this.props;
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
const mapStateToProps = state => {
	return {
		apiData: state.apiData,
		providerList: state.providerList,
		universitiesList: state.universitiesList,
		subjectList: state.subjectList,
		childSubjectList: state.childSubjectList,
		filteredArray: state.filteredArray,
		totalCourseFound: state.totalCourseFound,
		userCoursesFound: state.userCoursesFound,
	}
  }
  
  const mapDispatchToProps = dispatch => {
	return {
		setApiData: data => {
			dispatch(setApiData(data))
		},
		setProviderListData: data => {
			dispatch(setProviderListData(data))
		},
		setUniversityListData: data => {
			dispatch(setUniversityListData(data))
		},
		setSubjectListData: data => {
			dispatch(setSubjectListData(data))
		},
		setChildSubjectListData: data => {
			dispatch(setChildSubjectListData(data))
		},
		setFilteredArray: data => {
			dispatch(setFilteredArray(data))
		},
		setTotalCourseFound: data => {
			dispatch(setTotalCourseFound(data))
		},
		setUserCourseFound: data => {
			dispatch(setUserCourseFound(data))
		}
	}
  }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

import Constants from '../constants';
const initialState = {
    apiData: [],
    providerList: [],
    universitiesList: [],
    subjectList: [],
    childSubjectList: [],
    filteredArray: [],
    totalCourseFound : 0,
    userCoursesFound: 0
};

function CourseListReducer(state = initialState, action) {
    switch (action.type) {
    case Constants.SET_API_DATA:
        return {
            ...state,
            apiData :  action.payload,
        };
    case Constants.SET_PROVIDER_LIST_DATA:
        return {
            ...state,
            providerList :  action.payload,
        };
    case Constants.SET_UNIVERSITY_LIST_DATA:
        return {
            ...state,
            universitiesList :  action.payload,
        };
    case Constants.SET_SUBJECT_LIST_DATA:
        return {
            ...state,
            subjectList :  action.payload,
        };
    case Constants.SET_CHILD_SUBJECT_LIST_DATA:
        return {
            ...state,
            childSubjectList :  action.payload,
        };
    case Constants.SET_FILTERED_ARRAY:
        return {
            ...state,
            filteredArray :  action.payload,
        };
    case Constants.SET_TOTAL_COURSE_FOUND:
        return {
            ...state,
            totalCourseFound :  action.payload,
        };
    case Constants.SET_USER_COURSE_FOUND:
        return {
            ...state,
            userCoursesFound :  action.payload,
        };
    default:
        return state;
    }
}

export default CourseListReducer;
import Constants from '../constants';

export const setApiData = (data) => {
    return ({type:Constants.SET_API_DATA, payload:data});
};

export const setProviderListData = (data) => {
    return ({type:Constants.SET_PROVIDER_LIST_DATA, payload:data});
};

export const setUniversityListData = (data) => {
    return ({type:Constants.SET_UNIVERSITY_LIST_DATA, payload:data});
};

export const setSubjectListData = (data) => {
    return ({type:Constants.SET_SUBJECT_LIST_DATA, payload:data});
};

export const setChildSubjectListData = (data) => {
    return ({type:Constants.SET_CHILD_SUBJECT_LIST_DATA, payload:data});
};

export const setFilteredArray = (data) => {
    return ({type:Constants.SET_FILTERED_ARRAY, payload:data});
};

export const setTotalCourseFound = (data) => {
    return ({type:Constants.SET_TOTAL_COURSE_FOUND, payload:data});
};

export const setUserCourseFound = (data) => {
    return ({type:Constants.SET_USER_COURSE_FOUND, payload:data});
};





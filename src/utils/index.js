//function to get provider list
//param api data
//return provider list from api data
export const getProviderList = (apiData) => {
    const providerList =  apiData.filter( function(data) { 
        if(!data.Provider) {
            return false;
        }
        return true;
    }).map(function(data) {return data.Provider});
    const distinctProviderList = [...new Set(providerList)];
    return distinctProviderList;
}
//function to get university list
//param api data
//return university list from api data
export const getUniversitiesList = (apiData) => {
    const universitiesList =  apiData.filter(function(data){
        if(!data.Universities.Institutions) {
            return false;
        }
        return true;
    }).map(function (data) { return data.Universities.Institutions});
    const distinctUniversitiesList = [...new Set(universitiesList)];
    return distinctUniversitiesList;
}
//function to get parent subject list
//param api data
//return parent subject list from api data
export const getSubjectList = (apiData) => {
    const subjectList =  apiData.filter(function(data) { 
        if(!data['Parent Subject']) {
            return false;
        }
        return true;
    }).map(function(data) { return data['Parent Subject']});
    const distinctsubjectList = [...new Set(subjectList)];
    return distinctsubjectList;
}
//function to get child subject list
//param api data
//return child subject list from api data
export const getChildSubjectList = (apiData) => {
    const childSubjectList =  apiData.filter(function(data) { 
        if(!data['Child Subject']) {
            return false;
        }
        return true;
    }).map(function(data) { return data['Child Subject']});
    const distinctChildSubjectList = [...new Set(childSubjectList)];
    return distinctChildSubjectList;
}
//function to get sorted date and length list in correct format
//param api data
//return sorted list  of date and lengthfrom api data
export const getSortedDateAndNumberArray = (apiData) => {
    const newArray = apiData.map((data)=> {
        if( data['Next Session Date']) {
            data['Next Session Date'] = data['Next Session Date'].replace(/th|st|nd|rd|,|''/g,"");
        }
        else {
            data['Next Session Date'] = 'N/A';
        }        
        return data;
    }).map((data) => {
        if(!data.Length) {
            data.Length = 'N/A'
        }       
        return data;
    });
    return newArray;
}
//function to get filter array based on user selection of child subject
//param api data, value selected, type of option selected
//return filtered arary
export const getFilterCourseList = (CourseListArray, value,type) => {
    let filterArray
    if(type === 0) {
        filterArray = CourseListArray.filter(function(data) {
            if(data.Provider === value) {
                return data;
            }
            return false;
        });
        
    }
    else if(type === 1) {
        filterArray = CourseListArray.filter(function(data) {
            if(data.Universities.Institutions === value) {
                return data;
            }
            return false;
        });
        
    }
    else if(type === 2) {
        filterArray = CourseListArray.filter(function(data) {
            if(data['Parent Subject'] === value) {
                return data;
            }
            return false;
        });
    }
    else {
        filterArray = CourseListArray.filter(function(data) {
            if(data['Child Subject'] === value) {
                return data;
            }
            return false;
        });
    }
    return filterArray;
}
//function to get filter next session or length based on user selection
//param api data, type of option selected
//return filtered arary
export const getSortedList = (courseListArray,type) => {
    let sortedArray;
    if(type === 0) {
        sortedArray = courseListArray.sort(function(a,b) {
            if(Date.parse(b['Next Session Date'])) {
                return new Date(a['Next Session Date']) - new Date(b['Next Session Date']);
            }
            return -1;            
        });
    }
    else if(type === 1) {
        sortedArray = courseListArray.sort(function(a,b) {
            if(Date.parse(b['Next Session Date'])) {
                return new Date(b['Next Session Date']) - new Date(a['Next Session Date']);
            }
            return -1;            
        });
    }
    else if(type === 2) {
        sortedArray = courseListArray.sort(function(a,b) {
            if(!isNaN(b.Length)){
                return b.Length - a.Length;   
            }
            return -1; 
        });
    }
    else {
        sortedArray = courseListArray.sort(function(a,b) {
            if(!isNaN(b.Length)){
                return a.Length - b.Length;    
            }
            return -1;  
        }); 
    }
    return sortedArray;
}

export default {getProviderList,getUniversitiesList,getSubjectList, getChildSubjectList, getSortedDateAndNumberArray, getFilterCourseList, getSortedList};

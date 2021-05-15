const axios = require("axios")
lister = {}

/*
getSearchResults(str: keyword)            # search course on the current semester from the keyword
    # call wisc API to forward search query
    # return list in form of:
    courses: [
        {
            course_name: "COMP SCI 699"
            course_id: 69420,
        }
    ]
    
    getSections(str: course_id)
    # call wisc API to get sections details
    # return sth like
    {
        course_id: 69,
        sections: ["001", "002", "003"] 
        status: [OPEN, WAITLIST, CLOSED], 
        space: [69, 68, 67],
        enrolled: [68, 67, 66],
    }
    
    getCourseName(str: course_id)
*/
lister.getSearchResults = (req) =>{
    try{
    //for testing
    url = "https://enroll.wisc.edu/api/search/v1"
    payload = {
        'page': 1,  // scroll down == increase page
        'pageSize': 20, // display course per page
        'queryString': req.str,
        'selectedTerm': "1222",
        'sortOrder': "SCORE"
    }
    getResult = axios.get( url, payload )
    }
    catch{
        console.log("sdfsd")
    }
    return getResult

    //result: list of dict
}

lister.getSections = () => {

}

lister.getCourseName = () =>{

}


module.exports = lister;

//

/*
search courses
searching api: https://enroll.wisc.edu/api/search/v1

payload

page: 1  // scroll down == increase page
pageSize: 20 // display course per page
queryString: "comp sci"
selectedTerm: "1222" 
sortOrder: "SCORE"

result: list of dict

*/


/*
clicking the course to search discussion
https://public.enroll.wisc.edu/api/search/v1/enrollmentPackages/1222/266/004289
Request result: list of dict

```json
{'academicGroupCode': None,
 'advisoryPrerequisites': None,
 'allCrossListedSubjects': [],
 'approvedForTopics': False,
 'breadths': [],
 'catalogNumber': '1',
 'catalogPrintFlag': True,
 'catalogSort': '00001',
 'courseDesignation': 'B M E 1',
 'courseDesignationRaw': 'B M E 1',
 'courseId': '021182',
 'courseRequirements': {'003698=': [22852]},
 'creditRange': '1',
 'currentlyTaught': True,
 'description': 'Work experience which combines classroom theory with '
                'practical knowledge of operations providing a background upon '
                'which to base a professional career in industry. Enroll Info: '
                'None',
 'enrollmentPrerequisites': 'Sophomore standing',
 'ethnicStudies': None,
 'firstTaught': '1004',
 'foreignLanguage': None,
 'fullCourseDesignation': 'BIOMEDICAL ENGINEERING 1',
 'fullCourseDesignationRaw': 'BIOMEDICAL ENGINEERING 1',
 'generalEd': None,
 'gradCourseWork': None,
 'gradingBasis': {'code': 'OPT', 'description': 'Student Option'},
 'honors': None,
 'instructorProvidedContent': None,
 'lastTaught': '1214',
 'lastUpdated': 1619161777625,
 'lettersAndScienceCredits': None,
 'levels': [],
 'matched_queries': None,
 'maximumCredits': 1,
 'minimumCredits': 1,
 'openToFirstYear': False,
 'repeatable': 'Y',
 'subject': {'departmentOwnerAcademicOrgCode': 'E0435',
             'departmentURI': 'http://www.engr.wisc.edu/department/bme/',
             'description': 'BIOMEDICAL ENGINEERING',
             'footnotes': ['Paul Campagnola, Chair, 2130 Engineering Centers '
                           'Bldg, 608-263-4660\n'
                           '\n'
                           'BME Course Options - Please see UW Guide - '
                           'http://guide.wisc.edu/courses/b_m_e/\n'
                           '\n'
                           'For BME course schedule, enrollment and waitlist '
                           'information, please use MyUW Course Search & '
                           'Enroll system for specific term you are looking '
                           'for enrollment in. \n'
                           '\n'
                           'Enrollment Help Desk:  '
                           'https://registrar.wisc.edu/enrollhelp/\n'
                           '\n'
                           'For authorization or enrollment problems please '
                           'email:  bme-enrollment@engr.wisc.edu\n'
                           '\n'
                           'Most BME classes are restricted to BME undergrad, '
                           'or grad students until Monday, January 11 @ 12:00 '
                           'pm. Non-BME students after this date for '
                           'authorization or enrollment problems please '
                           'email:  bme-enrollment@engr.wisc.edu'],
             'formalDescription': 'BIOMEDICAL ENGINEERING',
             'graduateCatalogURI': 'http://guide.wisc.edu/graduate/biomedical-engineering/',
             'schoolCollege': {'academicGroupCode': 'EGR',
                               'academicOrgCode': 'E',
                               'formalDescription': 'Engineering, College of',
                               'schoolCollegeURI': 'http://www.engr.wisc.edu/',
                               'shortDescription': 'Engineering',
                               'uddsCode': None},
             'shortDescription': 'B M E',
             'subjectCode': '207',
             'termCode': '1214',
             'uddsFundingSource': 'A1942',
             'undergraduateCatalogURI': 'http://guide.wisc.edu/undergraduate/engineering/biomedical-engineering/'},
 'subjectAggregate': 'BIOMEDICAL ENGINEERING 207',
 'sustainability': None,
 'termCode': '1214',
 'title': 'Cooperative Education Program',
 'titleSuggest': {'input': ['Cooperative Education Program'],
                  'payload': {'courseId': '021182'}},
 'topics': [],
 'typicallyOffered': 'Fall, Spring, Summer',
 'workplaceExperience': {'code': 'EXPR',
                         'description': 'Workplace Experience Course'}}

*/

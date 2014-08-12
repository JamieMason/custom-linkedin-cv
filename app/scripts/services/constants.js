'use strict';
/**
 * @username the profile to retrieve from the api
 * @apiKey your api key
 * @scope permissions needed for api calls
 */

angular.module('linkedoutApp')
    .constant('LinkedInConfig', {
        username: '', /**change this to the profile name you want to fetch*/
        apiKey: '', /** get an api key from developers.linkedin.com */
        lang: 'en-US',
        authorize: 'true',
        scope: 'r_basicprofile r_emailaddress r_fullprofile r_network rw_groups'
    })
    .constant('COMMON', {
        months: {
            '1': 'January',
            '2': 'February',
            '3': 'March',
            '4': 'April',
            '5': 'May',
            '6': 'June',
            '7': 'July',
            '8': 'August',
            '9': 'September',
            '10': 'October',
            '11': 'November',
            '12': 'December'
        }
    });
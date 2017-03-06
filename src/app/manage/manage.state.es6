const dataStore = require('../library/datastore');

export default {
    url: '/manage?dbRecords',
    component: 'manage',
    params: {
        dbRecords: []
    },
    resolve: {
        dbRecords: () => {
            return dataStore.find({}); 
        }
    }
}
// export default {
//     url: '/create?capsuleid',
//     component: 'create',
//     params: {
//         capsuleid: ""
//     },
//     resolve: {
//         capsuleid: function($transition$) {
//             return $transition$.params().capsuleid
//         }
//     }
// }
export default {
    url: '/directory?capsuleid',
    component: 'directory',
    params: {
        capsuleid: ""
    },
    resolve: {
        capsuleid: function($transition$) {
            return $transition$.params().capsuleid
        }
    }
}
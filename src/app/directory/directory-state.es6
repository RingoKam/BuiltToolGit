export default {
    url: '/directory?capsuleid',
    component: 'directory',
    params: {
        capsuleid: "234"
    },
    resolve: {
        capsuleid: ($transition$) => $transition$.params().CapsuleId
    }
}
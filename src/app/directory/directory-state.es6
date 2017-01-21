export default {
    url: '/:CapsuleId',
    component: 'directory',
    params: {
        CapsuleId: ""
    },
    Resolve: {
        CapsuleId: ($transition$) => console.log($transition$.params())
    }
}
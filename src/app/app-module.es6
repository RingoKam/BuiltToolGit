require('jquery');
require('jstree');
require('../Assets/css/card.css');
// require('../Assets/css/');

import 'angular';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import uiRouter from "angular-ui-router";
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import directory from './directory/directory-component';
import directoryController from './directory/directory-controller';

debugger;

angular
    .module('app', [
        angularMaterial,
        uiRouter
    ])
    .config(['$mdThemingProvider', '$stateProvider', function ($mdThemingProvider, $stateProvider) {
        
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {
                'default': 'A700'
            })
            .accentPalette('cyan',{
                'default': 'A400'
            });

        $stateProvider
            .state("directory", {
                url: '/:CapsuleId',
                component: 'directory',
                params: {
                    CapsuleId: ""
                },  
                Resolve: {

                }
            });
        
        // $urlRouteProvider.otherwise("/directory")
    }])
    .component("directory", directory)
    .controller("directoryController", directoryController)
// home.config();
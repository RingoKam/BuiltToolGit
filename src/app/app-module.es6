require('jquery');
require('jstree');
require('../Assets/css/card.css');
require('../Assets/css/gitcapsule.css');

import angular from 'angular';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import uiRouter from "angular-ui-router";
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
// import uiSelect from 'ui-select';
import directory from './directory/directory-component';
import directoryState from './directory/directory-state';
import capsule from './capsule/capsule.component';
import history from './history/history.component'
import createCapsule from './CreateCapsule/create-capsule.component';
import createSh from './CreateSh/create-sh.component';

angular
    .module('app', [
        angularMaterial,
        uiRouter,
    ])
    .config(['$mdThemingProvider', '$stateProvider', function ($mdThemingProvider, $stateProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {
                'default': 'A700'
            })
            .accentPalette('green', {
                'default': 'A400'
            });

        $stateProvider
            .state("directory", directoryState);

    }])
    .component("directory", directory)
    .component("capsule", capsule)
    .component("history", history)
    .component("createCapsule", createCapsule)
    .component("createSh", createSh)
    
// home.config();
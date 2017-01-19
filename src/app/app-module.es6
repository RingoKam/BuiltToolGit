require('jquery');
require('jstree');
require('../Assets/css/card.css');

import 'angular';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import angularUIRouter from 'angular-ui-router';
import angularJstree from './directive/jstree-directive';

import directory from './directory/directory-component';
import directoryController from './directory/directory-controller';

angular
    .module('app', [
        'ngMaterial'
    ])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                'default': '900'
            })
            .accentPalette('green');
    })
    .component("directory", directory)
    .controller("directoryController", directoryController)
// home.config();
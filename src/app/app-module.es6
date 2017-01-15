// Import angular
import 'angular';
// Material design css
import 'angular-material/angular-material.css';
// Icons
import 'font-awesome/css/font-awesome.css';
// Animation
import angularAnimate from 'angular-animate';
// Materail Design lib
import angularMaterial from 'angular-material';
// Router
import angularUIRouter from 'angular-ui-router';
// Our modules
// import home from './home/home.module';
// import sidenav from './sidenav/sidenav.module';

import directory from './directory/directory-component';

// angular
//     .module('app', [
//         angularMaterial,
//         angularAnimate,
//         angularUIRouter
//     ])

angular
    .module('app', [
        'ngMaterial',
    ])
    .component("directory", directory);

// home.config();
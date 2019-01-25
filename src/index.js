import * as angular from 'angular'
import uirouter from '@uirouter/angularjs'
import 'angular-material'
import '../node_modules/angular-material/angular-material.min.css'
import './app.scss'

import coreModule from './core/CoreModule'
import companyModule from './company/CompanyModule'

function config($uiRouterProvider, $mdThemingProvider, $stateProvider) {
  // Setup MD default theme
  $mdThemingProvider.theme('default')
    .primaryPalette('teal').dark()
    .accentPalette('blue-grey')
    .warnPalette('deep-orange')
  // .backgroundPalette('grey')

  // Setup MD light theme
  $mdThemingProvider.theme('light')
    .primaryPalette('red')

  // Setup MD dialog theme
  $mdThemingProvider.theme('dialog')
    .primaryPalette('teal')

  $stateProvider.state('main', {
    url: ''
  })

  const $urlService = $uiRouterProvider.urlService;
  $urlService.rules.otherwise({
    state: 'main'
  });
}

function run($transitions, $state) {
  $transitions.onSuccess({
    to: 'main'
  }, () => { 
    console.log('dafadsf')
    $state.go('company', { id: '' }) 
  })
}

const modules = [
  'ngMaterial',
  uirouter,
  coreModule.name,
  companyModule.name
]

export default angular
  .module('app', modules)
  .config(config)
  .run(run)
  .name
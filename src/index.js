import * as angular from 'angular'
import uirouter from '@uirouter/angularjs'
import 'angular-material'
import 'angular-messages'
import '../node_modules/angular-material/angular-material.min.css'
import './app.scss'

import coreModule from './core/CoreModule'
import companyModule from './company/CompanyModule'

import { ApiClient, DefaultApi } from 'frostberry-api'

/*@ngInject*/ function config($uiRouterProvider, $mdThemingProvider, $stateProvider) {
  ApiClient.instance.basePath = 'https://o59j9u2t0k.execute-api.eu-north-1.amazonaws.com/staging'
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

  // const $urlService = $uiRouterProvider.urlService;
  // $urlService.rules.otherwise({
  //   state: 'main'
  // });
}

/*@ngInject*/ function run($transitions, $state, $trace) {
  $trace.enable('TRANSITION');
  $transitions.onSuccess({
    to: 'main'
  }, () => { 
    $state.go('company', { id: '' }) 
  })
}

const modules = [
  'ngMaterial',
  'ngMessages',
  uirouter,
  coreModule.name,
  companyModule.name
]

export default angular
  .module('app', modules)
  .config(config)
  .run(run)
  .service('$api', () => new DefaultApi)
  .name
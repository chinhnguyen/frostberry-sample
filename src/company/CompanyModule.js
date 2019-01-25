import * as angular from 'angular'

import companiesView from './company.html'
import companiesCtrl from './CompanyCtrl'

function routes($stateProvider) {
  $stateProvider.state('company', {
    url: '/company/{id:[0-9]*}',
    controller: companiesCtrl.name,
    controllerAs: "$ctrl",
    template: companiesView,
    title: 'Companies',
    params: {
      id: {
        dynamic: true
      }
    }
  })
}

export default angular
  .module('app.company', [])
  .controller(companiesCtrl.name, companiesCtrl)
  .config(routes)

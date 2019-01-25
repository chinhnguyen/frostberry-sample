import * as angular from 'angular'

import companyMasterView from './company-master.html'
import companyMasterCtrl from './CompanyMaster'
import companyDetail from './CompanyDetail'

/*@ngInject*/ function routes($stateProvider) {
  $stateProvider.state('company', {
    url: '/company/{id:[0-9]*}',
    controller: companyMasterCtrl.name,
    controllerAs: "$ctrl",
    template: companyMasterView,
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
  .controller(companyMasterCtrl.name, companyMasterCtrl)
  .directive(companyDetail.name, () => new companyDetail.directive)
  .config(routes)

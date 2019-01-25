import { MasterCtrl } from '../core/wbMasterDetail/Master'
// import { StoreApi } from 'kiolyn-api' // TODO: change to AreaApi

class CompaniesController extends MasterCtrl {
  /*@ngInject*/ constructor($rootScope, $scope, $state, $timeout) {
    super($rootScope, $scope, $state, $timeout)
  }

  list(filters, params) {
    return Promise.resolve([
      {
        id: '123',
        name: 'Smarp Oy'
      },
      {
        id: '456',
        name: 'Frostberry Oy'
      },
    ])
  }
}

export default CompaniesController
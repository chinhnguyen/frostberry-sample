import { MasterCtrl } from '../core/wbMasterDetail/Master'
// import { StoreApi } from 'kiolyn-api' // TODO: change to AreaApi

class CompaniesController extends MasterCtrl {
  constructor($scope, $state, $timeout) {
    super($scope, $state, $timeout)
  }

  list(filters, params) {
    console.log(filters, params)
    return Promise.resolve([])
  }
}

export default CompaniesController
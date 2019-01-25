import { MasterCtrl } from '../core/wbMasterDetail/Master'
import { DefaultApi } from 'frostberry-api'

class CompaniesController extends MasterCtrl {
  /*@ngInject*/ constructor($rootScope, $scope, $state, $timeout) {
    super($rootScope, $scope, $state, $timeout)
  }

  async list(filters, params) {
    const api = new DefaultApi()
    return await api.getCompanies()
  }
}

export default CompaniesController
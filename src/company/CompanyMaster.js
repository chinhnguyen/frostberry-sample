import { MasterCtrl } from '../core/wbMasterDetail/Master'

class CompaniesController extends MasterCtrl {
  /*@ngInject*/ constructor($rootScope, $scope, $state, $timeout, $api) {
    super($rootScope, $scope, $state, $timeout)
    this.$api = $api
  }

  async list(filters, params) {    
    return await this.$api.getCompanies()
  }
}

export default CompaniesController
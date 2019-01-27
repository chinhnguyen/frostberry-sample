import * as angular from 'angular'
import { ngTableModule } from 'ng-table' 
import wbLoading from './wbLoading/WbLoading'
import wbDialog from './wbDialog/WBDialog'
import { MasterDirective, MasterAddButton, MasterReloadButton } from './wbMasterDetail/Master'
import { DetailDirective, DetailSaveButton, DetailDeleteButton, DetailCloseButton } from './wbMasterDetail/Detail'

export default angular
    .module('app.core', [
        ngTableModule.name, 
    ])
    .directive(wbLoading.name, () => new wbLoading.directive)
    .directive('masterDetail', () => new MasterDirective)
    .directive('masterAddButton', () => new MasterAddButton)
    .directive('masterReloadButton', () => new MasterReloadButton)
    .directive('wbDetail', () => new DetailDirective)
    .directive('detailSaveButton', () => new DetailSaveButton)
    .directive('detailDeleteButton', () => new DetailDeleteButton)
    .directive('detailCloseButton', () => new DetailCloseButton)    
    .service(wbDialog.name, wbDialog.service)

import {Component, OnInit} from "@angular/core";
import {DomainObjectPage} from "../../_common/domain-object/domain-object.page";

@Component({
    selector: 'attribute-detail',
    templateUrl: './detail.html',
    styleUrls: ['./detail.scss']
})
export class DetailAttributePage extends DomainObjectPage implements OnInit
{
    
    headerPageTitle: string = 'Detail Attribute';
    headerPageSecondaryActionButtonText: string = 'Cancel';

    onCancelBtnClick() {

    }

    getCancelBtnClickFunc() {
        
    }

    onEditBtnClicked() {

    }

    isEditBtnEnabled() {
        return true;
    }
}

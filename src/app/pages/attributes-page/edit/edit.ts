import {Component, OnInit} from "@angular/core";
import {DomainObjectPage} from "../../_common/domain-object/domain-object.page";

@Component({
    selector: 'attribute-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.scss']
})
export class EditAttributePage extends DomainObjectPage implements OnInit
{
    
    headerPageTitle: string = 'Edit Attribute';
    headerPageSecondaryActionButtonText: string = 'Cancel';
    
    onCancelBtnClick() {

    }

    getCancelBtnClickFunc() {
        
    }

    onSaveBtnClicked() {

    }

    isSaveBtnEnabled() {
        return true;
    }
}

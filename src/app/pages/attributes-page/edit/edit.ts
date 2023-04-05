import {Component, OnInit} from "@angular/core";
import {DomainObjectPage} from "../../_common/domain-object/domain-object.page";

@Component({
    selector: 'attribute-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.scss']
})
export class EditAttributePage extends DomainObjectPage implements OnInit
{
    onCancelBtnClick() {

    }

    onSaveBtnClicked() {

    }

    isSaveBtnEnabled() {
        return true;
    }
}

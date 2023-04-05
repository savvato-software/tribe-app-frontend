import {Component, OnInit} from "@angular/core";
import {DomainObjectPage} from "../../_common/domain-object/domain-object.page";

@Component({
    selector: 'attribute-detail',
    templateUrl: './detail.html',
    styleUrls: ['./detail.scss']
})
export class DetailAttributePage extends DomainObjectPage implements OnInit
{
    onCancelBtnClick() {

    }

    onEditBtnClicked() {

    }

    isEditBtnEnabled() {
        return true;
    }
}

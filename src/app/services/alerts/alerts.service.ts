import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    private toastr: ToastrService,
  ) {}

  public showSuccessMsg(title: string, msg: string) {
    this.toastr.success(title, msg, {
        positionClass: 'toast-bottom-right'
    })
  }

  public showErrorMsg(title: string, msg: string) {
    this.toastr.error(title, msg, {
        positionClass: 'toast-bottom-right'
    })
  }
}

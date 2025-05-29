import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage {

  errorToast: boolean = false;

  tableId: string = "";
  availableTables: string[] = [];

  constructor(private tokenService: TokenService, private sessionService: SessionService, private router: Router) { }

  ionViewWillEnter() {
    this.tableId = "";
    this.sessionService.getSession().subscribe(
      {
        next: response => {
          if (response.token) {
            this.tokenService.setToken(response.token);
          }
          if (response.table) {
            this.router.navigateByUrl("/menu");
          }
        }, error: _ => {
          this.router.navigateByUrl("/error");
        }
      }
    )

    this.sessionService.getAvailableTables().subscribe((response: any[]) => {
      this.availableTables = response.map(table => table.externalId);
    })
  }

  setTable() {
    this.sessionService.setSessionTable(this.tableId).subscribe(
      {
        next: response => {
          if (response.status == HttpStatusCode.NoContent) this.router.navigateByUrl("/menu");
        },
        error: _ => {
          this.handleTableError()
        }
      }
    );
  }

  public handleTableError(): void {
    this.tableId = "";
    this.errorToast = !this.errorToast;
  }

  async scanCode() {
    const result = await CapacitorBarcodeScanner.scanBarcode({hint: CapacitorBarcodeScannerTypeHint.QR_CODE, scanInstructions: "Scan the QR on your table"})
    this.tableId = result.ScanResult;
    this.setTable(); 
  }

}

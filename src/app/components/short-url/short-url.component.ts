import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  error: boolean;
  textError: string;

  constructor(
    private _clipboardService: ClipboardService,
    private _shortUrlService: ShortUrlService
  ) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.error = false;
    this.textError = '';
  }

  ngOnInit(): void {}

  copy() {
    this._clipboardService.copy(this.urlShort);
  }

  procesarUrl(): void {
    if (this.nombreUrl.trim() === '') {
      this.error = true;
      this.textError = 'Ingrese una URL';
      setTimeout(() => {
        this.error = false;
      }, 3000);
      return;
    }

    this.urlProcesada = false;
    this.loading = true;
    this.obtenerShortUrl();
  }

  obtenerShortUrl() {
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe(
      (data) => {
        setTimeout(() => {
          this.loading = false;
          this.urlShort = data.link;
          this.urlProcesada = true;
        }, 1500);
      },
      (error) => {
        this.loading = false;
        this.textError = 'URL invalida';
        this.error = true;
        this.nombreUrl = '';
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    );
  }
}

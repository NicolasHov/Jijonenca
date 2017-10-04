import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  fileList = [];

  constructor(private remoteService : RemoteServiceProvider) {
    this.getFiles();
  }

  getFiles() {
    this.remoteService.getFiles().subscribe((data) => {
      this.fileList = data;
    });
  }
}

import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  urlImageStorage : string[] = [];
  imageName : string[] = [];

  constructor(private route:Router, private afStorage : AngularFireStorage, public fotoService:FotoService) { }

  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  tampilkanData(){
    this.urlImageStorage=[];

    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
      .then((res)=>{
        res.items.forEach((itemRef)=>{
          itemRef.getDownloadURL().then(url=>{
            this.urlImageStorage.unshift(url);
            this.imageName.unshift(itemRef.name); //untuk nampung nama file
          });
        });
      }).catch((error)=>{
        console.log(error);
      });
  }
}

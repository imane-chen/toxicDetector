import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import * as Tesseract from 'tesseract.js';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  selectedImage: string;
  imageText: string;

  constructor(public navCtrl: NavController, private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    public progress: NgProgress) { }

  async selectSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    });
  }

  /*recognizeImage() {
    Tesseract.recognize(this.selectedImage)
    .progress(message => {
      if (message.status === 'recognizing text')
      this.progress.set(message.progress);
    })
    .catch(err => console.error(err))
    .then(result => {
      this.imageText = result.text;
    })
    .finally(resultOrError => {
      this.progress.complete();
    });
  }*/

  ngOnInit() {}

}

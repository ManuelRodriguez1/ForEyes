import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';
import { Data } from "../../../models/user.model";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  task: AngularFireUploadTask
  percentage: Observable<number>
  snapshot: Observable<any>
  downloadURL: Observable<string>

  imgsrc: any
  directory = ''
  list: any[]
  classVer = ''

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  ngOnInit() {
    return this.db.list('Images').snapshotChanges()
      .subscribe((data) => {
        this.list = []
        data.forEach((data: any) => {
          let x = data.payload.toJSON()
          x["$key"] = data.key
          this.list.push(x as Data)
        })
      })
  }
  //Funcion para subir las imagenes y los datos a la BD
  startUpload(event: FileList, folder: string) {
    this.classVer = ''
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('Unsopported file type');
    }
    //Direccion del archivo
    switch (folder) {
      case 'trivia':
        this.directory = 'Trivia'
        break;
      case 'daily':
        this.directory = 'DailyEyeCare'
        break;
      case 'fun':
        this.directory = 'FunFacts'
        break;
      case 'interactive':
        this.directory = 'InteractiveMoods'
        break;
    }
    //Directorio donde queda guardado el archivo
    const path = `${this.directory}/${new Date().getTime()}_${file.name}`;
    //Metadatos opcionales
    const customMetadata = { app: 'Images to ForEyes' };
    //Menu de la tarea
    this.task = this.storage.upload(path, file, { customMetadata });
    //Monitoreamos el progreso de subida
    this.percentage = this.task.percentageChanges()
    //Obtenemos el enlace de descarga de la imagen y la añadimos a la BD
    setTimeout(() => {
      //Obtenemos la url de descarga
      this.downloadURL = this.storage.ref('/' + path).getDownloadURL()
      //Transformamos la URL en un string para poderlo subir a la BD
      this.downloadURL.subscribe(url => {
        if (url) {
          this.imgsrc = url
          //Subimos a la BD
          firebase.database().ref('Images').push({
            url: path,
            date: new Date().getDate(),
            downloadURL: this.imgsrc
          })
        }
      })
      this.classVer = 'oculto'
    }, 2000);
  }
  //Funcion para el proceso de subida del archivo
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}

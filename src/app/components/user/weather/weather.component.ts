import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
// import { tap, finalize } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from "angularfire2/database";
import * as firebase from 'firebase';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  task: AngularFireUploadTask
  percentage: Observable<number>
  snapshot: Observable<any>
  downloadURL: Observable<string>

  imgsrc: any
  isHovering: boolean
  directory = '';
  state: boolean = false;

  list: any[]

  constructor(private storage: AngularFireStorage, private db: AngularFirestore,
  private afd: AngularFireDatabaseModule) { }

  ngOnInit() {
    //Consulta datos con RealTime Database
   
    // firebase.database().ref('Images').on('value', function(snapshot){
    //   console.log(snapshot.val())

    //   // snapshot.forEach(element => {
    //   //   console.log(element.val().downloadURL)
    //   // });
    //   // snapshot.forEach(data => {
    //   //   this.list.push({
    //   //     downloadURL: data.val().downloadURL
          
    //   //     // url: data.val().url
    //   //   })
    //   // })
    // })
    //Consulta datos con Cloud Firestore
    // this.db.collection('ImagesVideos').snapshotChanges()
    //   .subscribe((e) => {
    //     this.list = [];
    //     e.forEach((data: any) => {
    //       this.list.push({
    //         id: data.payload.doc.id,
    //         src: data.payload.doc.data()
    //       });
    //     })
    //   });
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList, folder: string) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsopported file type :(')
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
    const path = `${this.directory}/${new Date().getTime()}_${file.name}`
    //Metadatos opcionales
    const customMetadata = { app: 'Images to ForEyes' }
    //Menu de la tarea
    this.task = this.storage.upload(path, file, { customMetadata })
    
    //Reglas storage para cuando este logueado
    // write : if request.resource.contentType.matches('image/.*')
    //Monitoreando el progreso
    this.percentage = this.task.percentageChanges()
    setTimeout(() =>{
      this.downloadURL = this.storage.ref('/'+path).getDownloadURL()
      this.downloadURL.subscribe(url => {
        if(url){
          this.imgsrc = url
          console.log(this.imgsrc);

          // this.snapshot = this.task.snapshotChanges().pipe(
          //   tap(snap => {
          //     if (snap.bytesTransferred === snap.totalBytes) {
          //       this.db.collection('ImagesVideos').add({
          //         url: path,
          //         date: new Date(),
          //         downloadURL: this.imgsrc
          //       })
          //     }
          //   })
          // );

          firebase.database().ref('Images/').push({
            url: path,
            date: new Date(),
            downloadURL: this.imgsrc
          })

          console.log(this.imgsrc+" cargue");
        }
      })

    }, 1000) 
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}

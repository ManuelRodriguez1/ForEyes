import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

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

  isHovering: boolean
  directory = '';

  public list = []

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('ImagesVideos').snapshotChanges()
      .subscribe((e) => {
        this.list = [];
        e.forEach((data: any) => {
          this.list.push({
            id: data.payload.doc.id,
            src: data.payload.doc.data()
          });
        })
      });
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
      this.snapshot = this.task.snapshotChanges().pipe(
        tap(snap => {
          if (snap.bytesTransferred === snap.totalBytes) {
            this.db.collection('ImagesVideos').add({
              url: path,
              date: new Date(),
              downloadURL: this.downloadURL
            })
          }
        })
      )
    },1000)
    
    //La URL de descarga del archivo
    // this.downloadURL = this.task.downloadURL()    
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}

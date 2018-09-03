export class FirebaseUserModel{
    image: string;
    name: string;
    provider: string;

    constructor(){
        this.image = ""
        this.name = ""
        this.provider = ""
    }
}

export class Data{
    $key: string;
    url: string;
    downloadUrl: string;
}
import { Injectable } from '@nestjs/common';
import { FormDataDto } from './formDataDto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  validate(data : FormDataDto){
    let validationErrors = {};

    if(data.name == ""){
      validationErrors["name"] = "Név mező nem lehet üres.";
    }

    if(!data.email.includes("@") || data.email.split('@')[0].length == 0 || data.email.split('@')[1].length == 0){ // nem tudom, baj e hogy nem regexet használok, de a feladat nem kérte, és nekem ez szimpatikusabb
      validationErrors["email"] = "Érvénytelen e-mail cím.";
    }
    
    if(new Date() > new Date(data.date)){
      validationErrors["date"] = "A kiválasztott időpont érvénytelen";
    }

    if (data.numberOfGuests < 1 || data.numberOfGuests > 10) {
      validationErrors["numberOfGuests"] = "A vendégek számának 1 és 10 között kell lennie";
    }

    if (Object.keys(validationErrors).length > 0) {
      return {errors : validationErrors, result: false};
    }

    return { result: true }
  }
}

import { Injectable } from '@angular/core';
import { GenericService } from '../generic/generic.service';
import { Allergen } from 'src/app/interfaces/allergen';
import { AwsService } from '../aws/aws.service';

@Injectable({
  providedIn: 'root'
})
export class AllergenService extends GenericService<Allergen> {

  constructor(awsService: AwsService) {
    super(awsService);
  }

  getAllergens() {
    return this.getAll("allergens");
  }
}

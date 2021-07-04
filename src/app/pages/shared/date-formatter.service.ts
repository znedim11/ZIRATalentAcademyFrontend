import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateFormatterService {
  formatDateForChart(date: string) {
    return date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : null;
  }

  formatDate(date:string) {
    const dateToFormat = new Date(date);
    return dateToFormat.toLocaleDateString('en-GB'); // dd/mm/yyyy
  }

  formatInputDate(date:string){
    return date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : null;
  }

}

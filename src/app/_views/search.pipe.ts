import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], filterString: string): any {
    if (!items) {
      return [];
    }
    if (!filterString) {
      return items;
    }
    filterString = filterString.toLowerCase();

    return items.filter((item) => {
      return item[0].toLowerCase().includes(filterString);
    });
  }
}

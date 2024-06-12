import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(
    value: string,
    capitalizationMethod: 'allUpperCase' | 'onlyFirstLetterCase' | 'titleCase'
  ): string {
    if (!value) {
      return value;
    }
    switch (capitalizationMethod) {
      case 'allUpperCase':
        return value.toUpperCase();
      case 'onlyFirstLetterCase':
        const trimString = value.trim();
        return `${trimString[0].toUpperCase}${trimString.slice(1)}`;
      case 'titleCase':
        const splitString = value
          .split(' ')
          .map((s) => `${s[0].toUpperCase()}${s.slice(1)}`);
        return splitString.join(' ');
    }
  }
}

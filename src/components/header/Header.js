import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    toHTML() {
      return `
<label> <input type="text" class="input" value="Новая таблица"/></label>
<div class="">
<div class="button">
<i class="material-icons">delete</i>
</div>
<div class="button">
<i class="material-icons">exit_to_app</i>
</div>
</div>
`;
    }
}

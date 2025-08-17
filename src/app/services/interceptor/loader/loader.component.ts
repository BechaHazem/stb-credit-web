import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  protected loaderService = inject(LoaderService);

  isLoading: Subject<boolean> = this.loaderService.isLoading;

}

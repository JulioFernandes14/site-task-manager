import { Component } from '@angular/core';
import objetivos from '../../../public/data/objetivos.json'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  objetivos = objetivos
}

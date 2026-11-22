import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HomeComponent } from '../../pages/home/home.component';
import { RouterOutlet } from '@angular/router';
import { FaqAssistantComponent } from '../../shared/faq-assistant/faq-assistant.component';

@Component({
  selector: 'app-main-layout',
  imports: [   RouterOutlet,
    NavbarComponent,
    FooterComponent,
    FaqAssistantComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}

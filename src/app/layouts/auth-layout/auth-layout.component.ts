import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as fr from '@angular/common/locales/fr';


@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterOutlet,],
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.css',
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },  
    ],
})
export class AuthLayoutComponent {}

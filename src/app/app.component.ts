import {Component, computed, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {CustomSidenavComponent} from "./components/custom-sidenav/custom-sidenav.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent],
  template: `

    <mat-toolbar class="mat-elevation-z4">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <h2>Hello</h2>
            <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <router-outlet />


  `,
  styles: [`
    mat-toolbar {
      position: relative;
      z-index: 5;
    }
    .content {
    padding: 24px;
    }
    mat-sidenav-container {
      height: calc(100vh - 64px);
    }
  `],
})
export class AppComponent {

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')
}

import {Component, computed, Input, signal} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    NgOptimizedImage, MatListModule, MatIconModule, NgForOf, NgIf, RouterLink, RouterLinkActive,
  ],
  template: `
    <div class="sidenav-header">
      <img
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        src="assets/profile.jpg"
        alt="profile-image"
        border="3px solid #000"/>
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Meu Delírio</h2>
        <p>Bem-Vindo!</p>
      </div>
    </div>
    <!--    <hr>-->
    <mat-nav-list>
      <a mat-list-item class="menu-item"
         *ngFor="let item of menuItems()"
         [routerLink]="item.route"
         routerLinkActive="selected-menu-item"
         #rla="routerLinkActive"
         [activated]="rla.isActive"
      >
        <mat-icon [fontSet]="rla.isActive ? 'material-icons': 'material-icons-outlined'" matListItemIcon>{{ item.icon }}</mat-icon>
        <span matListItemTitle *ngIf="!sideNavCollapsed()">{{ item.label }}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    :host * {
      transition: all 500ms ease-in-out;
    }

    .sidenav-header {
      padding-top: 24px;
      text-align: center;

      > img {
        border-radius: 100%;
        object-fit: cover;
        margin-bottom: 10px;
      }

      .header-text {
        height: 3rem;

        > h2 {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5rem;
        }

        > p {
          margin: 0;
          font-size: 0.8rem;
        }
      }
    }

    .hide-header-text {
      opacity: 0;
      height: 0px;
    !important;
    }

    .menu-item {
      border-left: 5px solid;
      border-left-color: rgba(0, 0, 0, 0);
    }

    .selected-menu-item {
      border-left: 5px solid;
      border-left-color: blue;
      background: rgba(0,0,0,0.05);
    }
  `]
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'video_library',
      label: 'Content',
      route: 'content'
    },
    {
      icon: 'analytics',
      label: 'Analytis',
      route: 'analytics'
    },
    {
      icon: 'comment',
      label: 'Comment',
      route: 'comments'
    },
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}

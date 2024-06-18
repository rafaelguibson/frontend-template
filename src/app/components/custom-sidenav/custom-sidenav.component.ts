import {Component, computed, Input, signal} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

export type MenuItem = {
  icon: string;
  label: string;
  route:string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    NgOptimizedImage, MatListModule, MatIconModule, NgForOf
  ],
  template: `
    <div class="sidenav-header">
      <img [width]="profilePicSize()" [height]="profilePicSize()" src="assets/profile.jpg" alt="profile-image" border="3px solid #000"/>
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h2>Meu Delírio</h2>
        <p>Bem-Vindo!</p>
      </div>
    </div>
<!--    <hr>-->
    <mat-nav-list>
      <a mat-list-item *ngFor="let item of menuItems()">
        <mat-icon matListItemIcon>{{item.icon}}</mat-icon>
        <span matListItemTitle>{{item.label}}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
  .sidenav-header {
    padding-top: 24px;
    text-align: center;

    > img {
      border-radius: 100%;
      object-fit: cover;
      margin-bottom: 10px;
    }
    .header-text {
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
    .hide-header-text{
      opacity: 0;
    }
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

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32':'100');
}

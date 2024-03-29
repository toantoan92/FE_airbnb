import {Component, Input, OnInit} from '@angular/core';
import {Home} from '../../models/Home';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../../service/home.service';
import {Status} from '../../models/Status';
import {query} from '@angular/animations';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit {
  id: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private homeService: HomeService) {
    this.route.params.subscribe(
      result => {this.id = result.id; console.log(this.id) }
    );
  }
  home: Home;
  pageTitle = 'Home Detail';
  netImage: any = '../assets/img/house.jpg';
  isActive = false;
  changeActive(active: boolean) {
    this.isActive = active;
    console.log( "Active:" + this.isActive);
  }
  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getHome(id);
    }
  }
  getHome(id: number) {
    this.homeService.getHome(id).subscribe(
      result => this.home = result,
          error => console.log('Khong tim thay'));
  }

  onBack() {
    this.router.navigate(['/homes']);
  }
  editHome() {
    this.router.navigate(['/edit', this.home.id]);
  }

  deleteHome() {
    this.homeService.deleteHome(this.home.id).subscribe(
      result => { alert('Delete Home Success'),
        this.onBack();
      }
    );
  }
}

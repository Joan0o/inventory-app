import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass'
})
export class Navbar {
  @Input({ required: true }) link!: string;

  bolden_category: boolean = false;
  bolden_subcategory: boolean = false;
  bolden_users: boolean = false;
  bolden_products: boolean = false;

  ngOnInit() {
    if(this.link == "category")
      this.bolden_category = true;
    else if (this.link == "subcategory")
      this.bolden_subcategory = true;
    else if (this.link == "products")
      this.bolden_products = true;
    else if (this.link == "users")
      this.bolden_users == true;
  }
}

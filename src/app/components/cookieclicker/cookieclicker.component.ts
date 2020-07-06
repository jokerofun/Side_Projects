import { Component, OnInit } from '@angular/core';
import { CookieclickerService } from 'src/app/core/services/cookieclicker.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cookieclicker',
  templateUrl: './cookieclicker.component.html',
  styleUrls: ['./cookieclicker.component.css']
})
export class CookieclickerComponent implements OnInit {
  private loadProgressSub = new Subscription();

  constructor(private ccService: CookieclickerService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.autoIncrement();
  }

  cookies: number = 0;

  cursorUpgrades: number = 0;

  grandmasInterval: any;
  factoriesInterval: any;
  shipmentsInterval: any;
  wizardsInterval: any;

  grandmas: number = 0;
  grandmasCost: number = 10;
  factories: number = 0;
  factoriesCost: number = 50;
  shipments: number = 0;
  shipmentsCost: number = 200;
  wizards: number = 0;
  wizardsCost: number = 750;

  save() {
    let upgrades = {
      cursorUpgrades: {
        count: this.cursorUpgrades
      },
      grandma: {
        count: this.grandmas,
        cost: this.grandmasCost
      },
      factory: {
        count: this.factories,
        cost: this.factoriesCost
      },
      shipment: {
        count: this.shipments,
        cost: this.shipmentsCost
      },
      wizard: {
        count: this.wizards,
        cost: this.wizardsCost
      }
    }
    this.ccService.saveProgress({ cookies: this.cookies, upgrades });
    this.snackbar.open('Save Successful!', 'X', {
      duration: 3000
    });
  }

  load() {
    this.loadProgressSub = this.ccService.loadProgress().subscribe((data: any) => {
      this.cookies = data.cc.cookies;
      this.cursorUpgrades = data.cc.upgrades.cursorUpgrades.count;
      this.grandmas = data.cc.upgrades.grandma.count;
      this.grandmasCost = data.cc.upgrades.grandma.cost;
      this.factories = data.cc.upgrades.factory.count;
      this.factoriesCost = data.cc.upgrades.factory.cost;
      this.shipments = data.cc.upgrades.shipment.count;
      this.shipmentsCost = data.cc.upgrades.shipment.cost;
      this.wizards = data.cc.upgrades.wizard.count;
      this.wizardsCost = data.cc.upgrades.wizard.cost;
      this.loadProgressSub.unsubscribe();
      this.clearIntervals();
      this.autoIncrement();
      this.snackbar.open('Load Successful!', 'X', {
        duration: 3000
      });
    })
  }

  reset() {
    this.clearIntervals();
    this.cursorUpgrades = 0;
    this.cookies = 0;
    this.grandmas = 0;
    this.grandmasCost = 10;
    this.factories = 0;
    this.factoriesCost = 50;
    this.shipments = 0;
    this.shipmentsCost = 200;
    this.wizards = 0;
    this.wizardsCost = 750;
    this.snackbar.open('Reset Successful!', 'X', {
      duration: 3000
    });
  }

  clearIntervals() {
    clearInterval(this.grandmasInterval);
    clearInterval(this.factoriesInterval);
    clearInterval(this.shipmentsInterval);
    clearInterval(this.wizardsInterval);
  }

  autoIncrement() {
    if (this.grandmas > 0) {
      this.grandmasInterval = setInterval(() => this.cookies += 1 * this.grandmas, 3000);
    }
    if (this.factories > 0) {
      this.factoriesInterval = setInterval(() => this.cookies += 6 * this.factories, 5000);
    }
    if (this.shipments > 0) {
      this.shipmentsInterval = setInterval(() => this.cookies += 10 * this.shipments, 7500);
    }
    if (this.wizards > 0) {
      this.wizardsInterval = setInterval(() => this.cookies += 25 * this.wizards, 10000);
    }
  }

  increment() {
    this.cookies += 1 + (2 * this.cursorUpgrades);
  }

  buyCursor() {
    if(this.cookies >= 500) {
      this.cursorUpgrades += 1;
      this.cookies -= 500;
    } else alert('Not enough cookies!')
  }

  buyGrandma() {
    if (this.cookies >= this.grandmasCost) {
      this.grandmas += 1;
      this.clearIntervals();
      this.autoIncrement();
      this.cookies -= this.grandmasCost;
      this.grandmasCost += 5 + this.grandmas;
    } else alert('Not enough cookies!');
  }

  buyFactory() {
    if (this.cookies >= this.factoriesCost) {
      this.factories += 1;
      this.clearIntervals();
      this.autoIncrement();
      this.cookies -= this.factoriesCost;
      this.factoriesCost += 5 + (this.factories * 2);
    } else alert('Not enough cookies!');
  }

  buyShipment() {
    if (this.cookies >= this.shipmentsCost) {
      this.shipments += 1;
      this.clearIntervals();
      this.autoIncrement();
      this.cookies -= this.shipmentsCost;
      this.shipmentsCost += 5 + (this.shipments * 3);
    } else alert('Not enough cookies!');
  }

  buyWizard() {
    if (this.cookies >= this.wizardsCost) {
      this.wizards += 1;
      this.clearIntervals();
      this.autoIncrement();
      this.cookies -= this.wizardsCost;
      this.wizardsCost += 5 + (this.wizards * 5);
    } else alert('Not enough cookies!');
  }

}

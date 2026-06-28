import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartType
} from 'chart.js';
import { RouterLink } from '@angular/router';
import { AdminStats } from '../services/admin-stats';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-admin-games',
  imports: [BaseChartDirective, RouterLink],
  standalone: true,
  templateUrl: './admin-games.html',
  styleUrl: './admin-games.css',
})
export class AdminGames implements OnInit {
  private adminStats = inject(AdminStats);

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  public barChartLabels: string[] = ['Gespeelde spellen', 'Resterend tot doel'];
  public barChartType: ChartType = 'doughnut';

  public isDataLoaded = signal(false);
  public barChartData = signal<ChartConfiguration['data']>({
    labels: this.barChartLabels,
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#0056b3', '#e9ecef']
    }]
  });

  async ngOnInit() {
    try {
      const data = await this.adminStats.getAggregate();
      const totalPlayed = data[0].aantal_spellen;
      const goal = 50;
      const currentGoal = Math.floor(totalPlayed / goal) * goal + goal;
      const resterend = currentGoal - totalPlayed;

      this.barChartData.set({
        labels: this.barChartLabels,
        datasets: [{
          data: [totalPlayed, resterend],
          backgroundColor: ['#0056b3', '#e9ecef']
        }]
      });

      this.isDataLoaded.set(true);
    } catch (error) {
      console.error('Fout bij ophalen statistieken:', error);
    }
  }
}

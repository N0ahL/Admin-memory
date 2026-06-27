import { Component, OnInit, signal } from '@angular/core';
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
import {RouterLink} from '@angular/router';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-admin-games',
  imports: [BaseChartDirective, RouterLink],
  standalone: true,
  templateUrl: './admin-games.html',
  styleUrl: './admin-games.css',
})
export class AdminGames implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  public barChartLabels: string[] = ['Gespeelde spellen', 'Resterend tot doel'];
  public barChartType: ChartType = 'doughnut';

  // signals i.p.v. gewone properties
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
      const statsResponse = await fetch('http://localhost:8000/admin/aggregate');

      if (statsResponse.ok) {
        const data = await statsResponse.json();
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
        console.log('Opgehaalde data voor grafiek:', data);
      } else {
        console.error('Response niet ok:', statsResponse.status);
      }
    } catch (error) {
      console.error('Fout bij ophalen statistieken:', error);
    }
  }
}

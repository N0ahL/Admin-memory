import { Component, OnInit, inject, signal } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RouterLink } from '@angular/router';
import { AdminStats } from '../services/admin-stats';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-admin-apis',
  imports: [BaseChartDirective, RouterLink],
  templateUrl: './admin-apis.html',
  styleUrl: './admin-apis.css',
})
export class AdminApis implements OnInit {
  private adminStats = inject(AdminStats);

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  public barChartType: ChartType = 'bar';

  public isDataLoaded = signal(false);
  public barChartData = signal<ChartConfiguration['data']>({
    labels: [],
    datasets: []
  });

  async ngOnInit() {
    try {
      const data = await this.adminStats.getAggregate();
      const allApis = data[2];

      if (Array.isArray(allApis)) {
        const labels = allApis.map(item => item.api || 'Onbekend');
        const dataValues = allApis.map(item => Number(item.aantal || 0));

        this.barChartData.set({
          labels: labels,
          datasets: [{
            label: 'Aantal keren gekozen',
            data: dataValues,
            backgroundColor: [
              '#0056b3', '#28a745', '#ffc107', '#dc3545', '#17a2b8',
              '#6f42c1', '#fd7e14', '#e83e8c', '#20c997',
            ]
          }]
        });
      }

      this.isDataLoaded.set(true);
    } catch (error) {
      console.error('Fout bij ophalen statistieken:', error);
    }
  }
}

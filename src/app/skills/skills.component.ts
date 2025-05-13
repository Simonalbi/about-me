import { Component, inject, OnInit } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

import { NgxEchartsModule, NGX_ECHARTS_CONFIG} from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { SkillsService } from '../services/skills.service';

echarts.use([BarChart, GridComponent, CanvasRenderer, ScatterChart]);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [DashboardCardComponent, NgxEchartsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts })
    }
  ]
})
export class SkillsComponent implements OnInit{
  private skillsService = inject(SkillsService);

  private labels = [
    'Principiante',
    'Novizio',
    'Base',
    'Discreto',
    'Intermedio',
    'Buono',
    'Ottimo',
    'Avanzato',
    'Esperto',
    'Certificato'
  ];

  chartOptions: EChartsOption = {};

  async ngOnInit(): Promise<void> {
    const skills = this.skillsService.skillsList;

    const screenWidth  = window.innerWidth;
    let symbolSize: number;
    if (screenWidth >= 1200) {
      symbolSize = 32;
    } else if (screenWidth >= 768) {
      symbolSize = 24;
    } else {
      symbolSize = 16;
    }

    const barWidth = symbolSize / 3;

    const data = await Promise.all(
      skills.map(async skill => {
        const color = await this.getDominantColorFromImageUrl(skill.image);
        return {
          value: skill.level - 1,
          itemStyle: {
            color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
          }
        };
      })
    );

    this.chartOptions = {
      animationDuration: 1500,
      animationEasing: 'cubicOut',
      grid: {
        left: '1%',
        right: '4%',
        top: '5%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: skills.map(skill => skill.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          rotate: -55,
          margin: 10,
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 9,
        splitNumber: 10,
        splitLine: {
          lineStyle: {
            color: '#50575E',
            type: 'dashed',
            opacity: 0.1
          }
        },
        axisLabel: {
          formatter: (value: number) => this.labels[value] ?? ''
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: 'bar',
          data: data,
          barWidth: barWidth,
          itemStyle: {
            borderRadius: 12
          }
        },
        {
          type: 'scatter',
          data: skills.map(skill => ({
            value: skill.level - 1,
            symbol: `image://${skill.image}`,
            symbolSize: symbolSize
          })),
          symbolOffset: [0, -symbolSize * 0.75],
          xAxisIndex: 0,
          yAxisIndex: 0,
          z: 10
        }
      ]
    };
  }

  async getDominantColorFromImageUrl(url: string): Promise<[number, number, number]> {
    return new Promise(async (resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve([0, 0, 0]);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        const colorMap: Record<string, number> = {};
        let mostFrequent = { color: '', count: 0 };

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha === 0) continue;

          const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`;
          colorMap[rgb] = (colorMap[rgb] || 0) + 1;

          if (colorMap[rgb] > mostFrequent.count) {
            mostFrequent = { color: rgb, count: colorMap[rgb] };
          }
        }

        const [r, g, b] = mostFrequent.color.split(',').map(Number);
        resolve([r, g, b]);
      };

      img.onerror = () => {
        console.error('Errore caricamento immagine');
        resolve([0, 0, 0]);
      };
    });
  }
}
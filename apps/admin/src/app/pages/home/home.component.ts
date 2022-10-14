import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

function getGaugeOption(
  name: string,
  value: number,
  color = '#ff4081',
): EChartsOption {
  return {
    series: [
      {
        data: [{ value, name }],
        pointer: {
          show: false,
        },
        startAngle: 210,
        endAngle: -30,
        axisLabel: { show: false },
        splitLine: { show: false },
        axisLine: { show: true, lineStyle: { color: [[1, color]] } },
        axisTick: { show: false },
        detail: {
          offsetCenter: [0, '-20%'],
          fontSize: 20,
        },
        type: 'gauge',
      },
    ],
  };
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, MaterialUIModule, NgxEchartsModule],
  template: `<div [ngStyle]="{ padding: '8px' }">
    <mat-card
      [ngStyle]="{ display: 'flex', height: '120px', marginBottom: '8px' }"
    >
      <div echarts [ngStyle]="{ width: '33%' }" [options]="option1"></div>
      <div echarts [ngStyle]="{ width: '33%' }" [options]="option2"></div>
      <div echarts [ngStyle]="{ width: '33%' }" [options]="option3"></div>
    </mat-card>

    <mat-card [ngStyle]="{ marginBottom: '8px' }">
      <div
        echarts
        [options]="{
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              label: {
                show: true,
                position: 'top'
              },
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }"
      ></div>
    </mat-card>

    <mat-card [ngStyle]="{ marginBottom: '8px' }">
      <div
        echarts
        [options]="{
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        }"
      ></div>
    </mat-card>
  </div>`,
})
export class HomeComponent {
  option1 = getGaugeOption('user', 10);
  option2 = getGaugeOption('roles', 10);
  option3 = getGaugeOption('perms', 10);
}

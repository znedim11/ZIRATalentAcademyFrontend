import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {RestApiService} from '../../shared/rest-api.service';
import {ReportApi} from '../shared/report-api.constant';

@Component({
  selector: 'app-dlc-analysis',
  templateUrl: './dlc-analysis.component.html',
  styleUrls: ['./dlc-analysis.component.scss']
})
export class DlcAnalysisComponent implements OnInit {
  totalNumberOfDlc;

  constructor(private api: RestApiService) { }

  ngOnInit(): void {
    this.api.get(ReportApi.GET_DLC_ANALYSIS_REPORT).subscribe(data => {
      this.totalNumberOfDlc = data["payload"]["totalNumberOfDlc"];

      let dlcGameChart = am4core.create("dlcGameChart", am4charts.XYChart);
      dlcGameChart.data = data["payload"]["dlcGames"];
      this.setTitle(dlcGameChart, "Number of DLCs by games", 20, 5);
      this.setCategoryAxis(dlcGameChart, "gameName", "Game Title");
      this.setValueAxis(dlcGameChart, "Number of DLCs");
      this.setSeries(dlcGameChart, "Number of DLCs by game", "numOfDlcs", "gameName", "Series: {name}\nCategory: {categoryX}\nValue: {valueY}", "#104547");

      let dlcFranchiseChart = am4core.create("dlcFranchiseChart", am4charts.XYChart);
      dlcFranchiseChart.data = data["payload"]["dlcFranchises"];
      this.setTitle(dlcFranchiseChart, "Number of DLCs by franchises", 20, 5);
      this.setCategoryAxis(dlcFranchiseChart, "franchiseName", "Franchise name");
      this.setValueAxis(dlcFranchiseChart, "Number of DLCs");
      this.setSeries(dlcFranchiseChart, "Number of DLCs by franchise", "numOfDlcs", "franchiseName", "Series: {name}\nCategory: {categoryX}\nValue: {valueY}", "#104547");

      let dlcPlatformChart = am4core.create("dlcPlatformChart", am4charts.XYChart);
      dlcPlatformChart.data = data["payload"]["dlcPlatforms"];
      this.setTitle(dlcPlatformChart, "Number of DLCs by platforms", 20, 5);
      this.setCategoryAxis(dlcPlatformChart, "platformCode", "Platform code");
      this.setValueAxis(dlcPlatformChart, "Number of DLCs");
      this.setSeries(dlcPlatformChart, "Number of DLCs by platform", "numOfDlcs", "platformCode", "Series: {name}\nCategory: {categoryX}\nValue: {valueY}", "#104547");

      let dlcCompanyChart = am4core.create("dlcCompanyChart", am4charts.XYChart);
      dlcCompanyChart.data = data["payload"]["dlcCompanies"];
      this.setTitle(dlcCompanyChart, "Number of DLCs by companies", 20, 5);
      this.setCategoryAxis(dlcCompanyChart, "companyName", "Company name");
      this.setValueAxis(dlcCompanyChart, "Number of DLCs");
      this.setLegend(dlcCompanyChart);
      this.setSeries(dlcCompanyChart, "Number of DLCs by company as publisher", "numOfDlcsAsPublisher", "companyName", "Series: {name}\nCategory: {categoryX}\nValue: {valueY}", "#104547");
      this.setSeries(dlcCompanyChart, "Number of DLCs by company as developer", "numOfDlcsAsDeveloper", "companyName", "Series: {name}\nCategory: {categoryX}\nValue: {valueY}", "#109547");
  });
}

  setTitle(chart: am4charts.XYChart, title: string, fontSize: number, marginBottom: number){
    let chartTitle = chart.titles.create();
    chartTitle.text = title;
    chartTitle.fontSize = fontSize;
    chartTitle.marginBottom = marginBottom;
  }

  setCategoryAxis(chart: am4charts.XYChart, categoryAxisFieldName: string, categoryAxisDisplayText: string){
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = categoryAxisFieldName;
    categoryAxis.title.text = categoryAxisDisplayText;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
  }

  setValueAxis(chart: am4charts.XYChart, valueAxisDisplayText: string){
    let  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = valueAxisDisplayText;
  }

  setSeries(chart: am4charts.XYChart, seriesName: string, value: string, category: string, tooltipText: string, columnColor: string) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = seriesName;
    series.dataFields.valueY = value;
    series.dataFields.categoryX = category;
    series.columns.template.tooltipText = tooltipText;
    series.columns.template.fill = am4core.color(columnColor);
  }

  setLegend(chart: am4charts.XYChart){
    chart.legend = new am4charts.Legend();
  }
}

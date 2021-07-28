import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as moment from 'moment';
import {RestApiService} from '../../shared/rest-api.service';
import {ReportApi} from '../shared/report-api.constant';
import { SharedApi } from '../../shared/shared-api.constat';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-company-region-platform',
  templateUrl: './company-region-platform.component.html',
  styleUrls: ['./company-region-platform.component.scss']
})
export class CompanyRegionPlatformComponent implements OnInit {
  companiesList = [];
  dropdownSettings = {};
  selectedCompanies = [];
  loadedCompanies = [];
  pageSize: number = 100;
  filter: string;

  constructor(private api: RestApiService) { }

  ngOnInit(): void {     
    var httpParams = new HttpParams();
    let nextPage = (this.companiesList.length / this.pageSize) + 1;
    httpParams = httpParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));

    this.api.get(SharedApi.GET_COMPANIES, {params : httpParams})
    .subscribe((companies) => {
      this.companiesList = companies['payload'];
    });

    this.dropdownSettings = {
      text: 'Select companies',
      singleSelection: false,
      enableSearchFilter: true,
      lazyLoading: true,
      enableFilterSelectAll: false,
      badgeShowLimit: 5,
      limitSelection: 5,
      noDataLabel: "No saved companies",
      labelKey: 'name',
      primaryKey: 'id'
    };
  }

  getData(){
    if(this.selectedCompanies.length == 0)
      return;

    var httpParams = new HttpParams();

    if(this.loadedCompanies.length != 0){
      var toLoadReports = new Array<number>();
      for(var i = 0; i < this.selectedCompanies.length; i++){
        var loaded = false;
        for(var j = 0; j < this.loadedCompanies.length; j++){
          if(this.selectedCompanies[i].id == this.loadedCompanies[j].id){
            loaded = true;
            break;
          }
        }
        if(!loaded){
          toLoadReports.push(this.selectedCompanies[i].id);
        }
      }

      toLoadReports.forEach(company => { httpParams = httpParams.append('ids', company.toString()) });
    }
    else{
      this.selectedCompanies.forEach(company => { httpParams = httpParams.append('ids', company.id) });
    }
    
    this.api.get(ReportApi.GET_COMPANY_REGION_PLATFORM_REPORT, { params : httpParams }).subscribe(data => {
      var reports: CompanyRegionPlatformReport[] = data["payload"]["companiesReports"];

      reports.forEach(companyReport => {
        if(companyReport){
          var regionChart = am4core.create("regionChart" + companyReport.companyId, am4charts.PieChart);
          this.setPieData(regionChart, companyReport.regionMap);
          this.setTitle(regionChart, "Company prefered regions", 20, 5);
          this.setPieSeries(regionChart, "numOfReleases", "id", "Region: {name}\nNumber of releases: {numOfReleases}\nFirst release date: {firstRelease}\nFirst game: {firstReleaseGameName}");

          var platformChart = am4core.create("platformChart" + companyReport.companyId, am4charts.PieChart);
          this.setPieData(platformChart, companyReport.platformMap);
          this.setTitle(platformChart, "Company prefered platforms", 20, 5);
          this.setPieSeries(platformChart, "numOfReleases", "id", "Platform: {name}\nNumber of releases: {numOfReleases}\nFirst release date: {firstRelease}\nFirst game: {firstReleaseGameName}");
        }
      });
    }, error => {
      console.log(error.status);
  });
  }

  onItemDeSelect(item:any){
    this.loadedCompanies.forEach( (company, index) => {
      if(company === item) this.selectedCompanies.splice(index,1);
    });
  }

  onDeSelectAll(items: any){
    this.loadedCompanies = JSON.parse(JSON.stringify(this.selectedCompanies));
  }

  onClose(item:any){
    this.getData()
    this.loadedCompanies = JSON.parse(JSON.stringify(this.selectedCompanies));
  }

  closeReport(item:any){
    this.selectedCompanies.forEach( (company, index) => {
      if(company === item) this.selectedCompanies.splice(index,1);
    });
  }

  async fetchMore(event: any) {
    console.log("FETCH" + event.endIndex);
    if (event.endIndex > 0 && event.endIndex === this.companiesList.length - 1) {
      let nextPage = (this.companiesList.length / this.pageSize) + 1;
      var gameParams = new HttpParams();
      console.log("Next page: " + nextPage);
      gameParams = gameParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));

      await this.api.get(SharedApi.GET_COMPANIES, { params: gameParams }).subscribe((companies) => {
        if (companies) {
          this.companiesList = this.companiesList.concat(companies['payload']);
        }
      });
    }
  }

  onSearch(event: any) {
    console.log("SEARCH");
    if (this.filter.length > 0) {
      var gameParams = new HttpParams();
      gameParams = gameParams.set('filter', JSON.stringify([{ attribute: "name", filterOperation: "BEGINS_WITH", expressionValue: this.filter }]));

      this.api.get(SharedApi.GET_COMPANIES, { params: gameParams }).subscribe((companies) => {
        if (companies) {
          this.companiesList = companies['payload'];
        }
      });
    }
    else if (this.filter.length == 0) {
      var httpParams = new HttpParams();
      let nextPage = (this.companiesList.length / this.pageSize) + 1;
      httpParams = httpParams.set('pagination', JSON.stringify({ entitiesPerPage: this.pageSize, page: nextPage }));
  
      this.api.get(SharedApi.GET_COMPANIES, {params : httpParams})
      .subscribe((companies) => {
        this.companiesList = companies['payload'];
      });
    }
  }

  setPieData(chart: am4charts.PieChart, data: Map<number, ReportMapDetails>){
    if(data){
      var reportDetailsList = new Array<ReportDetailsItem>();

      Object.keys(data).forEach(function (key){
        var item = data[key];
        reportDetailsList.push(new ReportDetailsItem(key, item.name, item.numOfReleases, item.firstRelease ? moment(item.firstRelease).format('DD.MM.YYYY') : null, item.firstReleaseGameName));
      });      

      chart.data = reportDetailsList;
    }
  }

  setTitle(chart: am4charts.PieChart, title: string, fontSize: number, marginBottom: number){
    var chartTitle = chart.titles.create();
    chartTitle.text = title;
    chartTitle.fontSize = fontSize;
    chartTitle.marginBottom = marginBottom;
    chartTitle.background.fill = am4core.color("#fff");
    chartTitle.zIndex = 10;
  }

  setPieSeries(chart: am4charts.PieChart, valueName: string, categoryName: string, tooltipText: string){
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = valueName;
    pieSeries.dataFields.category = categoryName;
    pieSeries.slices.template.tooltipText = tooltipText;
    pieSeries.labels.template.text = "{name}: {value.percent.formatNumber('#.0')}%";
  }
}

class CompanyRegionPlatformReport{
  companyId: number;
  companyName: string;
  startDate: Date;
  regionMap: Map<number, ReportMapDetails>;
  platformMap: Map<number, ReportMapDetails>;
}

class ReportMapDetails{
  name: string;
  numOfReleases: number;
  firstRelease: Date;
  firstReleaseGameName: string;
}

class ReportDetailsItem{
  id: string;
  name: string;
  numOfReleases: number;
  firstRelease: string;
  firstReleaseGameName: string;

  constructor(id: string, name: string, numOfReleases: number, firstRelease: string, firstReleaseGameName: string){
    this.id = id;
    this.name = name;
    this.numOfReleases = numOfReleases;
    this.firstRelease = firstRelease;
    this.firstReleaseGameName = firstReleaseGameName;
  }
}
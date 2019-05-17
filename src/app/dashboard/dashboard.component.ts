import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { Chart } from 'angular-highcharts';
import { BaseService } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns = [
    'dataLancamentoContaCorrenteCliente',
    'descricaoGrupoPagamento',
    'numeroEvento',
    'nomeSituacaoRemessa',
    'dataEfetivaLancamento',
    'lancamentoContaCorrenteCliente',
    'valorLancamentoRemessa'
  ];

  dataSource;

  chart;
  categoriesChart = [];
  seriesChart = [];

  constructor( private baseService: BaseService ) { }

  ngOnInit() {
    this.baseService.base().subscribe((response) => {
      this.dataSource = response;

      this.categoriesChart = [];

      this.seriesChart = [
        {
          name: 'Valor Final',
          data: []
        }
      ];

      for (let i = 0; i < this.dataSource.listaControleLancamento.length; i++) {
        this.categoriesChart.push(this.dataSource.listaControleLancamento[i].dataLancamentoContaCorrenteCliente);

        this.seriesChart[0].data.push(this.dataSource.listaControleLancamento[i].valorLancamentoRemessa);
      }

      this.chart = new Chart({
        chart: {
          type: 'area'
        },
        title: {
          text: undefined
        },
        subtitle: {
          text: undefined
        },
        xAxis: {
          categories: this.categoriesChart
        },
        yAxis: {
          title: undefined
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2
            }
          }
        },
        series: this.seriesChart,
        credits: {
          enabled: false
        }
      });

      this.chart.ref$.subscribe((chart) => {
        chart.xAxis[0].categories = this.categoriesChart;

        chart.series[0].update({
          data: this.seriesChart[0].data
        });
      });

      this.addMore();
    });
  }

  addMore() {
    let date = new Date();

    let nowDate = ('0' + date.getDate()).slice(-2) + '/'+ ('0' + (date.getMonth()+1)).slice(-2) + '/'+ date.getFullYear();

    this.dataSource.listaControleLancamento.push(
      {
        "lancamentoContaCorrenteCliente": {
          "numeroRemessaBanco": 64320236054,
          "nomeSituacaoRemessa": "Pago",
          "dadosDomicilioBancario": {
            "codigoBanco": 123,
            "numeroAgencia": 1,
            "numeroContaCorrente": "00000000065470"
          },
          "nomeTipoOperacao": "regular"
        },
        "dataEfetivaLancamento": `${nowDate}`,
        "dataLancamentoContaCorrenteCliente": `${nowDate}`,
        "numeroEvento": Math.floor(10000000 + Math.random() * 90000000),
        "descricaoGrupoPagamento": "LA-56",
        "codigoIdentificadorUnico": "1",
        "nomeBanco": "BANCO ABCD S.A.",
        "quantidadeLancamentoRemessa": 22,
        "numeroRaizCNPJ": "12996721",
        "numeroSufixoCNPJ": "1597",
        "valorLancamentoRemessa": Math.floor(1000 + Math.random() * 9000),
        "dateLancamentoContaCorrenteCliente": 1464922800000,
        "dateEfetivaLancamento": 1464922800000
      },
      {
        "lancamentoContaCorrenteCliente": {
          "numeroRemessaBanco": 64320236054,
          "nomeSituacaoRemessa": "Pago",
          "dadosDomicilioBancario": {
            "codigoBanco": 123,
            "numeroAgencia": 1,
            "numeroContaCorrente": "00000000065470"
          },
          "nomeTipoOperacao": "regular"
        },
        "dataEfetivaLancamento": `${nowDate}`,
        "dataLancamentoContaCorrenteCliente": `${nowDate}`,
        "numeroEvento": Math.floor(10000000 + Math.random() * 90000000),
        "descricaoGrupoPagamento": "LA-56",
        "codigoIdentificadorUnico": "1",
        "nomeBanco": "BANCO ABCD S.A.",
        "quantidadeLancamentoRemessa": 22,
        "numeroRaizCNPJ": "12996721",
        "numeroSufixoCNPJ": "1597",
        "valorLancamentoRemessa": Math.floor(1000 + Math.random() * 9000),
        "dateLancamentoContaCorrenteCliente": 1464922800000,
        "dateEfetivaLancamento": 1464922800000
      }
    );

    setTimeout(() => {
      this.categoriesChart = [];

      this.seriesChart = [
        {
          name: 'Valor Final',
          data: []
        }
      ];

      for (let i = 0; i < this.dataSource.listaControleLancamento.length; i++) {
        this.categoriesChart.push(this.dataSource.listaControleLancamento[i].dataLancamentoContaCorrenteCliente);

        this.seriesChart[0].data.push(this.dataSource.listaControleLancamento[i].valorLancamentoRemessa);
      }

      this.chart.ref$.subscribe((chart) => {
        chart.xAxis[0].categories = this.categoriesChart;

        chart.series[0].update({
          data: this.seriesChart[0].data
        });
      });

      this.table.renderRows();
    }, 100);

    setInterval(() => {
      this.dataSource.listaControleLancamento.push(
        {
          "lancamentoContaCorrenteCliente": {
            "numeroRemessaBanco": 64320236054,
            "nomeSituacaoRemessa": "Pago",
            "dadosDomicilioBancario": {
              "codigoBanco": 123,
              "numeroAgencia": 1,
              "numeroContaCorrente": "00000000065470"
            },
            "nomeTipoOperacao": "regular"
          },
          "dataEfetivaLancamento": `${nowDate}`,
          "dataLancamentoContaCorrenteCliente": `${nowDate}`,
          "numeroEvento": Math.floor(10000000 + Math.random() * 90000000),
          "descricaoGrupoPagamento": "LA-56",
          "codigoIdentificadorUnico": "1",
          "nomeBanco": "BANCO ABCD S.A.",
          "quantidadeLancamentoRemessa": 22,
          "numeroRaizCNPJ": "12996721",
          "numeroSufixoCNPJ": "1597",
          "valorLancamentoRemessa": Math.floor(1000 + Math.random() * 9000),
          "dateLancamentoContaCorrenteCliente": 1464922800000,
          "dateEfetivaLancamento": 1464922800000
        }
      );

      this.table.renderRows();

      this.categoriesChart = [];

      this.seriesChart = [
        {
          name: 'Valor Final',
          data: []
        }
      ];

      for (let i = 0; i < this.dataSource.listaControleLancamento.length; i++) {
        this.categoriesChart.push(this.dataSource.listaControleLancamento[i].dataLancamentoContaCorrenteCliente);

        this.seriesChart[0].data.push(this.dataSource.listaControleLancamento[i].valorLancamentoRemessa);
      }

      this.chart.ref$.subscribe((chart) => {
        chart.xAxis[0].categories = this.categoriesChart;

        chart.series[0].update({
          data: this.seriesChart[0].data
        });
      });
    }, 5000);
  }

}

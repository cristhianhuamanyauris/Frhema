import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../core/services/reportes/reportes.service';

@Component({
  selector: 'app-compras-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras-reporte.component.html',
})
export class ComprasReporteComponent implements OnInit {

  desde: string = '';
  hasta: string = '';
  proveedorSeleccionado: number | null = null;

  proveedores: any[] = [];
  resultados: any[] = [];
  totalComprado: number = 0;

  constructor(private reportesService: ReportesService) {}

  async ngOnInit() {
    this.proveedores = await this.reportesService.getProveedores();
  }

  async filtrar() {
    const data = await this.reportesService.getComprasReporte(
      this.desde,
      this.hasta,
      this.proveedorSeleccionado
    );

    this.resultados = data.resultados;
    this.totalComprado = data.total;
  }

  formatear(fecha: string) {
    return new Date(fecha).toLocaleDateString('es-PE');
  }
}

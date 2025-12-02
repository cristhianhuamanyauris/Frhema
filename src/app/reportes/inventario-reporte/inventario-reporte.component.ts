import { Component, OnInit } from '@angular/core';

// 🔥 IMPORTS NECESARIOS PARA STANDALONE
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { ReportesService } from '../../core/services/reportes/reportes.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-inventario-reporte',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],  // 👈 ESTO CORRIGE NG0303
  templateUrl: './inventario-reporte.component.html',
  styleUrls: ['./inventario-reporte.component.css'],
})
export class InventarioReporteComponent implements OnInit {

  cargando = true;

  stockCritico: any[] = [];
  porVencer: any[] = [];
  sinMovimiento: any[] = [];
  inventarioCompleto: any[] = [];

  constructor(private reporteService: ReportesService) {}

  async ngOnInit() {
    this.cargando = true;

    try {
      this.stockCritico = await this.reporteService.getStockCritico();
      this.porVencer = await this.reporteService.getPorVencer();
      this.sinMovimiento = await this.reporteService.getSinMovimiento();
      this.inventarioCompleto = await this.reporteService.getInventarioCompleto();

    } catch (error) {
      console.error('Error cargando reportes de inventario', error);
    }

    this.cargando = false;
  }

  // =====================================================
  // 📦 EXPORTAR A EXCEL
  // =====================================================
  exportarExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.inventarioCompleto);
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');
    XLSX.writeFile(wb, 'reporte_inventario.xlsx');
  }

  // =====================================================
  // 📄 EXPORTAR A PDF
  // =====================================================
  exportarPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Inventario', 14, 10);

    autoTable(doc, {
      startY: 20,
      head: [['Código', 'Producto', 'Stock', 'Stock mínimo', 'Unidad']],
      body: this.inventarioCompleto.map(p => [
        p.codigo,
        p.nombre,
        p.stock_actual,
        p.stock_minimo,
        p.unidad_medida,
      ])
    });

    doc.save('reporte_inventario.pdf');
  }

  // =====================================================
  // 🗓 FORMATEO DE FECHAS
  // =====================================================
  fechaBonita(fecha: string) {
    return new Date(fecha).toLocaleDateString('es-PE');
  }
}

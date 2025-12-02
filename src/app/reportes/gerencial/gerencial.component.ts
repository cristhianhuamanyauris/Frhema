import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../../core/services/reportes/reportes.service';

interface KPIs {
  ventasHoy: number;
  ventasMes: number;
  ventasAnio: number;
  comprasMes: number;
  ticketPromedio: number;
}

@Component({
  selector: 'app-gerencial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerencial.component.html',
  styleUrls: ['./gerencial.component.css']
})
export class GerencialComponent implements OnInit {

  // ============================
  // ESTADOS
  // ============================
  loadingKPIs = true;
  loadingTopProductos = true;
  loadingCategorias = true;

  errorMessage = '';

  kpis: KPIs = {
    ventasHoy: 0,
    ventasMes: 0,
    ventasAnio: 0,
    comprasMes: 0,
    ticketPromedio: 0
  };

  topProductos: { nombre: string; cantidad_total: number }[] = [];
  ventasPorCategoria: { categoria: string | null; total: number }[] = [];

  constructor(private reportesService: ReportesService) {}

  async ngOnInit() {
    // Cargar todo en paralelo
    await Promise.all([
      this.cargarKPIs(),
      this.cargarTopProductos(),
      this.cargarVentasPorCategoria()
    ]);
  }

  // ============================
  // CARGAS
  // ============================
  async cargarKPIs() {
    this.loadingKPIs = true;
    this.errorMessage = '';

    try {
      const data = await this.reportesService.getKPIs();
      this.kpis = {
        ventasHoy: Number(data.ventasHoy) || 0,
        ventasMes: Number(data.ventasMes) || 0,
        ventasAnio: Number(data.ventasAnio) || 0,
        comprasMes: Number(data.comprasMes) || 0,
        ticketPromedio: Number(data.ticketPromedio) || 0
      };
    } catch (err: any) {
      console.error(err);
      this.errorMessage = 'Error al cargar KPIs gerenciales.';
    } finally {
      this.loadingKPIs = false;
    }
  }

  async cargarTopProductos() {
    this.loadingTopProductos = true;
    try {
      const data = await this.reportesService.getTopProductos(10);
      this.topProductos = (data || []).map((p: any) => ({
        nombre: p.nombre,
        cantidad_total: Number(p.cantidad_total) || 0
      }));
    } catch (err) {
      console.error(err);
    } finally {
      this.loadingTopProductos = false;
    }
  }

  async cargarVentasPorCategoria() {
    this.loadingCategorias = true;
    try {
      const data = await this.reportesService.getVentasPorCategoria();
      this.ventasPorCategoria = (data || []).map((c: any) => ({
        categoria: c.categoria || 'Sin categoría',
        total: Number(c.total) || 0
      }));
    } catch (err) {
      console.error(err);
    } finally {
      this.loadingCategorias = false;
    }
  }

  // ============================
  // HELPERS
  // ============================
  formatearMoneda(valor: number): string {
    if (!valor) return 'S/ 0.00';
    return `S/ ${valor.toFixed(2)}`;
  }

  getMaxTotalCategorias(): number {
    if (!this.ventasPorCategoria.length) return 0;
    return Math.max(...this.ventasPorCategoria.map(c => c.total));
  }

  getPorcentajeCategoria(total: number): number {
    const max = this.getMaxTotalCategorias();
    if (!max) return 0;
    return (total / max) * 100;
  }

}

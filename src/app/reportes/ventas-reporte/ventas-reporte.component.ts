import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentasService } from '../../core/services/ventas/ventas.service';
import { ClientesService } from '../../core/services/personas/clientes.service';
import { UsuariosService } from '../../core/services/configuracion/usuarios.service';

@Component({
  selector: 'app-ventas-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas-reporte.component.html',
})
export class VentasReporteComponent implements OnInit {

  ventas: any[] = [];
  clientes: any[] = [];
  usuarios: any[] = [];

  filtros = {
    fecha_inicio: '',
    fecha_fin: '',
    id_cliente: '',
    id_usuario: '',
    tipo_comprobante: ''
  };

  constructor(
    private ventasService: VentasService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService
  ) {}

  async ngOnInit() {
    this.clientes = await this.clientesService.getClientes();
    this.usuarios = await this.usuariosService.getUsuarios();
    await this.cargarReporte();
  }

  async cargarReporte() {

    const filtrosConvertidos = {
      fecha_inicio: this.filtros.fecha_inicio || undefined,
      fecha_fin: this.filtros.fecha_fin || undefined,
      id_cliente: this.filtros.id_cliente ? Number(this.filtros.id_cliente) : undefined,
      id_usuario: this.filtros.id_usuario || undefined,
      tipo_comprobante: this.filtros.tipo_comprobante || undefined,
    };

    this.ventas = await this.ventasService.getReporteVentas(filtrosConvertidos);
  }

  formatFecha(fecha: string) {
    return new Date(fecha).toLocaleString();
  }

  exportarPDF() {
    console.log("Exportar PDF aún no implementado");
  }

  exportarExcel() {
    console.log("Exportar Excel aún no implementado");
  }
}

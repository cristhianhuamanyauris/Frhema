/*
import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../auth/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private supabase: SupabaseClientService) {}

  // ============================================================
  // PROVEEDORES (PARA FILTROS EN REPORTE DE COMPRAS)
  // ============================================================
  async getProveedores() {
    const { data, error } = await this.supabase.client
      .from('proveedores')
      .select('id_proveedor, nombre')
      .order('nombre');

    if (error) throw error;
    return data || [];
  }

  // ============================================================
  // 🧾 REPORTE DE COMPRAS
  // ============================================================
  async getComprasReporte(desde: string, hasta: string, proveedor: number | null) {

    // 1️⃣ FILTRAR COMPRAS
    let comprasSub = this.supabase.client
      .from('compras')
      .select('id_compra');

    if (desde) comprasSub = comprasSub.gte('fecha', desde);
    if (hasta) comprasSub = comprasSub.lte('fecha', hasta + " 23:59:59");
    if (proveedor) comprasSub = comprasSub.eq('id_proveedor', proveedor);

    const { data: comprasFiltradas, error: e1 } = await comprasSub;
    if (e1) throw e1;

    if (!comprasFiltradas || comprasFiltradas.length === 0)
      return { resultados: [], total: 0 };

    const ids = comprasFiltradas.map(c => c.id_compra);

    // 2️⃣ DETALLE DE ESAS COMPRAS
    const { data, error } = await this.supabase.client
      .from('detalle_compras')
      .select(`
        cantidad,
        costo_unitario,
        subtotal,
        compras:compras (
          fecha,
          nro_documento,
          id_proveedor,
          proveedores:proveedores(nombre)
        ),
        productos:productos(nombre)
      `)
      .in('id_compra', ids);

    if (error) throw error;

    // 3️⃣ MAPEAR
    const resultados = data.map((row: any) => ({
      fecha: row.compras.fecha,
      nro_documento: row.compras.nro_documento,
      proveedor: row.compras.proveedores.nombre,
      producto: row.productos.nombre,
      cantidad: row.cantidad,
      costo_unitario: row.costo_unitario,
      subtotal: row.subtotal
    }));

    const total = resultados.reduce((acc: number, r: any) => acc + r.subtotal, 0);

    return { resultados, total };
  }

  // ============================================================
  // 💰 REPORTE DE VENTAS
  // ============================================================
  async getVentasReporte(desde: string, hasta: string, cliente: number | null) {

    let query = this.supabase.client
      .from('ventas')
      .select(`
        *,
        clientes:clientes(nombre, documento),
        usuarios:usuarios(nombre_usuario)
      `)
      .gte('fecha', desde)
      .lte('fecha', hasta + " 23:59:59")
      .order('fecha', { ascending: false });

    if (cliente) {
      query = query.eq('id_cliente', cliente);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data || [];
  }

  // ============================================================
  // 📦 REPORTE DE INVENTARIO
  // ============================================================

  // STOCK CRÍTICO
  async getStockCritico() {
    const { data, error } = await this.supabase.client
      .from('productos')
      .select('*')
      .lte('stock_actual', 'stock_minimo')
      .order('stock_actual', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // PRODUCTOS POR VENCER
  async getPorVencer() {
    const hoy = new Date();
    const en30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const { data, error } = await this.supabase.client
      .from('productos')
      .select('*')
      .eq('tiene_caducidad', true)
      .gte('fecha_vencimiento', hoy.toISOString())
      .lte('fecha_vencimiento', en30.toISOString())
      .order('fecha_vencimiento', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // PRODUCTOS SIN MOVIMIENTO – usa tu RPC
  async getSinMovimiento() {
    const { data, error } = await this.supabase.client.rpc(
      'productos_sin_movimiento',
      { dias: 30 }
    );

    if (error) throw error;
    return data || [];
  }

  // INVENTARIO COMPLETO
  async getInventarioCompleto() {
    const { data, error } = await this.supabase.client
      .from('productos')
      .select(`
        *,
        categorias(nombre),
        proveedores(nombre)
      `)
      .order('nombre');

    if (error) throw error;
    return data || [];
  }

  // ============================================================
  // 📊 REPORTE GERENCIAL (KPIs)
  // ============================================================

  async getKPIs() {
    const { data: ventasHoy } = await this.supabase.client.rpc('ventas_hoy');
    const { data: ventasMes } = await this.supabase.client.rpc('ventas_mes');
    const { data: comprasMes } = await this.supabase.client.rpc('compras_mes');

    return {
      ventasHoy: ventasHoy || 0,
      ventasMes: ventasMes || 0,
      comprasMes: comprasMes || 0
    };
  }

}
*/

import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../auth/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private supabase: SupabaseClientService) {}

  // ============================================================
  // PROVEEDORES PARA FILTROS
  // ============================================================
  async getProveedores() {
    const { data, error } = await this.supabase.client
      .from('proveedores')
      .select('id_proveedor, nombre')
      .order('nombre');

    if (error) throw error;
    return data || [];
  }

  // ============================================================
  // 🧾 REPORTE DE COMPRAS
  // ============================================================
  async getComprasReporte(desde: string, hasta: string, proveedor: number | null) {

    let comprasSub = this.supabase.client
      .from('compras')
      .select('id_compra');

    if (desde) comprasSub = comprasSub.gte('fecha', desde);
    if (hasta) comprasSub = comprasSub.lte('fecha', hasta + " 23:59:59");
    if (proveedor) comprasSub = comprasSub.eq('id_proveedor', proveedor);

    const { data: comprasFiltradas, error: e1 } = await comprasSub;
    if (e1) throw e1;

    if (!comprasFiltradas || comprasFiltradas.length === 0)
      return { resultados: [], total: 0 };

    const ids = comprasFiltradas.map(c => c.id_compra);

    const { data, error } = await this.supabase.client
      .from('detalle_compras')
      .select(`
        cantidad,
        costo_unitario,
        subtotal,
        compras:compras (
          fecha,
          nro_documento,
          id_proveedor,
          proveedores:proveedores(nombre)
        ),
        productos:productos(nombre)
      `)
      .in('id_compra', ids);

    if (error) throw error;

    const resultados = data.map((row: any) => ({
      fecha: row.compras.fecha,
      nro_documento: row.compras.nro_documento,
      proveedor: row.compras.proveedores.nombre,
      producto: row.productos.nombre,
      cantidad: row.cantidad,
      costo_unitario: row.costo_unitario,
      subtotal: row.subtotal
    }));

    const total = resultados.reduce((acc: number, r: any) => acc + r.subtotal, 0);
    return { resultados, total };
  }

  // ============================================================
  // 💰 REPORTE DE VENTAS
  // ============================================================
  async getVentasReporte(desde: string, hasta: string, cliente: number | null) {

    let query = this.supabase.client
      .from('ventas')
      .select(`
        *,
        clientes:clientes(nombre, documento),
        usuarios:usuarios(nombre_usuario)
      `)
      .gte('fecha', desde)
      .lte('fecha', hasta + " 23:59:59")
      .order('fecha', { ascending: false });

    if (cliente) query = query.eq('id_cliente', cliente);

    const { data, error } = await query;
    if (error) throw error;

    return data || [];
  }

  // ============================================================
  // 📦 INVENTARIO — RPC
  // ============================================================
  async getStockCritico() {
    const { data, error } = await this.supabase.client.rpc('get_stock_critico');
    if (error) throw error;
    return data || [];
  }

  async getPorVencer() {
    const { data, error } = await this.supabase.client.rpc('get_por_vencer');
    if (error) throw error;
    return data || [];
  }

  async getSinMovimiento() {
    const { data, error } = await this.supabase.client.rpc('productos_sin_movimiento', { dias: 30 });
    if (error) throw error;
    return data || [];
  }

  async getInventarioCompleto() {
    const { data, error } = await this.supabase.client.rpc('get_inventario_completo');
    if (error) throw error;
    return data || [];
  }

  // ============================================================
  // 📊 KPIs GERENCIALES — MÉTODOS NUEVOS COMPLETOS
  // ============================================================

  async getKPIs() {
    const { data: ventasHoy } = await this.supabase.client.rpc('ventas_hoy');
    const { data: ventasMes } = await this.supabase.client.rpc('ventas_mes');
    const { data: comprasMes } = await this.supabase.client.rpc('compras_mes');
    const { data: ventasAnio } = await this.supabase.client.rpc('ventas_anio');
    const { data: ticketPromedio } = await this.supabase.client.rpc('ticket_promedio_mes');

    return {
      ventasHoy: ventasHoy || 0,
      ventasMes: ventasMes || 0,
      comprasMes: comprasMes || 0,
      ventasAnio: ventasAnio || 0,
      ticketPromedio: ticketPromedio || 0
    };
  }

  // ============================================================
  // 📈 GRÁFICOS — TOP PRODUCTOS & CATEGORÍAS
  // ============================================================

  async getTopProductos(limit = 10) {
    const { data, error } = await this.supabase.client.rpc('top_productos_vendidos', {
      limit_count: limit
    });
    if (error) throw error;
    return data || [];
  }

  async getVentasPorCategoria() {
    const { data, error } = await this.supabase.client.rpc('ventas_por_categoria');
    if (error) throw error;
    return data || [];
  }

}

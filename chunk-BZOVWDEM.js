import{a as l}from"./chunk-5T4VIS3M.js";import{O as d,T as p}from"./chunk-V3AN2ELD.js";import{h as n}from"./chunk-FK42CRUA.js";var m=class c{constructor(t){this.supabase=t}TABLE="ventas";TABLE_DET="detalle_ventas";TABLE_MOV="movimientos_stock";getVentas(){return n(this,null,function*(){let{data:t,error:e}=yield this.supabase.client.from(this.TABLE).select(`
        id_venta,
        fecha,
        total,
        tipo_comprobante,
        nro_comprobante,
        clientes ( nombre )
      `).order("id_venta",{ascending:!1});if(e)throw e;return t})}getDetalle(t){return n(this,null,function*(){let{data:e,error:o}=yield this.supabase.client.from(this.TABLE_DET).select(`
        id_detalle_venta,
        cantidad,
        precio_unitario,
        descuento,
        subtotal,
        productos ( nombre )
      `).eq("id_venta",t);if(o)throw o;return e})}registrarVenta(t,e){return n(this,null,function*(){let{data:o,error:i}=yield this.supabase.client.from(this.TABLE).insert([{id_usuario:t.id_usuario,id_cliente:t.id_cliente,tipo_comprobante:t.tipo_comprobante,nro_comprobante:t.nro_comprobante,metodo_pago:t.metodo_pago,total:t.total}]).select().single();if(i)throw i;let a=o.id_venta,r=e.map(s=>({id_venta:a,id_producto:s.id_producto,cantidad:s.cantidad,precio_unitario:s.precio_unitario,descuento:s.descuento})),{error:u}=yield this.supabase.client.from(this.TABLE_DET).insert(r);if(u)throw u;for(let s of e)yield this.supabase.client.from(this.TABLE_MOV).insert([{id_producto:s.id_producto,tipo:"VENTA",cantidad:s.cantidad,referencia:`Venta ${a}`}]);return a})}getVentasHoyCount(){return n(this,null,function*(){let t=new Date;t.setHours(0,0,0,0);let e=t.toISOString().split("T")[0],o=new Date;o.setHours(23,59,59,999);let i=o.toISOString().split("T")[0]+"T23:59:59.999Z",{count:a,error:r}=yield this.supabase.client.from(this.TABLE).select("id_venta",{count:"exact",head:!0}).gte("fecha",e).lte("fecha",i);if(r)throw r;return a||0})}getMontoHoy(){return n(this,null,function*(){let t=new Date;t.setHours(0,0,0,0);let e=t.toISOString().split("T")[0],{data:o,error:i}=yield this.supabase.client.from(this.TABLE).select("total").gte("fecha",e);if(i)throw i;return o?.reduce((a,r)=>a+(r.total||0),0)||0})}getVentasMesCount(){return n(this,null,function*(){let t=new Date;t.setDate(1),t.setHours(0,0,0,0);let e=t.toISOString().split("T")[0],{count:o,error:i}=yield this.supabase.client.from(this.TABLE).select("*",{count:"exact",head:!0}).gte("fecha",e);if(i)throw i;return o||0})}getMontoMes(){return n(this,null,function*(){let t=new Date;t.setDate(1),t.setHours(0,0,0,0);let e=t.toISOString().split("T")[0],{data:o,error:i}=yield this.supabase.client.from(this.TABLE).select("total").gte("fecha",e);if(i)throw i;return o?.reduce((a,r)=>a+(r.total||0),0)||0})}getVentasRecientes(){return n(this,null,function*(){let t=new Date;t.setHours(0,0,0,0);let e=t.toISOString().split("T")[0],o=new Date;o.setHours(23,59,59,999);let i=o.toISOString().split("T")[0]+"T23:59:59.999Z",{data:a,error:r}=yield this.supabase.client.from(this.TABLE).select(`
        id_venta,
        fecha,
        total,
        tipo_comprobante,
        nro_comprobante,
        metodo_pago,
        clientes ( nombre ),
        detalle_ventas (
          id_producto,
          cantidad,
          productos (
            stock_actual,
            nombre
          )
        )
      `).gte("fecha",e).lte("fecha",i).order("fecha",{ascending:!1}).limit(10);if(r)throw r;return a||[]})}getReporteVentas(t){return n(this,null,function*(){let e=this.supabase.client.from(this.TABLE).select(`
        *,
        clientes (
          id_cliente,
          nombre,
          documento
        ),
        usuarios (
          id_usuario,
          nombre_usuario,
          nombre,
          apellido
        )
      `).order("fecha",{ascending:!1});t.fecha_inicio&&(e=e.gte("fecha",t.fecha_inicio)),t.fecha_fin&&(e=e.lte("fecha",t.fecha_fin)),t.id_cliente&&(e=e.eq("id_cliente",t.id_cliente)),t.id_usuario&&(e=e.eq("id_usuario",t.id_usuario)),t.tipo_comprobante&&(e=e.eq("tipo_comprobante",t.tipo_comprobante));let{data:o,error:i}=yield e;if(i)throw i;return o})}static \u0275fac=function(e){return new(e||c)(p(l))};static \u0275prov=d({token:c,factory:c.\u0275fac,providedIn:"root"})};export{m as a};

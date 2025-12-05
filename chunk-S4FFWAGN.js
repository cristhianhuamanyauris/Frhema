import{a as l}from"./chunk-O5HRWX2F.js";import{O as m,T as u}from"./chunk-SFQMZB6G.js";import{h as c}from"./chunk-FK42CRUA.js";var _=class d{constructor(t){this.supabase=t}TABLE="compras";TABLE_DET="detalle_compras";getCompras(){return c(this,null,function*(){let{data:t,error:o}=yield this.supabase.client.from(this.TABLE).select(`
        id_compra,
        fecha,
        nro_documento,
        total,
        proveedores ( nombre )
      `).order("id_compra",{ascending:!1});if(o)throw o;return t})}getDetalle(t){return c(this,null,function*(){let{data:o,error:r}=yield this.supabase.client.from(this.TABLE_DET).select(`
        id_detalle_compra,
        cantidad,
        costo_unitario,
        subtotal,
        productos ( nombre )
      `).eq("id_compra",t);if(r)throw r;return o})}registrarCompra(t,o){return c(this,null,function*(){let r={id_proveedor:t.id_proveedor,id_usuario:t.id_usuario,nro_documento:t.nro_documento,total:t.total};t.fecha&&(r.fecha=new Date(t.fecha).toISOString());let{data:e,error:i}=yield this.supabase.client.from(this.TABLE).insert(r).select("id_compra").single();if(i)throw i;let n=e.id_compra,s=o.map(p=>({id_compra:n,id_producto:p.id_producto,cantidad:p.cantidad,costo_unitario:p.costo_unitario})),{error:a}=yield this.supabase.client.from(this.TABLE_DET).insert(s);if(a)throw a;return n})}getResumenComprasPorProducto(t){return c(this,null,function*(){let{data:o,error:r}=yield this.supabase.client.from(this.TABLE_DET).select("cantidad, costo_unitario, subtotal").eq("id_producto",t);if(r)throw r;let e=o?.reduce((s,a)=>s+(a.cantidad||0),0)||0,i=o?.reduce((s,a)=>s+(a.subtotal||0),0)||0,n=e>0?i/e:0;return{cantidad_total:e,precio_unitario_promedio:n,precio_total_compra:i}})}static \u0275fac=function(o){return new(o||d)(u(l))};static \u0275prov=m({token:d,factory:d.\u0275fac,providedIn:"root"})};export{_ as a};

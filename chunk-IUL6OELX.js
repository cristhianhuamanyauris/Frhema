import{a as u}from"./chunk-5T4VIS3M.js";import{O as p,T as m}from"./chunk-V3AN2ELD.js";import{h as c}from"./chunk-FK42CRUA.js";var l=class n{constructor(t){this.supabase=t}TABLE="compras";TABLE_DET="detalle_compras";getCompras(){return c(this,null,function*(){let{data:t,error:o}=yield this.supabase.client.from(this.TABLE).select(`
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
      `).eq("id_compra",t);if(r)throw r;return o})}registrarCompra(t,o){return c(this,null,function*(){let{data:r,error:e}=yield this.supabase.client.from(this.TABLE).insert({id_proveedor:t.id_proveedor,id_usuario:t.id_usuario,nro_documento:t.nro_documento,total:t.total}).select("id_compra").single();if(e)throw e;let s=r.id_compra,d=o.map(a=>({id_compra:s,id_producto:a.id_producto,cantidad:a.cantidad,costo_unitario:a.costo_unitario})),{error:i}=yield this.supabase.client.from(this.TABLE_DET).insert(d);if(i)throw i;return s})}getResumenComprasPorProducto(t){return c(this,null,function*(){let{data:o,error:r}=yield this.supabase.client.from(this.TABLE_DET).select("cantidad, costo_unitario, subtotal").eq("id_producto",t);if(r)throw r;let e=o?.reduce((i,a)=>i+(a.cantidad||0),0)||0,s=o?.reduce((i,a)=>i+(a.subtotal||0),0)||0,d=e>0?s/e:0;return{cantidad_total:e,precio_unitario_promedio:d,precio_total_compra:s}})}static \u0275fac=function(o){return new(o||n)(m(u))};static \u0275prov=p({token:n,factory:n.\u0275fac,providedIn:"root"})};export{l as a};

import{a as n}from"./chunk-M2GT5SNT.js";import{O as a,T as s}from"./chunk-SFQMZB6G.js";import{h as e}from"./chunk-FK42CRUA.js";var u=class o{constructor(i){this.supabase=i}TABLE="usuarios";getUsuarios(){return e(this,null,function*(){let{data:i,error:r}=yield this.supabase.client.from(this.TABLE).select(`
        id_usuario,
        nombre_usuario,
        nombre,
        apellido,
        id_rol,
        roles (
          id_rol,
          nombre_rol
        )
      `).order("nombre_usuario",{ascending:!0});if(r)throw r;return i})}actualizarRolUsuario(i,r){return e(this,null,function*(){let{error:t}=yield this.supabase.client.from(this.TABLE).update({id_rol:r}).eq("id_usuario",i);if(t)throw t;return!0})}crearPerfil(i){return e(this,null,function*(){let{error:r}=yield this.supabase.client.from(this.TABLE).insert(i);if(r)throw r;return!0})}static \u0275fac=function(r){return new(r||o)(s(n))};static \u0275prov=a({token:o,factory:o.\u0275fac,providedIn:"root"})};export{u as a};

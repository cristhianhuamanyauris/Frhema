import{a as n}from"./chunk-5T4VIS3M.js";import{O as t,T as s}from"./chunk-V3AN2ELD.js";import{h as i}from"./chunk-FK42CRUA.js";var u=class e{constructor(o){this.supabase=o}TABLE="usuarios";getUsuarios(){return i(this,null,function*(){let{data:o,error:r}=yield this.supabase.client.from(this.TABLE).select(`
        id_usuario,
        nombre_usuario,
        nombre,
        apellido,
        id_rol,
        roles (
          id_rol,
          nombre_rol
        )
      `).order("nombre_usuario",{ascending:!0});if(r)throw r;return o})}actualizarRolUsuario(o,r){return i(this,null,function*(){let{error:a}=yield this.supabase.client.from(this.TABLE).update({id_rol:r}).eq("id_usuario",o);if(a)throw a;return!0})}static \u0275fac=function(r){return new(r||e)(s(n))};static \u0275prov=t({token:e,factory:e.\u0275fac,providedIn:"root"})};export{u as a};

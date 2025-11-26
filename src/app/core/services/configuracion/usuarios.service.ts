import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../auth/supabase.client';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private TABLE = 'usuarios';

  constructor(private supabase: SupabaseClientService) {}

  // ==================================
  // LISTAR USUARIOS (JOIN ROL)
  // ==================================
  async getUsuarios() {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .select(`
        id_usuario,
        nombre_usuario,
        nombre,
        apellido,
        roles ( id_rol, nombre_rol )
      `);

    if (error) throw error;
    return data;
  }

  // ==================================
  // CREAR USUARIO
  // ==================================
  async addUsuario(u: Usuario, password: string) {

    // Crear user en auth.users
    const { data: auth, error: authError } = await this.supabase.client.auth.signUp({
      email: u.nombre_usuario,
      password: password
    });

    if (authError) throw authError;

    const uid = auth.user?.id!;
    
    // Crear registro en tabla usuarios
    const { error } = await this.supabase.client
      .from(this.TABLE)
      .insert([
        {
          id_usuario: uid,
          nombre_usuario: u.nombre_usuario,
          id_rol: u.id_rol,
          nombre: u.nombre,
          apellido: u.apellido
        }
      ]);

    if (error) throw error;
  }

  // ==================================
  // ACTUALIZAR USUARIO
  // ==================================
  async updateUsuario(id: string, u: Usuario) {
    const { error } = await this.supabase.client
      .from(this.TABLE)
      .update({
        nombre_usuario: u.nombre_usuario,
        id_rol: u.id_rol,
        nombre: u.nombre,
        apellido: u.apellido
      })
      .eq('id_usuario', id);

    if (error) throw error;
  }

  // ==================================
  // ELIMINAR USUARIO (auth + tabla)
  // ==================================
  async deleteUsuario(id: string) {
    // borrar tabla usuarios
    await this.supabase.client.from(this.TABLE).delete().eq('id_usuario', id);

    // borrar auth.users
    await this.supabase.client.auth.admin.deleteUser(id);
  }
}

import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../auth/supabase.client';
import { Rol } from '../../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private TABLE = 'roles';

  constructor(private supabase: SupabaseClientService) {}

  async getRoles(): Promise<Rol[]> {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .select('*')
      .order('id_rol');

    if (error) throw error;
    return data as Rol[];
  }
}

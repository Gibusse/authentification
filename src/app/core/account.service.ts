import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthChangeEvent, AuthSession, Session, SupabaseClient, User, UserAttributes, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Profile } from '../shared/model/profile';
import { LocalUserDefinition } from '../shared/model/user';
import { v4 as uuidV4 } from 'uuid';
import { LoginResponse } from '../shared/model/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private supabase: SupabaseClient;
  private _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
   }

   get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
   }

   public profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
   }
   public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
   }

   public async signUp(data: LocalUserDefinition): Promise<LoginResponse> {
    const { email, password } = data;
    const isExists = await this.signInWithSelect(data);
    if ((email && password ) && !isExists) {
      const insertWithAuth = await this.supabase.from('user').insert({id: uuidV4, created_at: Date.now, email, password });
      const signUpWithAuth = await this.supabase.auth.signUp({ email, password });
      return Promise.resolve({insertWithAuth, signUpWithAuth});
    }
    return Promise.resolve({ insertWithAuth: {}, signUpWithAuth: {}})
   }

   public signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
   }

   public async signInWithSelect(data: LocalUserDefinition): Promise<boolean> {
    const { email, password } = data;

    if (email && password) {
      const { data } = await this.supabase
                                  .auth
                                  .signInWithPassword({ email, password });
      const response = !!(data.user && data.session);
      return Promise.resolve(response);
    }

    return Promise.resolve(false);
   }

   public signOut() {
    return this.supabase.auth.signOut();
   }

   public updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date()
    }
    return this.supabase.from('profiles').upsert(update);
   }

   public downloadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
   }

   public uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
   }

  public createAccount(user: UserAttributes): Observable<UserAttributes> {
    return this.http.post('', user);
  }
}

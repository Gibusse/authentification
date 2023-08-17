import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
// import { User } from '../shared/model/user';
import { Observable } from 'rxjs';
import { AuthChangeEvent, AuthResponse, AuthSession, Session, SupabaseClient, User, UserAttributes, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Profile } from '../shared/model/profile';
import { LocalUserDefinition } from '../shared/model/user';

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

   public signUp(data: LocalUserDefinition): Promise<AuthResponse | null> {
    const { email, password } = data;
    if (email && password) {
      return Promise.resolve(this.supabase.auth.signUp({ email: email, password: password}));
    }
    return Promise.resolve(null)
   }

   public signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
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

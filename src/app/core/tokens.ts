import { InjectionToken } from "@angular/core";
import { IAuthService } from "../shared/services/iauth.service";

export const AUTHSERVICE = new InjectionToken<IAuthService>('IAuthService');

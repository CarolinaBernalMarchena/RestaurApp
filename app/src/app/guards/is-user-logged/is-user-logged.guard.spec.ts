import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { isUserLoggedGuard } from './is-user-logged.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('IsUserLoggedGuard', () => {
  let guard: isUserLoggedGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [RouterTestingModule],
      providers: [isUserLoggedGuard, AuthService]
    });
    guard = TestBed.inject(isUserLoggedGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const route = new ActivatedRouteSnapshot();
    const state = {} as RouterStateSnapshot;
    
    expect(guard.canActivate(route, state)).toBe(true);
  });

  it('should prevent activation and redirect if the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');

    const route = new ActivatedRouteSnapshot();
    const state = {} as RouterStateSnapshot;
    
    expect(guard.canActivate(route, state)).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});

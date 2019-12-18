import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';

@Injectable()
export class ConnexionAdminGarde implements CanActivate
{
    constructor(private connexionServ: ConnexionService, private router: Router) {}

    //verifie que l'utilisateur est co en renvoyant un bool dans la route protege
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        if(this.connexionServ.userActuel.ID_TYPEUTILISATEUR === 1)
        {
            return true;
        }
        else
        {
            //redirection sur la meme page
            this.router.navigate(['']);
        }
    }
}
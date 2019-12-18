import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs' ;
import { Utilisateur } from '../model/utilisateur';
import { Images } from '../model/images';

@ Injectable ({ providedIn : 'root' }) 
export class UtilisateurService
{
    //chemin acces backend
    private LAVAREL_API_SERV: string = "http://127.0.0.1/qtoui/BOUH/AngularProjet/backend/ProjetTemplate/public/api";

    images: Images =
    {
        ID_IMG: null,
        TITRE_IMG: null
    }

    constructor(private http: HttpClient) {}


    ListeUtilisateurOdreAlphabetique(): Observable<Utilisateur[]>
    {
        return this.http.get<Utilisateur[]>(`${this.LAVAREL_API_SERV}/listeUtilisateur`);
    }

    ListerImage(): Observable<Images[]>
    {
        return this.http.get<Images[]>(`${this.LAVAREL_API_SERV}/listeImages`);
    }

    ModifierImageUtilisateur(infos: any, id: any): Observable<any>
    {
        return this.http.get<any>(`${this.LAVAREL_API_SERV}/modifierImage/${infos}/${id}`);
    }
}
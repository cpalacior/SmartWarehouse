import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToDashboard() {
    const url = 'http://localhost:3001/api/v1/admin/authenticate';

    const body = {
      email: this.email,
      password: this.password,
    };

    console.log('Cuerpo de la solicitud:', body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    Swal.fire({
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.http.post(url, body, { headers }).subscribe(
      (response: any) => {
        Swal.close();
        console.log('Respuesta del servidor:', response);

        if (response.token && response.authentication === true) {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Ingreso exitoso',
            confirmButtonText: 'Ir al dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('adminId',response.adminId);
              localStorage.setItem('WarehouseId',response.WarehouseId)
              this.authService.setLoggedIn(true);
             // window.open('http://localhost:4200/dashboard')
             this.router.navigate(['/dashboard']);

            }


          });
          // 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Autenticación fallida'
          });
        }
      },
      (error) => {
        Swal.close();
        console.error('Error al realizar la solicitud:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al realizar la solicitud al servidor'
        });
      }
    );

  }


}

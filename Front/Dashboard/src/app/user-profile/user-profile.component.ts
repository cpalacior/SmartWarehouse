import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  warehouseName: string = '';
  warehouseSize: number = null;
  warehouseLocation: string = '';
  adminName: string = '';
  adminEmail: string = '';
  adminPhone: string = '';
  adminAddress: string = '';
  adminPassword: string = '';

  isEditing: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.adminPassword = '';
    }
  }


  saveChanges() {
    this.editProfile();
    this.isEditing = false;
  }

  ngOnInit() {
    this.getWarehouse();
    this.getUserData();
  }


  editProfile() {
    Swal.fire({
      allowOutsideClick: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `http://localhost:3001/api/v1/admin/update`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    });
    const body: any = {
      name: this.adminName,
      email: this.adminEmail,
      phone: this.adminPhone,
      address: this.adminAddress
    };
    //validar que la contraseña no se vaya vacia... en caso de que vaya vacia no se incluye en el body
    if (this.adminPassword.trim() !== '') {
      body.password = this.adminPassword;
    }
    console.log(body);
    this.http.post(url, body, { headers }).subscribe(
      (response: any) => {
        Swal.close();
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Perfil modificado exitosamente',
          showConfirmButton: false,
          timer: 1500

        })
        // alert('Perfil modificado exitosamente');
        // this.router.navigate(['/user-profile']);
      },
      (error) => {
        if(error.status === 403){
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha vencido el token, ingresar de nuevo',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            this.router.navigate(['/login']);
          });
        }
        else {
          Swal.close();
          console.log(error);
          Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al realizar la solicitud al servidor'
        });
        }
      }
    )
  }

  getWarehouse() {

    const url = `http://localhost:3001/api/v1/warehouse/get/${localStorage.getItem('WarehouseId')}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    });
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.warehouseName = response.name;
        this.warehouseLocation = response.location.charAt(0).toUpperCase() + response.location.slice(1);
        this.warehouseSize = response.size;
      },
      (error) => {
        console.error('Error al realizar la solicitud:', error);
      }
    )

  }

  getUserData() {
    Swal.fire({
      allowOutsideClick: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `http://localhost:3001/api/v1/admin/get`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    });

    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        Swal.close();
        console.log(response);
        this.adminName = response.name.charAt(0).toUpperCase() + response.name.slice(1);
        this.adminEmail = response.email;
        this.adminPhone = response.phone;
        this.adminAddress = response.address;
        this.adminPassword = response.password;

      },
      (error) => {
        if(error.status === 403){
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha vencido el token, ingresar de nuevo',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            this.router.navigate(['/login']);
          });
        }
        else {
          Swal.close();
          console.log(error);
          Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al realizar la solicitud al servidor'
        });
        }
      }
    )

  }

}



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;





  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) { 
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]], 
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9\d]+$")]],
      confirmPassword: ['',[Validators.required]],
      warehouseName: ['', [Validators.required]],
      wareHouseLocation: ['', [Validators.required]],
      wareHouseSize: [null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
    },{ validators: this.passwordMatchValidator });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
        formGroup.get('confirmPassword').setErrors({ mismatch: true });
    } else {
        formGroup.get('confirmPassword').setErrors(null);
    }
}

  register() {
    const urlAdmin = 'http://localhost:3001/api/v1/admin/create';
    const urlWarehouse = 'http://localhost:3001/api/v1/warehouse/create';
    if(this.registerForm.valid){

    const adminBody = {
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password,
    };
    const warehouseBody = {
      name: this.registerForm.value.warehouseName,
      size: this.registerForm.value.wareHouseSize,
      location:this.registerForm.value.wareHouseLocation,

    }

    console.log('Cuerpo de la solicitud:', adminBody);

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

    this.http.post(urlWarehouse, warehouseBody, { headers }).subscribe(
      (response: any) => {
        Swal.close();
        console.log('Respuesta del servidor:', response);

        if (response.warehouse) {
          adminBody["WarehouseId"] = response.warehouse.id;
          this.http.post(urlAdmin,adminBody,{headers}).subscribe(
            (response: any) =>{
              if(response.admin){
                Swal.fire({
                  icon: 'success',
                  title: 'Bienvenido',
                  text: 'Registro exitoso'
                });
                this.router.navigate(['/login']); 
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Registro fallido'
                });
              }
              
          })
          
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
  else{
    console.log(this.registerForm.value + 'is invalid')
  }
  }
}

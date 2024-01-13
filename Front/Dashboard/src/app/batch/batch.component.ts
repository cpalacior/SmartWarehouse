import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      number_of_packages: ['', [Validators.max(25)]],
      weight: [''],
      input_date: [''],
      additionalRows: this.fb.array([]) // Filas dinámicas se gestionan como un FormArray
    });
  }

  ngOnInit(): void {
    this.form.get('number_of_packages').valueChanges.subscribe(value => {
      this.updateAdditionalRows(value);
    });
  }

  get additionalRows(): FormArray {
    return this.form.get('additionalRows') as FormArray;
  }

  updateAdditionalRows(count: number): void {
    this.additionalRows.clear(); // Eliminar filas existentes
    for (let i = 0; i < count; i++) {
      this.additionalRows.push(this.fb.group({
        weight: [''],
        height: [''],
        width: [''],
        depth: [''],
        output_date: [null],
        overlap: [false],
        category: [''],
        perishable: [false],
        expiration_date: [null]
      }));
    }
  }



  onSubmit(): void {
    this.sendData();
  }

  sendData() {
    const url = "http://localhost:3001/api/v1/package/create";

    // Replace 'form' with your actual FormGroup variable name
    const formData = this.form.value;

    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    Swal.fire({
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });


    this.http.post(url, formData, { headers }).subscribe(

      (response: any) => {

        console.log(response)

        const urlDB = "http://localhost:5000/api/v1/optimize";


        this.http.post(urlDB, response, { headers }).subscribe(
          (response: any) => {
            Swal.close();
            for (const key in response) {
              if (response.hasOwnProperty(key)) {
                const { level, section, slot } = response[key];
                const responseString = `Por favor dirigirse a la seccion "Inventario" para
                 validar la ubicacion recomendada de los paquetes ingresados`;

                Swal.fire({
                  title: 'Paquetes ubicados exitosamente',
                  text: responseString,
                  icon: 'info',
                  confirmButtonText: 'Ir al inventario'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/storage']);
                  }
                });
              }
            }
          }
        );

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
    );
  }
}



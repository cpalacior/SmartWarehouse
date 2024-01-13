import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})

export class SectionsComponent implements OnInit {

  name: string;
  depth: number;
  width: number;
  num_of_slots: number;
  distanciaPuertaRows: number;
  dataset2: Array<any> = [];
  editableIndex: number;
  editedSection: any = {};
  distanciaPuertaData: number[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  generateSections() {
    const numOfSlots = this.num_of_slots; // Get the value from the input

    // Clear the existing dataset
    this.dataset2 = [];

    // Generate rows based on the input value
    for (let i = 0; i < numOfSlots; i++) {
      const section = {
        code: i + 1, // You can define a code as per your requirement

      };
      this.distanciaPuertaRows = this.num_of_slots;
      this.dataset2.push(section);
    }
  }

  openModal() {
    $('#exampleModal').on('show.bs.modal', function (event) {

    });
  }

  deleteSection(id: number) {
    const url = `http://localhost:3001/api/v1/section/delete/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    this.http.post(url, {}, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Eliminación Exitosa',
          text: 'Se ha eliminado la sección correctamente'
        }).then((result) => {
          if (result.isConfirmed) {
            // Refresh the data from the API
            this.getDataFromAPI();
          }
        });
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

  // Function to confirm section deletion
  confirmDelete(index: number) {
    Swal.fire({
      title: '¿Esta seguro de que desea eliminar la sección?',
      text: 'Esta acción eliminará la sección permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSection(this.dataset[index].id);
      }
    });
  }


  updateSection(section: any) {
    const url = `http://localhost:3001/api/v1/section/update/${section.id}`;
    const body = {
      "name": section.name,
      "width": section.width,
      "depth": section.depth,
      "num_of_slots": section.num_of_slots
    };
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    this.http.post(url, body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        console.log("body", body);

        if (response.section) {
          Swal.fire({
            icon: 'success',
            title: 'Actualización Exitosa',
            text: 'Se ha actualizado la sección correctamente'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.router.navigate(['/sections']);
              window.location.reload();
            }
          });

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la sección'
          });
        }
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


  sendData() {
    const url = "http://localhost:3001/api/v1/section/create"
    const body = {
      "name": this.name,
      "width": this.width,
      "depth": this.depth,
      "num_of_slots": this.num_of_slots
    }
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    Swal.fire({
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    console.log("body", body)

    this.http.post(url, body, { headers }).subscribe(
      (response: any) => {
        Swal.close();

        console.log(response)

        if (response.section) {
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Se ha creado la sección correctamente',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {

              const url = "http://localhost:3001/api/v1/slot/createbulk"
              const body = {
                "num_of_slots": this.num_of_slots,
                "section_code":response.section.code,
                "SectionId": response.section.id,
                "height": 10,
                "width": 10,
                "depth": 10,
                "distance_to_door": this.distanciaPuertaData}
              console.log(body)
                this.http.post(url, body, {headers}).subscribe()

              window.location.reload();
            }
          });


        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear la sección'
          });
        }
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

  editItem(index: number) {
    this.editedSection = { ...this.dataset[index] };
    this.editableIndex = index;
  }

  // Function to save the edited section
  saveItem(index: number) {
    this.updateSection(this.editedSection);
    this.editableIndex = null;
    this.editedSection = null;
  }

  // Function to cancel the edit
  cancelEdit() {
    this.editableIndex = null;
    this.editedSection = null;
  }

  ngOnInit(): void {
    this.getDataFromAPI();
  }

  dataset = [];

  getDataFromAPI() {
    // Realiza una solicitud HTTP GET a la URL de la API
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    this.http.get<any[]>('http://localhost:3001/api/v1/section/list', { headers })
      .subscribe(data => {
        // Cuando se reciban los datos, guárdalos en la variable dataset
        this.dataset = data;
        
      },
      (error) => {
        if(error.status === 403){
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha vencido el token, ingresar de nuevo',
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((result) => {
            this.router.navigate(['/login']);
          });
        }

      }  
      );
      
  }

}

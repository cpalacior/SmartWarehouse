import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  height: string = "";
  width: string = "";
  depth: string = "";
  distance_to_door: string = "";

  editedSlot: any = null;
  editableIndex: number | null = null;


  deleteSlot(id: number) {
    Swal.fire({
      allowOutsideClick: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `http://localhost:3001/api/v1/slot/delete/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    this.http.post(url, {} , { headers }).subscribe(
      (response: any) => {
        Swal.close();
        console.log(response);
        console.log(`headers: ${JSON.stringify(headers)}`)

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
        this.deleteSlot(this.dataset[index].id);
      }
    });
  }


  updateSlot(slot: any) {
    const url = `http://localhost:3001/api/v1/slot/update/${slot.id}`;
    const body = {
      "height": slot.height,
      "width": slot.width,
      "depth": slot.depth,
      "distance_to_door": slot.distance_to_door
    };
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    this.http.post(url, body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        console.log("body", body);

        if (response.slot) {
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


  editItem(index: number) {
    this.editedSlot = { ...this.dataset[index] };
    this.editableIndex = index;
  }

  // Function to save the edited section
  saveItem(index: number) {
    this.updateSlot(this.editedSlot);
    this.editableIndex = null;
    this.editedSlot = null;
  }

  // Function to cancel the edit
  cancelEdit() {
    this.editableIndex = null;
    this.editedSlot = null;
  }

  ngOnInit(): void {
    this.getDataFromAPI();
    this.getSections();
  }

  sections: any[] = [];

  getSections() {
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') });
    this.http.get<any[]>('http://localhost:3001/api/v1/section/list', { headers })
      .subscribe(data => {
        this.sections = data;
      },      (error) => {
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
      });
  }

  getSectionName(SectionId: number): string {
    const section = this.sections.find(s => s.id === SectionId);
    return section ? section.name : 'Nombre no encontrado';
  }

  dataset = [];

  getDataFromAPI() {
    // Realiza una solicitud HTTP GET a la URL de la API
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })

    this.http.get<any[]>('http://localhost:3001/api/v1/slot/list', { headers })
      .subscribe(data => {
        // Cuando se reciban los datos, guárdalos en la variable dataset
        this.dataset = data;
      },      (error) => {
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
      });
  }

}

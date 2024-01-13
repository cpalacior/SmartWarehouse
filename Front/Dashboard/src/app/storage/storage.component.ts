import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient) { }

  dataset = [];

  ngOnInit() {
    this.getDataFromAPI(); // Llama a la función para obtener datos al iniciar el componente
  }

  getDataFromAPI() {
    // Realiza una solicitud HTTP GET a la URL de la API
    const headers = new HttpHeaders({ "Content-Type": "application/json",'token':localStorage.getItem('token') });
    this.http.get<any[]>('http://localhost:3001/api/v1/package/list',{headers})
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

  selectedItems: any[] = [];

  async openDeleteConfirmation() {
    const result = await Swal.fire({
      title: '¿Está seguro de que desea despachar los elementos seleccionados?',
      text: 'Esta acción eliminará los elementos permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      this.deleteSelectedItems();
    }
  }

  async deleteSelectedItems() {
    for (const selectedItem of this.selectedItems) {
      const index = this.dataset.indexOf(selectedItem);
      if (index !== -1) {
        const url = `http://localhost:3001/api/v1/package/delete/${selectedItem.id}`;
        const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') });
        await this.http.post(url,{}, { headers }).toPromise();
        this.dataset.splice(index, 1);
      }
    }
    this.selectedItems = [];
  }

updateSelectedItems(item) {
  if (item.selected) {
    this.selectedItems.push(item);
  } else {
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }
}
}

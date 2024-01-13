import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  dataset: any[] = [];

  ngOnInit(): void {
    this.getDataFromAPI();
  }

  getDataFromAPI() {
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') })
    this.http.get<any[]>('http://localhost:3001/api/v1/notification/list/', { headers }).subscribe(
      (data) => {
        this.dataset = data;
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }

  confirmDelete(index: number, notificationId: string) {
    Swal.fire({
      title: '¿Esta seguro de que desea eliminar la notificacion?',
      text: 'Esta acción eliminará la notificacion permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteNotification(index, notificationId);
      }
    });
  }


  deleteNotification(index: number, notificationId: string) {
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'token': localStorage.getItem('token') });

    this.http.post(`http://localhost:3001/api/v1/notification/delete/${notificationId}`, {}, { headers }).subscribe(
      () => {
        // If the deletion is successful, remove the item from the dataset
        this.dataset.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'Eliminación Exitosa',
          text: 'Se ha eliminado la notificacion correctamente'
        });
      },
      (error) => {
        console.error('Error deleting notification:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: 'Hubo un error al intentar eliminar la notificacion'
        });
      }
    );
  }
}




import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { UserManagementService } from '../../services/UserManagement/user-management.service';
import { UsersettingsComponent } from '../update/usersettings/usersettings.component';

export interface UserList {
  id: number;
  usertype:string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  contactnumber: string;
  birthdate: string;
  address: string;
  sex: string;
  action:string;
  status:string;
}

@Component({
  selector: 'app-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  
  VOForm: FormGroup | undefined;
  isEditableNew = true;
  
  userList: any = [];
  dataSource: any;
  selection: any;
  showFiller = false;
  displayedColumns: string[] = ['id', 'usertype','firstname', 'middlename', 'lastname','email','contactnumber','birthdate','address','sex','status','action'];
  constructor(
    public userMngtService: UserManagementService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    
  }
 
  activateUser(id:any){
    Swal.fire({
      title: 'Are you sure you want  to activate this account?',
      showCancelButton: true,
      confirmButtonText: 'Activate Now',
      showLoaderOnConfirm: true,      
      preConfirm: () => {        
        return;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id
        }
        this.userMngtService.activateUser(data)
        .pipe(
          finalize(() =>{
            // not required
          })
        ).subscribe((response:any) =>{
          if(response.flag == true){            
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            this.getAllUsers();
          }else{
            let messageResponse = "";
            for(let i = 0; i < response.message.length; i++) {
              messageResponse += response.message[i]+"\n";
            }
            Swal.showValidationMessage(messageResponse);
          }
        },
        (error:any) =>{
          Swal.showValidationMessage(error.message);
          console.log(error)
        });
      }
    })
  }

  deactivateUser(id:any){
    Swal.fire({
      title: 'Are you sure you want  to deactivate this account?',
      showCancelButton: true,
      confirmButtonText: 'Deactivate Now',
      showLoaderOnConfirm: true,      
      preConfirm: () => {        
        return;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id
        }
        this.userMngtService.deactivateUser(data)
        .pipe(
          finalize(() =>{
            // not required
          })
        ).subscribe((response:any) =>{
          if(response.flag == true){            
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            this.getAllUsers();
          }else{
            let messageResponse = "";
            for(let i = 0; i < response.message.length; i++) {
              messageResponse += response.message[i]+"\n";
            }
            
            Swal.showValidationMessage(messageResponse);
          }
        },
        (error:any) =>{
          Swal.showValidationMessage(error.message);
          console.log(error)
        });
      }
    })
  }

  banUser(id:any){
    Swal.fire({
      title: 'Are you sure you want to ban this account?',
      showCancelButton: true,
      confirmButtonText: 'Ban Now',
      showLoaderOnConfirm: true,      
      preConfirm: () => {        
        return;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id
        }
        this.userMngtService.banUser(data)
        .pipe(
          finalize(() =>{
            // not required
          })
        ).subscribe((response:any) =>{
          if(response.flag == true){            
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            this.getAllUsers();
          }else{
            let messageResponse = "";
            for(let i = 0; i < response.message.length; i++) {
              messageResponse += response.message[i]+"\n";
            }
            
            Swal.showValidationMessage(messageResponse);
          }
        },
        (error:any) =>{
          Swal.showValidationMessage(error.message);
          console.log(error)
        });
      }
    })
  }

  unBanUser(id:any){
    Swal.fire({
      title: 'Are you sure you want to unban this account?',
      showCancelButton: true,
      confirmButtonText: 'Unban Now',
      showLoaderOnConfirm: true,      
      preConfirm: () => {        
        return;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id
        }
        this.userMngtService.activateUser(data)
        .pipe(
          finalize(() =>{
            // not required
          })
        ).subscribe((response:any) =>{
          if(response.flag == true){            
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            this.getAllUsers();
          }else{
            let messageResponse = "";
            for(let i = 0; i < response.message.length; i++) {
              messageResponse += response.message[i]+"\n";
            }
            
            Swal.showValidationMessage(messageResponse);
          }
        },
        (error:any) =>{
          Swal.showValidationMessage(error.message);
          console.log(error)
        });
      }
    })
  }

  deleteUser(id:any){
    Swal.fire({
      title: 'Are you sure you want to delete this account?',
      showCancelButton: true,
      confirmButtonText: 'Delete Now',
      showLoaderOnConfirm: true,      
      preConfirm: () => {        
        return;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id
        }
        this.userMngtService.deleteUser(data)
        .pipe(
          finalize(() =>{
            // not required
          })
        ).subscribe((response:any) =>{
          if(response.flag == true){            
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            this.getAllUsers();
          }else{
            let messageResponse = "";
            for(let i = 0; i < response.message.length; i++) {
              messageResponse += response.message[i]+"\n";
            }
            
            Swal.showValidationMessage(messageResponse);
          }
        },
        (error:any) =>{
          Swal.showValidationMessage(error.message);
          console.log(error)
        });
      }
    })
  }

  openDialogUserSettings(id:any): void{
    const dialogRef = this.dialog.open(UsersettingsComponent,{
       disableClose:true,
       width:'500px',
       data: {
         id: id
       }
    });
    dialogRef.afterClosed().subscribe(() => this.getAllUsers());
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: ListComponent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.applyFilter.name + 1}`;
  }
  
  public getAllUsers(): void {
    this.userMngtService.getUsers().subscribe((data: any) => {
      this.userList = data;
      this.dataSource = new MatTableDataSource<UserList>(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<UserList>(true, []);
    })
  }


}

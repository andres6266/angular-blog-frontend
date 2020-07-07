//Hay que imporar Input para recibir los datos enviados desde el html de otro componente y reutilizarlos
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  //Son las variables enviadas mediante la etiqueta post-list
  @Input() posts;
  @Input() identity;
  @Input() url;
  //Traer un metodo de otro componente
  @Output()
  eliminarPorId=new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  //El metodo va a funcionar 
  deletePs(postId){
    this.eliminarPorId.emit(postId);
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {}

  setItem(item,obj){
    localStorage.setItem(item, JSON.stringify(obj));
  }

  getSingleItem(item){
      return ( (JSON.parse (localStorage.getItem (item) ) ) )
  }

  getItem(item){
    return {
      token:     ( (JSON.parse (localStorage.getItem (item) ) ).token ),
      nameOfAkk: ( (JSON.parse (localStorage.getItem (item) ) ).nameOfAkk ),
      proxiIp:   ( (JSON.parse (localStorage.getItem (item) ) ).proxiIp ),
      proxiPort: ( (JSON.parse (localStorage.getItem (item) ) ).proxiPort )
  };
  }
  getAllItems(){
    let arr = []; 
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    arr.push( (JSON.parse (localStorage.getItem (localStorage.key( i )) ) ).data );
    }
    console.log(arr);
    return (arr);
  }

  deleteItem(item){

    console.log("удяляемый element",item);
    localStorage.removeItem(item);

    //сдвигаем на одну позицию назад,так как удалили
    for ( var i = item, len = localStorage.length; i < len; ++i ) {
      let tmpObj = ( (JSON.parse (localStorage.getItem (i = i+1))));
      localStorage.removeItem(i);
      this.setItem( i = i - 1,tmpObj)
     }
  }

  getLength(){
      return localStorage.length; 
  }

  //проверка на совпадение токенов
  checkExistToken(token){
   let arr = []; 
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    arr.push( (JSON.parse (localStorage.getItem (localStorage.key( i )) ) ) );
    }

  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      if(arr[i]["token"] == token){
        return false;      
      }
  }
  return true;
  }

  editItem(item,obj){
    let getItem = this.getSingleItem(item)
    getItem["token"]     = obj.token;
    getItem["nameOfAkk"] = obj.nameOfAkk;
    getItem["proxiIp"]   = obj.proxiIp;
    getItem["proxiPort"] = obj.proxiPort;
   this.setItem(item,getItem)
  }
}

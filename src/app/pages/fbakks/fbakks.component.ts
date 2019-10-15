import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedService } from '../../layouts/shared-service';
import {HttpClient}    from '@angular/common/http'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FacebookService} from '../../services/facebook/facebook.service';
import {LocalstorageService} from  '../../services/localstorage/localstorage.service';


import { FormBuilder, FormGroup,FormArray,FormControl  } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'fbakks',
  templateUrl: './fbakks.component.html',
  styleUrls: ['./fbakks.component.scss']
})

export class PageFbakksComponent implements OnInit {
myForm: FormGroup;

response:any 

//колонки в таблице
columns:any = [];

//Данные в тиблице
dataOfColumns:any = [];


constructor(private modalService: BsModalService,
            private facebookService:FacebookService,
            private formBuilder: FormBuilder,
            private ls:LocalstorageService){ 
   this.myForm = this.formBuilder.group({
      radio: 'C',
      orders: new FormArray([]),
      date:   null,
      range:  null
    });
   this.addCheckboxes();

   //загружаем все из локалсторадж
   // this.arrOfObj = []; 
   this.arrOfObj = (this.ls.getAllItems());
}

ngOnInit(){

}

dataPicker(event,item){
this.dateOne = event[0].toJSON().substr(0, 10);
this.dateTwo = event[1].toJSON().split('T')[0];

this.day = null;

this.refresh(item);
console.log(this.dateOne);
console.log(this.dateTwo);
}


count = 0 ;

//переключение кнопок рекламы
adsButtonChange(btn){
  //Проверка на нажатие кнопки два раза
  // this.search()
  // 0 кампании
  // 1 адсеты
  // 2 обьявления

  let nameOfColumn = ["Название кампании","Название группы объявлений","Название объявления"]
  this.dataOfColumns[0] = nameOfColumn[btn]
  console.log(this.dataOfColumns[0])  
  // this.search();
}

search(akkData?){


 //провкрка на существование токена
  console.log(this.ls.checkExistToken(akkData.token))

  if(this.ls.checkExistToken(akkData.token)){
  
  return this.facebookService.getDataOfAds(akkData.token).toPromise().then(response => { 
      console.log('Promise resolved.')
      this.response = response;

      this.saveResponses(this.response,akkData);
      console.log(this.response)

      //Если ответ пришел
      // this.makeDataOfTable();
    })
    //если ошибка
    .catch((err:any) => {
      console.log(err)
    });
  }

  // else{

  //   this.openModal("templateCheckOnExistToken"); 
  // }
    
}

//данные добавляемого акка


//Обьект данных для каждого рекламного кабинета
adsData:any = {  
  account_status:"",
  amount_spent:"",
  balance:"",
  business_country_code:"",
  currency:"",
  disable_reason:"",
  name:"",
  spend_cap:"",
  clicks:"",
  configured_status:"",
  cost_per_lead_fb:"",
  cost_per:"", 
  nameOfAkk:""  
}

//количество акков
countOfAkks:number = 0;
//массив обьектов
arrOfObj:any = [];


objOfAkkAndToken = [];

dataPickerHolder(){

  if(this.day){
    return this.day 
  }  
  else if(this.dateOne && this.dateTwo){
    return this.dateOne && this.dateTwo
  }
  else{
    return "lifetime"; 
  }
}
refresh(item){
  console.log(item);
  let key = item;
  console.log(item);
  console.log(this.dateOne);
  console.log(this.dateTwo);

  let obj = this.ls.getItem(key);

  console.log(obj);

   return this.facebookService.getDataOfAds(obj.token,this.dateOne,this.dateTwo,this.day).toPromise().then(response => { 
      console.log('Promise resolved.')
      this.response = response;

      this.response["token"] = obj.token;
      this.response["nameOfAkk"] = obj.nameOfAkk;
      this.response["proxiIp"] = obj.proxiIp;
      this.response["proxiPort"] = obj.proxiPort;

      this.ls.setItem(key,this.response) 


      // console.log(this.getComment(obj.token));
      this.getComment(obj.token);

       //Очищаем массив
    // this.arrOfObj = []; 

    //заполняем его из локал стораджа
    this.arrOfObj = this.ls.getAllItems()

    })
    //если ошибка
    .catch((err:any) => {
      console.log(err)
    })
}

isOpen = true;
akkData:any = {  
  token:"",
  nameOfAkk:"",
  proxiIp:"",
  proxiPort:"",  
}

fbCommentsId = [];
fbPageIdAndTokens = [];
ObjAdPostAndToken;
fbAdsPosts = [];
tokenForComments;
getComment(token){

  this.tokenForComments = token;
  this.facebookService.getAdsPostsAndPagesTokens(token).toPromise().then(response => { 
      console.log('Promise resolved. comments');
      
      let objComments = response;
      console.log(objComments)

      
      
      //получаем все рекламные посты и токены страниц 
      for ( let i = 0, len = objComments["data"].length-1; i < len; ++i ) {
        if(objComments["data"][i]["ads"]){
          
        for ( let j = 0, len = objComments["data"][i]["ads"]["data"].length-1; j < len; ++j ) {
             this.fbAdsPosts.push(objComments["data"][i]["ads"]["data"][j]["creative"]["effective_object_story_id"])      
        }  
       }

       if(objComments["data"][i]["promote_pages"]){
           for(let k = 0, len = objComments["data"][i]["promote_pages"]["data"].length; k < len; ++k ){
            let id = objComments["data"][i]["promote_pages"]["data"][k]["id"]
            let token = objComments["data"][i]["promote_pages"]["data"][k]["access_token"]
            this.fbPageIdAndTokens.push({id:id,token:token})
          }  
        }
       }

       //убираем дубли
      function unique(arr) {
        let result = [];

        for (let str of arr) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }
        return result;
      }

      //уникализируем массив обьектов id страницы
      function uniqueObj(obj) {
        if(obj){
        let newObj = []
        let count = 0;
        for ( let i = 0, len = obj.length; i < len; ++i ) {
          let id = obj[i]["id"];
          let token = obj[i]["token"];
          for ( let j = i + 1, len = obj.length; j < len; ++j ){
              if(obj[i]["id"] == obj[j]["id"]){
                ++count;
              }
          }  
          if(count == 0){
                newObj.push({id:id,token:token})
              }
        count = 0;
        }
        return newObj;
      }
    }

      //на этом этапе у меня есть ads posts все и токены страниц
      //нужно получить все комментарии из постов

      console.log(unique(this.fbAdsPosts));
      console.log(uniqueObj(this.fbPageIdAndTokens)); 

      this.hideComments(token); 
        
    })
    //если ошибка
    .catch((err:any) => { 
      console.log(err)
    })

// setTimeout(this.delCoomment, 5000);
}
 
allComments = [];
hideComments(token){  
  for (let j = 0, len = this.fbAdsPosts.length; j < len; ++j) {
          this.facebookService.getComments(this.fbAdsPosts[j],token).toPromise().then(response => { 
            console.log(response)
            
          if(response["comments"] && response["comments"]["data"]){
            console.log("зашел в дату");
            for ( let i = 0, len = response["comments"]["data"].length; i < len; ++i ) {
             if(response["comments"]["data"][i]["is_hidden"] == false){
               console.log(response["comments"]["data"][i]["id"])

               let comment_id = response["comments"]["data"][i]["id"].split('_')[0];
               console.log(comment_id)
               for ( let k = 0, len = this.fbAdsPosts.length; k < len; ++k ){
                  console.log(this.fbAdsPosts[k]) 
                 let adsPost = this.fbAdsPosts[k].split('_')[1];
                 if(comment_id == adsPost){
                   console.log("равно",comment_id);
                   for ( let z = 0, len = this.fbPageIdAndTokens.length; z < len; ++z ){
                     let page = this.fbPageIdAndTokens[z]["id"]
                     console.log("page and adsPost")
                     console.log(page)
                     console.log(adsPost.split('_')[0])

                     if(page == this.fbAdsPosts[k].split('_')[0]){
                       let comment = response["comments"]["data"][i]["id"];
                       let token = this.fbPageIdAndTokens[z]["token"]
                       console.log("запрос",comment,token);

                       this.facebookService.hideComments(comment,token).toPromise().then(response => { 
                        console.log('Promise resolved.')
                        this.response = response;

                        console.log(this.response)

                        //Если ответ пришел
                        // this.makeDataOfTable();
                      })
                      //если ошибка
                      .catch((err:any) => {
                        // console.log(err)
                      });;

                     }
                   }
                   
                 }  
               }     
                
             }  
            }
          }
        })
    //если ошибка
    .catch((err:any) => {
      console.log(err)
    })            
}}
adsetToPause(item,adset_id){
  let obj = this.ls.getItem(item);

  // this.facebookService.pauseAdset(adset_id,obj.token).toPromise().then(response => { 
  //     console.log('Promise resolved.')
  //     this.response = response;

  //     console.log(this.response)

  //     //Если ответ пришел
  //     // this.makeDataOfTable();
  //   })
  //   //если ошибка
  //   .catch((err:any) => {
  //     console.log(err)
  //   });;

  console.log(adset_id,item);




}

dateOne = null;
dateTwo = null;

day = null;

dataDate(item,day){

  this.day = day;
  this.dateOne = null;
  this.dateTwo = null;
  console.log(day);

this.refresh(item);
}


//сохранение всех обьектов в массив
saveResponses(res,akkData){

    this.arrOfObj = []; 
  
    //получаем номер аккаунта

    let item = this.ls.getLength();

    //прописываем новые поля в каждый аккаунт

    res["token"] = akkData.token;
    res["nameOfAkk"] = akkData.nameOfAkk;
    res["proxiIp"] = akkData.proxiIp;
    res["proxiPort"] = akkData.proxiPort;

    console.log(res);
   
    //записываем в локалсторадж
    this.ls.setItem(item,res);
   
    //Очищаем массив
    this.arrOfObj = []; 

    //заполняем его из локал стораджа
    this.arrOfObj = this.ls.getAllItems();

console.log(this.arrOfObj)
    
}


tmp(){

var output = [];

for (var key in localStorage) {
    output.push(localStorage[key]);
}
console.log(output)

output.sort();


console.log(output)

// let arr = [{}]  
// for (var key in localStorage) {
//        arr.push(localStorage[key]);
//     }
//     console.log(arr);
  // this.ls.setItem()
}


//сортировка 
// compare(obj) {
//   if (a > b) return 1; // если первое значение больше второго
//   if (a == b) return 0; // если равны
//   if (a < b) return -1; // если первое значение меньше второго
// }


//добавление аккаунта
addAkk(obj){
//name,token,proxiIp,proxiPort
console.log(obj)

//добавляем аккордеон секцию для акка
this.addGroupItem(obj.nameOfAkk);
}

makeTable(item){
  console.log("item");
  console.log(item);
}


checkMyData(){}

//формирование таблицы
  makeDataOfTable(btn?){

  //получение данных по api

  //формирование массивов

  // this.dataOfColumns[]
  }

groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];
 

 //в аккордион добавить элемент
  addGroupItem(name): void {


console.log(name);
    this.groups.push({
      title: name,
      content: name
    });
  }




  modalRef: BsModalRef;

  // name = new FormControl('');

  checkModel: any = { left: false, middle: true, right: false };


 items = ['Item 1', 'Item 2', 'Item 3'];
 
  addItem(): void {
    this.items.push(`Item ${this.items.length + 1}`);
  }

 ordersData = [
  { id: 1, name: 'order 1' },
  { id: 2, name: 'order 2' },
  { id: 3, name: 'order 3' },
  { id: 4, name: 'order 4' }
];

  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.myForm.controls.orders as FormArray).push(control);
    });
  }

stolbValue(){
const selectedOrderIds = this.myForm.value.orders
      .map((v, i) => v ? this.myForm[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
}


submit() {
    const selectedOrderIds = this.myForm.value.orders
      .map((v, i) => v ? this.ordersData[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

rooles:any = ["один","два","три"]   


getRoole(rool){
  console.log(rool)
}

resetData(){
  this.akkData.token     = "";
  this.akkData.nameOfAkk = "";
  this.akkData.proxiIp   = "";
  this.akkData.proxiPort = "";
}

getCustomName(j){
 return this.ls.getItem(j)["nameOfAkk"];
}

//в бд записываем

getDataForEditAkk(j){
  let obj = this.ls.getItem(j);
    this.akkData.token     = obj["token"];
    this.akkData.nameOfAkk = obj["nameOfAkk"];
    this.akkData.proxiIp   = obj["proxiIp"];
    this.akkData.proxiPort = obj["proxiPort"];
}

editAkk(){
  this.ls.editItem(this.editItem,this.akkData);
}


deleteAkk(){
  this.ls.deleteItem(this.delItem); 
  console.log(this.delItem);

  //загружаем все из локалсторадж
   this.arrOfObj = []; 
   this.arrOfObj = (this.ls.getAllItems());
}


delItem:number;
editItem:number;

openModal(template) {
    this.modalRef = this.modalService.show(template);
}



}

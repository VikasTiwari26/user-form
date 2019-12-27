import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { breeds } from '../json/breeds';
import { types } from '../json/types';
import { element } from 'protractor';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  breeds=breeds;
  types=types;
  pet_breeds:any[];
  is_pet:boolean=true;

  constructor(
    public fb:FormBuilder,
    private regService:UserService
    ) { }
  
  user:FormGroup;
  show:boolean=true;
  pet_data():FormGroup{
    return this.fb.group({
      name: ['',{updateOn:'change'}],
      type: ['',{updateOn:'change'}],
      breed: ['',{updateOn:'change'}],
      is_active:[1],
      gender:[null],
      date_of_birth:[""],
      is_spayed:[null],
      avatar_url:[null],
      vaccination_date:[null],
      weight:[null]
    });
  }
  
  ngOnInit() {
    this.user=this.fb.group({
      firstname:['',{updateOn:'change'}],
      lastname:['',{updateOn:'change'}],
      phone:['',{updateOn:'change'},Validators.pattern["^[6-9]{1}[0-9]{9}$"]],
      email:['',{updateOn:'change'},Validators.pattern["^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"]],
      pets:this.fb.array([this.pet_data()])
    })
  }

  f() { return this.user.controls; }
  get pets(){
    return this.user.get('pets') as FormArray;
  }

  addPet(){
    this.pets.push(this.pet_data());
  }

  deletePet(i){
    // this.pets.splice(i,1);
  }


  register(user){
    let pets =user.value.pets;
    user.value.city=null;
    user.value.state=null;
    user.value.address_1=null ;
    user.value.address_2=null ;
    user.value.date_of_birth="",
    user.value.profile_image="";
    user.value.country= null;
    user.value.is_active=1;
    user.value.pets=1,
    user.value.user_id=null;
    user.value.stateName="";
    user.value.cityName="";
    if(!this.is_pet)
    {
      pets=[];
    }
    console.log({user:user.value,isNewImage:false,pets:pets});
    this.regService.addUser({user:user.value,isNewImage:false,pets:pets}).subscribe(
      res=>{console.log(res)},
      err=>{console.log(err)}
      )
  }

  showPet(){
    this.show=!this.show;
    this.is_pet=!this.is_pet;
  }

  getBreeds(type){
    console.log(type.name);
    let breed=type.name.toLowerCase();
   console.log(this.breeds[breed])
    this.pet_breeds=this.breeds[breed];
    console.log(this.pet_breeds)
  }

}

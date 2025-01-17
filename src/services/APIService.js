import axios from 'axios';
import authHeader from "../helpers/auth-helper";
const URL = 'https://onlineplasiyer-backend.herokuapp.com';
const API_URL = 'https://onlineplasiyer-backend.herokuapp.com/api';

export class APIService{

  constructor(){
  }

  getURL(){
    return URL;
  }
  getApiURL(){
    return API_URL;
  }

  login(data) {
    let url = URL+"/signin";
    return axios.post(url, data);
  }

  register(data) {
    let url = URL+"/sign-up";
    return axios.post(url, data);
  }

  setActiveUser(id){
    let token = authHeader();
    let url = API_URL+"/users/setActive/"+id;
    axios.defaults.headers.common = {'Authorization': `${token}`};
    return axios.post(url);
  }
  setPassiveUser(id){
    let token = authHeader();
    let url = API_URL+"/users/setPassive/"+id;
    axios.defaults.headers.common = {'Authorization': `${token}`};
    return axios.post(url);
  }
  addActiveState(data){
    let token = authHeader();
    let url = API_URL+"/users/addActiveState";
    axios.defaults.headers.common = {'Authorization': `${token}`};
    return axios.post(url,data);
  }

  getActiveStates(){
    let token = authHeader();
    let url = API_URL+"/users/activeStates";
    axios.defaults.headers.common = {'Authorization': `${token}`};
    return axios.get(url);
  }

  getAllCustomers(){
    let token = authHeader();
    let url = API_URL+"/users/customers";
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.get(url);
  }

  getAllMerchants(){
    let token = authHeader();
    let url = API_URL+"/users/merchant";
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.get(url);
  }

  getAllPassiveUsers(){
    let token = authHeader();
    let url = API_URL+"/users/passive";
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.get(url);
  }

  addProductSpec(data){
    let token = authHeader();
    let url = API_URL+"/products/specify/create";
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.post(url,data);
  }

  addProduct(data,img){
    let token = authHeader();
    let url = API_URL+"/products/create";
    axios.defaults.headers.common = {'Authorization': `${token}`}

    let form_data = new FormData();

    for ( let key in data ) {
      form_data.append(key, data[key]);
    }
    form_data.append('uploadfile', img, img.name);

    return axios.post(url,form_data);
  }

  updateCategory(id,data,img){
    let token = authHeader();
    let url = `${API_URL}/admin/categories/update/${id}`;
    axios.defaults.headers.common = {'Authorization': `${token}`}

    let form_data = new FormData();

    for ( let key in data ) {
      form_data.append(key, data[key]);
    }
    console.log(img);
    if (img) {
      form_data.append('uploadfile', img, img.name);
    }

    return axios.put(url,form_data);
  }

  deleteCategory(id){
    let token = authHeader();
    let url = `${API_URL}/admin/categories/delete/${id}`;
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.delete(url);
  }

  getAllCategories(){
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}
    let url = API_URL+"/categories";
    return axios.get(url);
  }

  getCategories(){
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}
    let url = API_URL+"/categories?filter=true&sub=false";
    return axios.get(url,{ headers: { 'Content-Type': 'application/json' } });
  }

  addCategory(data,img) {
    let token = authHeader();
    let url = API_URL+"/categories/create";
    axios.defaults.headers.common = {'Authorization': `${token}`}

    let form_data = new FormData();

    for ( let key in data ) {
      form_data.append(key, data[key]);
    }
    form_data.append('uploadfile', img, img.name);

    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    const formData = new FormData();
    formData.append("document", blob);

    return axios.post(url,form_data);
  }

  getProductsByCategory(id){
    let url = API_URL+"/products/category/"+id;
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.get(url);
  }

  getProductByBarcode(barcode){
    let url = API_URL+"/products/bybarcode/"+barcode;
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.get(url);
  }

  addToCart({id,quantity}){
    let url = API_URL+"/cart/addItem";
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}
    let data = {
      productId: id,
      quantity: quantity
    }
    return axios.post(url,data);
  }

  getCart(){
    let url = API_URL+"/cart";
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}

    return axios.get(url);
  }

  checkoutCart(){
    let url = API_URL+"/cart/checkout";
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}

    return axios.post(url);
  }

  getBills(){
    let url = API_URL+"/orders/bills";
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.post(url);
  }

  getSales(){
    let url = API_URL+"/orders/sales";
    let token = authHeader();
    axios.defaults.headers.common = {'Authorization': `${token}`}
    return axios.post(url);
  }

}

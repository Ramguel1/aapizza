var productos = JSON.parse(localStorage.getItem('productos')) || []; //estos son los arreglos victoria "productos es el tamaño de pizza, el que va junto a precio"
var precios = JSON.parse(localStorage.getItem('precios')) || [];//"precio de pizza"
var pi = JSON.parse(localStorage.getItem('pi')) || [];//tipo de pizza 
// los pone asi para que jale los datos que estan en localStorage al momento de cargar


var slectpizza=document.querySelector("#piz")
var selectProductos=document.getElementById("pro1");

var imgProductos=document.getElementById("ima");
var precioProductos=document.getElementById("precio");
var inputCantidad=document.getElementById("cantidad");
var agregarCarrito=document.getElementById("agre");
var vcan=document.querySelector("#can");



var carrito=new Array();
var totalp=0;
var new1=document.querySelector("#new");
let nue=document.querySelector("#nuevop");
var nn;
var pp=document.querySelector("#pre");
var nn=document.querySelector("#nom")
var nueva=document.querySelector("#newta");
 

var nuevapi=document.querySelector("#nuevapizza");
var pizza=document.querySelector("#pizza");


var posProducto=-1;
var cantidadProducto=1;

nuevapizza.onclick=()=>{
    var pizza1 = document.getElementById("piz").value;
    let p1={pizza1}
    pi.push(p1);
 
   
}

const Todo=()=>{
  cargarProductos();
  cargarProductos2();
}
const cargarProductos2=()=>{
  let optionProductos2="";
  pi.forEach((producto) => {
      optionProductos2+=`<option value="${producto}">${producto.toUpperCase()}</option>`;

})

slectpizza.innerHTML=optionProductos2;

}


const cargarProductos=()=>{
    let optionProductos="";
    productos.forEach((productos) => {
        optionProductos+=`<option value="${productos}">${productos.toUpperCase()}</option>`;
    }) 
   
    selectProductos.innerHTML=optionProductos;
    cargarPrecio();
   
}



selectProductos.onchange=()=>{
    cargarPrecio();
}



const cargarPrecio=()=>{
  var APP=document.querySelector("#AGP");
  APP.innerHTML=`$ ${precios[selectProductos.selectedIndex]}`;
    posProducto=selectProductos.selectedIndex;
   
   
    
    
}


inputCantidad.oninput=()=>{
    vcan.innerHTML=inputCantidad.value;
    cantidadProducto=parseInt(inputCantidad.value);
    
    var APP=document.querySelector("#AGP");
  APP.innerHTML=`$ ${cantidadProducto*precios[selectProductos.selectedIndex]}`;
    posProducto=selectProductos.selectedIndex;
  
}


agregarCarrito.onclick=()=>{
  var orden=new Array();
    let tipopizza=slectpizza.value.toUpperCase();
    let tampizza=selectProductos.value.toUpperCase();
    let preciopiza= precios[selectProductos.selectedIndex]

    if(!checarPizzas(tipopizza,tampizza,cantidadProducto)){
    
    orden.push(tipopizza);
    orden.push(tampizza);
    orden.push(cantidadProducto);
    orden.push(preciopiza);
    carrito.push(orden);
    }
    imprimirTabla()
    
  
}
 


const checarPizzas=(tipo,tamaño,cantidad)=>{
  let res=false;
  carrito.forEach(orden=>{
    if (orden[0]==tipo && orden[1]==tamaño) {
      orden[2]+=cantidad;
      res=true;
      
    }
  })
  return res;

}

const imprimirTablaa=()=>{
  console.log(carrito)
}

const imprimirTabla=()=>{
    let total=0;
    let divCarrito=document.getElementById("carrito");
    let tablaHTML= `<table class="table w-100 m-auto text-white">
    <tr>
    <td>PRODUCTO</td>
    <td>Tamaño</td>
    <td>PRECIO</td>
    <td>CANTIDAD</td>
    <td>IMPORTE</td>
    <td>*</td>
    </tr>
    `;
    var vindex=0;
    //console.log(carrito)


    carrito.forEach(orden=>{
        tablaHTML+=`
        <tr>
        <td>${orden[0]}</td>
        <td>${orden[1]}</td>
        <td>$ ${orden[3]}.00</td>
        <td>${orden[2]}</td>
        <td>${orden[2]*orden[3]}</td>
        <td><button class="btn btn-danger" onclick="eliminar(${vindex})"><i class="bi bi-trash3-fill"></i></td>
        </tr>
        `
        vindex++;
        total+=(orden[3]*orden[2]);
        totalp=total;
    })





    
    tablaHTML+= `
    <tr>
    <td></td>
    <td></td>
    <td><h3>TOTAL</h3></td>
    <td><h3>$ ${total}.00</h3></td>
    <td><button id="pagar" onclick="p()" class="btn btn-success"><i class="bi bi-database-add"></i></button></td>
    </tr>`
    divCarrito.innerHTML=tablaHTML;
}
const eliminar=(vindex)=>{    
Swal.fire({
  title: "En serio quieres quitar la pizza????",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "Si",
  denyButtonText: "no"
}).then((result) => {
  if (result.isConfirmed) {
   
  
    carrito.splice(vindex , 1);
    imprimirTabla(); 
  } 
});
} 

const p=async()=>{
 
const {value: pos} = await Swal.fire({
    title: "TOTAL A PAGAR",
    input: "number",
    text: "El total a pagar es:" + totalp,
    showCancelButton: true,
    inputValidator: (value) => {
      if (value<totalp) {
        return "Algo salio mal";
      }else{
        Swal.fire({
            title: "tu cambio es: " + (value-totalp) ,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Ok",
            denyButtonText: "cancelar"
            
          })
          desaparecerPedido();

      }
    }
  }); 
  
}

const desaparecerPedido=()=>{
    carrito=[];
    document.getElementById("carrito").innerHTML="";
 }

nue.onclick=()=>{
    let p=pp.value;
    let n3=nn.value;
    productos.push(n3);
    precios.push(p);

 
    

    pp.value="";
    nn.value="";
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('precios', JSON.stringify(precios));
    cargarProductos();
}



nuevapi.onclick=()=>{
  pi.push(pizza.value);
  pizza.value="";
  localStorage.setItem('pi', JSON.stringify(pi));
  cargarProductos2();
}
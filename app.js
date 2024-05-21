var productos = JSON.parse(localStorage.getItem('productos')) || []; //estos son los arreglos victoria "productos es el tamaño de pizza, el que va junto a precio"
var precios = JSON.parse(localStorage.getItem('precios')) || [];//"precio de pizza"
var pi = JSON.parse(localStorage.getItem('pi')) || [];//tipo de pizza 
// los pone asi para que jale los datos que estan en localStorage al momento de cargar y pues lo demas es lo mismo ya le agregara al momento de cargar(guardar) las cosas que ingresda en donde pide los datos


var slectpizza=document.querySelector("#piz")
var selectProductos=document.getElementById("pro1");

var imgProductos=document.getElementById("ima");
var precioProductos=document.getElementById("precio");
var inputCantidad=document.getElementById("cantidad");
var agregarCarrito=document.getElementById("agre");
var vcan=document.querySelector("#can");



var carrito= JSON.parse(localStorage.getItem('carrito')) || [];

var totalp=0;
var new1=document.querySelector("#new");
let nue=document.querySelector("#nuevop");

var pp=document.querySelector("#pre");
var nn=document.querySelector("#nom")
var nueva=document.querySelector("#newta");
 

var nuevapi=document.querySelector("#nuevapizza");
var pizza=document.querySelector("#pizza");


var tabladel=document.querySelector("cargar")


var posProducto=-1;
var cantidadProducto=1;

nuevapizza.onclick=()=>{
    var pizza1 = document.getElementById("piz").value;
    let p1={pizza1}
    pi.push(p1);
 
   
}

const Todo=()=>{// esta constante sera la que ara que cargue todo asl momento de reiniciar la pagina       la vas a mandar a llamar en el html dentro de la etiqueta "body" con onload....  <body onload="Todo();">... 

  cargarProductos();
  cargarProductos2();
  imprimirTabla();

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
    
    
        localStorage.setItem('carrito', JSON.stringify(carrito));
        imprimirTabla();
    
    
  
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

// aqui es donde agrega las otras cosas que son para guardar en l+el local 
//esto es para guardar uy lo de arriva para cargar

nue.onclick=()=>{ //este de nue.onclick es el voton de la modal de tamaño y precio de pizza que es el que al momento que de guardar se cargan los datos
    let p=pp.value; //pp es el input donde pide el precio
    let n3=nn.value;// y nn es donde pide el tamaño
    productos.push(n3);//pues en estas dos solo se agregan al carrito 
    precios.push(p);
                          //  pero no le hagas caso a esto por si lo tienes diferente si te jala es porque si lo tiene solo que deves ver donde
 
    

    pp.value="";//limpiar los input
    nn.value="";//limpiar los input
    localStorage.setItem('productos', JSON.stringify(productos));// y en estos si ya es donde tiene que agregar esa parte de JSON pone el arreglo de productos que es "el de tamaño"
    localStorage.setItem('precios', JSON.stringify(precios));// y en el otro es el de precios y ya lo que agregue se guardara en el LocalStorage
    cargarProductos();
}



nuevapi.onclick=()=>{// es lo mismo de arriva y este es el boton de la modal de tipo pizza o nombre 
  pi.push(pizza.value);
  pizza.value="";
  localStorage.setItem('pi', JSON.stringify(pi));//y igual que los otros es lo mismo pero con el arreglo de pi(que es el de tipoPizza o nombre de la Pizza)
  cargarProductos2();
}

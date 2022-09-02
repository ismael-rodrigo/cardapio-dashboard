import ProductCard from "./ProductCard";
import styled from 'styled-components'
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import token from './../../../token'
import { ShopCarType } from "../../types/shopcar.type";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import DetailProductModal from "./detailProductModal";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
`


const ProductsGroup = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;

    h1{
      
        font-size: 24px;
        text-align: center;
        border-bottom: 1px solid white;

    }
`

const VerticalDivider = styled.div`
    position: relative;
    width: 1px;
    background-color: #636363;
    height: 100vh;
`



export default function DashBoard() {
    const[shopCar,setShopCar] = useState<ShopCarType[]>([])




    const products_created =  shopCar.filter ((shop_car)=>(shop_car.status == 'created'))
    const products_progress = shopCar.filter((shop_car)=>(shop_car.status == 'progress'))
    const products_conclude = shopCar.filter((shop_car)=>(shop_car.status == 'conclude'))


    //const handleMessageWebSocket = (message:MessageEvent<any>)=>{
    //    console.log(message)
    //    api.get(`/api/shopcar/${message.data}`,
    //   {
    //       headers: {
    //         Authorization: 'Bearer ' + token 
    //       }
    //       }).then((response)=>{
    //        var shop_copy = shopCar
    //
    //        shop_copy.forEach((shop ,index)=>{
    //            if(shop.id == response.data){
    //          shop_copy[index] = response.data
    //        }
    //      })
    //        setShopCar(shop_copy)
    //        
    //       })
    //}

    //const websocket = useWebSocket('ws://localhost:8000/ws/shopcar' ,{onOpen:()=>console.log('connect') , onMessage:(message)=>console.log(message)});
    


 



    useEffect(()=>{
        api.get('/api/shopcar',
        {
            headers: {
              Authorization: 'Bearer ' + token 
            }
           }).then((response)=>{
            console.log(response.data)
            setShopCar(response.data)
           })
    },[])


    const updateStatus = (status:'created'|'progress'|'conclude'|'finalized' , id:string)=>{
        api.put(`api/shopcar/${id}`,
        {status:status},
        {
            headers: {
              Authorization: 'Bearer ' + token 
            }
           }).then((response)=>{
            setShopCar(response.data)
           })
    }



  return (
    <Container>
        
        <ProductsGroup>
            <h1>Pedidos Realizados</h1>
            <br />
            {products_created?.map((shop_created ,index)=>(
                <div key={`${index}`}>
                    <ProductCard updateStatus={updateStatus}  shopcar={shop_created} index={index} />
                    <br />
                </div>
            ))}

        </ProductsGroup>

        <VerticalDivider/>

        <ProductsGroup>
        <h1>Em preparo</h1>
        <br />
            {products_progress?.map((shop_created ,index)=>(
                <div key={`${index}`}>
                    <ProductCard updateStatus={updateStatus} shopcar={shop_created} index={index} />
                    <br />
                </div>
            ))}
        </ProductsGroup>

        <VerticalDivider/>

        <ProductsGroup>
        <h1>Saiu para entrega</h1>
        <br />
            {products_conclude?.map((shop_created ,index)=>(
                <div key={`${index}`}>
                    <ProductCard updateStatus={updateStatus} shopcar={shop_created} index={index} />
                    <br />
                </div>
            ))}

        </ProductsGroup>
    </Container>
    
  )
}

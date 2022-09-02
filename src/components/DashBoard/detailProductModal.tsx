
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction, useState } from 'react';
import { ShopCarType } from '../../types/shopcar.type';
import {BsFillCircleFill} from 'react-icons/bs'
import styled from 'styled-components';


const style = {
  'margin-top':'100px',
  'margin-left':'auto',
  'margin-right':'auto',
  height:'80%',
  
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};



const ProductContainer = styled.div`
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 5px;

    h1{
      font-size: 25px;
      margin: 0px;
    }


`

const RequirementProduct = styled.div`
  h1{
    font-size: 20px;
  }

`


const SubRequirementProduct = styled.div`
margin: 10px;
  h1{
    font-size: 17px;
    margin: 0px;
    padding: 0px;
  }
  h2{
  
    font-size: 12px;
    color: #888888;
    margin: 0px;
    padding: 0px;
  }

`

const Divider = styled.div`
margin-top: 20px;
margin-bottom: 20px;
  width: 100%;
  height: 1px;
  background-color: #6d6d6d;

`


export default function DetailProductModal(props:{
  open:boolean ,
  setOpen:Dispatch<SetStateAction<boolean>> , 
  shopCar:ShopCarType,
  handleNextStatus:()=>void,

}) {


  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={()=>props.setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" textAlign='center' variant="h6" component="h2">
            Pedido numero 23  - 
            {props.shopCar.status=='progress'&&' Em produção'}
            {props.shopCar.status=='created' &&' Pedido Realizado'}
            {props.shopCar.status=='conclude' &&' Saiu para entrega'}
          </Typography>
          <br />
          <Box sx={{overflowY:'scroll' ,height:'80%' ,padding:3}} >
          
        
          {props.shopCar.products.map((product)=>(
            <>
            <ProductContainer>
            <h1>
                {product.name}
            </h1>
     
            <Divider/>
            {product.requirements.map(requirement=>(
                <RequirementProduct key={requirement.name}>
                    <h1 >
                        <BsFillCircleFill size={8} /> {requirement.name}
                    </h1>
                    {requirement.sub_requirements.map((sub_requirement , i)=>(
                        <SubRequirementProduct key={sub_requirement.name}>
                            <h1>
                                {sub_requirement.name}
                            </h1>
                            <h2>
                                {sub_requirement.description}
                            </h2>
                        </SubRequirementProduct>
                    ))}
                </RequirementProduct>
            ))}



            </ProductContainer>
            
            <br />
            </>
          ))}


          
          </Box>
          <br />
          <Box display='flex' justifyContent='space-evenly' >
            <Button color='warning' onClick={()=>props.setOpen(false)}>
              Voltar
            </Button>

            

            <Button color='success' onClick={()=>props.handleNextStatus()} >
              Avançar status
            </Button>
          </Box>

        </Box>
        
                      
      </Modal>
    </div>
  );
}

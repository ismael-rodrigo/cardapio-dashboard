
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction, useState } from 'react';
import { ShopCarType } from '../../types/shopcar.type';

import styled from 'styled-components';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const ProductContainer = styled.div`
    h1{

    }

`


export default function DetailProductModal(props:{open:boolean ,setOpen:Dispatch<SetStateAction<boolean>> , shopCar:ShopCarType}) {


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
            Pedido numero 23
          </Typography>


            <ProductContainer>

            

          {props.shopCar.products.map((product)=>(
            <>
            <h1>
                * {product.name}
            </h1>

            {product.requirements.map(requirement=>(
                <>
                    <h2 >
                        {requirement.name}
                    </h2>
                    {requirement.sub_requirements.map((sub_requirement)=>(
                        <>
                            <Typography id="keep-mounted-modal-description" variant='body2' sx={{ mt: 2 }}>
                                {sub_requirement.name}
                            </Typography>
                            <Typography id="keep-mounted-modal-description" variant='body2' sx={{ mt: 2 }}>
                                {sub_requirement.description}
                            </Typography>
                        </>
                    ))}
                </>
            ))}



            </>
          ))}


          </ProductContainer>
        </Box>
      </Modal>
    </div>
  );
}

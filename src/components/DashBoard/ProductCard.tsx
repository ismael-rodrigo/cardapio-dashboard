
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ShopCarType } from '../../types/shopcar.type';
import { useEffect , useState } from 'react';
import DetailProductModal from './detailProductModal';






export default function ProductCard(props:{
  shopcar:ShopCarType,
  index:number,
  updateStatus:(status:'created'|'progress'|'conclude'|'finalized' , id:string)=>void
}) {

  const[valueShopcar,setValuOfShopCar] = useState(0)
  const[open,setOpen] = useState(false)


  useEffect(()=>{
    var acc = 0
    props.shopcar.products.map(product=>{
        product.requirements.map(sub_req=>{
          sub_req.sub_requirements.map(sub=>{
            acc+=sub.valor
          })
        })
    })
    setValuOfShopCar(acc + props.shopcar.addressUser.value)
  },[])


  const handleNextStatus = ()=>{
    if(props.shopcar.status == 'created'){
      props.updateStatus('progress',props.shopcar.id)
    }
    if(props.shopcar.status == 'progress'){
      props.updateStatus('conclude',props.shopcar.id)
    }
    if(props.shopcar.status == 'conclude'){
      props.updateStatus('finalized',props.shopcar.id)
    }
  }
  const handleReturnStatus = ()=>{
    if(props.shopcar.status == 'progress'){
      props.updateStatus('created',props.shopcar.id)
    }
    if(props.shopcar.status == 'conclude'){
      props.updateStatus('progress',props.shopcar.id)
    }
  }


  return (
    <Card sx={{ }}>
      <DetailProductModal open={open} setOpen={setOpen} shopCar={props.shopcar}/>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Pedidido  23
        </Typography>

        <Typography marginTop={1}  variant="body2" color="text.secondary">
          {props.shopcar.products[0].qtd} - {props.shopcar.products[0].name}
        </Typography>

        <Typography marginTop={1}  variant="body2" color="text.secondary">
          {props.shopcar.products.length>1? 'Outros...':props.shopcar.paymentMethod.type}
        </Typography>

        <Typography marginTop={1} variant="body2" color="text.secondary">
          {props.shopcar.addressUser.rua} , n {props.shopcar.addressUser.numero} ({props.shopcar.addressUser.bairro})  {props.shopcar.addressUser.complemento&&" - "+props.shopcar.addressUser.complemento}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          R$ {valueShopcar}
        </Typography>



      </CardContent>
      <CardActions sx={{display:'flex',justifyContent:'space-between'}}>
        {props.shopcar.status != 'created' &&<Button onClick={()=>handleReturnStatus()} color='error' size="small">Voltar</Button> }
        
        <Button  size="small" onClick={()=>setOpen(true)} >Detalhe</Button>
        <Button onClick={()=>handleNextStatus()} color='success' size="small">{props.shopcar.status !='conclude' ?'Avançar':'Concluir'}</Button>
      </CardActions>
    </Card>
  );
}
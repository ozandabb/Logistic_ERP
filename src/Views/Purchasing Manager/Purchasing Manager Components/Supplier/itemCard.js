import React from 'react';
import {faArrowDown,faCartPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ItemCard=({
    item=null,
    buyFn=()=>undefined,
    discountFn=()=>undefined
})=>{
    return(
        <div  className="col-lg-3 col-md-4 col-sm-6" style={{padding:10}}>
            <div class="card border-primary mb-3" style={{minHeight:250}}>
                
                <div class="card-body ">
                    <h5 class="card-title text-primary">
                        {item.name}
                    </h5>
                    <p class="card-text">
                        {item.description}
                        <br/>
                        Buying Price : {item.buying_price}
                        <br/>
                        Selling Price :<strong> {item.selling_price}</strong>

                    </p>
                    <button
                        style={{minWidth:90,paddingTop:5}} 
                        onClick={buyFn} 
                        class="btn btn-primary"
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                        Order
                    </button>
                    <button 
                        style={{marginLeft:10,minWidth:90,paddingTop:5}}
                        onClick={discountFn} 
                        class="btn btn-primary"
                    >
                        <FontAwesomeIcon icon={faArrowDown} />
                        Discount
                    </button>
                </div>
            </div> 
        </div>
    );
}
export{
    ItemCard
}
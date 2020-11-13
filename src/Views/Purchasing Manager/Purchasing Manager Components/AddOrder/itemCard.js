import React from 'react';

const ItemCard=({
    item=null,
    onClickFn=()=>undefined
})=>{
    return(
        <div  className="col-md-3" style={{padding:10}}>
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
                        onClick={onClickFn} 
                        class="btn btn-primary"
                    >
                        Buy
                    </button>
                </div>
            </div> 
        </div>
    );
}
export{
    ItemCard
}
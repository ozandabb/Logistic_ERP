
import React,{useEffect} from 'react';
import { Table } from 'react-bootstrap';
import get from 'lodash.get';



const SampleTabel=({
    rows=[],
    columns=[],
    border=false,
    striped=true,
    hover=false,
    bordered=false


})=>{
    useEffect(() => {
        console.log(rows);
        console.log(columns);

    }, [])
    return(
        <Table   borderless hover >
            
            <thead>
    
                {
                    columns.map((column,index)=>{
                        return <th scope="col" key={index}>{column.name}</th>;
                    })
                }
                
            </thead>
            <tbody>
                {
                    rows.map((row,index)=>{
                        
                        return(
                            <tr key={index}>
                                {
                                    columns.map((column,index2)=>{
                                    return <td scope="col" key={index2}>{get(row,column.key,"")}</td>;
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}
export {
    SampleTabel
}
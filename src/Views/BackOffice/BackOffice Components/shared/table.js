
import React from 'react';
import { Table } from 'react-bootstrap';


const SampleTabel=({
    rows=[],
    columns=[]
})=>{
    return(
        <Table striped bordered hover>
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
                                    return <td scope="col" key={index2}>{row[column.key]}</td>;
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
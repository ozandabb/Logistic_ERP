import React from "react";
import QRCode from "react-qr-code";
import { Card  } from 'react-bootstrap';

class QRcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime : new Date().toLocaleString(),
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5" style={{justifyContent:"center"}}>
                    <h3 className="text-header py-3 font-weight-bold line-hight-1">{this.props.cusNmae} QR Code<br></br>
                    <span className="text-muted small">Scan to Get More Details</span></h3>
                </div>
                <hr></hr>
                <div className="row mt-5" style={{justifyContent:"center"}}>
                    <Card style={{padding:"50px"}}>
                        <QRCode level='L' size='500' value={this.props.tcode} />
                    </Card>
                </div>
                <div className="row mt-5" style={{justifyContent:"center"}}>
                    <h5 className="text-header py-3 font-weight-bold line-hight-1">Printed Date {this.state.curTime} </h5>
                </div>
            </div>
        );
    }
}

export default QRcode;
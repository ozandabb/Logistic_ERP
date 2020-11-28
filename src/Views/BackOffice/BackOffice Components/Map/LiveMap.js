import React, { Component , Fragment  } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import firebase from "../../../../firebase/firebase";
import map from '../../../../util/map.json'
import { withScriptjs, withGoogleMap, GoogleMap, Marker ,DirectionsRenderer , InfoWindow } from "react-google-maps"
import OrderTraking from '../../../../Controllers/BackOffice/OrderTraking.Controller'
import Lorry from '../../../../assersts/images/lorry.png'
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import moment from 'moment'
class LiveMaps extends Component {   


    constructor(props){
        super(props);
        this.state = {
            data : null,
            loading : true,
            id : props.match.params.id,
            directions : null ,
            offline : false ,
            offline_time : 0,
            shops : [] ,
            route_not_found : false,
            load_point : load_point
        }
    }

    componentDidMount(){

        let {load_point} = this.state;

        this.firebase_ref = firebase.ref(`/locations/${this.props.match.params.id}`);
        this.firebase_ref.on('value'  , snapshot => {
            this.setState({ data :snapshot.val() })
        })
       
        OrderTraking.getSingleRoute(this.props.match.params.id , this.props.auth.token)
        .then( result => {
            let shops = result.data.route_details || []
            this.setState({shops})
            return shops;
        })
        .then( shops => {

            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route(
                {
                    origin: load_point,
                    destination: load_point,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    waypoints: shops.map( i => { return {location : new window.google.maps.LatLng( i.lat, i.long )}})
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        console.log(result)
                        this.setState({
                            directions: result
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }

                    this.setState({loading: false})
                }
            );
        })
        .catch( error => {
            console.log(error);
            this.setState({route_not_found : true , loading : false})
        })

        this.active_check_id = setInterval(() => {console.log("called"); this.active_check()}, 1000)        
    }

    active_check = () => {
        const {data , offline , loading } = this.state;
        if(!loading && data != null){
            const dif  = moment().unix() - data.created_at;
            if(dif > 120 && offline == false ){
                this.setState({ offline : true , offline_time : data.created_at})
            }else if(dif <= 120 && offline){
                this.setState({ offline : false})
            }
            
        }
    }

    componentWillUnmount() {
        this.itemsRef.off('value', () => {
            console.log("live track unmounted!")
        });

        clearInterval(this.active_check_id);
      }

      Map = withGoogleMap(props =>
        <GoogleMap
          defaultZoom={16}
          defaultCenter={props.load_point}
          defaultOptions={{styles : map , streetViewControl: false ,  mapTypeControl: false,
            scaleControl: true,
            zoomControl: true,}}
        >
           {props.directions && <DirectionsRenderer directions={props.directions}  
           options={{suppressMarkers: true}}/>}

           {props.shops && props.shops.map( shop => {
               return(
                <Marker
                key={shop.id}
                position={{ lat: parseFloat(shop.lat) , lng: parseFloat(shop.long) }}
               >
                   <InfoWindow
                    pixelOffset={"0"}
                    visible={true}>
                    <div>
                    <h6 className="small m-0 p-0">{shop.customer.address}<br></br>
                    <b>{shop.customer.name}</b></h6>
                    </div>
                </InfoWindow>
                </Marker>
               )
           })}
    
             <Marker
                position={load_point}
             >
                  <InfoWindow
                    pixelOffset={"0"}
                    visible={true}>
                    <div>
                    <h6 className="small m-0 p-0">Warehouse Address<br></br>
                    <b>Main Warehouse</b></h6>
                    </div>
                </InfoWindow>
             </Marker>

            {props.location && props.shops && props.shops.length > 0 &&
             <Marker
                position={{ lat : parseFloat(props.location.lat) , lng : parseFloat(props.location.long) }}
                icon={Lorry}
                />
                }
        </GoogleMap>
      );

  
    render() {
        const { loading } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'backOffice_dashboard'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                            
                        <h3>Route Map</h3>
                        <div>
                      <Fragment>
                      <this.Map
                        location={this.state.data}
                        shops={this.state.shops}
                        load_point={load_point}
                        directions={ this.state.directions}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `620px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        />
                        </Fragment> 
                            { !loading && this.state.route_not_found && 
                            <div className="bg-white shadow-sm px-4 py-3 rounded" style={{position: "absolute" ,bottom: "75px" ,left: "230px"}}>
                               <h6 className="text-dark font-weight-bold mb-0">Not Found!<br>
                               </br>
                               <span className="small text-muted font-weight-bold">Route details not found.</span></h6>
                            </div>
                            }

                            { !loading && !this.state.route_not_found && this.state.data == null &&
                            <div className="bg-white shadow-sm px-4 py-3 rounded" style={{position: "absolute" ,bottom: "75px" ,left: "230px"}}>
                               <h6 className="text-dark font-weight-bold mb-0">Not Found!<br>
                               </br>
                               <span className="small text-muted font-weight-bold">Live Location details not found. Cash Collector disconnected!</span></h6>
                            </div>
                            }

                            { !loading && !this.state.route_not_found && this.state.data != null && this.state.offline && 
                            <div className="bg-white shadow-sm px-4 py-3 rounded" style={{position: "absolute" ,bottom: "75px" ,left: "230px"}}>
                               <h6 className="text-dark font-weight-bold mb-0">Client Offline !<br>
                               </br>
                            <span className="small text-muted font-weight-bold">
                            
                             {(moment.unix() - moment.unix(this.state.data.created_at) <= 120 ) ? "Reconnecting..."
                             : `Last update ${moment.unix(this.state.offline_time).fromNow()}`} </span></h6>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 

const waypoints = [ 
    { lat: 6.074137130009601 , lng : 80.19800912392958},
    { lat: 6.090241451360048 , lng : 80.20191217493795}]

const load_point = {lat: 6.086421362272556, lng:  80.19190611177959}

export default connect(mapStateToProps, null)(withRouter(LiveMaps));
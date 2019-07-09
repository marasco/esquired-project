import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {appearanceService} from '../../_services/appearance.service'
import {userServices} from '../../_services/user.service'
import Moment from 'react-moment';
import Modal from 'react-awesome-modal';
import Cookie from 'js-cookie'
import listFilterImg from '../../_assets/img/listing_filter.png'
import listSortImg from '../../_assets/img/listing_sort.png'
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'


export default class AppearancesComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: [],
	  	email: Cookie.get('esquired').email,
	  	goToDetail: false
      };
	
	  appearanceService.getAppearances()
	    .then((result) => this.setState({
	  	  data: result.data,
	  	  number: result.data.length
	  	})) 	
	}

	handleClick = (x) =>{
		this.setState({
			goToDetail: true,
			appearanceData: x
		})

		}

	openModal() {
     this.setState({
        visible : true
     });
    }

    closeModal() {
     this.setState({
       visible : false
     });
    }

 render() {

  const { data } = this.state

  if(this.state.goToDetail && this.state.appearanceData){
  	return (
  	 <Redirect to={{
	   pathname: "/appearancedetail",
	   state: { 
	   	appearanceData: this.state.appearanceData,
	    isAttorney: false 
	   }
	 }}/>)
  }

   if(data){
	return (
	 <div className="container main-body">

  		
  	<div style={{display: "flex",justifyContent: "space-between", marginTop:"10px" }}>
	  <p>There are {this.state.number} appearances</p>
	  	 <div className="flex-space-between">
		 	<img style={{marginRight: "10px"}} width="18px" height="18px" alt="esquired" src={listSortImg} /><br/><br/>
	  	 	<img alt="esquired" src={listFilterImg} width="18px" height="18px" /><br/><br/>
	  	 </div>
	</div>
	<br/>
	
	{data.map(x =>

    	<div key={x._id} className="appearanceBox">
	      <div className="appearanceHeaderBox">  
	        <Moment className="timeformat" format="LLL">{x.createdAt}</Moment>
	      </div> 
	      <p className="titlebox">{x.caseName}</p>
    	  <div className="divmailing">
	    	<img alt="Esquired" width="20px" src={pingImg}></img>
	    	<p className="mailing">{x.courtHouse}</p>
    	  </div>
    	  <div className="divprice">
	       <img alt="Esquired" width="18px" src={priceImg}></img>
	       <p className="price">$75</p>	
	      </div>
	      <div className="right">
	       <button 
	        onClick={this.handleClick.bind(this, x)}  
	      	className="apply-button">Apply</button>
	      </div>
	    </div>

	)}	
	</div>

	 )} else { return ( <div><p>No appearances found</p></div> ) }
  }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Cookies from 'js-cookie'
import { userServices } from '../_services/user.service'
import solutionImage from '../_assets/img/landing/landing_oursolutions.png'
import landing_features_01 from '../_assets/img/landing/landing_features_01.png'
import landing_features_02 from '../_assets/img/landing/landing_features_02.png'
import landing_features_03 from '../_assets/img/landing/landing_features_03.png'
import landing_features_04 from '../_assets/img/landing/landing_features_04.png'
import landing_instagram from '../_assets/img/landing/landing_instagram.png'
// import landing_youtube from '../_assets/img/landing/landing_youtube.png'
// import landing_twitter from '../_assets/img/landing/landing_twitter.png'
import logo from '../_assets/img/landing/logo.png'
import logoWhite from '../_assets/img/landing/logo_white.png'
import userIcon from '../_assets/img/landing/landing_login.png'

import registerAsImage from '../_assets/img/landing/landing_register.png'
import HomeSlider from './sliders/HomeSlider'
import SolutionsSlider from './sliders/SolutionsSlider'


const validate = values => {
  const errors = {}

  if(!values.email){
    errors.email = 'Please insert email.'
  }
  if(!values.password) {
    errors.password = 'Please insert password.'
  }

  return errors;
}



export default class HomeComponent extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      emailMC: '',
      show: false,
      errors: {},
      loggedIn: false
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };




  }


    componentDidMount(){
      userServices.getProfile()
       .then(res => {
         if(res.data === null){
            Cookies.remove('esquired');
            this.setState({ loggedIn: false })
         }

         if(res.data && res.data.onHold){
            console.log("User: Not authorized")
            this.setState({ loggedIn: false })

         } else

         if(res.data && res.data.onHold === false) {
            console.log("User: Authorized")
            this.setState({
            loggedIn: true,
            isAttorney: Cookies.getJSON('esquired').isAttorney,
            isSeeker: Cookies.getJSON('esquired').isSeeker,
            onHold: Cookies.getJSON('esquired').onHold,
            user: Cookies.getJSON('esquired').user,
            email: Cookies.getJSON('esquired').email
           })
         }
       })
  }

    handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }

      changeInputs = ({target}) =>{
      this.setState({
        emailMC: target.value
      })
    }

  handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.assign('/home');

  }

    handleSubmit = (e) =>{
    e.preventDefault()

    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    this.setState({errors: result})
    if(!Object.keys(result).length) {
      userServices.authenticate(noErrors)
        .then(data => {
          console.log(data)
          if (data.status !== 200) {
            this.setState({
              errlogin: data.message
             })
           } else {
             window.location.assign('/home')
           }
          }
      )

    } else {
      this.setState({ errors: result })
    }

  }


	render() {

    const recoverpass = {
      pathname: "/recoverpassword",
      fromDesktop: true
    };

    const aoa = {
      pathname: "/register",
      backhome: true,
      state: { isSeeker: true }
    }

    const aor = {
      pathname: "/register",
      backhome: true,
      state: { isAttorney: true }
    }

    const {errors, errlogin} = this.state
		return (
      <div>

          <div className="navbar header-comp">
            <Link to="/"><i className="fas fa-bars green d-none"></i></Link>
              <div className="logo"><a href="/"><img src={logo} alt="esquired" /></a></div>
              { this.state.loggedIn ?
                <Link to="/home"><img alt="userIcon" width="20px" src={userIcon}/></Link>
                :
                <Popup trigger={<img alt="userIcon" width="20px" src={userIcon} />} position="left top">
                  <div className="container popup-desktop"><br/>
                    <h4>Log In into your account</h4><br/>
                    <form onSubmit={this.handleSubmit}>

                    <div className={errlogin ? 'display' : 'hide'}>
                      <div className="alert alert-danger" role="alert" style={{fontSize: "11px"}}>{this.state.errlogin}</div>
                    </div>
                        {errors.email && <div style={{fontSize: "13px", padding: "1px", margin: "0px",color:"red"}} >{errors.email}</div>}
                      <input className="form-control" type="text" name="email" onChange={this.handleChange} placeholder="User" ></input>
                        {errors.password && <div style={{fontSize: "13px", padding: "1px", margin: "0px",color:"red"}} >{errors.password}</div>}
                      <input className="form-control" type="password" name="password" onChange={this.handleChange} placeholder="Password"></input>
                      <small><Link to={recoverpass} style={{display: "block",textAlign:"right", color: "#4a4a4a"}} >Forgot your Password?</Link></small><br />
                      <input className="formbutton" type="submit" value="Log In" />
                    </form><br/>

                    <p>Don't have an account?<Link to="/definerole"> Sign Up</Link></p><br/>
                  </div>
                </Popup>
              }
          </div>
          <div className="background-esquired">
            <div className="flex-space-around margin-sides home-slider-container">
            <div className="row">
               <HomeSlider />
             </div>
            </div>
          </div>
          <div className="solutions">
            <h2><b>Our Solutions</b></h2>
            <div className="row padding-bottom-guest">
            <div className="col-sm-12">

            <SolutionsSlider />
            <div className="desktop">
              <div className="solutions-square-item">
              <div className="solutions-square">
                <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
                <div className="solution-title">“Creating a request is simple.”</div>
                <div className="solution-desc">Fill out the necessary information under “Create A New Request” tab, Upload the necessary
documents, and wait for results! </div>
              </div>
              </div>
              <div className="solutions-square-item">
              <div className="solutions-square">
                <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
                <div className="solution-title">“24-Hour Payments!” </div>
                <div className="solution-desc">Handled an appearance yesterday? Get paid tomorrow. Esquire’d uses Stripe technology to
directly deposit your money! Handle cases today, make money within 24-hours. Simple.  </div>
              </div>
              </div>
              <div className="solutions-square-item">
              <div className="solutions-square">
                <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
                <div className="solution-title">“Stacking”</div>
                <div className="solution-desc">Stacking allows appearing attorneys to maximize their profits. If you accept a hearing, our
technology will automatically notify you of other hearings in the same court at the same time.
This will allow appearing attorneys to maximize their profits! </div>
              </div>
              </div>
              </div>
            </div>
          </div>
          </div>
          <div className="features">
            <h3><b>Features</b></h3>
           <div className="padding-bottom-guest flex-space-around">
           <div className="row">

            <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <img src={landing_features_01} alt="landing_features_01" />
               <h5>Efficient request</h5>
               <p>Requesting an appearance is simple. On the phone or the desktop. Fill out the necessary
information and hit “Create Request.” </p>
             </div>
             </div>
              <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <img src={landing_features_02} alt="landing_features_02" />
               <h5>24-Hour Payments</h5>
               <p>Don’t wait for your money. Handle cases today, get paid directly tomorrow. </p>
             </div>
             </div>
              <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <img src={landing_features_03} alt="landing_features_03" />
               <h5>Vetted Lawyers</h5>
               <p>We vet out lawyers.</p>
             </div>
             </div>
              <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <div><img src={landing_features_04} alt="landing_features_04" /></div>
               <div><h5>Rating</h5>
               <p>To ensure proficiency, we allow a two-way rating system. Once an appearance is complete,
please give us your feedback! </p></div>
             </div>
             </div>
             </div>
           </div>
          </div>
          <div className="registeras">
            <h3><b>Register now as:</b></h3>
            <div className="padding-bottom-guest">
              <div className="registeras-square">
                <img className="register-as-image" alt="esquired-register" src={registerAsImage} />
              </div>
              <Link className="link-button" to={aor}>Attorney of Record</Link>
              <Link className="link-button" to={aoa}>Appearing Attorney</Link>
            </div>
          </div>
          <div className="footer-guest">
            <div className="logo"><a href="/"><img src={logoWhite} alt="esquired" /></a></div><br /><br />
              <a href="https://www.instagram.com/esquired_llc"><img className="footer-shape" src={landing_instagram} alt=""/></a>
              <Link style={{padding:"40px",display: "block",textAlign: "right"}} to="/terms">Terms & Conditions</Link>
          </div>
      </div>
		);
	}
}


export { HomeComponent };

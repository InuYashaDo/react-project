import React, { Component } from "react";
import "./index.less";
import ReactLogo from '../assets/logo192.png'

class canvasDemo extends Component {
	componentDidMount() {
		var myFirstCanvas = document.getElementById("myFirstCanvas");
		var Image = document.getElementById('myImg')
		var ctx = myFirstCanvas.getContext("2d");
		var myGradient = ctx.createLinearGradient(0,0,140,140)
		var pat = ctx.createPattern(Image,'repeat-x')
		var myRadialGradient  = ctx.createRadialGradient(40,40,5,60,60,40)
		myRadialGradient.addColorStop(0,'red')
		myRadialGradient.addColorStop(1,'white')
		// myGradient.addColorStop(0,"green")
		// myGradient.addColorStop(0.5,"pink")
		// myGradient.addColorStop(1,"red")
		// ctx.beginPath();
		// ctx.shadowBlur=10;
		// ctx.shadowOffsetX=20
		// ctx.shadowOffsetY=-10
		// ctx.shadowColor='red'
		ctx.fillStyle = myRadialGradient;
		ctx.fillRect(0,0,100,100)
		// ctx.fill()
	}

  render() {
    return (
      <div className="canvasDemoWrapper">
        <canvas id="myFirstCanvas" width={500} height={500}></canvas>
				<img src={ReactLogo} alt="" id='myImg' width={50} height={50} />
      </div>
    );
  }
}

export default canvasDemo;

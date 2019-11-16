class Speedometer {
	constructor (id, radius) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext('2d');

		/* General settings*/
		this.middleX = this.canvas.width / 2;
		this.middleY = this.canvas.height / 2;
		this.radius = radius;
		this.palette = {
			darkColor           : '#3f3c55',
			turquoiseColor      : '#11999e',
			lightTurquoiseColor : '#30e3ca',
			lightGrayColor      : '#e4f9f5',
		};
		this.fonts= {
			digits : 'bold 24px sans-serif',
			title  : 'bold 32px sans-serif',
		};


		/* Arrow settings*/
		this.arrowValueIndex = 0;

		/* Numbers*/
		this.digits = [ 0, 20, 40, 50, 60, 70, 80, 90, 100 ];
		this.digitsColor = this.palette.darkColor;
		this.digitsFont = this.fonts.digits;
		this.digitsOffsetFromArc = this.canvas.width / 15;

		/* Zones*/
		this.zonesCount = this.digits.length - 1;
		/* Beginning and ending of our arc. Sets by radius*pi*/
		this.startAngleIndex = 0.75;
		this.endAngleIndex = 2.25;
		this.step = (this.endAngleIndex - this.startAngleIndex) / this.zonesCount;
		this.diagramWidth = 180;
		this.diagramHeight = 60;
		this.stats = new Array(this.diagramWidth).fill(5);
	}

	/* Draw zones*/
	drawZones () {
		/* Zones' options*/
		const sectionOptions = [ {
			startAngle : (this.startAngleIndex - 0.01) * Math.PI,
			endAngle   : (this.startAngleIndex + this.zonesCount / 1.6 * this.step) * Math.PI,
			startColor : this.palette.lightTurquoiseColor,
			endColor   : this.palette.turquoiseColor,
		}, {
			startAngle : (this.startAngleIndex + this.zonesCount / 1.6 * this.step+0.02) * Math.PI,
			endAngle   : (this.endAngleIndex + 0.01) * Math.PI,
			startColor : this.palette.turquoiseColor,
			endColor   : this.palette.darkColor,
		} ];
		sectionOptions.forEach(options => this.drawZone(options));
	}

	drawZone (options) {
		this.ctx.beginPath();
		this.ctx.arc(this.middleX, this.middleY, this.radius, options.startAngle, options.endAngle, false);
		this.ctx.lineWidth = 5;
		const gradient = this.ctx.createLinearGradient(0, 45, this.canvas.width, 150);

		gradient.addColorStop(0, options.startColor);
		gradient.addColorStop(0.7, options.endColor);

		this.ctx.strokeStyle = gradient;

		this.ctx.lineCap = 'round';
		this.ctx.stroke();
	}

	/* Draw numbers*/
	drawDigits () {
		let angleIndex = this.startAngleIndex;
		this.digits.forEach(digit => {
			const angle = angleIndex * Math.PI;
			const x = this.middleX + (this.radius - this.digitsOffsetFromArc) * Math.cos(angle);
			const y = this.middleY + (this.radius - this.digitsOffsetFromArc) * Math.sin(angle);
			angleIndex += this.step;
			this.ctx.font = this.digitsFont;
			this.ctx.fillStyle = this.digitsColor;
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.fillText(digit, x, y);
		});
	}

	/* Draw arrow*/
	drawArrow () {
		this.ctx.beginPath();
		this.ctx.arc(this.middleX, this.middleY, 15, 0, 2*Math.PI);
		this.ctx.closePath();
		this.ctx.fillStyle=this.palette.turquoiseColor;
		this.ctx.moveTo(this.middleX-15, this.middleY);
		this.ctx.lineTo(this.middleX, this.middleY-150);
		this.ctx.lineTo(this.middleX+15, this.middleY);
		this.ctx.closePath();
		this.ctx.fill();
	}

	draw (value) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawZones();
		this.drawDigits();

		this.ctx.translate(this.middleX, this.middleY);
		this.ctx.rotate(this.arrowValueIndex);
		this.ctx.translate(-this.middleX, -this.middleY);

		this.drawArrow();

		this.ctx.translate(this.middleX, this.middleY);
		this.ctx.rotate(-this.arrowValueIndex);
		this.ctx.translate(-this.middleX, -this.middleY);

		this.drawDiagram(value);
	}

	val (value) {
		const sector = Math.PI*0.385;
		this.arrowValueIndex = value < 40
			? value/40*sector - sector*2
			: (value-40)/60*sector*3 - sector;
		this.draw(value);
	}
	drawTitle (val) {
		this.ctx.fillText(`${val.toFixed()} %`, this.middleX, this.middleY*1.4);
	}
	drawDiagram (val) {
		this.add(val);
		this.ctx.fillStyle=this.palette.turquoiseColor;
		for (let i=0; i<=this.diagramWidth;i++) {
			this.ctx.fillRect(
				this.middleX-this.diagramWidth/2+i,
				this.middleY*1.5+this.diagramHeight,
				1,
				-this.stats[i]*(this.diagramHeight/100)
			);
		}
		this.ctx.font = this.fonts.title;
		if (val) { this.drawTitle(val); }

	}
	add (x) {
		this.stats.unshift(x);
		this.stats = this.stats.slice(0, this.diagramWidth);
	}
}

export {Speedometer};
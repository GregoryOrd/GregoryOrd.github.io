window.onload = function (){
	var canvas = document.getElementById("Canvas");
	var navBar = document.getElementById("NavigationBar");
	canvas.margin = navBar.offsetHeight;
	canvas.height = screen.height - (3 * navBar.offsetHeight);
	canvas.width = navBar.offsetWidth;
	Pts.namespace( window );
	Pts.quickStart( "#Canvas", "#00242A" );

	space.autoResize = true;

	let num_points = 150;
	let num_points2 = 150;

	(function () {

		let rotating_point = new Pt();
		let rotating_line = new Group();
		let rotating_point2 = new Pt();
		let rotating_line2 = new Group();
		let pts = new Group();
		let pts2 = new Group();

		space.add({
		start: (bound) => {
		  bound.width = window.innerWidth;
		  bound.height = window.innerHeight ;
		  space.resize(bound)
		},

		animate: (time, ftime) => {
			rotating_line = new Group(space.center.$subtract(0.1), rotating_point).op(Line.perpendicularFromPt);
			rotating_line2 = new Group(space.center.$subtract(0.1), rotating_point).op(Line.perpendicularFromPt);			
			pts.rotate2D(0.0004, space.center);
			pts2.rotate2D(-0.0004, space.center);
			rotating_point.rotate2D(-0.0006, space.center);
			rotating_point2.rotate2D(0.0006, space.center);

			pts.forEach((p, i) => {
				let lp = rotating_line(p);
				var ratio = Math.min(1, 1 - lp.$subtract(p).magnitude() / (space.size.x / 2));
				//form.stroke(`rgba(150,100,75,${ratio}`, ratio * 2).line([p, lp]);
				form.fillOnly("#abf").point(p, 1.2);
			});
		  
			pts2.forEach((p, i) => {
				let lp = rotating_line2(p);
				var ratio = Math.min(1, 1 - lp.$subtract(p).magnitude() / (space.size.x / 2));
				//form.stroke(`rgba(200,200,200,${ratio}`, ratio * 2).line([p, lp]);
				form.fillOnly("#abf").point(p, 1.2);
			});

		},

		resize: () => {
			pts = Create.distributeRandom(space.outerBound, num_points);
			pts2 = Create.distributeRandom(space.outerBound, num_points2);
			rotating_line = new Group(space.center.$subtract(0.1), rotating_point).op(Line.rotating_lineFromPt);
			rotating_line2 = new Group(space.center.$subtract(0.1), rotating_point).op(Line.rotating_lineFromPt);				
		},

	  });
	  space.play();
	})();
}

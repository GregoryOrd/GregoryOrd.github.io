function animationFunc (){
	Pts.namespace( window );
	var run = Pts.quickStart( "#Canvas", "#123" );
  run( (time, ftime)  => {
    // rectangle
    var rect = Rectangle.fromCenter( space.center, space.size.$divide(4.5) );
    var poly = Rectangle.corners( rect );
    poly.shear2D( Num.cycle( time%3500/3500 ) - 0.5, space.center );
    
    // drawing
    form.fillOnly("#ff88ff").polygon( poly );
    form.strokeOnly("#fff", 3).rect( rect );
  });
}


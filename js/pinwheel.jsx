var styles = {
			outerscroll:{
				padding: 5,
				backgroundColor: '#d3d3d3',
				},
				innerscroll:{
					position:'relative',
					width:'700px',
					backgroundColor:'#000',
				},
				scrollitem:{
					display:'inline',
					padding:5,
				},
				scrollitemfeature:{
					padding:5,
					display:'inline'
				},
				leftArrow:{
					position:'absolute',
					left:150,
					top:'45%',
					fontSize:30,
					color:'#FFF',
					cursor:'pointer',
				},
				rightArrow:{
					position:'absolute',
					right:150,
					top:'45%',
					fontSize:30,
					color:'#FFF',
					cursor:'pointer',
				}
			};

		var PinWheel = React.createClass({
			getInitialState: function(){
				return {
					images: [],
					prevInd:0,
					nextInd:2,
					currInd:1,
					image1:'',
					image2:'',
					image3:''
				};
			},
			componentWillMount:function(){
				this.getImages();
			},
			componentDidMount:function(){
				this.interval = setInterval(this.clickRight,3000);
			},
			getImages:function(){
				$.ajax({
					url: "js/data.json",
					dataType:'json',
					success:function(data){
						this.setState({images:data});
						this.setState({image1:'images/' + data[this.state.prevInd].shortname + '_tn.jpg'});
						this.setState({image2:'images/' + data[this.state.currInd].shortname + '_tn.jpg'});
						this.setState({image3:'images/' + data[this.state.nextInd].shortname + '_tn.jpg'});
					}.bind(this),
					error:function(xhr,status,err){
						console.error(status,err.toString());
					}.bind(this)
				});
			},
			clickLeft:function(){
				var count = 1;
				$('.scrollItem').fadeOut(500,$.proxy(function(){
					if(count==1){
						this.setState({nextInd:this.state.currInd});
						this.setState({currInd:this.state.prevInd});
						this.setState({prevInd: this.state.prevInd==0 ? this.state.images.length-1 : this.state.prevInd-1});
						this.getImages();
					}
					count++;
				},this)).fadeIn(500);
				clearInterval(this.interval);
				this.interval = setInterval(this.clickRight,3000);
			},
			clickRight:function(){
				var count = 1;
				$('.scrollItem').fadeOut(500,$.proxy(function(){
					if(count==1){
						this.setState({prevInd:this.state.currInd});
						this.setState({currInd:this.state.nextInd});
						this.setState({nextInd: this.state.nextInd==this.state.images.length-1 ? 0 : this.state.nextInd+1});
						this.getImages();
					}
					count++;
				},this)).fadeIn(500);
				clearInterval(this.interval);
				this.interval = setInterval(this.clickRight,3000);
			},
			render: function(){
				return (
						<div style={styles.innerscroll}>
							<ul style={{padding:0,listStyleType:'none', margin:'auto',textAlign:'center',}}>
								<li className='scrollItem'  ><img src={this.state.image1} alt="" /></li>
								<li className='scrollItem scrollFeature'><img src={this.state.image2} alt="" /></li>
								<li className='scrollItem' ><img src={this.state.image3} alt="" /></li>
							</ul>
							<span className="glyphicon glyphicon-menu-left" style={styles.leftArrow} onClick={this.clickLeft}></span>
							<span className="glyphicon glyphicon-menu-right" style={styles.rightArrow} onClick={this.clickRight}></span>
						</div>
				);
			}
		
		});
		
		React.render(<PinWheel />, document.getElementById('react'));
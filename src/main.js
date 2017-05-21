import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import MediaQuery from 'react-responsive';

import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import PCUserCenter from './components/pc_user_center';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import MobileUserCenter from './components/mobile_user_center';

class App extends React.Component {
	render() {
		return (
			<div>
				{/*<MediaQuery query="(min-device-width:1224px)">*/}
					{/*<Router history={hashHistory}>*/}
						{/*<Route path="/" component={PCIndex}></Route>*/}
						{/*<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>*/}
						{/*<Route path="/usercenter" component={PCUserCenter}></Route>*/}
					{/*</Router>*/}
				{/*</MediaQuery>*/}
				{/*<MediaQuery query="(max-device-width:1224px)">*/}
					<Router history={hashHistory}>
						<Route path="/" component={MobileIndex}></Route>
						<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
						<Route path="/usercenter" component={MobileUserCenter}></Route>
					</Router>
				{/*</MediaQuery>*/}
			</div>
		);
	}
}

ReactDom.render(<App/>, document.getElementById('app'));
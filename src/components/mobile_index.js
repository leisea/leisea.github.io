import React from 'react';
import {Tabs, Carousel} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
	render() {
		return (
			<div>
				<MobileHeader/>
					<Tabs>
						<TabPane tab="头条" key="1">
						<Carousel autoplay className="carousel">
							<div><img src="./src/images/carousel_1.jpg" /></div>
							<div><img src="./src/images/carousel_2.jpg" /></div>
							<div><img src="./src/images/carousel_3.jpg" /></div>
							<div><img src="./src/images/carousel_4.jpg" /></div>
						</Carousel>
							<MobileList count={20} type="top" />
						</TabPane>
						<TabPane tab="社会" key="2">
							<MobileList count={20} type="shehui" />
						</TabPane>
						<TabPane tab="科技" key="3">
							<MobileList count={20} type="keji" />
						</TabPane>
						<TabPane tab="国内" key="4">
							<MobileList count={20} type="guonei" />
						</TabPane>
						<TabPane tab="国际" key="5">
							<MobileList count={20} type="guoji" />
						</TabPane>
						<TabPane tab="娱乐" key="6">
							<MobileList count={20} type="yule" />
						</TabPane>
						<TabPane tab="体育" key="7">
							<MobileList count={20} type="tiyu" />
						</TabPane>
						<TabPane tab="时尚" key="8">
							<MobileList count={20} type="shishang" />
						</TabPane>
					</Tabs>
				<MobileFooter/>
			</div>
		);
	}
}
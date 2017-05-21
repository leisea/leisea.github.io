import React from 'react';
import {Row, Col} from 'antd';
import {Carousel, Tabs} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImagesBlock from './pc_news_images_block';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
	render() {
		return (
			<Row>
				<Col span={2}></Col>
				<Col span={20} className="container">
					<div className="left-container">
						<Carousel autoplay className="carousel">
							<div><img src="./src/images/carousel_1.jpg" /></div>
							<div><img src="./src/images/carousel_2.jpg" /></div>
							<div><img src="./src/images/carousel_3.jpg" /></div>
							<div><img src="./src/images/carousel_4.jpg" /></div>
						</Carousel>
						<PCNewsImagesBlock count={6} type="guoji" cartTitle="国际头条" imageWidth="112px" width="400px" />
					</div>
					<Tabs className="tabs-news">
						<TabPane tab="头条" key="1">
							<PCNewsBlock count={25} type="top" width="100%" border="false" />
						</TabPane>
						<TabPane tab="社会" key="2">
							<PCNewsBlock count={25} type="shehui" width="100%" border="false" />
						</TabPane>
						<TabPane tab="科技" key="3">
							<PCNewsBlock count={25} type="keji" width="100%" border="false" />
						</TabPane>
						<TabPane tab="国内" key="4">
							<PCNewsBlock count={25} type="guonei" width="100%" border="false" />
						</TabPane>
						<TabPane tab="国际" key="5">
							<PCNewsBlock count={25} type="guoji" width="100%" border="false" />
						</TabPane>
						<TabPane tab="娱乐" key="6">
							<PCNewsBlock count={25} type="yule" width="100%" border="false" />
						</TabPane>
						<TabPane tab="体育" key="7">
							<PCNewsBlock count={25} type="tiyu" width="100%" border="false" />
						</TabPane>
						<TabPane tab="时尚" key="8">
							<PCNewsBlock count={25} type="shishang" width="100%" border="false" />
						</TabPane>
					</Tabs>
					<div className="main-news">
						<PCNewsImagesBlock count={8} type="keji" cartTitle="科技头条" imageWidth="142px" width="100%" />
						<PCNewsImagesBlock count={16} type="yule" cartTitle="娱乐头条" imageWidth="142px" width="100%" />
					</div>
				</Col>
				<Col span={2}></Col>
			</Row>
		);
	}
}
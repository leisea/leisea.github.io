import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImagesBlock from './pc_news_images_block';
import CommonComments from './common_comments';

export default class PCNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
	}

	componentDidMount() {
		let myFetchOptions = {
			methon: 'GET',
			header: new Headers({
				mode: 'cors',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Access-Control-Allow-Origin':'*'
			})
		};
		let url = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + this.props.params.uniquekey;
		fetch(url, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({
					newsItem: json
				});
				document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
			});
	}

	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	}

	render() {
		return (
			<div>
				<PCHeader />
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div className="article-container" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<hr/>
						<CommonComments uniquekey={this.props.params.uniquekey} />
					</Col>
					<Col span={6}>
						<PCNewsImagesBlock count={40} type="top" cartTitle="相关新闻" imageWidth="150px" width="100%" />
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter />
				<BackTop />
			</div>
		);
	};
}

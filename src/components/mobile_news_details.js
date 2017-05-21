import React from 'react';
import {Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import PCNewsImagesBlock from './pc_news_images_block';
import CommonComments from './common_comments';

export default class MobileNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
	}

	componentDidMount() {
		let myFetchOptions = {
			methon: 'GET',
			header: {
				'Access-Control-Allow-Origin':'*'
			}
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
			<div className="m-container">
				<MobileHeader />
				<div className="article-container" dangerouslySetInnerHTML={this.createMarkup()}></div>
				<hr/>
				<CommonComments uniquekey={this.props.params.uniquekey} />
				<PCNewsImagesBlock count={4} type="top" cartTitle="相关新闻" imageWidth="150px" width="100%" />
				<MobileFooter />
				<BackTop />
			</div>
		);
	};
}

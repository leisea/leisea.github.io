import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Card} from 'antd';

export default class MobileList extends React.Component {

	constructor() {
		super();
		this.state = {
			news: ''
		};
	}

	componentWillMount() {
		let myFetchOptions = {
			methon: 'GET',
			header: {
				'Access-Control-Allow-Origin':'*'
			}
		};
		let url = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count;
		fetch(url, myFetchOptions)
			.then(response => response.json())
			.then(json => this.setState({news: json}));
	}

	render() {
		const {news} = this.state;
		const newsList = news.length
			? news.map((newsItem, index) => (
				<li key={index} className="m-article list-item special-section clear-fix">
					<Link to={`details/${newsItem.uniquekey}`}>
			            <div className="m-article-img">
			              	<img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
			            </div>
			            <div className="m-article-info">
			             	<div className="m-article-title">
			                	<span>{newsItem.title}</span>
			             	</div>
			              	<div className="m-article-desc clear-fix">
				                <div className="m-article-desc-list">
				                  	<span className="m-article-channel">{newsItem.realtype}</span>
				                  	<span className="m-article-time">{newsItem.date}</span>
				                </div>
			              	</div>
			            </div>
          			</Link>
				</li>
			))
			: '没有加载到任何新闻';

		return (
			<Card className="m-top-news-list">
				<ul>
					{newsList}
				</ul>
			</Card>
		);
	}
}
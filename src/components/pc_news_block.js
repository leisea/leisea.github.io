import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Card} from 'antd';

export default class PCNewsBlock extends React.Component {

	constructor() {
		super();
		this.state = {
			news: ''
		};
	}

	componentWillMount() {
		let myFetchOptions = {
			methon: 'GET',
			header: new Headers({
				mode: 'cors',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Access-Control-Allow-Origin':'*'
			})
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
				<li key={index}>
					<Link to={`details/${newsItem.uniquekey}`} target="_blank" className="news-link">
						{newsItem.title}
					</Link>
				</li>
			))
			: '没有加载到任何新闻';

		return (
			<Card className="top-news-list">
				<ul>
					{newsList}
				</ul>
			</Card>
		);
	}
}
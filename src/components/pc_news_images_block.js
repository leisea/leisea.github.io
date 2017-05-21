import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Card} from 'antd';

export default class PCNewsImagesBlock extends React.Component {

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
		const sytleImage = {
			display: 'block',
			height: '90px',
			width: this.props.imageWidth
		};
		const sytleH3 = {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			width: this.props.imageWidth
		};

		const {news} = this.state;
		const newsList = news.length
			? news.map((newsItem, index) => (
				<li key={index} className="image-block">
					<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						<div className="custom-image">
							<img src={newsItem.thumbnail_pic_s} alt="thumbnail-news" style={sytleImage} />
						</div>
						<div className="custom-card">
							<h3 style={sytleH3}>{newsItem.title}</h3>
							<p>{newsItem.author_name}</p>
						</div>
					</Link>
				</li>
			))
			: '没有加载到任何新闻';

		return (
			<Card title={this.props.cartTitle} className="top-news-list-thum">
				<ul>
					{newsList}
				</ul>
			</Card>
		);
	}
}
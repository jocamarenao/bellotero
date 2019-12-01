import React from 'react';
import { Carousel, Row, Col } from 'antd';
import './index.css';

const TestimonialsCarousel = (props: any) => {
	const { data } = props;

	return (
		<div className="carousel-styles">
			<h1 style={{ textAlign: 'center', fontSize: '2rem' }}>{data.title}</h1>
			<Carousel autoplay>
				{data.reviews.map((item: any) => {
					return (
						<div>
							<Row>
								<Col span={24}>
									<h3 style={{ textAlign: 'center', fontSize: '1.5rem' }}>{item.name}</h3>
									<h2 style={{ textAlign: 'center', fontSize: '1rem' }}>{item.position}</h2>
									<p className="paragraph-styles">{item.comment}</p>
								</Col>
							</Row>
						</div>
					);
				})}
			</Carousel>
		</div>
	);
};

export default TestimonialsCarousel;

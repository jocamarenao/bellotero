import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTestimonials } from '../../../redux/actions/testimonialActions';
import TestimonialsCarousel from '../components/TestimonialsCarousel/TestimonialsCarousel';
import Loading from '../../../components/Loading/Loading';

const Testimonial = (props: any) => {
	useEffect(() => {
		const { getTestimonials } = props;
		getTestimonials();
	}, []);
	const { testimonials } = props;
	const { isLoading, hasData, data } = testimonials;

	return <>{!isLoading && hasData ? <TestimonialsCarousel data={data} /> : <Loading />}</>;
};

const mapStateToProps = (state: any) => ({
	testimonials: state.testimonials,
});

const mapDispatchToProps = (dispatch: any) => ({
	getTestimonials: () => dispatch(fetchTestimonials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Testimonial);

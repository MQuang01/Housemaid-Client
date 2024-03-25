

const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating); // Số sao nguyên
    const hasHalfStar = rating % 1 !== 0; // Kiểm tra xem có nửa sao không
    const remainingStars = Math.max(0, 5 - Math.ceil(rating)); // Số sao còn lại

    const starStyle = {
        color: '#ffc107',
    }
    return (
        <div className="star-rating text-primary " >
            {[...Array(fullStars)].map((_, index) => (
                <i key={index} className="fas fa-star" style={starStyle}></i>
            ))}
            {hasHalfStar && <i className="fa-solid fa-star-half-stroke" style={starStyle}></i>}
            {[...Array(remainingStars)].map((_, index) => (
                <i key={index} className="far fa-star"></i>
            ))}
        </div>
    );
};



export default RatingStars;
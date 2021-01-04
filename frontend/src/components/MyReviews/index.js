import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchAllUserReviews, deleteReview} from '../../store/artProductReviews.js';
import {Link} from 'react-router-dom';


const MyReviews = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const myReviews = useSelector(state => {
        return state.artProductReviews.userReviews
    });

    useEffect (() => {
        dispatch(fetchAllUserReviews(sessionUser.id))
    }, [dispatch])



    if(!sessionUser){
        return (
            <h3>You must be logged in to view your Reviews!</h3>
        )
    }

    if(myReviews.length < 1) {
        return (
            <h3>You have no reviews</h3>
        )
    }

    return (
        <>
            <h3>All Reviews</h3>
            {myReviews && myReviews.map(review => {
                const deleteReviewButton = (e) => {
                    e.preventDefault();
                    dispatch(deleteReview(review.id, sessionUser.id));
                };
               
            return (
                <>
                    
                    <Link to={`/products/${review.artProductId}`} id='link'>{review.ArtProduct.title} Review
                    </Link>
                    <form style={{marginBottom: 50}}>
                        <p>{review.User.username} said: {review.review}</p>
                        <button onClick={deleteReviewButton}>Delete This Review</button>
                    </form>
                </>
            )
        })}
        </>
    )
}

export default MyReviews;
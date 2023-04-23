import { isArray, isEmpty } from 'lodash';
import Comment from './comment';
import CommentForm from './comment-form';
import { useRef, useState } from 'react';
import { smoothScroll } from '../../utils/miscellaneous';

const Comments = ( { comments, postId } ) => {
	
	if ( isEmpty( comments ) || ! isArray( comments ) ) {
		return null;
	}
	
	/**
	 * Initialize.
	 */
	const commentFormEl = useRef( null );
	const [ replyCommentID, setReplyCommentID ] = useState( 0 );
	
	/**
	 * Handle Reply Button Click.
	 *
	 * @param {Event} event Event.
	 * @param {number} commentId Comment Id.
	 */
	const handleReplyButtonClick = ( event, commentId ) => {
		setReplyCommentID( commentId );
		smoothScroll( commentFormEl.current, 20 );
	}

	return (
		<div className="mt-20">
			<h2>{ comments.length } Comments</h2>
			{
				comments.map( ( comment, index ) => {
					return (
						<div
							key={ `${ comment?.id ?? '' }-${ index }` ?? '' }
							className="comment"
						>
							<Comment comment={ comment } handleReplyButtonClick={ handleReplyButtonClick }/>
						</div>
					);
				} )
			}
			<div ref={ commentFormEl }>
				<CommentForm postId={ postId } replyCommentID={ replyCommentID } />
			</div>
		</div>
	)
}

export default Comments;

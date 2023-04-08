import { isArray, isEmpty } from 'lodash';
import Comment from './comment';
import CommentForm from './comment-form';

const Comments = ( { comments } ) => {
	
	if ( isEmpty( comments ) || ! isArray( comments ) ) {
		return null;
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
							<Comment comment={ comment }/>
						</div>
					);
				} )
			}
			<CommentForm />
		</div>
	)
}

export default Comments;

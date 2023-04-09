/**
 * External Dependencies.
 */
import { useEffect, useState } from 'react';
import cx from 'classnames';

/**
 * Internal Dependencies.
 */
import validateAndSanitizeCommentsForm from '../../validator/comments';
import TextArea from '../form-elements/text-area';
import Input from '../form-elements/input';
import { postComment } from '../../utils/blog';
import { sanitize } from '../../utils/miscellaneous';

const CommentForm = ( { postId, replyCommentID } ) => {
	
	/**
	 * Initialize Input State.
	 *
	 * @type {{date: Date, postId: number, wp_comment_cookies_consent: boolean}}
	 */
	const initialInputState = {
		postId: postId || 0,
		date: new Date(),
		parent: replyCommentID || 0,
	}
	
	const [ input, setInput ] = useState( initialInputState );
	const [ commentPostSuccess, setCommentPostSuccess ] = useState( false );
	const [ commentPostError, setCommentPostError ] = useState( '' );
	const [ clearFormValues, setClearFormValues ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	const submitBtnClasses = cx(
		'text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-16px uppercase w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
		{
			'cursor-pointer bg-blue-700': ! loading,
			'bg-blue-400 dark:bg-blue-500 cursor-not-allowed': loading,
		},
	);
	
	/**
	 * When the reply Comment id gets updated
	 * then update the input.
	 */
	useEffect( () => {
		setInput( {
			...input,
			parent: replyCommentID || 0,
		} );
	}, [ replyCommentID ] );
	
	/**
	 * If 'clearFormValues' becomes true,
	 * reset the input value to initialInputState
	 */
	useEffect( () => {
		if ( clearFormValues ) {
			setInput( initialInputState );
		}
	}, [ clearFormValues ] );
	
	/**
	 * If 'commentPostSuccess' is set to true, set to false after
	 * few seconds so the message disappears.
	 */
	useEffect( () => {
		if ( commentPostSuccess ) {
			const intervalId = setTimeout( () => {
				setCommentPostSuccess( false )
			}, 10000 )
			
			// Unsubscribe from the interval.
			return () => {
				clearInterval( intervalId );
			};
		}
	}, [ commentPostSuccess ] )
	
	/**
	 * Handle form submit.
	 *
	 * @param {Event} event Event.
	 *
	 * @return {null}
	 */
	const handleFormSubmit = ( event ) => {
		event.preventDefault();
		
		const commentFormValidationResult = validateAndSanitizeCommentsForm( input );
		
		setInput( {
			...input,
			errors: commentFormValidationResult.errors,
		} );
		
		// If there are any errors, return.
		if ( ! commentFormValidationResult.isValid ) {
			return null;
		}
		
		// Set loading to true.
		setLoading( true );
		
		// Make a POST request to post comment.
		const response = postComment( 377, input );
		
		/**
		 * The postComment() returns a promise,
		 * When the promise gets resolved, i.e. request is complete,
		 * then handle the success or error messages.
		 */
		response.then(( res ) => {
			setLoading( false );
			if ( res.success ) {
				setCommentPostSuccess( true );
				setClearFormValues( true );
			} else {
				setCommentPostError( res.error ?? 'Something went wrong. Please try again' );
			}
		})
	}
	
	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return {void}
	 */
	const handleOnChange = ( event ) => {
		
		// Reset the comment post success and error messages, first.
		if ( commentPostSuccess ) {
			setCommentPostSuccess( false );
		}
		if ( commentPostError ) {
			setCommentPostError( '' );
		}
		
		const { target } = event || {};
		const newState = 'checkbox' === target.type ? { ...input, [ target.name ]: ! input[target.name] } : { ...input, [ target.name ]: target.value };
		setInput( newState );
	};
	
	return (
		<form action="/" noValidate onSubmit={ handleFormSubmit } id="comment-form">
			<h2>Leave a comment</h2>
			<p className="comment-notes">
				<span id="email-notes">Your email address will not be published.</span>
				<span className="required-field-message">Required fields are marked <span className="required">*</span></span>
			</p>
			<TextArea
				id="comment"
				containerClassNames="comment-form-comment mb-2"
				name="comment"
				label="Comment"
				cols="45"
				rows="5"
				required
				textAreaValue={ input?.comment ?? '' }
				handleOnChange={ handleOnChange }
				errors={ input?.errors ?? {} }
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
				<Input
					name="author"
					inputValue={ input?.author }
					required
					handleOnChange={ handleOnChange }
					label="Name"
					errors={ input?.errors ?? {} }
					containerClassNames="comment-form-author"
				/>
				<Input
					name="email"
					inputValue={ input?.email }
					required
					handleOnChange={ handleOnChange }
					label="Email"
					errors={ input?.errors ?? {} }
					containerClassNames="comment-form-email mb-2"
				/>
			</div>
			<Input
				name="url"
				inputValue={ input?.url ?? '' }
				handleOnChange={ handleOnChange }
				label="Website"
				errors={ input?.errors ?? {} }
				containerClassNames="comment-form-url mb-2"
			/>
			<div className="form-submit py-4">
				<input
					name="submit"
					type="submit"
					id="submit"
					className={ submitBtnClasses }
					value="Post Comment"
					disabled={ loading }
				/>
			</div>
			{
				commentPostSuccess && ! loading ?
					(
						<div
							className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
							role="alert">
							<span className="font-medium">Success!</span> Your comment has been submitted for approval.
							It will be posted after admin's approval.
						</div>
					) : null
			}
			{
				commentPostError && ! loading ?
					(
						<div
							className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
							role="alert">
							<span className="font-medium">Error! </span>
							<div className="inline-block" dangerouslySetInnerHTML={ { __html: sanitize( commentPostError ) } } />
						</div>
					) : null
			}
			{
				loading ?
					(
						<button disabled type="button"
						        className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 w-full text-left">
							<svg
								aria-hidden="true"
								role="status"
							    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
							    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="#1C64F2"
								/>
							</svg>
							Processing...
						</button>
					) : null
			}
		</form>
	)
}

export default CommentForm;

import { useState } from 'react';
import validateAndSanitizeCommentsForm from '../../validator/comments';
import TextArea from '../form-elements/text-area';
import Input from '../form-elements/input';
import Checkbox from '../form-elements/checkbox';

const CommentForm = () => {
	
	const [ input, setInput ] = useState( { wp_comment_cookies_consent: false } );
	
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
	}
	
	/*
	 * Handle onchange input.
	 *
	 * @param {Object} event Event Object.
	 * @param {bool} isShipping If this is false it means it is billing.
	 * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
	 *
	 * @return {void}
	 */
	const handleOnChange = ( event ) => {
		const { target } = event || {};
		console.log( 'target.type', target.type );
		const newState = 'checkbox' === target.type ? { ...input, [ target.name ]: ! input[target.name] } : { ...input, [ target.name ]: target.value };
		setInput( newState );
	};
	
	return (
		<form action="/" noValidate onSubmit={ handleFormSubmit }>
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
				inputValue={ input?.url }
				required
				handleOnChange={ handleOnChange }
				label="Website"
				errors={ input?.errors ?? {} }
				containerClassNames="comment-form-url mb-2"
			/>
			<Checkbox
				name="wp_comment_cookies_consent"
				checked={ input.wp_comment_cookies_consent }
				handleOnChange={ handleOnChange }
				label="Save my name, email, and website in this browser for the next time I comment."
				errors={ input?.errors ?? {} }
				containerClassNames="comment-form-url mb-2"
			/>
			<div className="form-submit">
				<input name="submit" type="submit" id="submit" className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-16px uppercase w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Post Comment"/>
				<input type="hidden" name="comment_post_ID" value="377" id="comment_post_ID"/>
				<input type="hidden" name="comment_parent" id="comment_parent" value="0"/>
			</div>
		</form>
	)
}

export default CommentForm;

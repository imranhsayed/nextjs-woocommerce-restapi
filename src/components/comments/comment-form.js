import { useState } from 'react';
import Error from './error';
import validateAndSanitizeCommentsForm from '../../validator/comments';

const CommentForm = () => {
	
	const [ input, setInput ] = useState( {} );
	
	const handleFormSubmit = ( event ) => {
		event.preventDefault();
		
		const commentFormValidationResult = validateAndSanitizeCommentsForm( input );
		console.log( 'commentFormValidationResult', commentFormValidationResult, input );
		
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
		
		const newState = { ...input, [ target.name ]: target.value };
		setInput( newState );
	};
	
	return (
		<form action="/" noValidate onSubmit={ handleFormSubmit }>
			<h2>Leave a comment</h2>
			<p className="comment-notes">
				<span id="email-notes">Your email address will not be published.</span>
				<span className="required-field-message">Required fields are marked <span className="required">*</span></span>
			</p>
			<div className="comment-form-comment mb-2">
				<label htmlFor="comment" className="block mb-2 font-medium text-gray-900 dark:text-white">
					Comment
					<span className="required">*</span>
				</label>
				<textarea
					id="comment"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					name="comment"
					cols="45"
					rows="5"
					maxLength="65525"
					required
					value={ input?.comment ?? '' }
					onChange={ ( event ) => handleOnChange( event ) }
				/>
				<Error errors={ input?.errors ?? {} } fieldName="comment"/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
				<div className="comment-form-author">
					<label htmlFor="author" className="block mb-2 font-medium text-gray-900 dark:text-white">
						Name
						<span className="required">*</span>
					</label>
					<input
						id="author"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="author"
						type="text"
						size="30"
						maxLength="245"
						autoComplete="name"
						required=""
						value={ input?.author ?? '' }
						onChange={ ( event ) => handleOnChange( event ) }
					/>
					<Error errors={ input?.errors ?? {} } fieldName="author"/>
				</div>
				<div className="comment-form-email border-0 mb-2">
					<label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-white">
						Email
						<span className="required">*</span>
					</label>
					<input
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="email"
						type="email"
						size="30"
						maxLength="100"
						aria-describedby="email-notes"
						autoComplete="email"
						required
						value={ input?.email ?? '' }
						onChange={ ( event ) => handleOnChange( event ) }
					/>
					<Error errors={ input?.errors ?? {} } fieldName="email"/>
				</div>
			</div>
			<div className="comment-form-url mb-2">
				<label htmlFor="url" className="block mb-2 font-medium text-gray-900 dark:text-white">
					Website
				</label>
				<input
					id="url"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					name="url"
					type="url"
					size="30"
                    maxLength="200"
                    autoComplete="url"
					value={ input?.url ?? '' }
					onChange={ ( event ) => handleOnChange( event ) }
				/>
				<Error errors={ input?.errors ?? {} } fieldName="url"/>
			</div>
			<div className="comment-form-cookies-consent mb-4">
				<input
					id="wp-comment-cookies-consent"
					name="wp_comment_cookies_consent"
					type="checkbox"
					value="yes"
					onChange={ ( event ) => handleOnChange( event ) }
				/>
				<label htmlFor="wp-comment-cookies-consent" className="mb-2 ml-2 font-medium text-gray-900 dark:text-white">
					Save my name, email, and website in this browser for the next time I comment.
				</label>
				<Error errors={ input?.errors ?? {} } fieldName="wp_comment_cookies_consent"/>
			</div>
			<div className="form-submit">
				<input name="submit" type="submit" id="submit" className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-16px uppercase w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Post Comment"/>
				<input type="hidden" name="comment_post_ID" value="377" id="comment_post_ID"/>
				<input type="hidden" name="comment_parent" id="comment_parent" value="0"/>
			</div>
		</form>
	)
}

export default CommentForm;

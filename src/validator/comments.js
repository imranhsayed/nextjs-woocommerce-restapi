import validator from 'validator';
import isEmpty from './is-empty';


const validateAndSanitizeCommentsForm = ( data ) => {
	
	let errors = {};
	let sanitizedData = {};
	
	/**
	 * Set the name value equal to an empty string if user has not entered the name, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly, we do it for the rest of the fields
	 */
	data.comment = ( ! isEmpty( data.comment ) ) ? data.comment : '';
	data.author = ( ! isEmpty( data.author ) ) ? data.author : '';
	data.email = ( ! isEmpty( data.email ) ) ? data.email : '';
	data.url = ( ! isEmpty( data.url ) ) ? data.url : '';
	
	/**
	 * Checks for error if required is true
	 * and adds Error and Sanitized data to the errors and sanitizedData object
	 *
	 * @param {String} fieldName Field name e.g. First name, last name
	 * @param {String} errorContent Error Content to be used in showing error e.g. First Name, Last Name
	 * @param {Integer} min Minimum characters required
	 * @param {Integer} max Maximum characters required
	 * @param {String} type Type e.g. email, phone etc.
	 * @param {boolean} required Required if required is passed as false, it will not validate error and just do sanitization.
	 */
	const addErrorAndSanitizedData = ( fieldName, errorContent, min, max, type = '', required ) => {
		
		/**
		 * Please note that this isEmpty() belongs to validator and not our custom function defined above.
		 *
		 * Check for error and if there is no error then sanitize data.
		 */
		if ( ! validator.isLength( data[ fieldName ], { min, max } ) && required ){
			errors[ fieldName ] = `${errorContent} must be ${min} to ${max} characters`;
		}
		
		if ( 'email' === type && ! validator.isEmail( data[ fieldName ] ) ){
			errors[ fieldName ] = `${errorContent} is not valid`;
		}
		
		if ( 'url' === type && ! validator.isURL( data[ fieldName ] ) && required ){
			errors[ fieldName ] = `${errorContent} is not valid`;
		}
		
		if ( required && validator.isEmpty( data[ fieldName ] ) ) {
			errors[ fieldName ] = `${errorContent} is required`;
		}
		
		// If no errors
		if ( ! errors[ fieldName ] ) {
			sanitizedData[ fieldName ] = validator.trim( data[ fieldName ] );
			sanitizedData[ fieldName ] = ( 'email' === type ) ? validator.normalizeEmail( sanitizedData[ fieldName ] ) : sanitizedData[ fieldName ];
			sanitizedData[ fieldName ] = validator.escape( sanitizedData[ fieldName ] );
		}
		
	};
	
	addErrorAndSanitizedData( 'comment', 'Comment', 12, 100,'string',true );
	addErrorAndSanitizedData( 'author', 'Author Name', 0, 35, 'string', true );
	addErrorAndSanitizedData( 'email', 'Email', 11, 254, 'email', true );
	addErrorAndSanitizedData( 'url', 'Site URL', 2, 55, 'url', false );
	
	return {
		sanitizedData,
		errors,
		isValid: isEmpty( errors )
	}
};

export default validateAndSanitizeCommentsForm;

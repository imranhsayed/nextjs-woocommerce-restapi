import Error from './error';
import PropTypes from 'prop-types';
import Abbr from './abbr';

const Input = ( {
	                     handleOnChange,
	                     inputValue,
	                     name,
	                     type,
	                     label,
	                     errors,
	                     placeholder,
	                     required,
	                     containerClassNames,
	                     inputId,
                     } ) => {
	
	return (
		<div className={ containerClassNames }>
			<label className="leading-7 text-sm text-gray-700" htmlFor={ inputId }>
				{ label || '' }
				<Abbr required={ required }/>
			</label>
			<input
				onChange={ handleOnChange }
				value={ inputValue || '' }
				placeholder={ placeholder || '' }
				type={ type || 'text' }
				name={ name || '' }
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				id={ inputId || name }
			/>
			<Error errors={ errors } fieldName={ name }/>
		</div>
	);
};

Input.propTypes = {
	handleOnChange: PropTypes.func,
	inputValue: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	errors: PropTypes.object,
	required: PropTypes.bool,
	containerClassNames: PropTypes.string,
};

Input.defaultProps = {
	handleOnChange: () => null,
	inputValue: '',
	name: '',
	type: 'text',
	label: '',
	placeholder: '',
	errors: {},
	required: false,
	containerClassNames: '',
};

export default Input;

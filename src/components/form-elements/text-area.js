import Error from './error';
import PropTypes from 'prop-types';
import Abbr from './abbr';

const TextArea = ( {
					handleOnChange,
					textAreaValue,
					name,
					label,
					errors,
					placeholder,
					required,
					containerClassNames,
					textAreaId,
					cols,
					rows,
					maxLength
                     } ) => {
	
	return (
		<div className={ containerClassNames }>
			<label className="leading-7 text-sm text-gray-700" htmlFor={ textAreaId }>
				{ label || '' }
				<Abbr required={ required }/>
			</label>
			<textarea
				onChange={ handleOnChange }
				value={ textAreaValue || '' }
				placeholder={ placeholder || '' }
				cols={ cols || 45 }
				rows={ rows || 5 }
				maxLength={ maxLength || 65525 }
				name={ name || '' }
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				id={ textAreaId || name }
			/>
			<Error errors={ errors } fieldName={ name }/>
		</div>
	);
};

TextArea.propTypes = {
	handleOnChange: PropTypes.func,
	textAreaValue: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	errors: PropTypes.object,
	required: PropTypes.bool,
	containerClassNames: PropTypes.string,
};

TextArea.defaultProps = {
	handleOnChange: () => null,
	textAreaValue: '',
	name: '',
	label: '',
	placeholder: '',
	errors: {},
	required: false,
	containerClassNames: '',
};

export default TextArea;

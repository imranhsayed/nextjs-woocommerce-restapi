import PropTypes from 'prop-types';
import Error from './error';
import Abbr from './abbr';

const Checkbox = ( { handleOnChange, checked, name, errors, required, label, placeholder, containerClassNames, inputValue } ) => {
	
	return (
		<div className={ containerClassNames }>
			<label className="leading-7 text-md text-gray-700 flex items-center cursor-pointer" htmlFor={ name }>
				<input
					type="checkbox"
					onChange={ handleOnChange }
					placeholder={ placeholder }
					checked={ checked }
					name={ name }
					id={ name }
					value={ checked }
				/>
				<span className="ml-2">{ label || '' }</span>
				<Abbr required={ required }/>
			</label>
			<Error errors={ errors } fieldName={ name }/>
		</div>
	);
};

Checkbox.propTypes = {
	handleOnChange: PropTypes.func,
	checked: PropTypes.bool,
	name: PropTypes.string,
	type: PropTypes.string,
	errors: PropTypes.object,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	containerClassNames: PropTypes.string,
};

Checkbox.defaultProps = {
	handleOnChange: () => null,
	checked: false,
	name: '',
	label: '',
	placeholder: '',
	errors: {},
	containerClassNames: '',
};

export default Checkbox;

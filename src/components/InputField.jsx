import { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from './Typography';

const InputField = forwardRef(
  ({ value, onChange, autoFocus, placeholder, className, error }, ref) => {
    function handleFunction(event) {
      onChange(event.target.value);
    }
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          value={value}
          onChange={handleFunction}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={classNames(
            'mx-auto p-2 indent-2 text-white bg-transparent/30 outline-none rounded-md w-full',
            className
          )}
        />
        {error && <Typography variant="error">{error}</Typography>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

InputField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default InputField;

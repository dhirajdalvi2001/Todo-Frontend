import PropTypes from 'prop-types';
import classNames from 'classnames';

const Typography = ({ children, variant, className }) => {
  function applyStyles() {
    if (variant === 'title') {
      return 'text-2xl md:text-4xl w-fit';
    }
    if (variant === 'error') {
      return 'h-0 text-red-500 text-xs text-left w-full ml-4';
    }
  }
  return (
    <div
      className={classNames(
        'mx-auto text-white font-semibold',
        applyStyles(),
        className
      )}
    >
      {children}
    </div>
  );
};

export default Typography;

Typography.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['title']),
  className: PropTypes.string,
};

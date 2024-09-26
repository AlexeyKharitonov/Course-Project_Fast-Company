import React from "react";
import PropTypes from "prop-types";

const TextareaSelectedField = ({
    label,
    type,
    name,
    value,
    onChange,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    // className="form-control"
                    className={getInputClasses()}
                ></textarea>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextareaSelectedField.defaultProps = {
    type: "text"
};
TextareaSelectedField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    rows: PropTypes.string
};

export default TextareaSelectedField;

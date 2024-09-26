import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import TextareaSelectedField from "../form/textareaSelectedField";
import api from "../../../api";

const initialDate = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialDate);
    const [errors, setErrors] = useState({ userId: "", content: "" });
    const [user, setUser] = useState([]);

    const validatorConfig = {
        userId: {
            isRequared: {
                message: "Выберете от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequared: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const listOfUsers = Object.keys(data).map((userName) => ({
                value: data[userName]._id,
                label: data[userName].name
            }));
            setUser(listOfUsers);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setData(initialDate);
        setErrors({});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    console.log(data);

    return (
        <>
            <form onSubmit={submitHandler}>
                <h3 className="card-body">New comment</h3>
                <span className="card-body">
                    <SelectField
                        defaultOption="Выберете пользователя"
                        name="userId"
                        options={user}
                        onChange={handleChange}
                        value={data.userId}
                        error={errors.userId}
                    />
                    <TextareaSelectedField
                        type="text"
                        label="Сообщение"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info text-dark btn-outline-info"
                            disabled={!isValid}
                        >
                            Опубликовать
                        </button>
                    </div>
                </span>
            </form>
        </>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;

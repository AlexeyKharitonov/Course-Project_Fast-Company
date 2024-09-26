import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
// import { validator } from "../../../utils/validator";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/BackButton";

const EditUserPage = ({ userId }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [loading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState();
    // const [errors, setErrors] = useState("");

    useEffect(() => {
        // setLoading(true);
        api.users.getById(userId).then((user) => {
            setData((prevstate) => ({
                ...prevstate,
                ...user,
                profession: user.profession._id,
                qualities: transformData(user.qualities)
            }));
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // const validatorConfig = {
    //     email: {
    //         isRequared: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен некорректно"
    //         }
    //     },
    //     password: {
    //         isRequared: {
    //             message: "Пароль обязательна для заполнения"
    //         },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одно число"
    //         },
    //         min: {
    //             message: "Пароль должен состоять минимум из 8 символов",
    //             value: 8
    //         }
    //     },
    //     profession: {
    //         isRequared: {
    //             message: "Обязательно выберите вашу профессию"
    //         }
    //     },
    //     licence: {
    //         isRequared: {
    //             message:
    //                 "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
    //         }
    //     }
    // };

    // useEffect(() => {
    //     validate();
    // }, [data]);

    // const validate = () => {
    //     const errors = validator(data, validatorConfig);

    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };

    // const isValid = Object.keys(errors).length === 0;

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        if (data._id) setLoading(false);
    }, [data]);

    const transformData = (data) =>
        data.map((item) => ({
            label: item.name,
            value: item.id,
            color: item.color
        }));

    const handleSubmit = (event) => {
        event.preventDefault();
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(data.profession),
                qualities: getQualities(data.qualities)
            })
            .then(() => history.goBack());
    };

    return (
        <>
            {/* <div className="mx-5 mr-5"></div> */}
            {loading === false ? (
                <div className="container mt-5 ">
                    <BackHistoryButton />
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    // error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    // error={errors.email}
                                />

                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    name="profession"
                                    options={professions}
                                    onChange={handleChange}
                                    value={data.profession}
                                    // error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    // disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto mb-2"
                                >
                                    Обновить данные
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                    <div
                        className="spinner-border m-5 text-primary"
                        role="status"
                    >
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}
        </>
    );
};
EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;

import React from "react";
import PropTypes from "prop-types";
// import Qualitie from "./qualities/qualitie";
import Qualities from "./qualities";

const UserQualities = ({ user }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    {/* {user.map((qual) => (
                        <Qualitie
                            // _id={qual._id}
                            key={qual._id}
                            color={qual.color}
                            name={qual.name}
                        />
                    ))} */}
                    <Qualities qualities={user} />
                </p>
            </div>
        </div>
    );
};
UserQualities.propTypes = {
    user: PropTypes.arrayOf(PropTypes.object)
};

export default UserQualities;

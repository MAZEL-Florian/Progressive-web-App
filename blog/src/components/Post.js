import React from 'react';
import moment from 'moment';

function Post({ title, content, createdAt }) {
    const formattedDate = moment(createdAt).format('DD/MM/YYYY HH:mm:ss');
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-start">
                    <h5 className="card-title">{title}</h5> -
                    <span className="card-title">{formattedDate}</span>
                </div>

                <p className="card-text">{content}</p>
            </div>
        </div>
    );
}

export default Post;

import React from "react";

import {
  faCode,
  faCodeFork,
  faEye,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { colors, fontSize } from "../../../common/theme";

const RepoListItem = ({
  name,
  author,
  watchers,
  stars,
  description,
  forks,
  updatedAt,
}) => {
  const navigate = useNavigate();

  const formattedName = name.split("-").join(" ");
  const formattedAuthor = author.login.split("-").join(" ");

  return (
    <Repo
      onClick={() => {
        navigate(`/repos/${author.login}/${name}`);
      }}
    >
      <div className="repo-left">
        <div className="repo-name">
          <FontAwesomeIcon style={marginStyle} icon={faCode} />
          <span style={{ marginRight: 10 }}>
            {formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}
          </span>{" "}
          -
          <span className="desc">
            {(description || "N/A").length > 80
              ? `${(description || "N/A").slice(0, 80)}...`
              : description || "N/A"}
          </span>
        </div>
        <div className="repo-author">
          <p className="author">
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="name">
              {formattedAuthor.charAt(0).toUpperCase() +
                formattedAuthor.slice(1)}
            </span>
          </p>
          <p className="stars">
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="count">{stars} stars</span>
          </p>
        </div>
        <p className="updatedAt">
          <span>Last updated : </span>
          <span className="name">{getUpdatedDate(updatedAt)}</span>
        </p>
      </div>
      <div className="repo-right">
        <p className="watchers">
          <span>
            <FontAwesomeIcon icon={faEye} style={marginStyle} />
          </span>
          <span>{watchers}</span> watchers
        </p>
        <p className="forks">
          <span>
            <FontAwesomeIcon icon={faCodeFork} style={marginStyle} />
          </span>
          <span>{forks}</span> forks
        </p>
      </div>
    </Repo>
  );
};

const Repo = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 20px 15px;
  font-size: ${fontSize.small}px;

  .repo-left {
    & > .repo-name {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: ${colors.secondary};

      & > .desc {
        color: ${colors.text};
        font-size: 16px;
        margin-left: 20px;
      }
    }

    & > .repo-author {
      .stars {
        font-size: 14px;
        color: ${colors.text};
        .count {
          margin-left: 5px;
        }
      }
      & > .author {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: ${colors.text};
        & > .name {
          margin-left: 10px;
        }
      }
    }

    & > .updatedAt {
      font-size: 14px;
      color: ${colors.text};
    }
  }
  .repo-right {
    color: ${colors.text};
  }
`;

const marginStyle = { marginRight: 10, fontSize: 14 };

const getUpdatedDate = (date) => {
  const currentDate = new Date(date);
  return `${currentDate.getFullYear()}- ${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
};
export default RepoListItem;
